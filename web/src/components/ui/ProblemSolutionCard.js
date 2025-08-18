import React from 'react';

const ProblemSolutionCard = ({ 
  type, 
  title, 
  content, 
  highlights,
  color = '#4CAF50'
}) => {
  const isProblem = type === 'problem';
  const cardColor = isProblem ? '#f44336' : color;
  const bgGradient = isProblem 
    ? 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)'
    : `linear-gradient(135deg, ${cardColor}20 0%, ${cardColor}40 100%)`;

  return (
    <div className="card" style={{
      marginBottom: '30px',
      background: bgGradient,
      border: `2px solid ${cardColor}`,
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}>
      <h3 style={{ 
        color: cardColor, 
        marginBottom: '15px',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center'
      }}>
        <span style={{ marginRight: '10px', fontSize: '1.5rem' }}>
          {isProblem ? '🚨' : '💡'}
        </span>
        {title}
      </h3>
      <p style={{ 
        fontSize: '1.1rem', 
        lineHeight: '1.6', 
        marginBottom: '15px',
        color: '#333'
      }}>
        {content}
      </p>
      {highlights && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '15px',
          borderRadius: '8px',
          fontSize: '0.95rem',
          lineHeight: '1.8',
          border: `1px solid ${cardColor}30`
        }}>
          {highlights.map((highlight, index) => (
            <div key={index} style={{ 
              marginBottom: index < highlights.length - 1 ? '8px' : '0',
              display: 'flex',
              alignItems: 'flex-start'
            }}>
              <span style={{ 
                color: cardColor, 
                marginRight: '8px',
                fontWeight: 'bold'
              }}>•</span>
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemSolutionCard;