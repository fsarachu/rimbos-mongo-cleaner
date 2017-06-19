const mongoose = require('mongoose');
const PostComment = require('./postComment');
const log = require('simple-node-logger').createSimpleLogger({
    logFilePath: './log/EventPost.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
});

const eventPostSchema = new mongoose.Schema({
    eventId: mongoose.Schema.Types.ObjectId,
    description: String,
    mediaUrl: String,
    mediaType: String,
    userId: mongoose.Schema.Types.ObjectId,
    archived: Boolean,
    archivedBy: mongoose.Schema.Types.ObjectId,
    commentQty: Number,
    emotions: [
        {
            emotionType: String,
            users: [mongoose.Schema.Types.ObjectId]
        }
    ],
    createdAt: Date,
    updatedAt: Date
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