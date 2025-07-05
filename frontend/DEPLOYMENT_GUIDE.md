# 🚀 Tourist Project - Vercel Deployment Guide

## 📋 Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com/
2. **GitHub Account**: For hosting your code
3. **Vercel CLI**: Already installed globally

## 🎯 Deployment Steps

### Step 1: Deploy Backend First

1. **Navigate to Backend folder**:
   ```bash
   cd Backend
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```
   Follow the browser authentication.

3. **Deploy Backend**:
   ```bash
   vercel --prod
   ```
   
   During setup:
   - Project name: `tourist-project-backend`
   - Framework: `Other`
   - Build command: (leave empty)
   - Output directory: (leave empty)

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project dashboard
   - Navigate to Settings → Environment Variables
   - Add these variables:
   ```
   MONGODB_URI = mongodb+srv://admin:jKP6i8Lulyo4xpuT@cluster0.oojhj.mongodb.net/tourist_project?retryWrites=true&w=majority
   JWT_SECRET = PES2UG23CS363_ENHANCED_SECRET_KEY_FOR_PRODUCTION
   REFRESH_TOKEN_SECRET = REFRESH_SECRET_KEY_FOR_PRODUCTION_USE
   JWT_EXPIRE = 24h
   REFRESH_TOKEN_EXPIRE = 7d
   BCRYPT_ROUNDS = 12
   NODE_ENV = production
   ```

5. **Note your backend URL**: Something like `https://tourist-project-backend.vercel.app`

### Step 2: Deploy Frontend

1. **Navigate to Frontend folder**:
   ```bash
   cd ../frontend
   ```

2. **Update production environment**:
   Edit `.env.production` and replace with your actual backend URL:
   ```
   REACT_APP_API_URL=https://your-actual-backend-url.vercel.app
   REACT_APP_ENVIRONMENT=production
   ```

3. **Deploy Frontend**:
   ```bash
   vercel --prod
   ```
   
   During setup:
   - Project name: `tourist-project-frontend`
   - Framework: `Create React App`
   - Build command: `npm run build`
   - Output directory: `build`

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your frontend project dashboard
   - Navigate to Settings → Environment Variables
   - Add:
   ```
   REACT_APP_API_URL = https://your-backend-url.vercel.app
   REACT_APP_ENVIRONMENT = production
   ```

### Step 3: Configure CORS for Production

Update your backend's CORS settings to include your frontend URL:

1. Go to backend project on Vercel
2. Edit the `server.js` CORS configuration to include your frontend URL
3. Redeploy backend

## 🛠️ Alternative: GitHub Integration

### Option A: Deploy via GitHub (Recommended)

1. **Create GitHub repositories**:
   ```bash
   # Initialize git in both folders
   cd Backend
   git init
   git add .
   git commit -m "Initial backend commit"
   
   cd ../frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   ```

2. **Create repositories on GitHub**:
   - Create `tourist-project-backend` repository
   - Create `tourist-project-frontend` repository

3. **Push to GitHub**:
   ```bash
   # For backend
   git remote add origin https://github.com/yourusername/tourist-project-backend.git
   git push -u origin main
   
   # For frontend
   git remote add origin https://github.com/yourusername/tourist-project-frontend.git
   git push -u origin main
   ```

4. **Import to Vercel**:
   - Go to Vercel dashboard
   - Click "New Project"
   - Import from GitHub
   - Deploy both repositories

## 🔧 Environment Variables Summary

### Backend Environment Variables:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
JWT_EXPIRE=24h
REFRESH_TOKEN_EXPIRE=7d
BCRYPT_ROUNDS=12
NODE_ENV=production
```

### Frontend Environment Variables:
```
REACT_APP_API_URL=https://your-backend-url.vercel.app
REACT_APP_ENVIRONMENT=production
```

## 🎯 Expected URLs

After deployment:
- **Backend**: `https://tourist-project-backend-xxx.vercel.app`
- **Frontend**: `https://tourist-project-frontend-xxx.vercel.app`

## ✅ Testing Deployment

1. **Test Backend API**:
   Visit: `https://your-backend-url.vercel.app/places`
   Should return JSON data.

2. **Test Frontend**:
   Visit: `https://your-frontend-url.vercel.app`
   Should show your tourist application.

## 🚨 Common Issues & Solutions

### Issue: CORS Error
**Solution**: Add your frontend URL to backend CORS configuration

### Issue: Environment Variables Not Working
**Solution**: Restart deployment after adding env vars

### Issue: Build Fails
**Solution**: Check build logs and fix dependency issues

### Issue: 404 Errors
**Solution**: Check file paths and routes configuration

## 🎉 Success!

Your Tourist Project should now be live on:
- **Frontend**: Your Vercel frontend URL
- **Backend**: Your Vercel backend URL
- **Database**: MongoDB Atlas (cloud)

## 🔄 Future Updates

To update your deployment:
```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push

# Or use Vercel CLI
vercel --prod
```

Vercel will automatically redeploy when you push to GitHub!
