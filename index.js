// Load environment variables from .env
require('dotenv').config();

// Import stuff
const mongoose = require('mongoose');
const Event = require('./models/event');

// Connect to DB
mongoose.connect(process.env.DB_URL);

// Events to find
const eventIds = [
    '5751a55c71e57bd35090569c',
    '5797b18d85f1fcf29da6d234',
    '5797df439e8ba10f0086d964',
    '57acbdf4b69e21e362bd2c5c',
    '57c87dfddcba0f63c1cfd961',
    '57fd1bb7d8a7f2da3ed553bf',
];

// Find events
findEvents(eventIds.map(id => mongoose.Types.ObjectId(id)));

/**
 * Find the requested event documents.
 * @param {ObjectId[]} eventIds - An array of events ObjectId's.
 */
function findEvents(eventIds) {
    Event.find({_id: {$in: eventIds}}, (err, events) => {
        if (err) {
            console.error(err);
        }

        for (let event of events) {
            console.log(`Event: ${event.code} (${event.name})`);
        }
    });
}