const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['expense', 'income'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  items: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: true,
    default: 'Other'
  },
  rawText: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
expenseSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('Expense', expenseSchema);

