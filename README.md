# Udyam Registration Form Clone

A full-stack project replicating the Udyam Registration form with:
- Next.js + React frontend
- Node.js + Express backend
- PostgreSQL database
- Optional Python scraper

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Python 3.8+ (optional scraper)

### 1. Clone the Repo and Install Dependencies
cd frontend && npm install
cd ../backend && npm install

text

### 2. Configure Database
Create `udyam_db` in PostgreSQL and update `.env` in backend:
DB_HOST=localhost
DB_NAME=udyam_db
DB_USER=postgres
DB_PASSWORD=password
DB_PORT=5432

text

### 3. Run Backend
cd backend
npm run dev

text

### 4. Run Frontend
cd frontend
npm run dev

text

Frontend will be at: `http://localhost:3000`
Backend API will be at: `http://localhost:3001`