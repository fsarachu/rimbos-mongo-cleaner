const mongoose = require('mongoose');
const log = require('simple-node-logger').createSimpleLogger({
    logFilePath: './log/PostComment.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
});

const postCommentSchema = new mongoose.Schema({
    eventPostId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    date: Date,
    text: String,
    archived: Boolean,
    createdAt: Date,
    updatedAt: Date
});

postCommentSchema.post('remove', removed => log.info(`Comment ${removed._id} has been removed`));

module.exports = mongoose.model('PostComment', postCommentSchema, 'postcomments');