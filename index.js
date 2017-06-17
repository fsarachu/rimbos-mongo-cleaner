require('dotenv').config();
const findOrphanComments = require('./functions').findOrphanComments;

findOrphanComments();