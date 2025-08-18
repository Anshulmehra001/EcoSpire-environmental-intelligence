import React from 'react';

const FeatureHeader = ({ 
  icon, 
  title, 
  subtitle, 
  capabilities 
}) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <h2 style={{ 
        fontSize: '3.5rem', 
        color: '#2E7D32', 
        marginBottom: '10px',
        fontWeight: 'bold'
      }}>
        {icon} {title}
      </h2>
      <p style={{ 
        fontSize: '1.3rem', 
        color: '#666', 
        marginBottom: '15px',
        lineHeight: '1.6'
      }}>
        {subtitle}
      </p>
      <div style={{
        background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
        color: 'white',
        padding: '15px 30px',
        borderRadius: '25px',
        display: 'inline-block',
        fontSize: '1rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
        transition: 'transform 0.3s ease'
      }}>
        {capabilities}
      </div>
    </div>
  );
};

export default FeatureHeader;