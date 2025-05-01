# Node.js Express TypeScript Cursor Boilerplate

A production-ready Node.js + Express + TypeScript boilerplate with built-in authentication, structured using best practices and enhanced with Cursor AI development guidelines.

## Purpose

This boilerplate provides a solid foundation for building scalable and maintainable backend applications with Node.js and TypeScript. It follows strict architectural patterns and coding standards defined in the `.cursorrules` file, making it ideal for development with [Cursor](https://cursor.sh/) AI-assisted coding.

## Features

- **MVC Architecture**: Clear separation of Models, Views, and Controllers
- **TypeScript**: Full type safety with strict mode enabled
- **Authentication**: Complete JWT-based auth system with registration and login
- **Express.js**: Modern routing and middleware
- **Prisma ORM**: Type-safe database access with PostgreSQL
- **Error Handling**: Centralized error management
- **Validation**: Request validation using Zod schemas
- **API Responses**: Standardized JSON API responses
- **Documentation**: Postman collection for API testing

## Directory Structure

```
.
├── .cursorrules                # Development guidelines for Cursor AI
├── .gitignore                  # Git ignore file
├── backend/                    # Main application folder
│   ├── prisma/                 # Prisma ORM schema and migrations
│   │   └── schema.prisma       # Database schema definition
│   ├── src/                    # Source code
│   │   ├── config/             # Configuration files
│   │   │   └── db.ts           # Database connection setup
│   │   ├── controllers/        # Request handlers
│   │   │   └── auth.controller.ts  # Authentication controllers
│   │   ├── middlewares/        # Express middlewares
│   │   │   ├── auth.middleware.ts  # Authentication middleware
│   │   │   ├── error.middleware.ts # Error handling middleware
│   │   │   └── validation.middleware.ts # Request validation
│   │   ├── routes/             # API routes
│   │   │   └── v1/             # API version 1 routes
│   │   │       └── auth.routes.ts  # Authentication routes
│   │   ├── schemas/            # Zod validation schemas
│   │   │   └── auth.schema.ts  # Authentication validation
│   │   ├── services/           # Business logic
│   │   │   └── auth.service.ts # Authentication services
│   │   ├── types/              # TypeScript type definitions
│   │   │   ├── auth.types.ts   # Authentication types
│   │   │   └── global.d.ts     # Global type declarations
│   │   ├── utils/              # Utility functions
│   │   │   ├── constants.ts    # Application constants
│   │   │   ├── customError.ts  # Custom error classes
│   │   │   ├── messages.ts     # Response messages
│   │   │   ├── responseGenerator.ts # API response formatter
│   │   │   ├── statusCodes.ts  # HTTP status codes
│   │   │   └── wrapper.ts      # Async request wrapper
│   │   └── server.ts           # Application entry point
│   ├── package.json            # Dependencies and scripts
│   ├── tsconfig.json           # TypeScript configuration
│   ├── postman_collection.json # Postman API collection
│   └── README.md               # Backend-specific documentation
└── README.md                   # This file
```

## Getting Started

### Prerequisites

- Node.js v22 LTS
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Niode-Express-TS-Cursor-Boilerplate.git
cd Niode-Express-TS-Cursor-Boilerplate
```

2. Install dependencies:

```bash
cd backend
npm install
```

3. Set up environment variables:

Create a `.env` file in the backend directory with the following variables:

```
DATABASE_URL=postgresql://username:password@localhost:5432/your_database
JWT_SECRET=your-secret-key
PORT=3000
```

4. Set up the database:

For development, you can use the direct push method:

```bash
npx prisma db push
```

For production environments, use migrations:

```bash
# Generate a migration
npx prisma migrate dev --name init

# Deploy migrations to production
npx prisma migrate deploy
```

**Difference between `db push` and migrations:**

- `prisma db push`: Directly pushes schema changes to your database without creating migration files. Ideal for development and prototyping, but doesn't track changes over time.
- `prisma migrate`: Creates versioned migration files that track schema changes over time. Recommended for production as it allows for controlled database schema evolution, rollbacks, and team collaboration.

5. Start the development server:

```bash
npm run dev
```

The server will be running at http://localhost:3000 (or the PORT you specified in .env).

## API Usage

The API includes authentication endpoints:

- **POST /api/v1/auth/register** - Register a new user
- **POST /api/v1/auth/login** - Login and get JWT token

Check the backend README.md and Postman collection for detailed API documentation.

## Development with Cursor

This boilerplate is designed to work seamlessly with Cursor AI. The `.cursorrules` file contains guidelines that Cursor uses to help maintain code quality and architectural patterns.

Key coding standards include:

- Using TypeScript strict mode
- Following RESTful API principles
- Maintaining MVC separation of concerns
- Implementing proper error handling
- Following naming conventions
- Using async/await for asynchronous operations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
