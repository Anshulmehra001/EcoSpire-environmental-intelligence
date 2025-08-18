import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({ 
  type = 'text',
  label,
  placeholder,
  error,
  success,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  size = 'md',
  variant = 'default',
  className = '',
  helperText,
  ...props 
}, ref) => {
  const baseClasses = 'terra-input';
  const sizeClasses = `terra-input--${size}`;
  const variantClasses = `terra-input--${variant}`;
  const stateClasses = [
    error && 'terra-input--error',
    success && 'terra-input--success',
    disabled && 'terra-input--disabled',
    icon && `terra-input--with-icon-${iconPosition}`
  ].filter(Boolean).join(' ');

  const inputClasses = [
    baseClasses,
    sizeClasses,
    variantClasses,
    stateClasses,
    className
  ].filter(Boolean).join(' ');

  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="terra-input-wrapper">
      {label && (
        <label htmlFor={inputId} className="terra-input-label">
          {label}
          {required && <span className="terra-input-required">*</span>}
        </label>
      )}
      
      <div className="terra-input-container">
        {icon && iconPosition === 'left' && (
          <span className="terra-input-icon terra-input-icon--left">
            {icon}
          </span>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <span className="terra-input-icon terra-input-icon--right">
            {icon}
          </span>
        )}
      </div>
      
      {(error || success || helperText) && (
        <div className="terra-input-feedback">
          {error && <span className="terra-input-error">{error}</span>}
          {success && <span className="terra-input-success">{success}</span>}
          {helperText && !error && !success && (
            <span className="terra-input-helper">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;