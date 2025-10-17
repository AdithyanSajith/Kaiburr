#!/bin/bash

# Task 2: Kubernetes Deployment Script
# This script deploys the Task Management API to Kubernetes

set -e

echo "🚀 Starting Task 2: Kubernetes Deployment"

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install kubectl first."
    exit 1
fi

# Check if cluster is accessible
echo "📋 Checking Kubernetes cluster access..."
kubectl cluster-info

# Create namespace if it doesn't exist
echo "📁 Creating namespace (if needed)..."
kubectl create namespace default --dry-run=client -o yaml | kubectl apply -f -

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t task-management-api:k8s .

# Deploy MongoDB with persistent volume
echo "🍃 Deploying MongoDB with persistent volume..."
kubectl apply -f k8s/mongodb.yaml

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/mongodb

# Deploy the application
echo "🚀 Deploying Task Management API..."
kubectl apply -f k8s/app-deployment.yaml

# Wait for application to be ready
echo "⏳ Waiting for application to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/task-management-api

# Show deployment status
echo "📊 Deployment Status:"
kubectl get pods -l app=mongodb
kubectl get pods -l app=task-management-api
kubectl get services

# Get application URL
NODE_PORT=$(kubectl get service task-management-api-service -o jsonpath='{.spec.ports[0].nodePort}')
echo "✅ Application is accessible at: http://localhost:$NODE_PORT"
echo "✅ Swagger UI: http://localhost:$NODE_PORT/swagger-ui.html"

echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Useful commands:"
echo "  kubectl get pods                    # List all pods"
echo "  kubectl logs -f deployment/task-management-api  # View app logs"
echo "  kubectl logs -f deployment/mongodb  # View MongoDB logs"
echo "  kubectl port-forward service/task-management-api-service 8080:8080  # Port forward"
