const mongoose = require('mongoose');
const log = require('simple-node-logger').createSimpleLogger({
    logFilePath: './log/PostComment.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
});

const schema = new mongoose.Schema({
    'eventPostId': mongoose.Schema.ObjectId,
    'text': String,
});

eventPostSchema.post('remove', removed => log.info(`Post ${removed._id} has been removed`));

module.exports = mongoose.model('PostComment', schema, 'postcomments');