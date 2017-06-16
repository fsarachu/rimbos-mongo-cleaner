// Load environment variables from .env
require('dotenv').config();

// Import stuff
const mongoose = require('mongoose');
const findEvents = require('./functions').findEvents;

// Connect to DB
mongoose.connect(process.env.DB_URL);

// Events to find
const eventIds = ['582ef676d8a7f2da3ed554eb'];

// Find events
findEvents(eventIds.map(id => mongoose.Types.ObjectId(id)));
