// Import stuff
require('dotenv').config();
const mongoose = require('mongoose');
const Model = require('./models/eventPost');
const upgradeUrlsToHttps = require('./functions').upgradeUrlsToHttps;

// Connect to DB
mongoose.connect(process.env.DB_URL);

// Set mongoose promises to native promises
mongoose.Promise = global.Promise;

// Update "http://" urls to "https://"
let urlField = 'mediaUrl';

upgradeUrlsToHttps(Model, urlField).then((updateResults) => {
    console.log(`Updated ${updateResults.length} documents`);
    process.exit();
});