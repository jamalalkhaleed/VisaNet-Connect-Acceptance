const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    cardNumber: String,
    amount: Number,
    status: String
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);