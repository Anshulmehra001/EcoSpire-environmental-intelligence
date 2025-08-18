import React from 'react';

const ThreatLevel = {
  LOW: { color: '#4CAF50', label: 'Low', gradient: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)' },
  MEDIUM: { color: '#FFC107', label: 'Medium', gradient: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)' },
  HIGH: { color: '#FF9800', label: 'High', gradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' },
  CRITICAL: { color: '#f44336', label: 'Critical', gradient: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)' }
};

const ThreatMetric = ({ label, value, maxValue = 100, unit = '%' }) => {
  const percentage = typeof value === 'number' ? (value / maxValue) * 100 : 0;
  const threatLevel = percentage > 80 ? 'CRITICAL' : percentage > 60 ? 'HIGH' : percentage > 40 ? 'MEDIUM' : 'LOW';
  const config = ThreatLevel[threatLevel];

  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <span style={{ 
          fontSize: '0.9rem', 
          fontWeight: 'bold',
          color: '#333'
        }}>
          {label}
        </span>
        <span style={{ 
          fontSize: '0.9rem', 
          fontWeight: 'bold',
          color: config.color
        }}>
          {value}{unit}
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${config.color}80, ${config.color})`,
          borderRadius: '4px',
          transition: 'width 0.8s ease-in-out'
        }} />
      </div>
    </div>
  );
};

const ThreatAssessment = ({ 
  species, 
  threatLevel, 
  impact,
  confidence = 0,
  metrics = []
}) => {
  const config = ThreatLevel[threatLevel] || ThreatLevel.LOW;

  return (
    <div style={{
      background: config.gradient,
      padding: '20px',
      borderRadius: '12px',
      border: `2px solid ${config.color}`,
      marginBottom: '20px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h4 style={{ 
          color: config.color, 
          margin: 0,
          fontSize: '1.3rem',
          fontWeight: 'bold'
        }}>
          {species ? `Threat Assessment: ${species}` : 'Threat Assessment'}
        </h4>
        <div style={{
          background: config.color,
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}>
          {config.label} Risk
        </div>
      </div>

      {/* Confidence Score */}
      {confidence > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <ThreatMetric 
            label="Detection Confidence" 
            value={(confidence * 100).toFixed(1)} 
            maxValue={100}
            unit="%" 
          />
        </div>
      )}

      {/* Metrics Grid */}
      {metrics.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          {metrics.map((metric, index) => (
            <div key={index}>
              <ThreatMetric {...metric} />
            </div>
          ))}
        </div>
      )}

      {/* Impact Description */}
      {impact && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '15px',
          borderRadius: '8px',
          border: `1px solid ${config.color}30`
        }}>
          <h5 style={{ 
            color: config.color, 
            marginBottom: '10px',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            Impact Assessment
          </h5>
          {typeof impact === 'string' ? (
            <p style={{ 
              margin: 0, 
              fontSize: '0.9rem',
              lineHeight: '1.5',
              color: '#333'
            }}>
              {impact}
            </p>
          ) : (
            <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
              {Object.entries(impact).map(([key, value]) => (
                <div key={key} style={{ marginBottom: '8px' }}>
                  <strong style={{ color: config.color }}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                  </strong>{' '}
                  <span style={{ color: '#333' }}>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { ThreatLevel, ThreatMetric };
export default ThreatAssessment;