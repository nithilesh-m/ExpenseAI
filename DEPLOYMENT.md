# Deployment Guide

## Backend (Render) - Already Deployed ✅
- URL: `https://expenseai-a06a.onrender.com`
- Status: Running

## Frontend (Vercel) - Deployment Steps

### 1. Environment Variables Setup

In Vercel Dashboard → Your Project → Settings → Environment Variables:

Add this variable:
```
REACT_APP_API_URL=https://expenseai-a06a.onrender.com/api
```

**Important Notes:**
- The value should be `https://expenseai-a06a.onrender.com/api` (with `/api` at the end)
- This is because the frontend code appends paths like `/auth/login` to the base URL
- After adding, redeploy your frontend

### 2. Deploy to Vercel

**Option A: Via Vercel CLI**
```bash
cd client
npm install -g vercel
vercel
```

**Option B: Via GitHub (Recommended)**
1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Set root directory to `client`
5. Add environment variable: `REACT_APP_API_URL=https://expenseai-a06a.onrender.com/api`
6. Deploy

### 3. Testing Checklist

After deployment, test these scenarios:

#### Desktop Testing
- [ ] Sign up with new account
- [ ] Login with existing account
- [ ] Add expense: "200 dosa idly"
- [ ] Add expense: "income 500 sale"
- [ ] View expense list
- [ ] Check daily summary
- [ ] Check monthly summary
- [ ] Filter by category
- [ ] Logout

#### Mobile Testing
- [ ] Open app on mobile browser (Chrome/Safari)
- [ ] Test all above features on mobile
- [ ] Check responsive design
- [ ] Test on slow network (3G simulation)

#### Incognito/New Session
- [ ] Open in incognito mode
- [ ] Sign up new account
- [ ] Test all features

#### Network Testing
- [ ] Test on slow network (Chrome DevTools → Network → Slow 3G)
- [ ] Test on Jio network conditions (if possible)
- [ ] Verify CORS works (no CORS errors in console)

### 4. Common Issues & Fixes

#### Issue: CORS Error
**Solution:** Backend CORS is already configured. If you see CORS errors:
- Check that backend is running
- Verify `REACT_APP_API_URL` is set correctly
- Clear browser cache

#### Issue: 404 on API calls
**Solution:** Make sure `REACT_APP_API_URL` includes `/api`:
- ✅ Correct: `https://expenseai-a06a.onrender.com/api`
- ❌ Wrong: `https://expenseai-a06a.onrender.com`

#### Issue: Authentication fails
**Solution:** 
- Check JWT_SECRET is set in Render backend
- Verify token is being sent in headers
- Check browser console for errors

### 5. Backend Health Check

Test backend is running:
```bash
curl https://expenseai-a06a.onrender.com/
```

Should return:
```json
{
  "status": "OK",
  "message": "Backend is running 🚀",
  "timestamp": "..."
}
```

### 6. API Endpoints

All endpoints are prefixed with `/api`:

- `POST /api/auth/signup` - Sign up
- `POST /api/auth/login` - Login
- `POST /api/expense/add` - Add expense (requires auth)
- `GET /api/expense/all` - Get all expenses (requires auth)
- `GET /api/expense/summary` - Get summary (requires auth)
- `GET /api/health` - Health check
- `GET /` - Root health check

### 7. Mobile Browser Compatibility

The backend CORS is configured to work with:
- ✅ Chrome Mobile
- ✅ Safari Mobile
- ✅ Firefox Mobile
- ✅ Samsung Internet
- ✅ Opera Mobile

All preflight OPTIONS requests are handled automatically.

### 8. Production Checklist

Before going live:
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Health check working
- [ ] All endpoints tested
- [ ] Mobile tested
- [ ] Error handling working
- [ ] Loading states working

## Support

If you encounter issues:
1. Check browser console for errors
2. Check network tab for failed requests
3. Check Render logs for backend errors
4. Verify environment variables are set correctly

