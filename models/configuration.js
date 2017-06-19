const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
    key: String,
    value: String,
    description: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Configuration', configurationSchema, 'configurations');