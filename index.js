// Import stuff
require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/event');

// Connect to DB
mongoose.connect(process.env.DB_URL);

// Set mongoose promises to native promises
mongoose.Promise = global.Promise;

// Find documents with extra fields
let schemaFields = Object.keys(Event.schema.paths);
let findEvents = Event.find().exec();

findEvents.then(events => {

    let dirtyDocs = [];

    for (let event of events) {

        let actualFields = Object.keys(event._doc);
        let extraFields = [];

        for (let actualField of actualFields) {

            let isExtraField = true;

            for (let schemaField of schemaFields) {
                if (actualField === schemaField) {
                    isExtraField = false;
                    break;
                }
            }

            if (isExtraField) {
                extraFields.push(actualField);
            }
        }

        if (extraFields.length !== 0) {
            dirtyDocs.push({
                id: String(event._id),
                extraFields,
            });
        }

    }

    console.dir(dirtyDocs);

});