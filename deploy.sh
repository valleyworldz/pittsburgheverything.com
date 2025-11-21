#!/bin/bash

# PittsburghEverything.com Deployment Script
# This script prepares your project for deployment

echo "🚀 PittsburghEverything.com Deployment Script"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the project root."
    exit 1
fi

echo "✅ Project structure verified"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git not initialized. Please run 'git init' first."
    exit 1
fi

echo "✅ Git repository found"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Build the project to verify it works
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Push to GitHub: git push origin main"
    echo "2. Go to vercel.com and import your repository"
    echo "3. Add environment variables in Vercel dashboard"
    echo "4. Deploy!"
    echo ""
else
    echo ""
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi
