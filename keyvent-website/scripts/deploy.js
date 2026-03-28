#!/usr/bin/env node

// Deployment script for KeyVent website
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting KeyVent website deployment...');

try {
  // 1. Clean previous build
  console.log('🧹 Cleaning previous build...');
  execSync('rm -rf build', { stdio: 'inherit' });
  
  // 2. Build for production with optimizations
  console.log('🏗️ Building for production...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // 3. Analyze bundle size (optional)
  console.log('📊 Analyzing bundle size...');
  try {
    execSync('npm run analyze', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Bundle analysis skipped due to missing source maps');
  }
  
  // 4. Optimize images (if imageoptim-cli is installed)
  console.log('🖼️ Optimizing images...');
  try {
    execSync('npx imageoptim-cli build/static/media/*', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Image optimization skipped (imageoptim-cli not found)');
  }
  
  // 5. Generate sitemap
  console.log('🗺️ Generating sitemap...');
  generateSitemap();
  
  // 6. Generate robots.txt
  console.log('🤖 Generating robots.txt...');
  generateRobotsTxt();
  
  console.log('✅ Deployment preparation completed successfully!');
  console.log('📁 Build files are ready in the "build" directory');
  console.log('📦 You can now deploy the build folder to your hosting provider');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://keyvent.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://keyvent.com/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://keyvent.com/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://keyvent.com/services/venues</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://keyvent.com/services/photo-video</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://keyvent.com/services/decorators</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://keyvent.com/services/makeover</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://keyvent.com/services/entertainers</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://keyvent.com/services/return-gifts</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://keyvent.com/services/destination</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://keyvent.com/services/specials</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
  
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully');
}

function generateRobotsTxt() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://keyvent.com/sitemap.xml

User-agent: *
Disallow: /api/
Disallow: /admin/
`;
  
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'robots.txt'), robotsTxt);
  console.log('✅ robots.txt generated successfully');
}