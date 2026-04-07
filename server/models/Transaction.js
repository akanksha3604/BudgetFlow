const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    default: "Checking"
  },
  date: {
    type: String, // Storing as string YYYY-MM-DD for simplicity, could also be Date
    required: true,
  },
  notes: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    default: 'expense'
  }
}, {
  timestamps: true // adds createdAt, updatedAt
});

module.exports = mongoose.model('Transaction', transactionSchema);
