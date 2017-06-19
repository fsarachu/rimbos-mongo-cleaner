const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: String,
    approved: Boolean,
    archived: Boolean,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('City', citySchema, 'cities');