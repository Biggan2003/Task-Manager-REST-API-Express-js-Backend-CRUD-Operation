# Task Manager REST API

![alt text](image.png)

A simple REST API built with **Node.js** and **Express.js** for managing tasks.

This project demonstrates REST API development using CRUD operations, user authentication, password hashing, JWT-based authorization, and protected routes.

The project uses in-memory JavaScript data structures instead of a database. This keeps the project simple and focuses on understanding backend API development.

---

## Features

- Get all tasks
- Create a new task
- Update an existing task
- Delete a task
- Validate required task titles
- Return appropriate HTTP status codes
- User registration
- Password hashing using bcrypt
- User login
- JWT token generation
- JWT token verification
- Protected task routes
- Bearer token authentication
- Environment variable configuration using `.env`
- API testing using Postman

---

## Technologies Used

- **Node.js** — JavaScript runtime environment used to run the backend application.
- **Express.js** — Web framework used to create the REST API and handle HTTP requests.
- **JavaScript** — Main programming language used for the backend logic.
- **bcrypt** — Used to securely hash and verify user passwords.
- **JSON Web Token (JWT)** — Used for user authentication and authorization.
- **dotenv** — Used to load sensitive configuration from environment variables.
- **Postman** — Used to test and verify the API endpoints.

---

## Project Structure

```text
Task-Manager-REST-API-Express-js-Backend-CRUD-Operation/
│
├── data/
│   ├── tasks.js
│   └── users.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

### File Description

| File / Folder | Purpose |
|---|---|
| `data/tasks.js` | Stores the initial task data used by the API. |
| `data/users.js` | Stores registered users in memory during runtime. |
| `.env.example` | Provides a template for required environment variables. |
| `.gitignore` | Prevents sensitive and unnecessary files from being committed to GitHub. |
| `package.json` | Contains project information, scripts, and dependencies. |
| `package-lock.json` | Records the exact dependency versions installed in the project. |
| `server.js` | Main Express server containing authentication, middleware, and API routes. |
| `README.md` | Contains project documentation and usage instructions. |


---

## Installation

### 1. Open the Project

Clone or download the project and open the project folder in VS Code or any code editor.

Then open a terminal inside the project directory.

### 2. Install Dependencies

Run:

```bash
npm install
```

This installs all dependencies listed in `package.json`.

If you need to install the main dependencies manually:

```bash
npm install express bcrypt jsonwebtoken dotenv
```

For development with automatic server restart, install Nodemon:

```bash
npm install --save-dev nodemon
```

---

## Environment Variables

This project uses environment variables to keep sensitive configuration such as the JWT secret outside the source code.

Create a `.env` file in the project root:

```env
PORT=3001
JWT_SECRET=your_random_jwt_secret
```

The project also includes a `.env.example` file:

```env
PORT=3001
JWT_SECRET=your_jwt_secret_here
```

The `.env.example` file is only a template. Replace the example JWT secret with your own secret inside the actual `.env` file.

The actual `.env` file should never be committed to GitHub.

The `.gitignore` file is configured to ignore `.env`.

---


---

## Running the Server

Start the Express server using:

```bash
node server.js
```

If the server starts successfully, the terminal will display:

```text
Server running on http://localhost:3001
```

The API is now available at:

```text
http://localhost:3001
```

For development with Nodemon, you can use:

```bash
npm run dev
```

---

## Authentication Overview

This project uses **JWT-based authentication** to protect the task management routes.

Users must first register and then log in to receive a JWT token.

The token must be sent with protected API requests using the `Authorization` header.

### Authentication Flow

```text
User
  │
  ↓
POST /register
  │
  ↓
Password hashed using bcrypt
  │
  ↓
User stored in memory
  │
  ↓
POST /login
  │
  ↓
Password verified using bcrypt
  │
  ↓
JWT token generated
  │
  ↓
Client receives token
  │
  ↓
Authorization: Bearer <JWT_TOKEN>
  │
  ↓
requireAuth middleware
  │
  ↓
JWT verification
  │
  ├── Valid token → Access granted
  │
  └── Invalid token → 401 Unauthorized
```

---


---

## Authentication Endpoints

### 1. Register a User

**POST `/register`**

```text
POST http://localhost:3001/register
```

The registration endpoint creates a new user and hashes the password using bcrypt before storing it.

### Request Body

```json
{
  "username": "biggan",
  "password": "123456"
}
```

### Successful Response

```text
201 Created
```

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "biggan"
  }
}
```

The password is never returned in the response.

### Missing Username or Password

```text
400 Bad Request
```

```json
{
  "message": "Username and password are required"
}
```

### Existing Username

If the username already exists:

```text
409 Conflict
```

```json
{
  "message": "Username already exists"
}
```

---

### 2. Login

**POST `/login`**

```text
POST http://localhost:3001/login
```

The login endpoint verifies the submitted password against the stored bcrypt hash.

If the credentials are valid, the server generates a JWT token.

### Request Body

```json
{
  "username": "biggan",
  "password": "123456"
}
```

### Successful Response

```text
200 OK
```

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

The returned JWT token is required to access the protected task endpoints.

### Invalid Credentials

