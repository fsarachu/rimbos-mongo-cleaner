// Load environment variables from .env
require('dotenv').config();

// Import stuff
const mongoose = require('mongoose');
const Event = require('./models/Event');

// Connect to DB
mongoose.connect(process.env.DB_URL);

// List all events
Event.find({}, (err, events) => {
    if(err) {
        console.error(err);
    }

    for(let event of events) {
        console.log(`${event._id}: ${event.code}`);
    }
});