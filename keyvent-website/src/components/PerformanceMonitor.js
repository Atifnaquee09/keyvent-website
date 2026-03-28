import React, { useEffect, useState } from 'react';
import { trackPageLoad, trackResourcePerformance, trackMemoryUsage } from '../utils/performance';

const PerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    // Track page load performance
    trackPageLoad();
    
    // Track resource performance
    trackResourcePerformance();
    
    // Track memory usage in development
    if (process.env.NODE_ENV === 'development') {
      trackMemoryUsage();
      
      // Update memory usage every 5 seconds in development
      const memoryInterval = setInterval(() => {
        if ('memory' in performance) {
          const memory = performance.memory;
          setPerformanceData({
            used: Math.round(memory.usedJSHeapSize / 1048576),
            total: Math.round(memory.totalJSHeapSize / 1048576),
            limit: Math.round(memory.jsHeapSizeLimit / 1048576)
          });
        }
      }, 5000);
      
      return () => clearInterval(memoryInterval);
    }
  }, []);

  // In development, show memory usage
  if (process.env.NODE_ENV === 'development' && performanceData) {
    return (
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-70 text-white text-xs p-2 rounded z-50">
        <div>Memory: {performanceData.used}MB / {performanceData.total}MB</div>
      </div>
    );
  }

  return null;
};

export default PerformanceMonitor;