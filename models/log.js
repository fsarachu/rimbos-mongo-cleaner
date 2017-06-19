const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    eventId: mongoose.Schema.Types.ObjectId,
    anonymous: Boolean,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Log', logSchema, 'logs');