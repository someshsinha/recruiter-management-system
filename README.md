# Recruiter Management API

## Overview
The Recruiter Management API is a secure and scalable RESTful API built with Node.js and Express.js. It is designed to facilitate the management of recruiters and candidates, providing functionalities for user authentication, job management, and application handling.

## Features
- User authentication for both recruiters and candidates
- CRUD operations for job adverts
- Profile management for candidates
- Application handling for job applications
- Error handling middleware
- Logging utility
- Pagination utility for database queries

## Project Structure
```
recruiter-management-api/
│
├── 📦 package.json
├── 📄 .env
├── 📄 .gitignore
├── 📄 README.md
│
├── 📁 uploads/                          # All uploaded resumes (public access)
│   └── (resume files get saved here)
│
├── 📁 src/
│   │
│   ├── 📄 index.js                       # 🚀 Entry point (server start)
│   │
│   ├── 📁 config/                        # ⚙️ Configuration files
│   │   ├── db.js                         # MySQL connection pool
│   │   ├── multer.js                     # Multer setup for resume upload
│   │   └── config.js                     # JWT, app constants, etc.
│   │
│   ├── 📁 middleware/                    # 🧩 Middlewares
│   │   └── auth.middleware.js            # Token verification for protected routes
│   │
│   ├── 📁 services/                      # 💼 Business logic layer
│   │   ├── auth.service.js               # Handles register/login/verify
│   │   ├── email.service.js              # Sends verification email
│   │   └── application.service.js        # (Optional future logic)
│   │
│   ├── 📁 controllers/                   # 🎮 Route handlers
│   │   ├── auth.controller.js
│   │   ├── profile.controller.js
│   │   ├── client.controller.js
│   │   ├── job.controller.js
│   │   └── application.controller.js
│   │
│   ├── 📁 models/                        # 🧱 Database access layer
│   │   ├── user.model.js
│   │   ├── profile.model.js
│   │   ├── client.model.js
│   │   ├── job.model.js
│   │   ├── application.model.js
│   │   └── emailVerification.model.js    # Stores email verification tokens
│   │
│   ├── 📁 routes/                        # 🌐 Express routes
│   │   ├── auth.routes.js
│   │   ├── profile.routes.js
│   │   ├── client.routes.js
│   │   ├── job.routes.js
│   │   └── application.routes.js
│   │
│   └── 📁 utils/                         # 🛠️ Helper utilities (optional)
│       ├── generateToken.js
│       ├── handleErrors.js
│       └── dateUtils.js
│
└── 📁 tests/                             # 🧪 Jest or Supertest test cases
    ├── auth.test.js
    ├── profile.test.js
    └── application.test.js


## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd recruiter-management-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Configuration
- Create a `.env` file in the root directory based on the `.env.example` file.
- Set up your database connection details in the `.env` file.

## Running the Application
To start the application, run:
```
npm start
```

## API Documentation
Refer to the individual route files in the `src/routes` directory for detailed API endpoint documentation.

## Testing
To run the tests, use:
```
npm test
```

## License
This project is licensed under the MIT License.