const mongoose = require('mongoose');
const PostComment = require('./postComment');
const log = require('../helpers/log');

const eventPostSchema = new mongoose.Schema({
    'eventId': mongoose.Schema.Types.ObjectId,
    'mediaUrl': String,
});

eventPostSchema.pre('remove', function(next) {
    PostComment.find({eventPostId: this._id}, (err, comments) => {
        if(err) {
            log.error(err);
        }

        for (let comment of comments) {
            comment.remove();
        }

        next();
    })
});

module.exports = mongoose.model('EventPost', eventPostSchema, 'eventposts');