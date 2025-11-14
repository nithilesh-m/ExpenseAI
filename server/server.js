const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Verify environment variables on startup
if (!process.env.GEMINI_API_KEY) {
  console.error('⚠️  WARNING: GEMINI_API_KEY is not set!');
  console.error('   Please create a .env file in the server directory.');
} else {
  console.log('✅ GEMINI_API_KEY is configured');
}

if (!process.env.MONGO_URL) {
  console.error('⚠️  WARNING: MONGO_URL is not set!');
} else {
  console.log('✅ MONGO_URL is configured');
}

if (!process.env.JWT_SECRET) {
  console.error('⚠️  WARNING: JWT_SECRET is not set!');
} else {
  console.log('✅ JWT_SECRET is configured');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expense', require('./routes/expense'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

