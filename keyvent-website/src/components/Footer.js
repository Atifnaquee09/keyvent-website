import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';

const Footer = () => {
  const [logoError, setLogoError] = useState(false);
  return (
    <footer className="bg-primary-900 text-white py-8 xs:py-6 sm:py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xs:flex-col sm:flex-col lg:flex-row justify-between items-center mb-6 xs:mb-4 sm:mb-8">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-6 xs:mb-4 sm:mb-6 lg:mb-0">
            {!logoError ? (
              <OptimizedImage 
                src="/assets/logo.png" 
                alt="KeyVent Logo" 
                className="h-12 w-24 xs:h-10 xs:w-20"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-24 h-12 xs:w-20 xs:h-10 bg-gold-600 rounded-2xl flex items-center justify-center">
                {/* <span className="text-primary-900 text-xl xs:text-lg font-bold">K</span> */}
              </div>
            )}
            <div className="flex flex-col">
              {/* <span className="font-playfair text-lg xs:text-base lg:text-2xl font-bold text-gold-600 tracking-wider">
                KEYVENT
              </span> */}
              {/* <span className="font-inter text-xs text-purple-100 italic tracking-wide">
                Events with Elegance
              </span> */}
            </div>
          </div>
          
          {/* Contact Info & Social Links */}
          <div className="flex flex-col items-center lg:items-end space-y-4">
            <div className="flex flex-col xs:flex-col sm:flex-row items-center space-y-2 xs:space-y-1 sm:space-y-0 sm:space-x-4 text-sm xs:text-xs font-inter">
              <div className="flex items-center space-x-1">
                <span className="text-purple-100">Contact :  keyvent.in@gmail.com</span>
                {/* <span className="text-white"> </span> */}
              </div>
              <span className="hidden sm:block text-purple-100" aria-hidden="true">|</span>
              <div className="flex items-center space-x-1">
                <span className="text-purple-100">Phone:</span>
                <span className="text-white">+91 85 95 15 90 90</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3 xs:space-x-2">
              <a 
                href="http://instagram.com/keyvent.in/" 
                className="w-8 h-8 xs:w-7 xs:h-7 bg-gold-600 bg-opacity-20 rounded-full flex items-center justify-center hover:bg-gold-600 hover:bg-opacity-100 transition-all duration-300 group cursor-pointer"
                aria-label="Visit our Instagram page"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram text-gold-600 group-hover:text-primary-900 text-base xs:text-sm"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-purple-300 border-opacity-30 pt-4 xs:pt-3 text-center">
          <p className="font-inter text-xs xs:text-[10px] sm:text-sm text-purple-100">
            © 2025 KEYVENT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;