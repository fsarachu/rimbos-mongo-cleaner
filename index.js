// Import stuff
require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/event');
const findDocumentsWithExtraFields = require('./functions').findDocumentsWithExtraFields(Event);

// Connect to DB
mongoose.connect(process.env.DB_URL);

// Set mongoose promises to native promises
mongoose.Promise = global.Promise;

// Find documents with extra fields
findDocumentsWithExtraFields.then((docs) => {
    console.dir(docs);
});