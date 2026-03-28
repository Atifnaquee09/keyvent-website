import React, { useState } from 'react';
import './CtaButton.css';

const CtaButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  dropdown = null,
  href = null,
  className = '',
  disabled = false,
  ...props 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (e) => {
    if (disabled) return;
    
    if (dropdown) {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    } else if (onClick) {
      onClick(e);
    }
  };

  const baseClasses = `cta-button-component ${size} ${variant} ${className}`;
  
  const Component = href ? 'a' : 'button';
  
  const componentProps = {
    className: baseClasses,
    onClick: handleClick,
    disabled,
    ...(href && { href, target: '_blank', rel: 'noopener noreferrer' }),
    ...props
  };

  return (
    <div className="cta-button-wrapper">
      <Component {...componentProps}>
        <span className="cta-button-content">{children}</span>
        {dropdown && (
          <svg 
            className={`cta-button-arrow ${isDropdownOpen ? 'open' : ''}`} 
            width="16" 
            height="16" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
        
        {/* Shimmer effect overlay */}
        <div className="cta-button-shimmer"></div>
      </Component>
      
      {/* Dropdown Menu */}
      {dropdown && (
        <div className={`cta-dropdown ${isDropdownOpen ? 'open' : ''}`}>
          {dropdown.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="cta-dropdown-item"
              onClick={() => {
                setIsDropdownOpen(false);
                if (item.onClick) item.onClick();
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CtaButton;