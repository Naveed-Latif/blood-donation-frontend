# Blood Donation Platform - Backend Setup Guide

## Prerequisites
1. Python 3.8+ installed
2. PostgreSQL installed and running
3. pip (Python package manager)

## Step 1: Install Python Dependencies

```bash
pip install -r requirements.txt
```

## Step 2: Setup PostgreSQL Database

1. **Install PostgreSQL** (if not already installed):
   - Windows: Download from https://www.postgresql.org/download/windows/
   - macOS: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql postgresql-contrib`

2. **Create Database**:
   ```sql
   -- Connect to PostgreSQL as superuser
   psql -U postgres

   -- Create database
   CREATE DATABASE blood_donation_db;

   -- Create user (optional)
   CREATE USER blood_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE blood_donation_db TO blood_user;
   ```

3. **Update Database URL** in `backend_setup.py`:
   ```python
   DATABASE_URL = "postgresql://username:password@localhost/blood_donation_db"
   ```
   Replace `username`, `password` with your PostgreSQL credentials.

## Step 3: Create Database Tables

```bash
python setup_database.py
```

## Step 4: Start FastAPI Server

```bash
python backend_setup.py
```

Or using uvicorn directly:
```bash
uvicorn backend_setup:app --host 0.0.0.0 --port 8000 --reload
```

## Step 5: Test the API

1. **Check if server is running**:
   - Open browser: http://localhost:8000
   - You should see: `{"message": "Blood Donation API is running!"}`

2. **View API Documentation**:
   - Open browser: http://localhost:8000/docs
   - This shows the interactive API documentation

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user info

### Donors
- `GET /donors` - Get all donors

### Donations
- `POST /donations` - Record new donation

## Environment Variables

Create a `.env` file in your backend directory:
```
DATABASE_URL=postgresql://username:password@localhost/blood_donation_db
SECRET_KEY=your-secret-key-here
```

## Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Check PostgreSQL is running
   - Verify database credentials
   - Ensure database exists

2. **Port Already in Use**:
   - Change port in `backend_setup.py` or use: `uvicorn backend_setup:app --port 8001`

3. **CORS Issues**:
   - Make sure frontend URL is in CORS origins: `http://localhost:3000`

4. **Module Not Found**:
   - Install dependencies: `pip install -r requirements.txt`

## Next Steps

1. Start your FastAPI backend
2. Start your Next.js frontend: `npm run dev`
3. Test the connection by trying to sign up a new user

## Production Deployment

For production, consider:
- Using environment variables for secrets
- Setting up proper database migrations
- Using a production ASGI server like Gunicorn
- Setting up SSL/HTTPS
- Using a proper database connection pool
