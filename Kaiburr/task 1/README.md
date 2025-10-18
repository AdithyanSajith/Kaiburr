# Task Management API - Task 1

A Spring Boot REST API application for managing tasks and their executions with MongoDB integration.

## Features

- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Task Search**: Search tasks by name (case-insensitive)
- **Command Execution**: Execute shell commands and store execution history
- **Input Validation**: Validates commands to prevent unsafe/malicious code
- **API Documentation**: Swagger/OpenAPI documentation
- **MongoDB Integration**: Persistent storage for tasks and executions

## Prerequisites

Before running this application, make sure you have:

- **Java 17** or higher
- **Maven 3.6+**
- **MongoDB** (running on localhost:27017)

## Quick Start

### 1. Clone and Navigate

```bash
cd task1-java-api
```

### 2. Install Dependencies

```bash
mvn clean install
```

### 3. Start MongoDB

Make sure MongoDB is running on `localhost:27017`. If you don't have MongoDB installed:

**Windows:**

```bash
# Download and install MongoDB Community Edition
# Or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Linux/Mac:**

```bash
# Install MongoDB or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Base URL: `http://localhost:8080/api/tasks`

| Method | Endpoint                                | Description             |
| ------ | --------------------------------------- | ----------------------- |
| GET    | `/api/tasks`                            | Get all tasks           |
| GET    | `/api/tasks?id={taskId}`                | Get task by ID          |
| PUT    | `/api/tasks`                            | Create or update a task |
| DELETE | `/api/tasks/{taskId}`                   | Delete a task           |
| GET    | `/api/tasks/search?name={searchString}` | Search tasks by name    |
| PUT    | `/api/tasks/{taskId}/execute`           | Execute task command    |

## API Documentation

Once the application is running, you can access:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/api-docs

## Request/Response Examples

### 1. Create a Task

**Request:**

```bash
curl -X PUT http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "id": "123",
    "name": "Print Hello",
    "owner": "John Smith",
    "command": "echo Hello World!"
  }'
```

**Response:**

```json
{
  "id": "123",
  "name": "Print Hello",
  "owner": "John Smith",
  "command": "echo Hello World!",
  "taskExecutions": []
}
```

### 2. Get All Tasks

**Request:**

```bash
curl -X GET http://localhost:8080/api/tasks
```

**Response:**

```json
[
  {
    "id": "123",
    "name": "Print Hello",
    "owner": "John Smith",
    "command": "echo Hello World!",
    "taskExecutions": []
  }
]
```

### 3. Get Task by ID

**Request:**

```bash
curl -X GET "http://localhost:8080/api/tasks?id=123"
```

### 4. Search Tasks by Name

**Request:**

```bash
curl -X GET "http://localhost:8080/api/tasks/search?name=Hello"
```

### 5. Execute Task Command

**Request:**

```bash
curl -X PUT http://localhost:8080/api/tasks/123/execute
```

**Response:**

```json
{
  "id": "123",
  "name": "Print Hello",
  "owner": "John Smith",
  "command": "echo Hello World!",
  "taskExecutions": [
    {
      "startTime": "2025-10-17 15:51:42.276Z",
      "endTime": "2025-10-17 15:51:43.276Z",
      "output": "Hello World!"
    }
  ]
}
```

### 6. Delete Task

**Request:**

```bash
curl -X DELETE http://localhost:8080/api/tasks/123
```

## Task Object Schema

```json
{
  "id": "string",
  "name": "string (required)",
  "owner": "string (required)",
  "command": "string (required, validated for safety)",
  "taskExecutions": [
    {
      "startTime": "2025-10-17T15:51:42.276Z",
      "endTime": "2025-10-17T15:51:43.276Z",
      "output": "string"
    }
  ]
}
```

## Security Features

- **Command Validation**: Commands are validated using regex patterns to prevent injection of unsafe characters like `;`, `&`, `|`, `` ` ``, `$`, `()`, `{}`, `[]`, `<>`, quotes, and backslashes
- **Timeout Protection**: Command execution has a 30-second timeout to prevent hanging processes
- **Input Validation**: All required fields are validated using Bean Validation annotations

## Error Responses

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request**: Invalid input data or validation errors
- **404 Not Found**: Task not found
- **500 Internal Server Error**: Command execution errors or server issues

Example error response:

```json
{
  "timestamp": "2025-10-17T15:51:42.276Z",
  "status": 400,
  "error": "Validation Failed",
  "errors": {
    "command": "Command contains unsafe characters"
  }
}
```

## Testing with Postman

1. Import the OpenAPI specification from `http://localhost:8080/api-docs`
2. Or manually create requests using the examples above
3. Test all endpoints with various scenarios including edge cases

## Building for Production

```bash
# Build JAR file
mvn clean package

# Run the JAR
java -jar target/task-management-api-1.0.0.jar
```

## Configuration

Key configuration properties in `application.properties`:

```properties
# MongoDB
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=taskdb

# Server
server.port=8080
```

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongosh` (MongoDB Shell)
- Check if port 27017 is accessible
- Verify database permissions

### Application Won't Start

- Check Java version: `java -version` (requires Java 17+)
- Verify Maven installation: `mvn -version`
- Check if port 8080 is available

### Command Execution Issues

- Commands are executed in the system shell (cmd on Windows, sh on Linux/Mac)
- Ensure commands are safe and don't contain restricted characters
- Check application logs for detailed error messages

## Screenshots

Below are screenshots of the Task 1 API running and tested, with my name and the current date/time visible:

![Backend running with name and date/time](Screenshots/Screenshot%202025-10-19%20034047.png)
*Backend running in terminal with name and system date/time*

![API test with name and date/time](Screenshots/Screenshot%202025-10-19%20034140.png)
*API tested (e.g., GET/POST) with name and system date/time*

![Project structure with name and date/time](Screenshots/Screenshot%202025-10-19%20034204.png)
*Project structure in VS Code/File Explorer with name and system date/time*

## Project Structure

```
src/
├── main/
│   ├── java/com/kaiburr/taskapi/
│   │   ├── TaskManagementApiApplication.java
│   │   ├── controller/
│   │   │   └── TaskController.java
│   │   ├── model/
│   │   │   ├── Task.java
│   │   │   └── TaskExecution.java
│   │   ├── repository/
│   │   │   └── TaskRepository.java
│   │   ├── service/
│   │   │   └── TaskService.java
│   │   └── exception/
│   │       └── GlobalExceptionHandler.java
│   └── resources/
│       └── application.properties
└── test/
    └── java/com/kaiburr/taskapi/
```

## Next Steps

This application is ready for:

- **Task 2**: Dockerization and Kubernetes deployment
- **Task 3**: Frontend integration with React
- **Task 4**: CI/CD pipeline setup

---

_Created by [Your Name] on October 17, 2025_
