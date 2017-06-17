require('dotenv').config();
const deleteOrphanComments = require('./functions').deleteOrphanComments;

deleteOrphanComments();