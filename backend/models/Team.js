
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    members: { type: String },
    //completed: { type: Boolean, default: false },
    skill: { type: String },
});

module.exports = mongoose.model('Team', teamSchema);