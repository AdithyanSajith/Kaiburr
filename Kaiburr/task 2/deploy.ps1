# Task 2: Kubernetes Deployment Script (PowerShell)
# This script deploys the Task Management API to Kubernetes

Write-Host "🚀 Starting Task 2: Kubernetes Deployment" -ForegroundColor Green

# Check if kubectl is available
if (!(Get-Command kubectl -ErrorAction SilentlyContinue)) {
    Write-Host "❌ kubectl is not installed. Please install kubectl first." -ForegroundColor Red
    exit 1
}

# Check if cluster is accessible
Write-Host "📋 Checking Kubernetes cluster access..." -ForegroundColor Yellow
kubectl cluster-info

# Build Docker image
Write-Host "🐳 Building Docker image..." -ForegroundColor Yellow
docker build -t task-management-api:k8s .

# Deploy MongoDB with persistent volume
Write-Host "🍃 Deploying MongoDB with persistent volume..." -ForegroundColor Yellow
kubectl apply -f k8s/mongodb.yaml

# Wait for MongoDB to be ready
Write-Host "⏳ Waiting for MongoDB to be ready..." -ForegroundColor Yellow
kubectl wait --for=condition=available --timeout=300s deployment/mongodb

# Deploy the application
Write-Host "🚀 Deploying Task Management API..." -ForegroundColor Yellow
kubectl apply -f k8s/app-deployment.yaml

# Wait for application to be ready
Write-Host "⏳ Waiting for application to be ready..." -ForegroundColor Yellow
kubectl wait --for=condition=available --timeout=300s deployment/task-management-api

# Show deployment status
Write-Host "📊 Deployment Status:" -ForegroundColor Cyan
kubectl get pods -l app=mongodb
kubectl get pods -l app=task-management-api
kubectl get services

# Get application URL
$NODE_PORT = kubectl get service task-management-api-service -o jsonpath='{.spec.ports[0].nodePort}'
Write-Host "✅ Application is accessible at: http://localhost:$NODE_PORT" -ForegroundColor Green
Write-Host "✅ Swagger UI: http://localhost:$NODE_PORT/swagger-ui.html" -ForegroundColor Green

Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Useful commands:" -ForegroundColor Cyan
Write-Host "  kubectl get pods                    # List all pods"
Write-Host "  kubectl logs -f deployment/task-management-api  # View app logs"
Write-Host "  kubectl logs -f deployment/mongodb  # View MongoDB logs"
Write-Host "  kubectl port-forward service/task-management-api-service 8080:8080  # Port forward"