If the username or password is incorrect:

```text
401 Unauthorized
```

```json
{
  "message": "Invalid username or password"
}
```

---

## Authorization Header

Protected endpoints require the JWT token to be sent using the Bearer authentication format.

```text
Authorization: Bearer <JWT_TOKEN>
```

Example:

```text
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---


---

## Task API Endpoints

All task management endpoints are protected by the `requireAuth` middleware.

A valid JWT token must be included in the `Authorization` header.

---

### 1. Get All Tasks

**GET `/tasks`**

```text
GET http://localhost:3001/tasks
```

**Authentication:** Required

Returns all available tasks.

### Example Response

```json
[
  {
    "id": 1,
    "title": "Learn Express",
    "done": false
  },
  {
    "id": 2,
    "title": "Build REST API",
    "done": false
  }
]
```

---

### 2. Create a New Task

**POST `/tasks`**

```text
POST http://localhost:3001/tasks
```

**Authentication:** Required

### Request Body

```json
{
  "title": "Learn Node.js",
  "done": false
}
```

### Successful Response

```text
201 Created
```

```json
{
  "id": 7,
  "title": "Learn Node.js",
  "done": false
}
```

### Missing Title

If the title is missing or empty:

```text
400 Bad Request
```

```json
{
  "message": "Title is required"
}
```

---

### 3. Update a Task

**PUT `/tasks/:id`**

```text
PUT http://localhost:3001/tasks/1
```

**Authentication:** Required

### Request Body

```json
{
  "title": "Learn Express REST API",
  "done": true
}
```

### Example Response

```json
{
  "id": 1,
  "title": "Learn Express REST API",
  "done": true
}
```

### Task Not Found

If the requested task does not exist:

```text
404 Not Found
```

```json
{
  "message": "Task not found"
}
```

---

### 4. Delete a Task

**DELETE `/tasks/:id`**

```text
DELETE http://localhost:3001/tasks/2
```

**Authentication:** Required

### Successful Response

```json
{
  "message": "Task deleted successfully",
  "task": {
    "id": 2,
    "title": "Build REST API",
    "done": false
  }
}
```

### Task Not Found

If the requested task does not exist:

```text
404 Not Found
```

```json
{
  "message": "Task not found"
}
```

---

### Protected Routes Summary

| Method | Endpoint | Authentication |
|---|---|---|
| `GET` | `/tasks` | Required |
| `POST` | `/tasks` | Required |
| `PUT` | `/tasks/:id` | Required |
| `DELETE` | `/tasks/:id` | Required |

---


---

## Testing with Postman

The API can be tested using **Postman**.

Postman is used to send HTTP requests and verify the API responses, status codes, authentication, and CRUD operations.

---

### Step 1 — Register a User

Method:

```text
POST
```

URL:

```text
http://localhost:3001/register
```

Body → `raw` → `JSON`:

```json
{
  "username": "biggan",
  "password": "123456"
}
```

Expected response:

```text
201 Created
```

---

### Step 2 — Login

Method:

```text
POST
```

URL:

```text
http://localhost:3001/login
```

Body:

```json
{
  "username": "biggan",
  "password": "123456"
}
```

Expected response:

```text
200 OK
```

The response contains a JWT token:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

Copy the returned JWT token.

---

### Step 3 — Access Tasks Without a Token

Send:

```text
GET http://localhost:3001/tasks
```

Do not provide an Authorization header.

Expected response:

```text
401 Unauthorized
```

Example:

```json
{
  "message": "Authorization token is required"
}
```

This confirms that the task routes are protected.

---

### Step 4 — Access Tasks With a JWT Token

In Postman, open the **Authorization** tab.

Select:

```text
Type → Bearer Token
```

Paste the JWT token received from the login request.

Then send:

```text
GET http://localhost:3001/tasks
```

Expected response:

```text
200 OK
```

The API will return the available tasks.

---

### Step 5 — Create a Protected Task

Send:

```text
POST http://localhost:3001/tasks
```

Use the same Bearer Token.

Body:

```json
{
  "title": "Learn JWT",
  "done": false
}
```

Expected response:

```text
201 Created
```

---

### Step 6 — Update a Protected Task

Send:

```text
PUT http://localhost:3001/tasks/1
```

Use the JWT token.

Body:

```json
{
  "title": "Learn JWT Authentication",
  "done": true
}
```

Expected response:

```text
200 OK
```

---

### Step 7 — Delete a Protected Task

Send:

```text
DELETE http://localhost:3001/tasks/2
```

Use the JWT token.

Expected response:

```text
200 OK
```

Example:

```json
{
  "message": "Task deleted successfully",
  "task": {
    "id": 2,
    "title": "Build REST API",
    "done": false
  }
}
```

---

### Authentication Testing Flow

```text
POST /register
       ↓
POST /login
       ↓
Receive JWT
       ↓
Copy JWT
       ↓
Authorization → Bearer Token
       ↓
GET /tasks
       ↓
200 OK
```

Without a token:

```text
GET /tasks
       ↓
