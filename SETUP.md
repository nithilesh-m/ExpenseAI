# Quick Setup Guide

## Fixing the 500 Error

If you're getting a 500 error when adding expenses, follow these steps:

### 1. Check Your .env File

Make sure you have a `.env` file in the `server` directory with:

```env
GEMINI_API_KEY=your_actual_api_key_here
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=any_random_secret_string
PORT=5000
```

**Important:** 
- The `.env` file should be in the `server` folder (not the root)
- Make sure there are NO spaces around the `=` sign
- Make sure there are NO quotes around the values (unless the value itself contains spaces)

### 2. Verify Your API Key

Your Gemini API key should look like: `AIzaSy...` (starts with AIza)

To get your API key:
1. Go to https://aistudio.google.com/
2. Click on "API Keys" in the left sidebar
3. Copy your API key
4. Paste it in the `.env` file

### 3. Restart Your Server

After updating the `.env` file:
1. Stop your server (Ctrl+C in the terminal)
2. Restart it: `cd server && npm start`

### 4. Check Server Logs

When you try to add an expense, check your server terminal. You should see:
- `Trying model: gemini-1.5-flash-latest` (or similar)
- If successful: `Successfully used model: ...`
- If failed: Detailed error messages

### 5. Common Issues

**Issue: "GEMINI_API_KEY is not set"**
- Solution: Make sure `.env` file exists in the `server` folder
- Make sure the file is named exactly `.env` (not `.env.txt`)

**Issue: "404 Not Found" or "model not found"**
- Solution: Your API key might not have access to the models
- Try creating a new API key in Google AI Studio
- Make sure you're using the correct API key (not a restricted key)

**Issue: "Invalid or unauthorized"**
- Solution: Check that your API key is correct
- Make sure there are no extra spaces or characters
- Try regenerating the API key

### 6. Test the API Key

You can test if your API key works by running this in Node.js:

```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('YOUR_API_KEY_HERE');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
model.generateContent('Hello').then(console.log);
```

If this works, your API key is valid!

