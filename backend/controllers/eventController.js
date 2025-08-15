const Event = require('../models/Event');
const User = require('../models/User');

const getEvent = async(req, res) =>{
    try{
        const events = await Event.find({UserId: req.user.id});
        res.json(events)
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

const addEvent = async(req, res) => {
    const{name, description, date, skill}=req.body;
    try{
        const event = await Event.create({userId: req.user.id, name, description, date, skill});
        res.status(201).json(event);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

const updateEvent = async(req, res) =>{
    const {name, description, date, skill}=req.body;
    try{
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({message: "Event Not Found"});

        event.name = name || event.name;
        event.description = description || event.description;
        event.date = date || event.date;
        event.skill = skill || event.skill;

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

const deleteEvent = async (req,res) =>{
    try{
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({message: 'Event Not Found'});

        await event.remove();

        res.json({ message: 'Event deleted successfully' });
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports= {getEvent, addEvent, updateEvent, deleteEvent}