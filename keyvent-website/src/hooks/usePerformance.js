import { useEffect, useRef } from 'react';
import { measureRenderTime, debounce, throttle } from '../utils/performance';

// Hook to measure component render time
export const useRenderTime = (componentName) => {
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = performance.now();
    
    return () => {
      if (startTimeRef.current) {
        measureRenderTime(componentName, startTimeRef.current);
      }
    };
  }, [componentName]);

  return startTimeRef;
};

// Hook to debounce a function
export const useDebounce = (func, delay) => {
  const debouncedFunc = useRef(debounce(func, delay)).current;
  
  return debouncedFunc;
};

// Hook to throttle a function
export const useThrottle = (func, limit) => {
  const throttledFunc = useRef(throttle(func, limit)).current;
  
  return throttledFunc;
};

// Hook to track window resize events with throttling
export const useThrottledResize = (callback, delay = 100) => {
  const throttledCallback = useThrottle(callback, delay);

  useEffect(() => {
    window.addEventListener('resize', throttledCallback);
    return () => window.removeEventListener('resize', throttledCallback);
  }, [throttledCallback]);
};

// Hook to track scroll events with throttling
export const useThrottledScroll = (callback, delay = 100) => {
  const throttledCallback = useThrottle(callback, delay);

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback);
    return () => window.removeEventListener('scroll', throttledCallback);
  }, [throttledCallback]);
};

// Hook to detect when an element is in viewport
export const useInView = (callback, options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry);
        }
      });
    }, {
      threshold: 0.1,
      ...options
    });

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [callback, options]);

  return elementRef;
};

export default {
  useRenderTime,
  useDebounce,
  useThrottle,
  useThrottledResize,
  useThrottledScroll,
  useInView
};