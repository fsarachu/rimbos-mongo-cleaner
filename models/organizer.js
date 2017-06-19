const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
    name: String,
    description: String,
    coverPhoto: String,
    address: String,
    email: String,
    photos: [String],
    telephone: String,
    archived: Boolean,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Organizer', organizerSchema, 'organizers');