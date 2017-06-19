const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    fistname: String, // Typo!
    lastname: String,
    email: String,
    userRelationship: String,
    facebookId: Number,
    profilePicture: String,
    gender: String,
    ageRange: String,
    archived: Boolean,
    role: String,
    facebookSessionToken: String,
    facebookExpirationTime: Number,
    facebookLastTimeRefreshed: Number,
    sessionToken: String,
    eventsUsed: Number,
    eventsAvailable: Number,
    phone: String,
    organizationName: String,
    category: String,
    country: mongoose.Schema.Types.ObjectId,
    sections: [mongoose.Schema.Types.ObjectId],
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('User', userSchema, 'users');