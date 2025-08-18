import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  icon = null,
  onClick,
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'terra-button';
  const variantClasses = `terra-button--${variant}`;
  const sizeClasses = `terra-button--${size}`;
  const stateClasses = [
    disabled && 'terra-button--disabled',
    loading && 'terra-button--loading'
  ].filter(Boolean).join(' ');

  const buttonClasses = [
    baseClasses,
    variantClasses,
    sizeClasses,
    stateClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="terra-button__spinner">
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.3"/>
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"/>
          </svg>
        </span>
      )}
      {icon && !loading && (
        <span className="terra-button__icon">
          {icon}
        </span>
      )}
      <span className="terra-button__text">
        {children}
      </span>
    </button>
  );
};

export default Button;