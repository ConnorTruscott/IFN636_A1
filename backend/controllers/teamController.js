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