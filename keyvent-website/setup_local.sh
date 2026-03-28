#!/bin/bash

# Setup script for local development of Venue Upload System

echo "🚀 Setting up Venue Upload System for local development..."

# Set correct permissions
echo "📁 Setting file permissions..."
chmod 755 public/images
chmod -R 755 api

echo "✅ Permissions set!"

# Create venues directory if it doesn't exist
echo "📂 Creating venues directory..."
mkdir -p public/images/venues
chmod 755 public/images/venues

echo "✅ Directories created!"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start backend server: cd keyvent-backend/server && node server.js"
echo "2. In another terminal, start React: npm start"
echo "3. Access the app at http://localhost:3000"
echo ""