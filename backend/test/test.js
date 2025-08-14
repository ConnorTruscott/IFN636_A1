const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Team = require('../models/Team');
const {createTeam, addTeam} = require('../controllers/teamController');
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