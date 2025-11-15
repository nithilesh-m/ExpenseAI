// Centralized API configuration
// This will use REACT_APP_API_URL from environment variables
// For Vercel deployment, set REACT_APP_API_URL=https://expenseai-a06a.onrender.com/api
// For local development, it defaults to http://localhost:5000/api
// 
// IMPORTANT: The URL should end with /api since we append paths like /auth/login

const getApiUrl = () => {
  const envUrl = process.env.REACT_APP_API_URL;
  
  // If REACT_APP_API_URL is set, use it (should include /api)
  if (envUrl) {
    // Ensure it ends with /api
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
  }
  
  // Default to localhost for development
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiUrl();

// Log API URL in development (helps with debugging)
if (process.env.NODE_ENV === 'development') {
  console.log('🔗 API Base URL:', API_BASE_URL);
}

export default API_BASE_URL;
