// Import stuff
const mongoose = require('mongoose');
const log = require('simple-node-logger').createSimpleLogger({
    logFilePath: './log/Index.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
});
const Event = require('./models/event');
const EventPost = require('./models/eventPost');
const PostComment = require('./models/postComment');

// Connect to DB
mongoose.connect(process.env.DB_URL);

// Set mongoose promises to native promises
mongoose.Promise = global.Promise;


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


/**
 * Finds event posts that belongs to a non existing event.
 */
function findOrphanPosts() {

    let allPosts = EventPost.find().exec();

    allPosts.then(posts => {

        let postsProcessed = 0;

        for (let post of posts) {

            let event = Event.findById(post.eventId).exec();

            event.then(event => {
                if (!event) {
                    console.log(`${post._id} is orphan. It belongs to the event ${post.eventId}`);
                }

                postsProcessed += 1;

                if (postsProcessed === posts.length) {
                    console.log('Done!');
                }
            });

        }

    })
}


/**
 * Deletes event posts that belongs to a non existing event.
 */
function deleteOrphanPosts() {

    let postsProcessed = 0;
    let allPosts = EventPost.find().exec();

    allPosts.then(posts => {

        for (let post of posts) {

            let event = Event.findById(post.eventId).exec();

            event.then(event => {
                if (!event) {
                    post.remove().then(() => {
                        postsProcessed += 1;

                        if (postsProcessed === posts.length) {
                            console.log('Done!');
                        }
                    });
                } else {
                    postsProcessed += 1;
                }
            });

        }

    })
}

module.exports = {
    findEvents,
    deleteEvents,
    findOrphanPosts,
    deleteOrphanPosts,
};