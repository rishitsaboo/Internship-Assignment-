# Backend Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database

## Environment Setup

1. Copy the `.env` file and update the database credentials:
```bash
cp .env .env.local
```

2. Update the `.env` file with your actual database credentials:
```env
DB_HOST=localhost
DB_USER=your_actual_db_user
DB_PASS=your_actual_db_password
DB_NAME=your_actual_db_name
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

## Database Setup

1. Create a PostgreSQL database for the application.

2. Run the database setup script:
```bash
npm run setup
```

This will create all necessary tables:
- `users` - User accounts
- `company_profile` - Company information
- `recipes` - Recipe data
- `favorites` - User favorites

## Running the Server

Start the backend server:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Company
- `POST /api/company/register` - Register company (requires auth)
- `POST /api/company/login` - Company login
- `GET /api/company/profile` - Get company profile (requires auth)

### Favorites
- `POST /api/favorites` - Add recipe to favorites (requires auth)
- `DELETE /api/favorites/:recipeId` - Remove recipe from favorites (requires auth)
- `GET /api/favorites` - Get user's favorites (requires auth)

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify database credentials in `.env` file
- Check if the database exists and is accessible

### Missing Environment Variables
The server will show an error if required environment variables are missing:
- `DB_USER`
- `DB_HOST`
- `DB_NAME`
- `DB_PASS`

Make sure all these are set in your `.env` file.
