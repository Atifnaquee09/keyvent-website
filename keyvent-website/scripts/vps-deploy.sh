#!/bin/bash

# KeyVent VPS Deployment Script
# This script prepares the application for deployment on Hostinger VPS

echo "🚀 Starting KeyVent VPS Deployment Preparation..."

# Create deployment package
echo "📦 Creating deployment package..."

# Build frontend
echo "🏗️ Building frontend..."
npm run build

# Create deployment directories
DEPLOY_DIR="/tmp/keyvent-deployment"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# Copy frontend build
echo "📋 Copying frontend build..."
cp -r build $DEPLOY_DIR/frontend

# Copy backend
echo "📋 Copying backend..."
cp -r ../keyvent-backend/server $DEPLOY_DIR/backend

# Create installation instructions
cat > $DEPLOY_DIR/INSTALLATION_INSTRUCTIONS.txt << 'EOF'
KeyVent Application Deployment Instructions
=========================================

1. Backend Deployment:
   - Upload the backend directory to your VPS
   - Install dependencies: npm install
   - Create .env file with your MongoDB credentials:
     PORT=5002
     MONGODB_URI=mongodb+srv://Key:Key@cluster0.ngecrax.mongodb.net/
     MONGODB_DATABASE=keyvent
     NODE_ENV=production
   - Start with PM2: pm2 start server.js --name "keyvent-backend"

2. Frontend Deployment:
   - Upload the frontend/build directory to your web server
   - Configure your web server (nginx/Apache) to serve static files
   - Configure proxy to backend API endpoints (/api/*) to http://localhost:5002

3. Web Server Configuration (nginx example):
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           root /path/to/frontend/build;
           index index.html;
           try_files $uri $uri/ /index.html;
       }
       
       location /api/ {
           proxy_pass http://localhost:5002/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }

4. Start services and test the deployment
EOF

# Create a zip file for easy transfer
echo "🗜️ Creating deployment package..."
cd /tmp
zip -r keyvent-deployment.zip keyvent-deployment

echo "✅ Deployment package created successfully!"
echo "📁 Location: /tmp/keyvent-deployment.zip"
echo "📋 Contents:"
echo "   - frontend/ (React build files)"
echo "   - backend/ (Node.js server files)"
echo "   - INSTALLATION_INSTRUCTIONS.txt"

echo "📤 Transfer this file to your VPS and follow the instructions for deployment."