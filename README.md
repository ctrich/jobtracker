# Job Tracker

A full-stack web application to help job seekers track their job applications, interviews, contacts, and documents all in one place.

## Features

- 🔐 User authentication (register/login with JWT)
- 📊 Dashboard with application statistics
- 📝 Track job applications with multiple statuses
- 👥 Manage contacts (recruiters, hiring managers, referrals)
- 📄 Document management (resumes, cover letters)
- 💬 Email templates for follow-ups
- 📅 Interview scheduling and tracking
- 🎯 Interview question bank

## Tech Stack

### Backend
- Node.js + Express
- PostgreSQL (with Prisma ORM)
- Passport.js (Local & JWT strategies)
- JWT for authentication

### Frontend
- React 18
- React Router v6
- Axios for API calls
- Vite (build tool)

## Project Structure

```
job-tracker/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── config/         # Database & Passport config
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & validation middleware
│   │   ├── services/       # Business logic
│   │   └── app.js          # Express app setup
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
│
└── frontend/               # React application
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── context/        # React Context (Auth)
    │   ├── services/       # API service layer
    │   └── styles/         # CSS files
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/jobtracker?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

5. Generate Prisma client and run migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

6. Start the development server:
```bash
npm run dev
```

The API will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The app will be running at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Applications
- `POST /api/applications` - Create application (protected)
- `GET /api/applications` - Get all applications (protected)
- `GET /api/applications/stats` - Get statistics (protected)
- `GET /api/applications/:id` - Get single application (protected)
- `PUT /api/applications/:id` - Update application (protected)
- `DELETE /api/applications/:id` - Delete application (protected)

## Database Schema

The application uses the following main models:

- **User** - User accounts
- **Application** - Job applications
- **Contact** - Professional contacts
- **Document** - Resumes, cover letters, etc.
- **EmailTemplate** - Email templates for communication
- **InterviewQuestion** - Interview question bank
- **Interview** - Scheduled interviews

See `backend/prisma/schema.prisma` for the complete schema.

## Development

### Running Prisma Studio (Database GUI)
```bash
cd backend
npm run prisma:studio
```

### Creating Database Migrations
```bash
cd backend
npm run prisma:migrate
```

## Deployment

### Backend (Render)
1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Add environment variables
5. Deploy!

### Frontend (Render)
1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Database (Render)
1. Create a new PostgreSQL database on Render
2. Copy the connection string
3. Add it to your backend environment variables

## Future Features

- [ ] Mobile app (React Native)
- [ ] Calendar integration
- [ ] Email integration
- [ ] Advanced analytics and insights
- [ ] Job board integrations
- [ ] Collaborative features
- [ ] AI-powered resume suggestions
- [ ] Salary negotiation tools

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
