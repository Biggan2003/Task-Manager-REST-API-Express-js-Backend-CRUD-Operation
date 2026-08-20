# Task Manager REST API

![alt text](image.png)

A simple REST API built with **Node.js** and **Express.js** for managing tasks.

This project demonstrates the basic CRUD operations of a REST API using an in-memory JavaScript array instead of a database.

## Features

* Get all tasks
* Create a new task
* Update an existing task
* Delete a task
* Validate required task titles
* Return appropriate HTTP status codes
* Test API endpoints using Postman

## Technologies Used

* Node.js
* Express.js
* JavaScript
* Postman

## Project Structure

```text
task-manager-api/
│
├── node_modules/
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Installation

Clone or download the project and open the project folder in a terminal.

Install the required dependencies:

```bash
npm install
```

If Express is not installed yet:

```bash
npm install express
```

For development with automatic server restart:

```bash
npm install --save-dev nodemon
```

## Running the Server

Start the server using:

```bash
node server.js
```

The API will run at:

```text
http://localhost:3001
```

If `nodemon` is configured, you can also run:

```bash
npm run dev
```

## API Endpoints

### 1. Get All Tasks

**GET**

```text
GET http://localhost:3001/tasks
```

Returns all available tasks.

Example response:

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

### 2. Create a New Task

**POST**

```text
POST http://localhost:3001/tasks
```

Request body:

```json
{
  "title": "Learn Node.js",
  "done": false
}
```

A successful request returns:

```text
201 Created
```

Example response:

```json
{
  "id": 3,
  "title": "Learn Node.js",
  "done": false
}
```

If the title is missing:

```json
{
  "message": "Title is required"
}
```

The API returns:

```text
400 Bad Request
```

### 3. Update a Task

**PUT**

```text
PUT http://localhost:3001/tasks/1
```

Request body:

```json
{
  "title": "Learn Express REST API",
  "done": true
}
```

Example response:

```json
{
  "id": 1,
  "title": "Learn Express REST API",
  "done": true
}
```

If the task does not exist:

```text
PUT http://localhost:3001/tasks/999
```

Response:

```json
{
  "message": "Task not found"
}
```

Status:

```text
404 Not Found
```

### 4. Delete a Task

**DELETE**

```text
DELETE http://localhost:3001/tasks/2
```

Example response:

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

If the task does not exist:

```json
{
  "message": "Task not found"
}
```

## Testing with Postman

The API can be tested using Postman.

### GET

```text
GET http://localhost:3001/tasks
```

### POST

```text
POST http://localhost:3001/tasks
```

Body → `raw` → `JSON`:

```json
{
  "title": "Test API",
  "done": false
}
```

### PUT

```text
PUT http://localhost:3001/tasks/1
```

Body:

```json
{
  "title": "Updated Task",
  "done": true
}
```

### DELETE

```text
DELETE http://localhost:3001/tasks/1
```

## HTTP Status Codes

| Status Code | Meaning                          |
| ----------- | -------------------------------- |
| `200`       | Request completed successfully   |
| `201`       | New task created                 |
| `400`       | Invalid request or missing title |
| `404`       | Task not found                   |

## Data Storage

This project uses an **in-memory array** to store tasks.

Example:

```js
let tasks = [
  {
    id: 1,
    title: "Learn Express",
    done: false
  }
];
```

Because there is no database, the data will be reset whenever the Node.js server is restarted.

This approach is intentional for this lab because the main goal is to understand REST API and CRUD operations.

## CRUD Overview

```text
CREATE  → POST   /tasks
READ    → GET    /tasks
UPDATE  → PUT    /tasks/:id
DELETE  → DELETE /tasks/:id
```

## Learning Objectives

Through this project, the following concepts are practiced:

* Creating an Express server
* Using Express middleware
* Handling JSON request bodies
* Creating REST API routes
* Working with route parameters
* Performing CRUD operations
* Validating request data
* Returning HTTP status codes
* Testing APIs using Postman
* Understanding how an in-memory REST API works

## Author

**G. M. Biggan**

Computer Science and Engineering Student

---

## Lab Requirement

This project was developed as part of a REST API lab exercise covering:

1. Express setup with `express.json()` and `GET /tasks`
2. `POST /tasks` with title validation
3. `PUT /tasks/:id` for updating tasks
4. `DELETE /tasks/:id` for removing tasks
