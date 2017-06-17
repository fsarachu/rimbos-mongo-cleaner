require('dotenv').config();
const deleteOrphanPosts = require('./functions').deleteOrphanPosts;

deleteOrphanPosts();