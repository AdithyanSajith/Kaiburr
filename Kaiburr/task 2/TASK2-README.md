# Task 2: Kubernetes

## ✅ **STATUS: FULLY IMPLEMENTED AND VERIFIED**

This folder contains the complete implementation of Task 2 - deploying the Task Management API to Kubernetes with dynamic pod creation functionality.

## 🎯 **Task 2 Requirements Met**

### **✅ Core Kubernetes Features:**
- **Docker Images**: Multi-stage Dockerfile for optimized container builds
- **Kubernetes Manifests**: Complete YAML files for deployment and service
- **MongoDB Deployment**: Separate pod with persistent volume for data storage
- **Environment Variables**: MongoDB connection details from ConfigMap
- **External Access**: NodePort service for host machine accessibility
- **Persistent Storage**: MongoDB data survives pod restarts

### **✅ Enhanced Application Features:**
- **Dynamic Pod Creation**: Tasks execute in separate Kubernetes pods
- **Busybox Execution**: Commands run in lightweight busybox containers
- **Kubernetes API Integration**: Programmatic pod management using Kubernetes Java client
- **Service Account**: Proper RBAC for pod creation and management
- **Resource Limits**: CPU and memory constraints for all pods

## 🚀 **Quick Start**

### **Prerequisites:**
- Docker Desktop with Kubernetes enabled, OR
- Minikube, Kind, or managed cluster (EKS, AKS, GKE)
- kubectl configured and connected to cluster
- Docker for building images

### **Automated Deployment:**
```powershell
# Deploy everything with one command
.\deploy.ps1
```

### **Access Points:**
- **Application**: http://localhost:30080
- **Swagger UI**: http://localhost:30080/swagger-ui.html
- **Health Check**: http://localhost:30080/actuator/health

## 🧪 **Testing Kubernetes Features**

### **Test Pod Creation:**
```powershell
# Test Kubernetes pod creation functionality
.\test-k8s-api.ps1
```

## 📁 **Key Files**

```
task 2/
├── k8s/                                    # Kubernetes manifests
│   ├── mongodb.yaml                       # MongoDB with persistent volume
│   ├── app-deployment.yaml               # Application deployment & RBAC
│   └── ingress.yaml                       # Optional ingress
├── src/main/java/com/kaiburr/taskapi/
│   └── service/KubernetesService.java     # K8s API integration
├── Dockerfile                             # Multi-stage build
├── deploy.ps1                            # Deployment script
└── test-k8s-api.ps1                      # Testing script
```

## 🎯 **Task 2 Requirements Verification**

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Application deployed to K8s | ✅ | Deployment with 2 replicas |
| MongoDB in separate pod | ✅ | Dedicated MongoDB deployment |
| Persistent volume for MongoDB | ✅ | 1GB PV with retain policy |
| Environment variables | ✅ | ConfigMap with MongoDB details |
| External access from host | ✅ | NodePort service on port 30080 |
| Pod creation for execution | ✅ | Dynamic busybox pods |
| Kubernetes API integration | ✅ | Java client with RBAC |

**Task 2 Complete - Ready for Kubernetes deployment!** 🚀
