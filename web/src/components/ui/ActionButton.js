import React from 'react';

const ActionButton = ({ 
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  icon = null,
  disabled = false,
  loading = false,
  fullWidth = false,
  style = {}
}) => {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
      color: 'white',
      border: 'none',
      hoverTransform: 'translateY(-2px)',
      hoverShadow: '0 8px 25px rgba(46, 125, 50, 0.4)'
    },
    secondary: {
      background: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)',
      color: 'white',
      border: 'none',
      hoverTransform: 'translateY(-2px)',
      hoverShadow: '0 8px 25px rgba(25, 118, 210, 0.4)'
    },
    warning: {
      background: 'linear-gradient(135deg, #F57C00 0%, #FF9800 100%)',
      color: 'white',
      border: 'none',
      hoverTransform: 'translateY(-2px)',
      hoverShadow: '0 8px 25px rgba(245, 124, 0, 0.4)'
    },
    danger: {
      background: 'linear-gradient(135deg, #D32F2F 0%, #f44336 100%)',
      color: 'white',
      border: 'none',
      hoverTransform: 'translateY(-2px)',
      hoverShadow: '0 8px 25px rgba(211, 47, 47, 0.4)'
    },
    outline: {
      background: 'transparent',
      color: '#2E7D32',
      border: '2px solid #2E7D32',
      hoverTransform: 'translateY(-2px)',
      hoverShadow: '0 8px 25px rgba(46, 125, 50, 0.2)',
      hoverBackground: '#2E7D32',
      hoverColor: 'white'
    }
  };

  const sizes = {
    small: { padding: '8px 16px', fontSize: '0.9rem' },
    medium: { padding: '12px 24px', fontSize: '1rem' },
    large: { padding: '15px 30px', fontSize: '1.1rem' }
  };

  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.medium;

  const buttonStyle = {
    ...sizeStyle,
    ...variantStyle,
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: icon ? '8px' : '0',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled || loading ? 0.6 : 1,
    position: 'relative',
    overflow: 'hidden',
    ...style
  };

  const handleMouseEnter = (e) => {
    if (disabled || loading) return;
    e.currentTarget.style.transform = variantStyle.hoverTransform;
    e.currentTarget.style.boxShadow = variantStyle.hoverShadow;
    if (variantStyle.hoverBackground) {
      e.currentTarget.style.background = variantStyle.hoverBackground;
      e.currentTarget.style.color = variantStyle.hoverColor;
    }
  };

  const handleMouseLeave = (e) => {
    if (disabled || loading) return;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
    if (variantStyle.hoverBackground) {
      e.currentTarget.style.background = variantStyle.background;
      e.currentTarget.style.color = variantStyle.color;
    }
  };

  return (
    <button
      style={buttonStyle}
      onClick={disabled || loading ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
    >
      {loading && (
        <div style={{
          width: '16px',
          height: '16px',
          border: '2px solid transparent',
          borderTop: '2px solid currentColor',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      )}
      {!loading && icon && <span>{icon}</span>}
      {!loading && children}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};

export default ActionButton;