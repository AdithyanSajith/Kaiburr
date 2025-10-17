# Kaiburr Tasks Repository

This repository contains implementations of various Kaiburr technical assessment tasks.

## 📁 **Repository Structure**

```
Kaiburr/
├── task 1/          # Java Backend and REST API
├── task 2/          # (Future task implementation)
├── task 3/          # (Future task implementation)
└── ...
```

## 🎯 **Task Status Overview**

| Task | Title | Status | Technology Stack | Description |
|------|-------|--------|-----------------|-------------|
| Task 1 | Java Backend & REST API | ✅ **COMPLETE** | Java 21 LTS, Spring Boot 3.2.0, MongoDB | Task management REST API with full CRUD operations |
| Task 2 | TBD | 🔄 Pending | TBD | (To be implemented) |
| Task 3 | TBD | 🔄 Pending | TBD | (To be implemented) |

## 🏆 **Task 1: Java Backend and REST API - COMPLETED**

### **Key Features Implemented:**
- ✅ **Java 21 LTS Upgrade**: Successfully upgraded from Java 17 to Java 21 LTS
- ✅ **REST API Endpoints**: All required CRUD operations implemented
- ✅ **MongoDB Integration**: NoSQL document storage with repository pattern
- ✅ **Command Execution**: Secure shell command execution with validation
- ✅ **Security**: Input validation and malicious command detection
- ✅ **API Documentation**: Swagger UI integration
- ✅ **Docker Support**: Containerization with Java 21 runtime
- ✅ **Comprehensive Testing**: Unit tests and API testing documentation

### **Quick Start (Task 1):**
```bash
cd "Kaiburr/task 1"
# Start MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Run the application
mvn spring-boot:run

# Access Swagger UI
# http://localhost:8080/swagger-ui.html
```

### **API Endpoints (Task 1):**
- `GET /api/tasks` - Get all tasks
- `PUT /api/tasks` - Create/update task
- `GET /api/tasks/{id}` - Get task by ID
- `DELETE /api/tasks/{id}` - Delete task
- `GET /api/tasks/search?name={name}` - Search tasks by name
- `PUT /api/tasks/{id}/execute` - Execute task command

## 🔧 **Technology Stack**

### **Task 1:**
- **Language**: Java 21 LTS
- **Framework**: Spring Boot 3.2.0
- **Database**: MongoDB
- **Build Tool**: Maven 3.9.9
- **Documentation**: Swagger/OpenAPI 3
- **Containerization**: Docker
- **Testing**: JUnit, Spring Boot Test, Postman

## 📊 **Project Metrics**

### **Task 1 Statistics:**
- **Lines of Code**: ~500+ lines
- **Test Coverage**: Unit tests implemented
- **API Endpoints**: 6 REST endpoints
- **Security Features**: Command validation, input sanitization
- **Documentation**: Complete API testing guide with 15+ screenshot examples

## 🚀 **Getting Started**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AdithyanSajith/Kaiburr-Task-1.git
   cd Kaiburr-Task-1
   ```

2. **Navigate to specific task:**
   ```bash
   cd "Kaiburr/task 1"
   ```

3. **Follow task-specific README instructions**

## 📝 **Documentation**

Each task folder contains:
- **README.md** - Task-specific setup and usage instructions
- **API Documentation** - Detailed API testing guides
- **Screenshots** - Visual proof of functionality
- **Test Scripts** - Automated testing examples

## 🤝 **Contributing**

This repository represents completed technical assessment tasks. Each task is implemented according to specified requirements and thoroughly tested.

## 📞 **Contact**

- **Developer**: Adithyan Sajith
- **GitHub**: [@AdithyanSajith](https://github.com/AdithyanSajith)
- **Repository**: [Kaiburr-Task-1](https://github.com/AdithyanSajith/Kaiburr-Task-1)

---

**Last Updated**: October 17, 2025  
**Status**: Task 1 Complete ✅ | Additional tasks pending 🔄
