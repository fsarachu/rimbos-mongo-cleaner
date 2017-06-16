const log = require('simple-node-logger').createSimpleLogger({
    logFilePath: './log/Index.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
});
const Event = require('./models/event');
const EventPost = require('./models/eventPost');
const PostComment = require('./models/postComment');

/**
 * Find the requested events and their associated content.
 * @param {ObjectId[]} eventIds - An array of events ObjectId's.
 */
function findEvents(eventIds) {
    Event.find({_id: {$in: eventIds}}, (err, events) => {
        if (err) {
            log.error(err);
        }

        log.info(`${events.length} Events Found`);

        findEventPosts(events.map(e => e._id));
    });
}


/**
 * Finds all posts belonging to any of the specified events.
 * @param {ObjectId[]} eventIds - An array of events ObjectId's.
 */
function findEventPosts(eventIds) {
    EventPost.find({eventId: {$in: eventIds}}, (err, posts) => {
        if (err) {
            log.error(err);
        }

        log.info(`${posts.length} Posts Found`);

        findPostComments(posts.map(p => p._id));
    });
}


/**
 * Finds all comments belonging to any of the specified event posts.
 * @param {ObjectId[]} postIds - An array of event post ObjectId's.
 */
function findPostComments(postIds) {
    PostComment.find({eventPostId: {$in: postIds}}, (err, comments) => {
        if (err) {
            log.error(err);
        }

        log.info(`${comments.length} Comments Found`);
    });
}


/**
 * Deletes the requested events (and their associated content via mongoose model middleware).
 * @param {ObjectId[]} eventIds - An array of events ObjectId's.
 */
function deleteEvents(eventIds) {
    Event.find({_id: {$in: eventIds}}, (err, events) => {
        if (err) {
            log.error(err);
        }

        for (let event of events) {
            event.remove();
        }
    });
}

module.exports = {
    findEvents,
    deleteEvents
};