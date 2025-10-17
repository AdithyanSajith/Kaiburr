# API Testing Scripts for Task Management API

## Test Script 1: Create a Task

```powershell
curl -X PUT http://localhost:8080/api/tasks `
  -H "Content-Type: application/json" `
  -d '{
    "id": "123",
    "name": "Print Hello",
    "owner": "John Smith",
    "command": "echo Hello World!"
  }'
```

## Test Script 2: Get All Tasks

```powershell
curl -X GET http://localhost:8080/api/tasks
```

## Test Script 3: Get Task by ID

```powershell
curl -X GET "http://localhost:8080/api/tasks?id=123"
```

## Test Script 4: Search Tasks by Name

```powershell
curl -X GET "http://localhost:8080/api/tasks/search?name=Hello"
```

## Test Script 5: Execute Task Command

```powershell
curl -X PUT http://localhost:8080/api/tasks/123/execute
```

## Test Script 6: Create Another Task

```powershell
curl -X PUT http://localhost:8080/api/tasks `
  -H "Content-Type: application/json" `
  -d '{
    "id": "456",
    "name": "List Files",
    "owner": "Jane Doe",
    "command": "dir"
  }'
```

## Test Script 7: Delete a Task

```powershell
curl -X DELETE http://localhost:8080/api/tasks/123
```

## Test Script 8: Test Validation (Invalid Command)

```powershell
curl -X PUT http://localhost:8080/api/tasks `
  -H "Content-Type: application/json" `
  -d '{
    "id": "789",
    "name": "Unsafe Task",
    "owner": "Test User",
    "command": "echo test; rm -rf /"
  }'
```

## Postman Collection JSON

Save this as a .json file and import into Postman:

```json
{
  "info": {
    "name": "Task Management API",
    "description": "API for managing tasks and executions"
  },
  "item": [
    {
      "name": "Create Task",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"id\": \"123\",\n  \"name\": \"Print Hello\",\n  \"owner\": \"John Smith\",\n  \"command\": \"echo Hello World!\"\n}"
        },
        "url": {
          "raw": "http://localhost:8080/api/tasks",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8080",
          "path": ["api", "tasks"]
        }
      }
    },
    {
      "name": "Get All Tasks",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:8080/api/tasks",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8080",
          "path": ["api", "tasks"]
        }
      }
    },
    {
      "name": "Execute Task",
      "request": {
        "method": "PUT",
        "url": {
          "raw": "http://localhost:8080/api/tasks/123/execute",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8080",
          "path": ["api", "tasks", "123", "execute"]
        }
      }
    }
  ]
}
```
