const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    eventId: mongoose.Schema.Types.ObjectId,
    type: String,
    text: String,
    mediaUrl: String,
    triggerDate: String,
    triggerTime: String,
    archived: Boolean,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Notification', notificationSchema, 'notifications');