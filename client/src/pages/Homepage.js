import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Homepage = () => {
  const { token } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            ⭐ ExpenseAI
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Track Your Expenses on a Chat
            </span>
            <span className="text-5xl">⚡</span>
          </h1>
          
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            Smart. Fast. Simple. Powered by AI.
          </p>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Typing <span className="font-mono bg-gray-100 px-2 py-1 rounded">"Amount spent - item"</span> is enough.
            <br />
            Type your expenses in plain English. No forms. No categories. Just type.
            <br />
            Our AI converts it into structured data — amount, items, category — and shows it in your dashboard instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {token ? (
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-xl transform hover:scale-105"
              >
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-xl transform hover:scale-105"
                >
                  Sign Up Now
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition shadow-lg"
                >
                  Login
                </Link>
              </>
            )}
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            🚀 Why ExpenseAI?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Track expenses the way you talk</h3>
              <p className="text-gray-700 mb-4">
                Just type naturally:
              </p>
              <div className="space-y-2">
                <div className="p-2 bg-white rounded font-mono text-sm">"50 breakfast"</div>
                <div className="p-2 bg-white rounded font-mono text-sm">"200 petrol"</div>
                <div className="p-2 bg-white rounded font-mono text-sm">"500 rent"</div>
              </div>
              <p className="text-gray-600 mt-3">AI understands it all.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Smart Categorization</h3>
              <p className="text-gray-700 mb-4">
                Automatically organizes your expenses into:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold">Food</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold">Travel</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold">Shopping</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold">Bills</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold">Income</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold">Other</span>
              </div>
              <p className="text-gray-600 mt-3">No dropdowns. No forms.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Weekly and Monthly Insights</h3>
              <p className="text-gray-700 mb-4">
                Get a clean overview of:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Total spent this month
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Total income
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Category-wise breakdown
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Daily spending graph
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Top spending categories
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ultra-Fast, Minimal UI & Secure</h3>
              <p className="text-gray-700 mb-4">
                Focused on simplicity:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Single input box
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> One-click add
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Clean dashboard
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> No clutter
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Only you can access your history, We never sell or share your data.
                </li>
              </ul>
              <p className="text-gray-600 mt-3">Perfect for students, families, and small businesses.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">🎤</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Add expenses by simply speaking.</h3>
              <p className="text-gray-700">
                Voice-Powered Expense Input.
                <br />
                Typing is optional now.
                <br />
                Hands-free tracking.
                <br />
                Perfect for quick entries.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Students & Families</h3>
              <p className="text-gray-700 mb-4">Keep track of:</p>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Food spending</li>
                <li>• Shopping</li>
                <li>• Movie outings</li>
                <li>• Online orders</li>
                <li>• Rent & bills</li>
                <li>• Pocket money</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              📊 Visual Charts & Reports <span className="text-2xl text-gray-500">(Coming soon)</span>
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <p className="text-lg text-gray-700 mb-6">
                See your financial habits clearly:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <span className="font-semibold">✓</span> Daily spending chart
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <span className="font-semibold">✓</span> Category pie chart
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <span className="font-semibold">✓</span> Month-wise comparison
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <span className="font-semibold">✓</span> Smart insights
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              🏪 For Small Businesses <span className="text-2xl text-gray-500">(Coming Soon)</span>
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <p className="text-lg text-gray-700 mb-6">
                Automated tracking for:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold">✓</span> Daily sales
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold">✓</span> Expenses
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold">✓</span> Vendor payments
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold">✓</span> Stock purchases
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold">✓</span> Profit reports
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold">✓</span> AI-powered accounting
                </div>
              </div>
              <p className="text-gray-600 mt-6 text-center">
                AI-powered accounting for small shops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            🎯 Start Today — It's Free!
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Get insights into your money in just 10 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {token ? (
              <Link
                to="/dashboard"
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition shadow-xl transform hover:scale-105"
              >
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition shadow-xl transform hover:scale-105"
                >
                  👉 Sign Up Now
                </Link>
              </>
            )}
          </div>
          <p className="text-indigo-100 mt-8 text-lg italic">
            Let AI handle your expenses,<br />
            so you can handle your life.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 ExpenseAI. Made with ❤️ by Nithilesh Muchakurthi for smart expense tracking.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
