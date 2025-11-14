const express = require('express');
const Expense = require('../models/Expense');
const { parseExpenseText } = require('../services/geminiService');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// All expense routes require authentication
router.use(authMiddleware);

// Add expense
router.post('/add', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Please provide expense text' });
    }

    // Parse text using Gemini
    const parsedData = await parseExpenseText(text.trim());

    // Create expense
    const expense = new Expense({
      userId: req.user._id,
      type: parsedData.type,
      amount: parsedData.amount,
      items: parsedData.items,
      category: parsedData.category,
      rawText: text.trim(),
      timestamp: parsedData.timestamp
    });

    await expense.save();

    res.status(201).json({
      message: 'Expense added successfully',
      expense
    });
  } catch (error) {
    console.error('Add expense error:', error);
    console.error('Error stack:', error.stack);
    const statusCode = error.message.includes('API key') || error.message.includes('Gemini') ? 400 : 500;
    res.status(statusCode).json({ 
      message: error.message || 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get all expenses
router.get('/all', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(100);

    res.json({ expenses });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get summary
router.get('/summary', async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get all expenses
    const allExpenses = await Expense.find({ userId });

    // Today's expenses
    const todayExpenses = allExpenses.filter(
      exp => new Date(exp.timestamp) >= startOfDay
    );

    // This month's expenses
    const monthExpenses = allExpenses.filter(
      exp => new Date(exp.timestamp) >= startOfMonth
    );

    // Calculate totals
    const todayTotal = todayExpenses.reduce((sum, exp) => {
      return sum + (exp.type === 'expense' ? exp.amount : -exp.amount);
    }, 0);

    const monthTotal = monthExpenses.reduce((sum, exp) => {
      return sum + (exp.type === 'expense' ? exp.amount : -exp.amount);
    }, 0);

    // Category breakdown
    const categoryBreakdown = {};
    allExpenses.forEach(exp => {
      if (!categoryBreakdown[exp.category]) {
        categoryBreakdown[exp.category] = { expense: 0, income: 0 };
      }
      if (exp.type === 'expense') {
        categoryBreakdown[exp.category].expense += exp.amount;
      } else {
        categoryBreakdown[exp.category].income += exp.amount;
      }
    });

    res.json({
      todayTotal: Math.abs(todayTotal),
      monthTotal: Math.abs(monthTotal),
      categoryBreakdown,
      todayExpenseCount: todayExpenses.length,
      monthExpenseCount: monthExpenses.length
    });
  } catch (error) {
    console.error('Get summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

