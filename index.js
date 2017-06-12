// Load environment variables from .env
require('dotenv').config();

// Import stuff
const mongoose = require('mongoose');
const jsonfile = require('jsonfile');
const Event = require('./models/event');
const EventPost = require('./models/eventPost');

// Connect to DB
mongoose.connect(process.env.DB_URL);

// Events to find
const eventIds = jsonfile.readFileSync('toRemove.json');

// Find events
findEvents(eventIds.map(id => mongoose.Types.ObjectId(id)));

/**
 * Find the requested events and their associated content.
 * @param {ObjectId[]} eventIds - An array of events ObjectId's.
 */
function findEvents(eventIds) {
    Event.find({_id: {$in: eventIds}}, (err, events) => {
        if (err) {
            console.error(err);
        }

        console.log(`-- ${events.length} Events Found --`);

        for (let event of events) {
            console.log(`Event: ${event.code} (${event.name})`);
        }

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

        console.log(`  -- ${posts.length} Posts Found --`);

        for (let post of posts) {
            console.log(`  Post: ${post._id} - ${post.mediaUrl}`);
        }

    });
}