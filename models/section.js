const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    name: String,
    url: String,
    coverPhoto: String,
    photos: [String],
    sectionType: mongoose.Schema.Types.ObjectId,
    createdBy: mongoose.Schema.Types.ObjectId,
    modifiedBy: mongoose.Schema.Types.ObjectId,
    countryId: mongoose.Schema.Types.ObjectId,
    city: String,
    cityId: mongoose.Schema.Types.ObjectId,
    archived: Boolean,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Section', sectionSchema, 'sections');