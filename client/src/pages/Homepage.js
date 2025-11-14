import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Homepage = () => {
  const { token } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            💰 Personal Expense Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-Powered Expense Management Made Simple
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Parsing</h3>
            <p className="text-gray-600">
              Just type naturally like "200 dosa idly" and our AI will understand
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
            <p className="text-gray-600">
              Get insights with daily summaries and category breakdowns
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
            <p className="text-gray-600">
              One input box, instant parsing, automatic categorization
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Example Inputs
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto mb-8">
            <div className="space-y-2 text-left">
              <div className="p-3 bg-gray-50 rounded">200 dosa idly</div>
              <div className="p-3 bg-gray-50 rounded">50 chai and 30 bus</div>
              <div className="p-3 bg-gray-50 rounded">paid 1200 to milk vendor</div>
              <div className="p-3 bg-gray-50 rounded">income 500 saree sale</div>
            </div>
          </div>

          {token ? (
            <Link
              to="/dashboard"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
            >
              Go to Dashboard →
            </Link>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

