// Import stuff
require('dotenv').config();
const mongoose = require('mongoose');
const Model = require('./models/event');
const findDocsWithExtraFields = require('./functions').findDocsWithExtraFields;
const normalizeDocsWithExtraFields = require('./functions').normalizeDocsWithExtraFields;

// Connect to DB
mongoose.connect(process.env.DB_URL);

// Set mongoose promises to native promises
mongoose.Promise = global.Promise;

// Find documents with extra fields
// findDocsWithExtraFields(Model).then((docs) => {
//
//     for (let doc of docs) {
//
//         let extraFieldsString = '';
//
//         doc.extraFields.forEach((field, index, arr) => {
//             extraFieldsString += `${field}${(index === arr.length - 1) ? '' : ', '}`;
//         });
//
//         console.log(`${doc.model._id}: ${extraFieldsString}.`);
//
//     }
//
//     console.log(`\n> Found ${docs.length} documents with extra fields.`);
//     process.exit();
// });

normalizeDocsWithExtraFields(Model).then(() => console.log('> Documents normalized'));