const jsonfile = require('jsonfile');
const mongoose = require('mongoose');

const mongoUrl = jsonfile.readFileSync('./credentials.json').mongoUrl;

console.log(mongoUrl);
