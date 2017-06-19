const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: String,
    address: String,
    description: String,
    coverPhoto: String,
    location: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d',      // create the geospatial index
    },
    photos: [String],
    archived: Boolean,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Place', placeSchema, 'places');