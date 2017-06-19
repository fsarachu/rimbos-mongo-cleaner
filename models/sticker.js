const mongoose = require('mongoose');

const stickerSchema = new mongoose.Schema({
    name: String,
    url: String,
    description: String,
    archived: Boolean,
    thumbnail: String,
    accessibilityText: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Sticker', stickerSchema, 'stickers');