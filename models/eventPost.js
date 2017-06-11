const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    'eventId': mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('EventPost', schema, 'eventposts');