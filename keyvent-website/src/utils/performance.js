// Utility functions for performance monitoring and optimization

// Measure component render performance
export const measureRenderTime = (componentName, startTime) => {
  const endTime = performance.now();
  const renderTime = endTime - startTime;
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[PERFORMANCE] ${componentName} render time: ${renderTime.toFixed(2)}ms`);
  }
  
  // In production, you might want to send this data to analytics
  // For example: sendToAnalytics('component_render_time', { componentName, renderTime });
  
  return renderTime;
};

// Track page load performance
export const trackPageLoad = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          const metrics = {
            dnsLookup: perfData.domainLookupEnd - perfData.domainLookupStart,
            tcpConnect: perfData.connectEnd - perfData.connectStart,
            requestTime: perfData.responseEnd - perfData.requestStart,
            domParse: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            pageLoad: perfData.loadEventEnd - perfData.loadEventStart,
            fetchTime: perfData.fetchStart,
            totalTime: perfData.loadEventEnd - perfData.fetchStart
          };
          
          // Log to console in development
          if (process.env.NODE_ENV === 'development') {
            console.log('[PERFORMANCE] Page load metrics:', metrics);
          }
          
          // In production, send to analytics
          // sendToAnalytics('page_load_metrics', metrics);
        }
      }, 0);
    });
  }
};

// Track resource loading performance
export const trackResourcePerformance = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const resources = performance.getEntriesByType('resource');
        const slowResources = resources
          .filter(resource => resource.duration > 1000) // Resources taking more than 1 second
          .sort((a, b) => b.duration - a.duration)
          .slice(0, 10); // Top 10 slowest resources
        
        if (slowResources.length > 0 && process.env.NODE_ENV === 'development') {
          console.log('[PERFORMANCE] Slow resources:', slowResources);
        }
      }, 2000); // Wait a bit for all resources to load
    });
  }
};

// Memory usage tracking
export const trackMemoryUsage = () => {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memory = performance.memory;
    console.log('[PERFORMANCE] Memory usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
    });
  }
};

// Utility to debounce function calls
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Utility to throttle function calls
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading for images and components
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Export all functions
export default {
  measureRenderTime,
  trackPageLoad,
  trackResourcePerformance,
  trackMemoryUsage,
  debounce,
  throttle,
  lazyLoadImages
};