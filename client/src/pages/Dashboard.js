import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_URL from '../config/api';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [expenseText, setExpenseText] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    todayTotal: 0,
    monthTotal: 0,
    categoryBreakdown: {}
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/expense/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }, [token]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/expense/summary`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchExpenses();
      fetchSummary();
    }
  }, [token, fetchExpenses, fetchSummary]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expenseText.trim()) return;

    setLoading(true);
    setError('');

    try {
      await axios.post(
        `${API_URL}/expense/add`,
        { text: expenseText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExpenseText('');
      await fetchExpenses();
      await fetchSummary();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter(exp => exp.category === selectedCategory);

  const categories = ['All', ...Object.keys(summary.categoryBreakdown)];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            💰 Expense Tracker
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Input Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Add Expense (Type naturally like WhatsApp)
          </h2>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={expenseText}
              onChange={(e) => setExpenseText(e.target.value)}
              placeholder="e.g., 200 dosa idly or income 500 saree sale"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !expenseText.trim()}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </form>
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">Today's Total</h3>
            <p className="text-3xl font-bold text-indigo-600">
              ₹{summary.todayTotal.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">This Month</h3>
            <p className="text-3xl font-bold text-indigo-600">
              ₹{summary.monthTotal.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 mb-2">Total Entries</h3>
            <p className="text-3xl font-bold text-indigo-600">
              {expenses.length}
            </p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Category Breakdown
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(summary.categoryBreakdown).map(([category, data]) => (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">{category}</h3>
                <p className="text-red-600">Expenses: ₹{data.expense.toFixed(2)}</p>
                {data.income > 0 && (
                  <p className="text-green-600">Income: ₹{data.income.toFixed(2)}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Filter by Category:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Expense List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Recent Expenses
          </h2>
          {filteredExpenses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No expenses found. Start adding expenses above!
            </p>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map((expense) => (
                <div
                  key={expense._id}
                  className={`border-l-4 p-4 rounded ${
                    expense.type === 'income'
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800">
                          ₹{expense.amount.toFixed(2)}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            expense.type === 'income'
                              ? 'bg-green-200 text-green-800'
                              : 'bg-red-200 text-red-800'
                          }`}
                        >
                          {expense.type}
                        </span>
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                          {expense.category}
                        </span>
                      </div>
                      {expense.items.length > 0 && (
                        <p className="text-sm text-gray-600 mb-1">
                          Items: {expense.items.join(', ')}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 italic">
                        "{expense.rawText}"
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(expense.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

