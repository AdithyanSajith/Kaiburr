#!/usr/bin/env powershell

# Task 3 - Web UI Deployment Script
# Builds and serves the React application

param(
    [switch]$Build,
    [switch]$Serve,
    [switch]$Dev,
    [switch]$Help
)

$ErrorActionPreference = "Stop"

function Show-Help {
    Write-Host "Task 3 - Web UI Deployment Script" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\deploy-ui.ps1 -Dev     # Start development server"
    Write-Host "  .\deploy-ui.ps1 -Build   # Build for production"
    Write-Host "  .\deploy-ui.ps1 -Serve   # Serve production build"
    Write-Host "  .\deploy-ui.ps1 -Help    # Show this help"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Green
    Write-Host "  .\deploy-ui.ps1 -Dev     # http://localhost:3000"
    Write-Host "  .\deploy-ui.ps1 -Build && .\deploy-ui.ps1 -Serve"
    Write-Host ""
}

function Test-Prerequisites {
    Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow
    
    # Check Node.js
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        throw "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    }
    
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    
    # Check npm
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        throw "npm is not installed. Please install npm."
    }
    
    $npmVersion = npm --version
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
    
    # Check if we're in the right directory
    if (-not (Test-Path "package.json")) {
        throw "package.json not found. Please run this script from the task-management-ui directory."
    }
    
    Write-Host "✅ Project directory verified" -ForegroundColor Green
}

function Install-Dependencies {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    
    if (-not (Test-Path "node_modules")) {
        Write-Host "Installing npm packages..." -ForegroundColor Cyan
        npm install --legacy-peer-deps
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to install dependencies"
        }
        Write-Host "✅ Dependencies installed" -ForegroundColor Green
    }
    else {
        Write-Host "✅ Dependencies already installed" -ForegroundColor Green
    }
}

function Start-DevServer {
    Write-Host "🚀 Starting development server..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Application will be available at:" -ForegroundColor Cyan
    Write-Host "  🌐 http://localhost:3000" -ForegroundColor Green
    Write-Host ""
    Write-Host "Make sure your backend API is running:" -ForegroundColor Yellow
    Write-Host "  📡 Task 1: http://localhost:8080" -ForegroundColor Cyan
    Write-Host "  📡 Task 2: http://localhost:30080" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    
    npm start
}

function Build-Production {
    Write-Host "🏗️ Building production version..." -ForegroundColor Yellow
    
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed"
    }
    
    Write-Host "✅ Production build completed!" -ForegroundColor Green
    Write-Host "📁 Build files are in the 'build' directory" -ForegroundColor Cyan
}

function Serve-Production {
    Write-Host "🌐 Serving production build..." -ForegroundColor Yellow
    
    if (-not (Test-Path "build")) {
        throw "Production build not found. Run with -Build first."
    }
    
    # Check if serve is installed
    $serveInstalled = npm list -g serve 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Installing serve globally..." -ForegroundColor Cyan
        npm install -g serve
    }
    
    Write-Host ""
    Write-Host "Production server will be available at:" -ForegroundColor Cyan
    Write-Host "  🌐 http://localhost:3000" -ForegroundColor Green
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    
    npx serve -s build
}

# Main execution
try {
    Write-Host ""
    Write-Host "🎨 Task 3: Web UI Forms - React 19 + TypeScript + Ant Design" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    
    if ($Help) {
        Show-Help
        exit 0
    }
    
    Test-Prerequisites
    Install-Dependencies
    
    if ($Dev) {
        Start-DevServer
    }
    elseif ($Build) {
        Build-Production
    }
    elseif ($Serve) {
        Serve-Production
    }
    else {
        Write-Host "⚠️ No action specified. Use -Help to see available options." -ForegroundColor Yellow
        Show-Help
    }
    
}
catch {
    Write-Host ""
    Write-Host "❌ Error: $_" -ForegroundColor Red
    Write-Host ""
    exit 1
}
