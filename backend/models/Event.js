
const mongoose = require('mongoose');

//Database shema for events
const eventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: false },
    skill: { type: String },
});

module.exports = mongoose.model('Event', eventSchema);