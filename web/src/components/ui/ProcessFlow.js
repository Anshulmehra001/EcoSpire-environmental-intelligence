import React from 'react';

const ProcessStep = ({ 
  icon, 
  title, 
  description, 
  stepNumber,
  isLast = false 
}) => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '20px',
      position: 'relative'
    }}>
      {/* Step Number Badge */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)'
      }}>
        {stepNumber}
      </div>

      {/* Icon */}
      <div style={{ 
        fontSize: '3rem', 
        marginBottom: '15px',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
      }}
      >
        {icon}
      </div>

      {/* Title */}
      <h4 style={{ 
        color: '#2E7D32', 
        marginBottom: '10px',
        fontSize: '1.1rem',
        fontWeight: 'bold'
      }}>
        {title}
      </h4>

      {/* Description */}
      <p style={{ 
        color: '#666',
        fontSize: '0.9rem',
        lineHeight: '1.4',
        margin: '0'
      }}>
        {description}
      </p>

      {/* Arrow to next step */}
      {!isLast && (
        <div style={{
          position: 'absolute',
          right: '-15px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '2rem',
          color: '#4CAF50',
          zIndex: 1
        }}>
          →
        </div>
      )}
    </div>
  );
};

const ProcessFlow = ({ steps, title }) => {
  return (
    <div style={{ marginBottom: '30px' }}>
      {title && (
        <h3 style={{ 
          textAlign: 'center',
          color: '#2E7D32',
          marginBottom: '30px',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          {title}
        </h3>
      )}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        position: 'relative',
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
      }}>
        {steps.map((step, index) => (
          <ProcessStep 
            key={index} 
            {...step} 
            stepNumber={index + 1}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessFlow;