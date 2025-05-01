# Node.js Express TypeScript Authentication API

This is a backend API with authentication functionality built using Node.js, Express, TypeScript, and Prisma ORM.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- PostgreSQL database with Prisma ORM
- MVC architecture
- RESTful API design

## Prerequisites

- Node.js v22 LTS
- PostgreSQL database
- npm

## Setup

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file with the following variables:

```
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your-secret-key
PORT=3000
```

5. Apply the Prisma schema to your database:

```bash
npx prisma db push
```

6. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

#### Register User

```
POST /api/v1/auth/register
```

Request Body:

```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "Password123",
  "role": "USER",
  "mobile": "1234567890", // optional
  "address": "123 Test Street", // optional
  "dob": "1990-01-01" // optional
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "Test User",
      "email": "testuser@example.com",
      "role": "USER",
      "mobile": "1234567890",
      "address": "123 Test Street",
      "dob": "1990-01-01T00:00:00.000Z",
      "createdAt": "2023-07-20T12:34:56.789Z",
      "updatedAt": "2023-07-20T12:34:56.789Z"
    }
  }
}
```

#### Login User

```
POST /api/v1/auth/login
```

Request Body:

```json
{
  "email": "testuser@example.com",
  "password": "Password123"
}
```

Response:

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "token": "jwt-token-string",
    "user": {
      "id": "uuid",
      "name": "Test User",
      "email": "testuser@example.com",
      "role": "USER",
      "mobile": "1234567890",
      "address": "123 Test Street",
      "dob": "1990-01-01T00:00:00.000Z",
      "createdAt": "2023-07-20T12:34:56.789Z",
      "updatedAt": "2023-07-20T12:34:56.789Z"
    }
  }
}
```

### Protected Routes

To access protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer your-jwt-token
```

## Postman Collection

A Postman collection JSON file is included in the repository (`postman_collection.json`). You can import this into Postman to test the API endpoints.

To use the collection:

1. Import the `postman_collection.json` file into Postman
2. Set the `baseUrl` variable to your server URL (default: `http://localhost:3000`)
3. After successfully logging in, set the `authToken` variable to the received JWT token

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error message",
  "data": null,
  "extra": {
    "details": "Additional error details if available"
  }
}
```

Common HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 422: Unprocessable Entity
- 500: Internal Server Error
