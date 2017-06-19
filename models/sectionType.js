const mongoose = require('mongoose');

const sectionTypeSchema = new mongoose.Schema({
    name: String,
    archived: Boolean,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('SectionType', sectionTypeSchema, 'sectiontypes');