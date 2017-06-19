const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    email: String,
    description: String,
    resultType: String,
    response: String,
    amount: Number,
    stripeId: String,
    last4Digits: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Transaction', transactionSchema, 'transactions');