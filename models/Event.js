const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    code: {type: String},
    name: {type: String},
    date: {type: Date},
    createdBy: {type: mongoose.Schema.Types.ObjectId},
    country: {type: String},
    city: {type: String},
    comments: {type: String},
    phone: {type: String},
    email: {type: String},
    archived: {type: Boolean}
});

module.exports = mongoose.Model('Event', schema);