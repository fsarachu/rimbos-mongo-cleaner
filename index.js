// Load environment variables from .env
require('dotenv').config();

// Import stuff
const mongoose = require('mongoose');
const jsonfile = require('jsonfile');
const Event = require('./models/event');
const EventPost = require('./models/eventPost');
const PostComment = require('./models/postComment');

// Connect to DB
mongoose.connect(process.env.DB_URL);

// Events to find
const eventIds = jsonfile.readFileSync('toRemove.json');

// Find events
// findEvents(eventIds.map(id => mongoose.Types.ObjectId(id)));
deleteEvents(eventIds.map(id => mongoose.Types.ObjectId(id)));


/**
 * Find the requested events and their associated content.
 * @param {ObjectId[]} eventIds - An array of events ObjectId's.
 */
function findEvents(eventIds) {
    Event.find({_id: {$in: eventIds}}, (err, events) => {
        if (err) {
            console.error(err);
        }

        console.log(`--- ${events.length} Events Found ---`);

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
            console.error(err);
        }

        console.log(`--- ${posts.length} Posts Found ---`);

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
            console.error(err);
        }

        console.log(`--- ${comments.length} Comments Found ---`);
    });
}


/**
 * Deletes the requested events and their associated content.
 * @param {ObjectId[]} eventIds - An array of events ObjectId's.
 */
function deleteEvents(eventIds) {
    deleteEventPosts(eventIds);

    Event.deleteMany({_id: {$in: eventIds}}, (err, {result}) => {
        if (err) {
            console.error(err);
        }

        console.log(`--- ${result.n} Events Deleted ---`);
    });
}


/**
 * Deletes all posts belonging to any of the specified events.
 * @param {ObjectId[]} eventIds - An array of events ObjectId's.
 */
function deleteEventPosts(eventIds) {
    EventPost.find({eventId: {$in: eventIds}}, (err, posts) => {
        if (err) {
            console.error(err);
        }

        deletePostComments(posts.map(p => mongoose.Types.ObjectId(p._id)))
    });

    EventPost.deleteMany({eventId: {$in: eventIds}}, (err, {result}) => {
        if (err) {
            console.error(err);
        }

        console.log(`--- ${result.n} Posts Deleted ---`);
    });
}


/**
 * Deletes all comments belonging to any of the specified event posts.
 * @param {ObjectId[]} postIds - An array of event post ObjectId's.
 */
function deletePostComments(postIds) {
    PostComment.deleteMany({eventPostId: {$in: postIds}}, (err, {result}) => {
        if (err) {
            console.error(err);
        }

        console.log(`--- ${result.n} Comments Deleted ---`);
    });
}