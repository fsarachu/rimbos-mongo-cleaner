const mongoose = require('mongoose');
const EventPost = require('./eventPost');

const eventSchema = new mongoose.Schema({
    code: String,
    name: String,
});

eventSchema.pre('remove', function(next) {
    EventPost.find({eventPostId: this._id}, (err, posts) => {
        if(err) {
            console.error(err);
        }

        for (let post of posts) {
            post.remove();
        }

        next();
    });
});

module.exports = mongoose.model('Event', eventSchema, 'events');