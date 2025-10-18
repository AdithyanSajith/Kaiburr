# Kaiburr Tasks Repository

This repository contains implementations of various Kaiburr technical assessment tasks.

## 📁 **Repository Structure**

```
Kaiburr/
├── task 1/          # Java Backend and REST API
├── task 2/          # Kubernetes Deployment
├── task 3/          # Web UI Forms (React + TypeScript)
└── ...
```

## 🎯 **Task Status Overview**

| Task   | Title                   | Status          | Technology Stack                        | Description                                        |
| ------ | ----------------------- | --------------- | --------------------------------------- | -------------------------------------------------- |
| Task 1 | Java Backend & REST API | ✅ **COMPLETE** | Java 21 LTS, Spring Boot 3.2.0, MongoDB | Task management REST API with full CRUD operations |
| Task 2 | Kubernetes Deployment   | ✅ **COMPLETE** | Kubernetes, Docker, Java 21, MongoDB    | K8s deployment with dynamic pod creation           |
| Task 3 | Web UI Forms            | ✅ **COMPLETE** | React 19, TypeScript, Ant Design        | Modern, accessible frontend interface              |

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

## 🚀 **Task 2: Kubernetes Deployment - COMPLETED**

### **Key Features Implemented:**

- ✅ **Kubernetes Manifests**: Complete YAML files for deployment and service
- ✅ **MongoDB in K8s**: Separate pod with persistent volume for data storage
- ✅ **Dynamic Pod Creation**: Tasks execute in separate Kubernetes pods using K8s API
- ✅ **Busybox Execution**: Commands run in lightweight, secure containers
- ✅ **RBAC Security**: Service account with proper permissions for pod management
- ✅ **Environment Variables**: MongoDB connection via ConfigMap
- ✅ **External Access**: NodePort service for host machine connectivity
- ✅ **Resource Management**: CPU and memory limits for all pods

## 🎨 **Task 3: Web UI Forms - COMPLETED**

### **Key Features Implemented:**

- ✅ **React 19 Framework**: Latest React with modern hooks and concurrent features
- ✅ **TypeScript Integration**: Full type safety and enhanced developer experience
- ✅ **Ant Design UI**: Professional, accessible component library
- ✅ **CRUD Operations**: Create, read, update, delete tasks with intuitive forms
- ✅ **Real-time Search**: Instant search functionality with filtering and sorting
- ✅ **Command Execution**: Execute task commands with real-time output display
- ✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ✅ **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support

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

### **Quick Start (Task 2):**

```bash
cd "Kaiburr/task 2"
# Deploy to Kubernetes
.\deploy.ps1

# Access application
# http://localhost:30080
# http://localhost:30080/swagger-ui.html
```

### **Quick Start (Task 3):**

```bash
cd "Kaiburr/task 3/task-management-ui"
# Install dependencies and start development server
npm install --legacy-peer-deps
npm start

# Access Web UI
# http://localhost:3000
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

### **Task 2:**

- **Language**: Java 21 LTS
- **Framework**: Spring Boot 3.2.0
- **Database**: MongoDB
- **Orchestration**: Kubernetes
- **Container Runtime**: Docker
- **Pod Management**: Kubernetes Java Client
- **Storage**: Persistent Volumes
- **Security**: RBAC, Service Accounts

### **Task 3:**

- **Frontend**: React 19 with TypeScript
- **UI Library**: Ant Design
- **State Management**: React Query
- **HTTP Client**: Axios
- **Build Tool**: Create React App
- **Styling**: CSS3 with responsive design
- **Accessibility**: WCAG 2.1 AA compliant

## 📊 **Project Metrics**

### **Task 1 Statistics:**

- **Lines of Code**: ~500+ lines
- **Test Coverage**: Unit tests implemented
- **API Endpoints**: 6 REST endpoints
- **Security Features**: Command validation, input sanitization
- **Documentation**: Complete API testing guide with 15+ screenshot examples

### **Task 2 Statistics:**

- **Lines of Code**: ~700+ lines
- **Kubernetes Manifests**: 3 YAML files (MongoDB, App, Ingress)
- **Pod Management**: Dynamic pod creation via Kubernetes API
- **Services**: MongoDB + Application + NodePort
- **Documentation**: Complete deployment and testing guides

### **Task 3 Statistics:**

- **Lines of Code**: ~1000+ lines
- **React Components**: 3 main components (TaskList, TaskForm, TaskExecutionModal)
- **TypeScript**: Full type safety throughout the application
- **UI Features**: CRUD operations, search, filtering, command execution
- **Accessibility**: Keyboard navigation, screen reader support, WCAG 2.1 AA

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
**Status**: Task 1 Complete ✅ | Task 2 Complete ✅ | Task 3 Complete ✅

# Task 4: CI-CD Pipeline for Kaiburr Task Management App

This repository includes a complete CI/CD pipeline for the Java backend (Task 1) using GitHub Actions. The pipeline automates:

- **Code Build:** Compiles the backend using Maven
- **Docker Build:** Builds a Docker image from the backend Dockerfile
- **Test:** Runs unit tests
- **Artifact Upload:** Uploads the built JAR file as a workflow artifact

## Pipeline File
The workflow is defined in `.github/workflows/ci-cd.yml` and runs on every push or pull request to the `main` branch.

## How It Works
1. **Checkout code**
2. **Set up JDK 21**
3. **Build with Maven**
4. **Build Docker image**
5. **Run tests**
6. **Upload JAR artifact**

## Example Workflow Status Badge
```
![CI-CD Pipeline](https://github.com/AdithyanSajith/Kaiburr/actions/workflows/ci-cd.yml/badge.svg)
```

## How to Submit
- Push your code to GitHub
- Share your repository link (e.g., https://github.com/AdithyanSajith/Kaiburr)
- The pipeline will run automatically and show results in the Actions tab

---
For deployment or Docker publishing, contact your instructor or add steps to the workflow as needed.
