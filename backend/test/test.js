const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Team = require('../models/Team');
const {createTeam, addTeam, getTeams, updateTeam, deleteTeam} = require('../controllers/teamController');
const { json } = require('express');
const {expect} = chai;

describe('Team Controller - createTeam', () =>{
    it('should create a new team successfully', async()=>{
        const req = {
            user:{id: new mongoose.Types.ObjectId()},
            body:{name: "Team Name", members: "Members", skill: "Skill"}
        };

        const createdTeam = {_id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id};

        const createStub = sinon.stub(Team, 'create').resolves(createdTeam);

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await addTeam(req, res);

        expect(createStub.calledOnceWith({userId: req.user.id, ...req.body})).to.be.true;
        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith(createdTeam)).to.be.true;

        createStub.restore();
    });

    it('should return 500 if an error occurs', async() =>{
        const createStub = sinon.stub(Team, 'create').throws(new Error('DB Error'));

        const req ={
            user:{id: new mongoose.Types.ObjectId()},
            body:{name: "Team Name", members: "Members", skill: "Skill"}
        };

        const res ={
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await addTeam(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWithMatch({message: 'DB Error'})).to.be.true;

        createStub.restore();
    });
});

describe('Team Controller - getTeams', () =>{
    it('should return a team successfully', async() =>{
        const teamId = new mongoose.Types.ObjectId();
        
        const teams = [
            {_id: new mongoose.Types.ObjectId(), name: "Team 1", teamId},
            {_id: new mongoose.Types.ObjectId(), name: "Team 2", teamId}
        ];

        const findStub = sinon.stub(Team, 'find').resolves(teams);

        const req = {user: {id: teamId}};
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        await getTeams(req,res);

        expect(findStub.calledOnceWith({teamId})).to.be.string;
        expect(res.json.calledWith(teams)).to.be.true;
        expect(res.status.called).to.be.false;

        findStub.restore();
    });

    it('should return 500 if team not found', async() => {
        const findStub = sinon.stub(Team, 'find').throws(new Error('DB Error'));
        const req = {user:{id: new mongoose.Types.ObjectId()}};
        const res = {status: sinon.stub().returnsThis(), json: sinon.spy()};

        await getTeams(req,res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWithMatch({message: 'DB Error'})).to.be.true;

        findStub.restore();
    });
});

describe("Team Controller - updateTeam", () => {
    it("should update team successfully", async()=>{
        const teamId = new mongoose.Types.ObjectId();
        const existingTeam={
            _id: teamId,
            name: "Old Name",
            members: "Old Members",
            skill: "Old Skill",
            save: sinon.stub().resolvesThis(),
        };

        const findByIdStub = sinon.stub(Team, 'findById').resolves(existingTeam);

        const req = {
            params: {id: teamId},
            body: {name:"New Name"}
        };
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        await updateTeam(req,res);

        expect(existingTeam.name).to.equal("New Name");
        expect(res.status.called).to.be.false;
        expect(res.json.calledOnce).to.be.true;

        findByIdStub.restore()
    });

    it("should return 404 if no team is found", async() => {
        const findByIdStub = sinon.stub(Team, 'findById').resolves(null);
        const req = {params: {id: new mongoose.Types.ObjectId()}, body: {}};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await updateTeam(req,res);
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({message: "Team Not Found"})).to.be.true;

        findByIdStub.restore();
    });

    it("should return 500 on error", async() => {
        const findByIdStub = sinon.stub(Team, 'findById').throws(new Error('DB Error'));

        const req = {params: {id: new mongoose.Types.ObjectId()}, body:{}};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await updateTeam(req,res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.called).to.be.true;

        findByIdStub.restore();
    });
});

describe("Team Controller - deleteTeam", () =>{
    it('should delete a team succesfully', async() => {
        const req = {params: {id: new mongoose.Types.ObjectId().toString()}};

        const team = {remove: sinon.stub().resolves()};
        const findByIdStub = sinon.stub(Team, 'findById').resolves(team);

        const res={
            status:sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await deleteTeam(req,res);

        expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
        expect(team.remove.calledOnce).to.be.true;
        expect(res.json.calledWith({message: 'Team deleted successfully'})).to.be.true;

        findByIdStub.restore();
    });

    it("should return 404 if team is not found", async() =>{
        const findByIdStub =sinon.stub(Team, 'findById').resolves(null);
        const req = {params: {id: new mongoose.Types.ObjectId().toString()}};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await deleteTeam(req,res);

        expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({message:"Team Not Found"})).to.be.true;

        findByIdStub.restore();
    });

    it("should return 500 if an error occurs", async() =>{
        const findByIdStub = sinon.stub(Team, 'findById').throws(new Error("DB Error"));
        const req = {params: {id: new mongoose.Types.ObjectId().toString()}};
        const res={
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await deleteTeam(req,res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWithMatch({message: "DB Error"})).to.be.true;

        findByIdStub.restore();
    });
});