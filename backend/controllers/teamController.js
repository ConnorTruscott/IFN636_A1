const Team = require('../models/Team');
const User = require('../models/User');

//Fetch function for teams
const getTeams = async(req, res) =>{
    try{
        const teams = await Team.find({UserId: req.user.id});
        res.json(teams)
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

//Create function for teams
const addTeam = async(req, res) => {
    const{name, members, skill}=req.body;
    try{
        const team = await Team.create({userId: req.user.id, name, members, skill});
        res.status(201).json(team);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

//Update function for teams
const updateTeam = async(req, res) =>{
    const {name, members, skill}=req.body;
    try{
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({message: "Team Not Found"});

        team.name = name || team.name;
        team.members = members || team.members;
        team.skill = skill || team.skill;

        const updatedTeam = await team.save();
        res.json(updatedTeam);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

//Delete functions for teams
const deleteTeam = async (req,res) =>{
    try{
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({message: 'Team Not Found'});

        await team.remove();

        res.json({ message: 'Team deleted successfully' });
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports= {getTeams, addTeam, updateTeam, deleteTeam}