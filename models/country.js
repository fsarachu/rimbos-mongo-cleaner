const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: String,
    code: String,
    cities: [mongoose.Schema.Types.ObjectId],
    archived: Boolean,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Country', countrySchema, 'countries');