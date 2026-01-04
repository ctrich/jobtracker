# Quick Start Guide - Job Tracker

## What You Have

A complete full-stack job tracking application with:
- ✅ Backend API (Node.js + Express + PostgreSQL + Prisma)
- ✅ Frontend (React + Vite)
- ✅ Authentication system (Passport + JWT)
- ✅ MVC architecture
- ✅ Complete database schema
- ✅ Dashboard with stats
- ✅ Application CRUD operations

## First Steps

### 1. Set Up PostgreSQL Database

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL if you haven't
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql

# Create database
createdb jobtracker
```

**Option B: Use Render (Free)**
1. Go to https://render.com
2. Sign up/login
3. Click "New +" → "PostgreSQL"
4. Name it "job-tracker-db"
5. Copy the "Internal Database URL"

### 2. Backend Setup

```bash
# Navigate to backend
cd job-tracker/backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your database URL
# DATABASE_URL="postgresql://username:password@localhost:5432/jobtracker?schema=public"
# Or use the Render URL you copied

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start the server
npm run dev
```

Backend will run at: http://localhost:5000

### 3. Frontend Setup

Open a NEW terminal:

```bash
# Navigate to frontend
cd job-tracker/frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Frontend will run at: http://localhost:5173

### 4. Test It Out!

1. Open http://localhost:5173 in your browser
2. Click "Register here" to create an account
3. Fill in your details and register
4. You'll be logged in automatically and see the dashboard!

## What Works Right Now

✅ User registration
✅ User login
✅ Protected routes (requires authentication)
✅ Dashboard with stats
✅ View applications list (empty at first)
✅ Logout functionality

## What to Build Next

The foundation is solid! Here's what's ready to add:

1. **Add Application Modal/Form**
   - Create a modal component
   - Form to add new applications
   - Wire up to the existing API

2. **Edit/View Application**
   - Click on an application to view details
   - Edit application information

3. **Contacts Management**
   - Add controllers/services (same pattern as applications)
   - Create UI pages

4. **Documents Upload**
   - Add Multer configuration
   - Create upload endpoints
   - Build upload UI

5. **Interview Scheduling**
   - Calendar component
   - Interview form
   - Link to applications

## Database Management

View your database with Prisma Studio:
```bash
cd backend
npx prisma studio
```

This opens a GUI at http://localhost:5555 to view/edit data.

## Git Setup

```bash
cd job-tracker

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - Job Tracker app"

# Create GitHub repo and push
# (Create repo on GitHub first, then:)
git remote add origin https://github.com/yourusername/job-tracker.git
git branch -M main
git push -u origin main
```

## Deployment (When Ready)

### Deploy to Render

1. **Database**: Already created (if you used Render for DB)

2. **Backend**:
   - New Web Service
   - Connect GitHub repo
   - Root directory: `backend`
   - Build command: `npm install && npx prisma generate`
   - Start command: `npm start`
   - Add environment variables (DATABASE_URL, JWT_SECRET)

3. **Frontend**:
   - New Static Site
   - Connect GitHub repo
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variable: VITE_API_URL (your backend URL)

## Troubleshooting

**Database connection fails:**
- Check your DATABASE_URL in .env
- Make sure PostgreSQL is running
- Verify database exists

**Port already in use:**
- Backend: Change PORT in .env
- Frontend: Change port in vite.config.js

**CORS errors:**
- Make sure FRONTEND_URL in backend .env matches your frontend URL

## Need Help?

The code is well-structured with comments. Key files to look at:
- `backend/src/routes/` - All API endpoints
- `backend/src/controllers/` - Request handlers
- `backend/src/services/` - Business logic
- `frontend/src/pages/` - UI pages
- `frontend/src/services/api.js` - API calls

Happy coding! 🚀
