import React from 'react';

function Awareness() {
  const urgentFacts = [
    {
      title: "🔥 Climate Emergency",
      fact: "We have less than 7 years to cut emissions by 50% to avoid catastrophic warming",
      data: "Current CO₂: 421 ppm (highest in 3 million years)",
      action: "Every 0.1°C matters - act now!"
    },
    {
      title: "🌊 Ocean Crisis", 
      fact: "Oceans absorb 30% of CO₂, causing acidification that kills marine life",
      data: "pH dropped 0.1 units since 1750 (30% more acidic)",
      action: "Reduce plastic use and carbon footprint"
    },
    {
      title: "🦋 Biodiversity Collapse",
      fact: "Species are going extinct 1,000-10,000 times faster than natural rate",
      data: "1 million species threatened with extinction",
      action: "Support conservation and sustainable practices"
    }
  ];

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3rem', color: '#2E7D32', marginBottom: '10px' }}>
          🚨 Environmental Awareness & Action
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Understanding the urgency and finding hope through action
        </p>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
        color: 'white',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.8rem' }}>
          🚨 CLIMATE EMERGENCY DECLARED
        </h3>
        <p style={{ fontSize: '1.2rem', marginBottom: '15px', opacity: 0.95 }}>
          Scientists worldwide agree: We have less than 6 years to prevent catastrophic climate change.
          <br />
          <strong>Every action you take TODAY matters for tomorrow's world.</strong>
        </p>
        <button className="btn" style={{ 
          background: 'white', 
          color: '#d32f2f', 
          fontWeight: 'bold',
          border: 'none',
          padding: '15px 30px'
        }}>
          🌱 Take Action Now
        </button>
      </div>

      <div className="grid grid-3">
        {urgentFacts.map((item, index) => (
          <div key={index} className="card" style={{ 
            border: '2px solid #f44336',
            background: 'linear-gradient(135deg, #fff5f5 0%, #ffebee 100%)'
          }}>
            <h3 style={{ color: '#f44336', marginBottom: '15px' }}>{item.title}</h3>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>
              {item.fact}
            </p>
            <p style={{ fontSize: '1rem', color: '#666', marginBottom: '15px' }}>
              📊 {item.data}
            </p>
            <div style={{ 
              background: '#f44336',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              💪 {item.action}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
        color: 'white',
        padding: '40px',
        borderRadius: '16px',
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <h3 style={{ color: 'white', fontSize: '2rem', marginBottom: '20px' }}>
          🌱 The Time for Action is NOW
        </h3>
        <p style={{ fontSize: '1.2rem', marginBottom: '25px', opacity: 0.95 }}>
          Every day we delay action, the challenge becomes harder and more expensive.
          <br />
          But every action you take creates ripples of positive change.
        </p>
        <button className="btn" style={{ 
          background: 'white', 
          color: '#2E7D32', 
          fontWeight: 'bold',
          padding: '15px 30px',
          fontSize: '1.1rem'
        }}>
          🚀 Start My Environmental Journey
        </button>
      </div>
    </div>
  );
}

export default Awareness;