import React, { useState } from 'react';

function Calculator() {
  const [carbonData, setCarbonData] = useState({
    carMiles: 0,
    electricity: 0,
    flights: 0,
    meatMeals: 0
  });
  const [results, setResults] = useState(null);

  const calculateFootprint = () => {
    const transport = carbonData.carMiles * 0.404 * 365; // kg CO2 per year
    const energy = carbonData.electricity * 0.5 * 12; // kg CO2 per year
    const flights = carbonData.flights * 0.257; // kg CO2 per year
    const food = carbonData.meatMeals * 6.61 * 52; // kg CO2 per year
    
    const total = transport + energy + flights + food;
    const globalAverage = 4800;
    
    setResults({
      total,
      transport,
      energy,
      flights,
      food,
      comparison: ((total / globalAverage) * 100).toFixed(0),
      treesNeeded: Math.ceil(total / 22)
    });
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3rem', color: '#2E7D32', marginBottom: '10px' }}>
          🧮 Carbon Footprint Calculator
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Calculate your annual carbon footprint
        </p>
      </div>

      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>📊 Enter Your Data</h3>
        <div className="grid grid-2">
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Daily car miles:
            </label>
            <input
              type="number"
              value={carbonData.carMiles}
              onChange={(e) => setCarbonData({...carbonData, carMiles: parseFloat(e.target.value) || 0})}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}
            />
            
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Monthly electricity (kWh):
            </label>
            <input
              type="number"
              value={carbonData.electricity}
              onChange={(e) => setCarbonData({...carbonData, electricity: parseFloat(e.target.value) || 0})}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Flight miles per year:
            </label>
            <input
              type="number"
              value={carbonData.flights}
              onChange={(e) => setCarbonData({...carbonData, flights: parseFloat(e.target.value) || 0})}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}
            />
            
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Meat meals per week:
            </label>
            <input
              type="number"
              value={carbonData.meatMeals}
              onChange={(e) => setCarbonData({...carbonData, meatMeals: parseFloat(e.target.value) || 0})}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}
            />
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={calculateFootprint}
            className="btn btn-primary"
            style={{ fontSize: '1.2rem', padding: '15px 40px' }}
          >
            🧮 Calculate My Footprint
          </button>
        </div>
      </div>

      {results && (
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          border: '2px solid #4CAF50'
        }}>
          <h3 style={{ textAlign: 'center', color: '#2E7D32', marginBottom: '30px' }}>
            📊 Your Carbon Footprint Results
          </h3>

          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2E7D32', marginBottom: '10px' }}>
              {results.total.toFixed(0)} kg CO₂
            </div>
            <div style={{ fontSize: '1.2rem', color: '#666' }}>Annual Carbon Footprint</div>
          </div>

          <div className="grid grid-4" style={{ marginBottom: '30px' }}>
            <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', color: '#2196F3', fontWeight: 'bold' }}>
                {results.transport.toFixed(0)}
              </div>
              <div>🚗 Transportation</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', color: '#FF9800', fontWeight: 'bold' }}>
                {results.energy.toFixed(0)}
              </div>
              <div>⚡ Energy</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', color: '#9C27B0', fontWeight: 'bold' }}>
                {results.flights.toFixed(0)}
              </div>
              <div>✈️ Flights</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', color: '#4CAF50', fontWeight: 'bold' }}>
                {results.food.toFixed(0)}
              </div>
              <div>🍽️ Food</div>
            </div>
          </div>

          <div style={{ 
            background: 'white', 
            padding: '25px', 
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#2E7D32', marginBottom: '20px' }}>🌍 Comparison</h4>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#666' }}>
                  {results.comparison}%
                </div>
                <div>of global average</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4CAF50' }}>
                  {results.treesNeeded}
                </div>
                <div>🌳 trees needed to offset</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculator;