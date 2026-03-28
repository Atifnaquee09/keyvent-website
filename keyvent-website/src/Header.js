import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <span className="logo-icon">👑</span>
          <div className="logo-text">
            <span className="logo-main">KEYVENT</span>
            <span className="logo-tagline">Events with Elegance</span>
          </div>
        </div>
        <nav className="nav">
          <a href="#home" className="nav-link active">Home</a>
          <a href="#about" className="nav-link">About Us</a>
          <a href="#vision" className="nav-link">Vision</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;