const Team = require('../models/Team');
const User = require('../models/User');

const getTeams = async(req, res) =>{
    try{
        const teams = await Team.find({UserId: req.user.id});
        res.json(teams)
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

const addTeam = async(req, res) => {
    const{name, members, skill}=req.body;
    try{
        const team = await Team.create({userId: req.user.id, name, members, skill});
        res.status(201).json(team);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

const updateTeam = async(req, res) =>{
    const {name, members, skill}=req.body;
    try{
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({message: "Team Not Found"});

        team.name = name || team.name;
        team.members = members || team.members;
        team.skill = skill || team.skill;

        const updatedTeam = await TeamForm.save();
        res.json(updatedTeam);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

const deleteTeam = async (req,res) =>{
    try{
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({message: 'Team Not Found'});

        await team.remove();
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports= {getTeams, addTeam, updateTeam, deleteTeam}