const mongoose = require('mongoose');
const EventPost = require('./eventPost');
const log = require('simple-node-logger').createSimpleLogger({
    logFilePath: './log/Event.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
});

const eventSchema = new mongoose.Schema({
    code: String,
    name: String,
});

eventSchema.pre('remove', function (next) {
    EventPost.find({eventId: this._id}, (err, posts) => {
        if (err) {
            log.error(err);
        }

        for (let post of posts) {
            post.remove();
        }

        next();
    });
});

eventSchema.post('remove', removed => log.info(`Event ${removed._id} has been removed`));

module.exports = mongoose.model('Event', eventSchema, 'events');