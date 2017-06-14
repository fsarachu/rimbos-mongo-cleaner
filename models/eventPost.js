const mongoose = require('mongoose');
const PostComment = require('./postComment');
const log = require('simple-node-logger').createSimpleLogger({
    logFilePath: './log/EventPost.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
});

const eventPostSchema = new mongoose.Schema({
    'eventId': mongoose.Schema.Types.ObjectId,
    'mediaUrl': String,
});

eventPostSchema.pre('remove', function (next) {
    PostComment.find({eventPostId: this._id}, (err, comments) => {
        if (err) {
            log.error(err);
        }

        for (let comment of comments) {
            comment.remove();
        }

        next();
    })
});

eventPostSchema.post('remove', removed => log.info(`Post ${removed._id} has been removed`));

module.exports = mongoose.model('EventPost', eventPostSchema, 'eventposts');