401 Unauthorized
```

---

---

## HTTP Status Codes

The API uses standard HTTP status codes to indicate the result of each request.

| Status Code | Meaning |
|---|---|
| `200` | Request completed successfully |
| `201` | Resource created successfully |
| `400` | Invalid request or missing required data |
| `401` | Authentication required or invalid/expired token |
| `404` | Requested task was not found |
| `409` | Username already exists |

---

## Data Storage

This project currently uses **in-memory JavaScript arrays** instead of a database.

Task data is maintained in:

```text
data/tasks.js
```

User data is maintained in:

```text
data/users.js
```

The application loads these data structures into memory when the server starts.

Because the project does not use a persistent database, changes made during runtime will be lost when the Node.js server is restarted.

For example:

```text
Server starts
     ↓
Tasks loaded into memory
     ↓
POST /tasks
     ↓
New task added to memory
     ↓
Server restarts
     ↓
Runtime changes are lost
```

This approach is intentional for the lab because the main goal is to understand REST API development, CRUD operations, password hashing, JWT authentication, and protected routes.

---

## CRUD Overview

The Task Manager API follows the standard CRUD pattern.

```text
CREATE
   ↓
POST /tasks

READ
   ↓
GET /tasks

UPDATE
   ↓
PUT /tasks/:id

DELETE
   ↓
DELETE /tasks/:id
```

| Operation | HTTP Method | Endpoint | Authentication |
|---|---|---|---|
| Create | `POST` | `/tasks` | Required |
| Read | `GET` | `/tasks` | Required |
| Update | `PUT` | `/tasks/:id` | Required |
| Delete | `DELETE` | `/tasks/:id` | Required |

---

---

## Security Practices

This project follows several basic security practices for handling user authentication.

### Password Hashing

User passwords are never stored as plain text.

The password is hashed using `bcrypt` before being stored.

```text
Plain Password
      ↓
bcrypt.hash()
      ↓
Hashed Password
      ↓
Stored in memory
```

### Password Verification

During login, the submitted password is compared with the stored bcrypt hash.

```text
Submitted Password
        ↓
bcrypt.compare()
        ↓
Stored Password Hash
        ↓
Password Match
```

If the password is correct, the user is authenticated.

### JWT Authentication

After successful login, the server generates a signed JWT token.

The client must send this token when accessing protected task routes.

```text
Login
  ↓
Valid Credentials
  ↓
JWT Generated
  ↓
Bearer Token
  ↓
Protected API
```

### Environment Variables

The JWT secret is stored in an environment variable instead of being hardcoded in `server.js`.

```env
JWT_SECRET=your_random_jwt_secret
```

The actual `.env` file is excluded from Git using `.gitignore`.

Sensitive secrets should never be committed to a public GitHub repository.

---

## Learning Objectives

Through this project, the following backend concepts are practiced:

- Creating an Express.js server
- Using Express middleware
- Handling JSON request bodies
- Creating REST API routes
- Working with route parameters
- Performing CRUD operations
- Validating request data
- Returning appropriate HTTP status codes
- Testing APIs using Postman
- Understanding in-memory data storage
- Creating user registration functionality
- Hashing passwords using bcrypt
- Verifying passwords during login
- Generating JWT tokens
- Verifying JWT tokens
- Creating authentication middleware
- Using Bearer token authorization
- Protecting REST API routes
- Managing environment variables using dotenv

---

---

## Lab Requirements

This project was developed as part of a REST API lab exercise covering the following requirements.

### Lab 1 — CRUD REST API

1. Express server setup using `express.json()`
2. `GET /tasks` for retrieving tasks
3. `POST /tasks` for creating new tasks
4. Validation of required task titles
5. `PUT /tasks/:id` for updating tasks
6. `DELETE /tasks/:id` for deleting tasks
7. Appropriate HTTP status codes
8. Testing API endpoints using Postman

### Lab 2 — Authentication and Protected Routes

1. `POST /register` for user registration
2. Password hashing using `bcrypt`
3. `POST /login` for user authentication
4. Password verification using `bcrypt.compare()`
5. JWT generation after successful login
6. `requireAuth` middleware for authentication
7. JWT verification using `jwt.verify()`
8. Bearer token authentication
9. Protecting `/tasks` routes
10. Returning `401 Unauthorized` for missing or invalid tokens
11. Using environment variables for JWT configuration
12. Keeping sensitive configuration outside the source code

---

## Author

**G. M. Biggan**

Computer Science and Engineering Student

---

## Project Summary

This project demonstrates how a basic Express.js REST API can be developed and extended with authentication.

The first stage focuses on building a Task Manager API using standard CRUD operations:

```text
CREATE → POST /tasks
READ   → GET /tasks
UPDATE → PUT /tasks/:id
DELETE → DELETE /tasks/:id
```

The second stage extends the API with authentication and authorization:

```text
Register
   ↓
bcrypt Password Hashing
   ↓
Login
   ↓
Password Verification
   ↓
JWT Generation
   ↓
Bearer Token
   ↓
requireAuth Middleware
   ↓
Protected Task Routes
```

The project intentionally uses in-memory data instead of a database so that the core concepts of REST API development, CRUD operations, password security, JWT authentication, middleware, and route protection can be understood without additional database complexity.

---
