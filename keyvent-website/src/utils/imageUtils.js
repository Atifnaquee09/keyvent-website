/**
 * Utility function to construct full image URLs from database paths
 * Handles various URL formats and ensures proper server URL prefixing
 * 
 * @param {string} imagePath - The image path from database (e.g., "/uploads/filename.jpg")
 * @param {string} serverUrl - Optional server URL override (defaults to REACT_APP_SERVER_URL)
 * @returns {string|null} - Full image URL or null if invalid
 */
export const getImageUrl = (imagePath, serverUrl = null) => {
  if (!imagePath) return null;
  
  // If it's already a full URL (http/https), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a blob URL, return as is (for previews)
  if (imagePath.startsWith('blob:')) {
    return imagePath;
  }
  
  // If it's a relative path starting with /uploads/, prefix with server URL
  if (imagePath.startsWith('/uploads/')) {
    const baseUrl = serverUrl || process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in';
    return `${baseUrl}${imagePath}`;
  }
  
  // For any other relative path, return as is (will be served from public directory)
  return imagePath;
};

/**
 * Helper function to safely construct image URLs with fallback
 * Used in places where we need to ensure a valid URL is always returned
 * 
 * @param {string} imagePath - The image path from database
 * @param {string} fallbackUrl - Fallback URL if image path is invalid
 * @returns {string} - Valid image URL
 */
export const getImageUrlWithFallback = (imagePath, fallbackUrl = null) => {
  const url = getImageUrl(imagePath);
  if (url) return url;
  
  // Return fallback or placeholder
  return fallbackUrl || 'https://placehold.co/400x300/4a9b8f/white?text=Image+Not+Available';
};

