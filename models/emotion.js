const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
    name: String,
    url: String,
    description: String,
    archived: Boolean,
    data: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Emotion', emotionSchema, 'emotions');