import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import './Header.css';

const Header = () => {
  const [logoError, setLogoError] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const servicePages = [
    { name: 'Venues', path: '/services/venues', color: 'text-light-maroon' },
    { name: 'Photo/Videographer', path: '/services/photo-video' },
    { name: 'Decorators', path: '/services/decorators' },
    { name: 'Makeover Artist', path: '/services/makeover' },
    { name: 'Entertainers', path: '/services/entertainers' },
    { name: 'Return Gifts', path: '/services/return-gifts' },
    { name: 'Destination Events', path: '/services/destination' },
    { name: 'KeyVent Specials', path: '/services/specials' },
  ];

  const isActivePage = (path) => location.pathname === path;

  const handleServicesToggle = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Slide-Out Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 xs:hidden sm:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Slide-Out Drawer */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-primary-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } xs:hidden sm:hidden overflow-y-auto pt-20`}
            role="dialog"
            aria-labelledby="mobile-menu-title"
            aria-modal="true"
          >
            <h2 id="mobile-menu-title" className="sr-only">Navigation Menu</h2>
            <div className="flex flex-col space-y-1 px-4 py-6">
              {/* Home */}
              <Link
                to="/"
                className={`px-4 py-3 rounded-lg font-inter font-medium transition-all duration-200 ${
                  isActivePage('/')
                    ? 'bg-gold-600 text-primary-900'
                    : 'text-purple-100 hover:bg-purple-800 hover:text-gold-600'
                }`}
                onClick={closeMobileMenu}
                aria-current={isActivePage('/') ? 'page' : undefined}
              >
                🏠 Home
              </Link>

              {/* About */}
              <Link
                to="/about"
                className={`px-4 py-3 rounded-lg font-inter font-medium transition-all duration-200 ${
                  isActivePage('/about')
                    ? 'bg-gold-600 text-primary-900'
                    : 'text-purple-100 hover:bg-purple-800 hover:text-gold-600'
                }`}
                onClick={closeMobileMenu}
                aria-current={isActivePage('/about') ? 'page' : undefined}
              >
                ℹ️ About
              </Link>

              {/* Divider */}
              <div className="my-2 border-t border-purple-300 border-opacity-30" aria-hidden="true"></div>

              {/* Services Header */}
              <p className="px-4 py-2 font-inter font-bold text-gold-600 text-sm uppercase tracking-wider" id="services-menu-label">
                🎯 Services
              </p>

              {/* Services Items */}
              {servicePages.map((service, idx) => (
                <Link
                  key={idx}
                  to={service.path}
                  className={`px-4 py-3 rounded-lg font-inter font-medium transition-all duration-200 ml-2 ${
                    isActivePage(service.path)
                      ? 'bg-gold-600 text-primary-900 border-l-4 border-gold-400'
                      : 'text-purple-100 hover:bg-purple-800 hover:text-gold-600 border-l-4 border-transparent'
                  }`}
                  onClick={closeMobileMenu}
                  aria-current={isActivePage(service.path) ? 'page' : undefined}
                >
                  {service.name}
                </Link>
              ))}

              {/* Divider */}
              <div className="my-2 border-t border-purple-300 border-opacity-30" aria-hidden="true"></div>

              {/* Contact */}
              <Link
                to="/contact"
                className={`px-4 py-3 rounded-lg font-inter font-medium transition-all duration-200 ${
                  isActivePage('/contact')
                    ? 'bg-gold-600 text-primary-900'
                    : 'text-purple-100 hover:bg-purple-800 hover:text-gold-600'
                }`}
                onClick={closeMobileMenu}
                aria-current={isActivePage('/contact') ? 'page' : undefined}
              >
                📞 Contact
              </Link>

              {/* Venue Management - Only show if logged in */}
              {localStorage.getItem('isVenueManager') && (
                <Link
                  to="/add-venue"
                  className={`px-4 py-3 rounded-lg font-inter font-medium transition-all duration-200 ${
                    isActivePage('/add-venue')
                      ? 'bg-gold-600 text-primary-900'
                      : 'text-purple-100 hover:bg-purple-800 hover:text-gold-600'
                  }`}
                  onClick={closeMobileMenu}
                  aria-current={isActivePage('/add-venue') ? 'page' : undefined}
                >
                  🏢 Add Venue
                </Link>
              )}
              
              {/* Admin Panel - Only show if admin is logged in */}
              {localStorage.getItem('isAdmin') && (
                <Link
                  to="/admin"
                  className={`px-4 py-3 rounded-lg font-inter font-medium transition-all duration-200 ${
                    isActivePage('/admin')
                      ? 'bg-gold-600 text-primary-900'
                      : 'text-purple-100 hover:bg-purple-800 hover:text-gold-600'
                  }`}
                  onClick={closeMobileMenu}
                  aria-current={isActivePage('/admin') ? 'page' : undefined}
                >
                  ⚙️ Admin Panel
                </Link>
              )}

              {/* Bottom Spacing */}
              <div className="py-4" aria-hidden="true"></div>
            </div>
          </div>
        </>
      )}

      <header className="bg-primary-900 fixed top-0 w-full z-50 shadow-lg" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3" aria-label="KeyVent Events Home">
              {!logoError ? (
                <OptimizedImage
                  src="/assets/logo.png"
                  alt="KeyVent Logo"
                  className="h-12 w-24 xs:h-10 xs:w-20"
                  onError={() => {
                    console.log('Logo failed to load, showing fallback');
                    setLogoError(true);
                  }}
                  onLoad={() => console.log('Logo loaded successfully')}
                />
              ) : (
                <div className="w-24 h-12 xs:w-20 xs:h-10 bg-gold-600 rounded-2xl flex items-center justify-center">
                  <span className="text-primary-900 text-xl xs:text-lg font-bold">K</span>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              <Link
                to="/"
                className={`font-inter font-semibold text-lg transition-all duration-300 cursor-pointer relative ${
                  isActivePage('/') ? 'text-gold-600' : 'text-purple-100 hover:text-gold-600'
                }`}
                aria-current={isActivePage('/') ? 'page' : undefined}
              >
                Home
                {isActivePage('/') && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-600 rounded-full" aria-hidden="true"></span>
                )}
              </Link>

              <Link
                to="/about"
                className={`font-inter font-semibold text-lg transition-all duration-300 cursor-pointer relative ${
                  isActivePage('/about') ? 'text-gold-600' : 'text-purple-100 hover:text-gold-600'
                }`}
                aria-current={isActivePage('/about') ? 'page' : undefined}
              >
                About
                {isActivePage('/about') && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-600 rounded-full" aria-hidden="true"></span>
                )}
              </Link>

              {/* Services Dropdown */}
              <div className="nav-dropdown relative">
                <button 
                  className="font-inter font-semibold text-lg text-purple-100 hover:text-gold-600 transition-all duration-300 flex items-center space-x-1.5 cursor-pointer"
                  onClick={handleServicesToggle}
                  aria-expanded={isServicesOpen}
                  aria-haspopup="true"
                  aria-label="Services menu"
                >
                  <span>Services</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className={`dropdown-menu ${isServicesOpen ? 'open' : ''}`} role="menu" aria-labelledby="services-menu-label">
                  {servicePages.map((service, idx) => (
                      <Link
                        key={idx}
                        to={service.path}
                        className="dropdown-item"
                        role="menuitem"
                      >
                        {service.name}
                      </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className={`font-inter font-semibold text-lg transition-all duration-300 cursor-pointer relative ${
                  isActivePage('/contact') ? 'text-gold-600' : 'text-purple-100 hover:text-gold-600'
                }`}
                aria-current={isActivePage('/contact') ? 'page' : undefined}
              >
                Contact
                {isActivePage('/contact') && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-600 rounded-full" aria-hidden="true"></span>
                )}
              </Link>

              {/* Venue Management Link - Only show if logged in */}
              {localStorage.getItem('isVenueManager') && (
                <Link
                  to="/add-venue"
                  className={`font-inter font-semibold text-lg transition-all duration-300 cursor-pointer relative ${
                    isActivePage('/add-venue') ? 'text-gold-600' : 'text-purple-100 hover:text-gold-600'
                  }`}
                  aria-current={isActivePage('/add-venue') ? 'page' : undefined}
                >
                  Add Venue
                  {isActivePage('/add-venue') && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-600 rounded-full" aria-hidden="true"></span>
                  )}
                </Link>
              )}
              
              {/* Admin Panel Link - Only show if admin is logged in */}
              {localStorage.getItem('isAdmin') && (
                <Link
                  to="/admin"
                  className={`font-inter font-semibold text-lg transition-all duration-300 cursor-pointer relative ${
                    isActivePage('/admin') ? 'text-gold-600' : 'text-purple-100 hover:text-gold-600'
                  }`}
                  aria-current={isActivePage('/admin') ? 'page' : undefined}
                >
                  Admin Panel
                  {isActivePage('/admin') && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-600 rounded-full" aria-hidden="true"></span>
                  )}
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gold-600 hover:text-gold-400 cursor-pointer relative z-50 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isMobileMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;