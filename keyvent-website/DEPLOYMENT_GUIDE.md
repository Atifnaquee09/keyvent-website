# KeyVent Website Deployment Guide for Hostinger VPS

## Overview
This guide provides step-by-step instructions for deploying the complete KeyVent website on a Hostinger VPS, including both frontend and backend components.

## Prerequisites
- Hostinger VPS with root access
- Node.js and npm installed
- MongoDB Atlas account (or MongoDB installed on VPS)
- Domain name configured (optional)

## Backend Deployment

### 1. Server Setup
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2
```

### 2. Backend Deployment
```bash
# Copy backend files to server (from your local machine)
# scp -r /Users/admin/keyvent-backend root@your-vps-ip:/var/www/keyvent-backend

# Navigate to backend directory
cd /var/www/keyvent-backend/server

# Install dependencies
npm install

# Create environment file
cat > .env << EOF
PORT=5003
MONGODB_URI=mongodb+srv://Atif:eNBGlSs7TqtNYErM@cluster0.ngecrax.mongodb.net/
MONGODB_DATABASE=keyvent
NODE_ENV=production
EOF

# Start backend with PM2
pm2 start server.js --name "keyvent-backend"
pm2 startup
pm2 save
```

### 3. Backend API Endpoints
Once deployed, the backend will be accessible at:
- Venues API: `http://your-vps-ip:5003/api/venues`
- Photographers API: `http://your-vps-ip:5003/api/photographers`
- Return Gifts API: `http://your-vps-ip:5003/api/return-gifts`
- Makeover Artists API: `http://your-vps-ip:5003/api/makeover-artists`
- Decorators API: `http://your-vps-ip:5003/api/decorators`
- Upload API: `http://your-vps-ip:5003/api/upload`
- Contact API: `http://your-vps-ip:5003/api/contact`
- Contact Submissions: `http://your-vps-ip:5003/api/contact-submissions`

## Frontend Deployment

### 1. Build for Production
```bash
# On your local machine, build the frontend
cd /Users/admin/keyvent-website
npm run build
```

### 2. Deploy Frontend Files
```bash
# Copy build files to server (from your local machine)
# scp -r /Users/admin/keyvent-website/build root@your-vps-ip:/var/www/keyvent-frontend

# On the VPS, install a web server (nginx example)
sudo apt install nginx -y

# Configure nginx
sudo cat > /etc/nginx/sites-available/keyvent << 'EOF'
server {
    listen 80;
    server_name your-domain.com; # Replace with your domain or VPS IP

    # Frontend static files
    location / {
        root /var/www/keyvent-frontend/build;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://localhost:5003/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/keyvent /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Environment Configuration

### Frontend Environment Variables
Update the frontend build to use your VPS backend URL:
```bash
# In your local frontend .env file before building
REACT_APP_SERVER_URL=http://your-vps-ip:5003
```

### Backend Environment Variables
```bash
# Backend .env file on VPS
PORT=5003
MONGODB_URI=mongodb+srv://Atif:eNBGlSs7TqtNYErM@cluster0.ngecrax.mongodb.net/
MONGODB_DATABASE=keyvent
NODE_ENV=production
```

## SSL Certificate (Optional but Recommended)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add this line:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Maintenance

### PM2 Monitoring
```bash
# Check backend status
pm2 status

# View logs
pm2 logs keyvent-backend

# Restart backend
pm2 restart keyvent-backend

# Stop backend
pm2 stop keyvent-backend
```

### Nginx Monitoring
```bash
# Check nginx status
sudo systemctl status nginx

# Restart nginx
sudo systemctl restart nginx

# View nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## Testing the Deployment

### API Testing
```bash
# Test venues API
curl http://your-vps-ip:5003/api/venues

# Test frontend
curl http://your-vps-ip
```

### Health Checks
1. Backend health: `http://your-vps-ip:5003/api/venues` should return venue data
2. Frontend health: `http://your-vps-ip` should serve the React app
3. API proxy: Frontend should be able to communicate with backend through `/api/` routes

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure backend has proper CORS headers (already configured)
2. **502 Bad Gateway**: Check if backend is running on port 5003
3. **404 Errors**: Verify nginx configuration and file paths
4. **Permission Issues**: Ensure proper file ownership (www-data)

### Logs
```bash
# Backend logs
pm2 logs keyvent-backend

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Nginx access logs
sudo tail -f /var/log/nginx/access.log
```

## Backup and Recovery

### MongoDB Backup
```bash
# Using mongodump (if MongoDB is on VPS)
mongodump --uri="mongodb+srv://Atif:eNBGlSs7TqtNYErM@cluster0.ngecrax.mongodb.net/keyvent" --out=/backup/mongodb

# Using MongoDB Atlas backup feature (recommended)
```

### File Backup
```bash
# Backup frontend files
tar -czvf keyvent-frontend-backup.tar.gz /var/www/keyvent-frontend

# Backup backend files
tar -czvf keyvent-backend-backup.tar.gz /var/www/keyvent-backend
```

## Scaling Considerations

### Load Balancing
For high traffic, consider:
1. Multiple backend instances with PM2 cluster mode
2. CDN for static assets
3. Database indexing and optimization
4. Caching strategies (Redis)

### Performance Monitoring
1. Set up PM2 monitoring with Keymetrics
2. Use Google PageSpeed Insights for frontend optimization
3. Monitor MongoDB performance with Atlas dashboard

## Security Best Practices

1. **Environment Variables**: Never commit .env files to version control
2. **Firewall**: Configure UFW to only allow necessary ports
3. **Updates**: Regularly update system packages and dependencies
4. **Authentication**: Implement proper authentication for admin routes
5. **Rate Limiting**: Add rate limiting to API endpoints
6. **Input Validation**: Validate all user inputs on both frontend and backend