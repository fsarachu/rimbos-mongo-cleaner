const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    'eventPostId': mongoose.Schema.ObjectId,
    'text': String,
});

module.exports = mongoose.model('PostComment', schema, 'postcomments');