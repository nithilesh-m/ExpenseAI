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

// CORS Configuration - Production Ready (Mobile & Desktop Support)
const corsOptions = {
  origin: '*', // Allow all origins (for production, you can restrict to your Vercel domain)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false, // Set to true if you need cookies
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests (important for mobile browsers)
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root health check endpoint (Render requirement)
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend is running 🚀',
    timestamp: new Date().toISOString()
  });
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expense', require('./routes/expense'));

// Error handling middleware (must be after routes)
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err);
  console.error('Error Stack:', err.stack);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(isDevelopment && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/`);
      console.log(`📍 API base: http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

