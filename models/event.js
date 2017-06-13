const mongoose = require('mongoose');
const EventPost = require('./eventPost');
const log = require('../helpers/log');

const eventSchema = new mongoose.Schema({
    code: String,
    name: String,
});

eventSchema.pre('remove', function(next) {
    EventPost.find({eventId: this._id}, (err, posts) => {
        if(err) {
            log.error(err);
        }

        log.info(`${posts.length} Posts to be removed`);

        for (let post of posts) {
            post.remove();
        }

        next();
    });
});

module.exports = mongoose.model('Event', eventSchema, 'events');