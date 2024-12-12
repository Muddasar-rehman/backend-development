# User and Task Management API

This API is built using Node.js and Express to manage users and their tasks. It provides user authentication, task management, and CRUD operations.

---

## Features
- **User Authentication**: Register and login with JWT authentication.
- **Task Management**: Create, read, update, and delete tasks.
- **Pagination**: Fetch tasks with pagination support.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
2. Install Dependencies
bash
Copy code
npm install
3. Set Up Environment Variables
Create a .env file in the project root and add the following:

PORT=5000
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-jwt-secret>
4. Run the Application
Start the application with:

npm start
The server will run on the port specified in your .env file (default: 5000).

API Endpoints
1. User Registration
Endpoint: POST /api/users/register
Request Body:


{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:
{
  "message": "User registered successfully",
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
2. User Login
Endpoint: POST /api/users/login
Request Body:

{
  "email": "john@example.com",
  "password": "password123"
}
Response:

{
  "message": "Login successful",
  "token": "your-jwt-token"
}
3. Create Task
Endpoint: POST /api/tasks
Headers:
Authorization: Bearer <your-jwt-token>
Request Body:


{
  "title": "Task Title",
  "description": "Task description"
}
Response:

{
  "message": "Task created successfully",
  "task": {
    "id": "1",
    "title": "Task Title",
    "description": "Task description",
    "userId": "1"
  }
}
4. Fetch Tasks
Endpoint: GET /api/tasks
Headers:
Authorization: Bearer <your-jwt-token>
Query Parameters:

page (optional): Page number (default: 1)
limit (optional): Number of tasks per page (default: 10)
Response:

{
  "tasks": [
    {
      "id": "1",
      "title": "Task Title",
      "description": "Task description",
      "userId": "1"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2
  }
}
5. Update Task
Endpoint: PUT /api/tasks/:id
Headers:
Authorization: Bearer <your-jwt-token>
Request Body:

{
  "title": "Updated Task Title",
  "description": "Updated task description"
}
Response:

{
  "message": "Task updated successfully",
  "task": {
    "id": "1",
    "title": "Updated Task Title",
    "description": "Updated task description"
  }
}
6. Delete Task
Endpoint: DELETE /api/tasks/:id
Headers:
Authorization: Bearer <your-jwt-token>
Response:

{
  "message": "Task deleted successfully"
}
Example Usage
Register a new user: Use the /api/users/register endpoint.
Login: Use the /api/users/login endpoint to get a token.
Create a task: Use the /api/tasks endpoint with the token in the Authorization header.
Fetch tasks: Use /api/tasks with pagination support.
