import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo">
              <span className="logo-icon">👑</span>
              <div className="logo-text">
                <span className="logo-main">KEYVENT</span>
                <span className="logo-tagline">Events with Elegance</span>
              </div>
            </div>
          </div>
          
          <div className="footer-contact">
            <div className="contact-info">
              <span className="contact-item">
                <span className="contact-label">Contact:</span>
                <span className="contact-value">keve@keyvent.com</span>
              </span>
              <span className="contact-separator">|</span>
              <span className="contact-item">
                <span className="contact-label">Phone:</span>
                <span className="contact-value">+91 85 95 15 90 90</span>
              </span>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <span className="social-icon">📷</span>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <span className="social-icon">📘</span>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <span className="social-icon">🐦</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2025 KEYVENT. All your Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;