import React from 'react';

const ImpactMetric = ({ 
  icon, 
  value, 
  label, 
  color = '#4CAF50',
  unit = '',
  description = ''
}) => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '25px',
      background: '#f9f9f9',
      borderRadius: '12px',
      border: `3px solid ${color}`,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = `0 8px 25px ${color}30`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <div style={{ 
        fontSize: '3rem', 
        marginBottom: '15px',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
      }}>
        {icon}
      </div>
      <div style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        color: color, 
        marginBottom: '8px',
        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
      }}>
        {value}{unit}
      </div>
      <div style={{ 
        fontSize: '0.9rem', 
        fontWeight: 'bold', 
        color: '#666',
        marginBottom: description ? '8px' : '0'
      }}>
        {label}
      </div>
      {description && (
        <div style={{ 
          fontSize: '0.8rem', 
          color: '#888',
          fontStyle: 'italic'
        }}>
          {description}
        </div>
      )}
    </div>
  );
};

const ImpactMetrics = ({ metrics }) => {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '20px',
      marginBottom: '30px'
    }}>
      {metrics.map((metric, index) => (
        <ImpactMetric key={index} {...metric} />
      ))}
    </div>
  );
};

export { ImpactMetric, ImpactMetrics };
export default ImpactMetrics;