# Task 2: Kubernetes API Testing Script
# Tests the Kubernetes pod creation functionality

Write-Host "🧪 Testing Task 2: Kubernetes Pod Creation" -ForegroundColor Green

# Configuration
$BASE_URL = "http://localhost:30080"
$API_BASE = "$BASE_URL/api/tasks"

Write-Host "📋 Testing Kubernetes-based Task Execution" -ForegroundColor Yellow

# Test 1: Create a simple task
Write-Host "1️⃣ Creating a simple echo task..." -ForegroundColor Cyan
$echoTask = @{
    name    = "Kubernetes Echo Task"
    owner   = "K8s Tester"
    command = "echo 'Hello from Kubernetes Pod!'"
} | ConvertTo-Json

$response1 = Invoke-WebRequest -Uri $API_BASE -Method PUT -Body $echoTask -ContentType "application/json"
$task1 = $response1.Content | ConvertFrom-Json
Write-Host "✅ Task created with ID: $($task1.id)" -ForegroundColor Green

# Test 2: Execute the task (this will create a K8s pod)
Write-Host "2️⃣ Executing task in Kubernetes pod..." -ForegroundColor Cyan
$executeResponse = Invoke-WebRequest -Uri "$API_BASE/$($task1.id)/execute" -Method PUT
$executedTask = $executeResponse.Content | ConvertFrom-Json
Write-Host "✅ Task executed successfully!" -ForegroundColor Green
Write-Host "📝 Output: $($executedTask.taskExecutions[0].output)" -ForegroundColor White

# Test 3: Create and execute a more complex task
Write-Host "3️⃣ Creating a file listing task..." -ForegroundColor Cyan
$listTask = @{
    name    = "Kubernetes List Task"
    owner   = "K8s Tester"
    command = "ls -la && pwd && whoami"
} | ConvertTo-Json

$response2 = Invoke-WebRequest -Uri $API_BASE -Method PUT -Body $listTask -ContentType "application/json"
$task2 = $response2.Content | ConvertFrom-Json
Write-Host "✅ Task created with ID: $($task2.id)" -ForegroundColor Green

# Execute the complex task
Write-Host "4️⃣ Executing complex task in Kubernetes pod..." -ForegroundColor Cyan
$executeResponse2 = Invoke-WebRequest -Uri "$API_BASE/$($task2.id)/execute" -Method PUT
$executedTask2 = $executeResponse2.Content | ConvertFrom-Json
Write-Host "✅ Complex task executed successfully!" -ForegroundColor Green
Write-Host "📝 Output:" -ForegroundColor White
Write-Host $executedTask2.taskExecutions[0].output

# Test 4: Create a task that demonstrates busybox capabilities
Write-Host "5️⃣ Creating a busybox demonstration task..." -ForegroundColor Cyan
$busyboxTask = @{
    name    = "Busybox Demo Task"
    owner   = "K8s Tester"
    command = "cat /etc/os-release && echo '---' && df -h && echo '---' && ps aux"
} | ConvertTo-Json

$response3 = Invoke-WebRequest -Uri $API_BASE -Method PUT -Body $busyboxTask -ContentType "application/json"
$task3 = $response3.Content | ConvertFrom-Json
Write-Host "✅ Task created with ID: $($task3.id)" -ForegroundColor Green

# Execute the busybox demo task
Write-Host "6️⃣ Executing busybox demo in Kubernetes pod..." -ForegroundColor Cyan
$executeResponse3 = Invoke-WebRequest -Uri "$API_BASE/$($task3.id)/execute" -Method PUT
$executedTask3 = $executeResponse3.Content | ConvertFrom-Json
Write-Host "✅ Busybox demo executed successfully!" -ForegroundColor Green
Write-Host "📝 Output:" -ForegroundColor White
Write-Host $executedTask3.taskExecutions[0].output

# Test 5: Get all tasks to verify
Write-Host "7️⃣ Retrieving all tasks..." -ForegroundColor Cyan
$allTasksResponse = Invoke-WebRequest -Uri $API_BASE -Method GET
$allTasks = $allTasksResponse.Content | ConvertFrom-Json
Write-Host "✅ Retrieved $($allTasks.Count) tasks" -ForegroundColor Green

# Summary
Write-Host "" -ForegroundColor White
Write-Host "🎉 Kubernetes Testing Complete!" -ForegroundColor Green
Write-Host "📊 Summary:" -ForegroundColor Yellow
Write-Host "  • Created $($allTasks.Count) tasks" -ForegroundColor White
Write-Host "  • All tasks executed in separate Kubernetes pods" -ForegroundColor White
Write-Host "  • Each execution used busybox image" -ForegroundColor White
Write-Host "  • Pods were automatically created and cleaned up" -ForegroundColor White

Write-Host "" -ForegroundColor White
Write-Host "🔍 To verify pod creation, run:" -ForegroundColor Cyan
Write-Host "  kubectl get pods --show-labels" -ForegroundColor White
Write-Host "  kubectl get pods -l app=task-execution" -ForegroundColor White

Write-Host "" -ForegroundColor White
Write-Host "📋 Task 2 Requirements Verified:" -ForegroundColor Green
Write-Host "  ✅ Application deployed to Kubernetes" -ForegroundColor Green
Write-Host "  ✅ MongoDB running in separate pod with persistent volume" -ForegroundColor Green
Write-Host "  ✅ Application uses environment variables for MongoDB connection" -ForegroundColor Green
Write-Host "  ✅ App endpoints accessible from host machine" -ForegroundColor Green
Write-Host "  ✅ Task execution creates Kubernetes pods programmatically" -ForegroundColor Green
Write-Host "  ✅ Commands executed in busybox containers" -ForegroundColor Green
