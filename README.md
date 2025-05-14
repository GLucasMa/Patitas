# Pet Food E-commerce Application

This is a full-stack e-commerce application for an animal feed business, built with Angular (frontend) and NestJS (backend).

## Project Structure

```
/
├── client/           # Angular frontend
│   └── src/          # Angular source code
├── backend/          # NestJS backend
│   └── src/          # NestJS source code
└── README.md         # Project documentation
```

## Features

- Product catalog with search and filtering
- User authentication (register, login, logout)
- Shopping cart functionality
- Order processing and history
- Admin panel for product management
- Stock management

## Prerequisites

- Node.js (v16+)
- Angular CLI
- NestJS CLI
- MySQL (v8+)

## Setup Instructions

### Database Setup

1. Create a MySQL database:

```sql
CREATE DATABASE pet_food_store;
```

2. Configure the database connection in `backend/.env`

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm run start:dev
```

The API will be available at http://localhost:3000

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at http://localhost:4200

## API Documentation

API documentation is available at http://localhost:3000/api when the backend server is running.

## Login Credentials

### Admin User
- Email: admin@example.com
- Password: password123

### Regular User
- Email: user@example.com
- Password: password123