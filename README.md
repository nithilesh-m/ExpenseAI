# Personal Expense Tracker (AI-Powered)

A full-stack MERN application that allows users to track expenses using natural language input, powered by Google's Gemini AI.

## Features

- 🤖 **AI-Powered Parsing**: Type expenses naturally like "200 dosa idly" and the AI will parse it
- 📊 **Smart Analytics**: Daily summaries, monthly totals, and category breakdowns
- 🔐 **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- ⚡ **Quick Entry**: Single input box for fast expense entry
- 📱 **Responsive Design**: Beautiful UI built with Tailwind CSS

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI**: Google Gemini API
- **Auth**: JWT, BCrypt

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Google Gemini API key

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install server dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**:

   Create a `.env` file in the `server` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   MONGO_URL=your_mongodb_compass_connection_string_here
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

   Optionally, create a `.env` file in the `client` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the backend server**:
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend** (in a new terminal):
   ```bash
   cd client
   npm start
   ```
   The app will open in your browser at `http://localhost:3000`

## Usage

1. **Sign Up**: Create a new account with your name, email, and password
2. **Login**: Use your credentials to access the dashboard
3. **Add Expenses**: Type expenses naturally in the input box:
   - `200 dosa idly`
   - `50 chai and 30 bus`
   - `paid 1200 to milk vendor`
   - `income 500 saree sale`
4. **View Analytics**: Check daily totals, monthly summaries, and category breakdowns
5. **Filter**: Use the category filter to view expenses by category

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Expenses
- `POST /api/expense/add` - Add a new expense (requires auth)
- `GET /api/expense/all` - Get all expenses (requires auth)
- `GET /api/expense/summary` - Get expense summary (requires auth)

## Project Structure

```
ExpenseAI/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Homepage.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Dashboard.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/
│   ├── controllers/
│   ├── routes/
│   │   ├── auth.js
│   │   └── expense.js
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── middleware/
│   │   └── auth.js
│   ├── services/
│   │   └── geminiService.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Notes

- Make sure MongoDB is running before starting the server
- The Gemini API key must be valid and have access to the `gemini-1.5-flash` model
- JWT tokens expire after 7 days
- All expense routes require authentication

