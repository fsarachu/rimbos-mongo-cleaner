const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    'eventId': mongoose.Schema.Types.ObjectId,
    'mediaUrl': String,
});

module.exports = mongoose.model('EventPost', schema, 'eventposts');