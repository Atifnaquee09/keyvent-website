import React from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  width,
  height,
  quality = 'auto',
  format = 'auto',
  ...props 
}) => {
  console.log('OptimizedImage received src:', src);
  
  // Handle different types of image URLs
  const getImageSrc = (imageSrc) => {
    console.log('Processing imageSrc:', imageSrc);
    
    // If no image source, return null to use fallback
    if (!imageSrc) {
      return null;
    }
    
    // If it's a blob URL, it's invalid and should be replaced with fallback
    if (imageSrc.startsWith('blob:')) {
      console.log('Detected blob URL, using fallback');
      return null; // Will use fallback
    }
    
    // If it's already an absolute URL (http or https), return as is
    if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
      return imageSrc;
    }
    
    // If it's a relative path starting with /uploads/, prefix with the server URL
    if (imageSrc.startsWith('/uploads/')) {
      const serverUrl = process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in';
      const fullUrl = `${serverUrl}${imageSrc}`;
      console.log('Using server URL for uploads path:', fullUrl);
      return fullUrl;
    }
    
    // If it's any other relative path, serve from the frontend's public directory
    if (imageSrc.startsWith('/')) {
      console.log('Using relative path for frontend public directory:', imageSrc);
      return imageSrc;
    }
    
    // For any other case, return as is
    return imageSrc;
  };

  // Process the image source
  const processedSrc = getImageSrc(src);
  console.log('Processed src:', processedSrc);

  // Create a data URI for fallback image to ensure it always works
  const createFallbackImage = (w, h, text) => {
    const width = w || 400;
    const height = h || 200;
    const displayText = text || 'No Image';
    
    // Simple SVG fallback image with better styling
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f8f9fa"/>
        <rect x="25%" y="25%" width="50%" height="50%" fill="#e9ecef" rx="8" ry="8"/>
        <circle cx="50%" cy="40%" r="8%" fill="#adb5bd"/>
        <rect x="35%" y="55%" width="30%" height="8%" fill="#adb5bd" rx="4" ry="4"/>
        <text x="50%" y="75%" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${Math.min(width, height) / 12}" fill="#495057" text-anchor="middle" dominant-baseline="middle">${displayText}</text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  // Fallback image
  const fallbackImage = createFallbackImage(width, height, alt || 'Image Unavailable');

  return (
    <img
      src={processedSrc || fallbackImage}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      onError={(e) => {
        console.log('Image onError triggered for:', e.target.src);
        // If the processed image fails to load, use the fallback
        if (e.target.src !== fallbackImage) {
          console.log('Switching to fallback image');
          e.target.src = fallbackImage;
        }
      }}
      {...props}
    />
  );
};

export default OptimizedImage;