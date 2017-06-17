require('dotenv').config();
const findOrphanPosts = require('./functions').findOrphanPosts;

findOrphanPosts();