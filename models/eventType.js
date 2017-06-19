const mongoose = require('mongoose');

const eventTypeSchema = new mongoose.Schema({
    name: String,
    approved: Boolean,
    sectionType: mongoose.Schema.Types.ObjectId,
    templateUrl: String,
    archived: Boolean,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('EventType', eventTypeSchema, 'eventtypes');