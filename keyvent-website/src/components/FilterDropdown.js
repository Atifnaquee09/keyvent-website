import React, { useState, useRef, useEffect } from 'react';
import './FilterDropdown.css';

const FilterDropdown = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  variant = 'default',
  isActive = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (!value) return label;
    const option = options.find(opt => opt.value === value);
    return option ? option.label : label;
  };

  const baseClasses = `filter-dropdown ${variant} ${isActive ? 'active' : ''} ${className}`;

  return (
    <div className={baseClasses} ref={dropdownRef}>
      <button 
        className="filter-dropdown-trigger"
        onClick={handleToggle}
        type="button"
      >
        <span className="filter-dropdown-label">{getDisplayValue()}</span>
        <svg 
          className={`filter-dropdown-arrow ${isOpen ? 'open' : ''}`} 
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
      </button>

      <div className={`filter-dropdown-menu ${isOpen ? 'open' : ''}`}>
        {/* Clear option */}
        {value && (
          <button
            className="filter-dropdown-item clear-option"
            onClick={() => handleOptionSelect('')}
          >
            Clear {label}
          </button>
        )}
        
        {options.map((option, index) => (
          <button
            key={index}
            className={`filter-dropdown-item ${value === option.value ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterDropdown;