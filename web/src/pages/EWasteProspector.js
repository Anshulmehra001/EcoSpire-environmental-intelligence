import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, DollarSign, Recycle, BarChart3, AlertCircle, Target, Cpu } from 'lucide-react';

const EWasteProspector = () => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [realTimeData, setRealTimeData] = useState(null);
  const [marketPrices, setMarketPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [facilityStats, setFacilityStats] = useState({});

  useEffect(() => {
    // Load real-time facility data
    loadRealTimeData();
    loadMarketPrices();
    loadFacilityStats();
    
    // Update every 5 seconds for demo
    const interval = setInterval(() => {
      loadRealTimeData();
      loadMarketPrices();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const loadRealTimeData = () => {
    const mockData = {
      timestamp: new Date().toISOString(),
      conveyorSpeed: 2.3, // m/s
      throughput: 450, // kg/hour
      currentBatch: {
        id: 'BATCH-' + Math.floor(Math.random() * 10000),
        weight: 125.7, // kg
        estimatedValue: 8450 + Math.floor(Math.random() * 2000),
        composition: {
          copper: { percentage: 18.5 + Math.random() * 5, value: 2340 + Math.floor(Math.random() * 500) },
          gold: { percentage: 0.034 + Math.random() * 0.01, value: 1890 + Math.floor(Math.random() * 300) },
          silver: { percentage: 0.28 + Math.random() * 0.1, value: 450 + Math.floor(Math.random() * 100) },
          aluminum: { percentage: 12.3 + Math.random() * 3, value: 890 + Math.floor(Math.random() * 200) },
          lithium: { percentage: 2.1 + Math.random() * 1, value: 1240 + Math.floor(Math.random() * 400) },
          cobalt: { percentage: 1.8 + Math.random() * 0.5, value: 980 + Math.floor(Math.random() * 300) },
          rareEarths: { percentage: 0.45 + Math.random() * 0.2, value: 1650 + Math.floor(Math.random() * 500) }
        },
        deviceTypes: [
          { type: 'Smartphones', count: 45, contribution: 35 },
          { type: 'Laptops', count: 12, contribution: 28 },
          { type: 'Tablets', count: 18, contribution: 15 },
          { type: 'Circuit Boards', count: 89, contribution: 22 }
        ]
      },
      sensorReadings: {
        xrfAccuracy: 97.2 + Math.random() * 2,
        hyperspectralResolution: 2.1,
        sortingEfficiency: 94.8 + Math.random() * 3,
        contamination: 2.3 + Math.random() * 1
      }
    };
    
    setRealTimeData(mockData);
  };

  const loadMarketPrices = () => {
    const prices = {
      copper: { price: 8.45 + Math.random() * 0.5, change: (Math.random() - 0.5) * 0.2, unit: '$/kg' },
      gold: { price: 65420 + Math.random() * 1000, change: (Math.random() - 0.5) * 500, unit: '$/kg' },
      silver: { price: 820 + Math.random() * 50, change: (Math.random() - 0.5) * 20, unit: '$/kg' },
      aluminum: { price: 1.89 + Math.random() * 0.1, change: (Math.random() - 0.5) * 0.05, unit: '$/kg' },
      lithium: { price: 24.5 + Math.random() * 2, change: (Math.random() - 0.5) * 1, unit: '$/kg' },
      cobalt: { price: 35.2 + Math.random() * 3, change: (Math.random() - 0.5) * 1.5, unit: '$/kg' },
      rareEarths: { price: 125.8 + Math.random() * 10, change: (Math.random() - 0.5) * 5, unit: '$/kg' }
    };
    
    setMarketPrices(prices);
  };

  const loadFacilityStats = () => {
    const stats = {
      dailyThroughput: 10.8, // tons
      dailyValue: 185000 + Math.floor(Math.random() * 20000),
      monthlyValue: 5.2, // million
      efficiency: 94.2,
      co2Avoided: 45.7, // tons vs mining
      energySaved: 890, // MWh vs primary production
      waterSaved: 12400, // liters vs mining
      criticalMineralsRecovered: {
        lithium: 245, // kg this month
        cobalt: 189,
        rareEarths: 67,
        platinum: 12
      }
    };
    
    setFacilityStats(stats);
  };

  const analyzeBatch = async () => {
    setLoading(true);
    
    // Simulate real-time analysis
    setTimeout(async () => {
      const analysis = {
        ...realTimeData.currentBatch,
        detailedAnalysis: {
          purityLevels: {
            copper: 99.2,
            gold: 99.8,
            silver: 98.5,
            aluminum: 97.1
          },
          extractionMethods: {
            copper: 'Hydrometallurgical',
            gold: 'Cyanide leaching',
            silver: 'Electrolytic',
            aluminum: 'Mechanical separation'
          },
          processingTime: '2.3 hours',
          energyRequired: '145 kWh',
          waterUsage: '890 liters',
          chemicalsNeeded: ['Sulfuric acid', 'Sodium cyanide', 'Activated carbon']
        },
        marketAnalysis: {
          demandForecast: 'High - Green tech surge',
          priceVolatility: 'Moderate',
          strategicValue: 'Critical for EV batteries',
          competitorPricing: 'Above market average',
          recommendedAction: 'Process immediately - high demand'
        }
      };
      
      setSelectedBatch(analysis);
      
      // Log activity for dashboard
      try {
        const { authManager } = await import('../utils/auth');
        await authManager.logActivity('E-waste batch analyzed', {
          batchId: analysis.id,
          estimatedValue: analysis.estimatedValue,
          weight: analysis.weight,
          criticalMinerals: analysis.composition.lithium.percentage + analysis.composition.cobalt.percentage
        });
      } catch (error) {
        console.warn('Failed to log activity:', error);
      }
      
      setLoading(false);
    }, 2000);
  };

  const getChangeColor = (change) => {
    return change >= 0 ? '#4CAF50' : '#f44336';
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 95) return '#4CAF50';
    if (efficiency >= 90) return '#8BC34A';
    if (efficiency >= 85) return '#FF9800';
    return '#f44336';
  };

  const getCriticalityColor = (material) => {
    const critical = ['lithium', 'cobalt', 'rareEarths'];
    return critical.includes(material) ? '#f44336' : '#4CAF50';
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          ⚡ E-Waste Prospector: Critical Mineral Recovery
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          AI-powered precious metal extraction from electronic waste for green technology
        </p>
        <div style={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '25px',
          display: 'inline-block',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}>
          🤖 Real-time Analysis • 💰 Market Integration • ⚡ Critical Minerals • 🌍 Green Tech Supply
        </div>
      </div>

      {/* Problem Statement */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
        border: '2px solid #f44336'
      }}>
        <h3 style={{ color: '#d32f2f', marginBottom: '15px' }}>🚨 The Critical Mineral Crisis</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '15px' }}>
          <strong>Green energy transition requires massive supplies of lithium, cobalt, and rare earth elements.</strong>
          Mining these materials is environmentally destructive, while millions of tons of the same precious metals 
          are locked away in e-waste with inefficient recycling.
        </p>
        <div style={{
          background: 'rgba(244, 67, 54, 0.1)',
          padding: '15px',
          borderRadius: '8px',
          fontSize: '0.95rem'
        }}>
          • 50 million tons of e-waste generated annually worldwide<br />
          • Only 20% is properly recycled, rest goes to landfills<br />
          • E-waste contains 40x more gold than gold ore<br />
          • Critical mineral shortages threaten green energy transition
        </div>
      </div>

      {/* Solution */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
        border: '2px solid #4CAF50'
      }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>💡 The Urban Mining Revolution</h3>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid #4CAF50'
        }}>
          <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>🎯 Smart E-Waste Processing:</h4>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            <strong>Transform e-waste recycling into precision urban mining.</strong> Our AI analyzes the exact 
            composition of e-waste streams in real-time, optimizes sorting for maximum value recovery, 
            and integrates with commodity markets for strategic processing decisions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📡</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>1. Sensor Analysis</h4>
            <p style={{ color: '#666' }}>XRF and hyperspectral scanning</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🤖</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>2. AI Optimization</h4>
            <p style={{ color: '#666' }}>Real-time composition analysis</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏭</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>3. Smart Sorting</h4>
            <p style={{ color: '#666' }}>Automated material separation</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💰</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>4. Market Integration</h4>
            <p style={{ color: '#666' }}>Real-time pricing and optimization</p>
          </div>
        </div>
      </div>

      {/* Real-time Facility Dashboard */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginBottom: '30px' }}>
        {/* Live Processing Data */}
        <div className="card">
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>⚡ Live Processing Stream</h3>
          
          {realTimeData && (
            <>
              <div style={{
                background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: '2px solid #4CAF50'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h4 style={{ color: '#2E7D32', margin: 0 }}>
                    Current Batch: {realTimeData.currentBatch.id}
                  </h4>
                  <div style={{
                    background: '#4CAF50',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    ${realTimeData.currentBatch.estimatedValue.toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', fontSize: '0.9rem' }}>
                  <div><strong>Weight:</strong> {realTimeData.currentBatch.weight} kg</div>
                  <div><strong>Throughput:</strong> {realTimeData.throughput} kg/h</div>
                  <div><strong>Speed:</strong> {realTimeData.conveyorSpeed} m/s</div>
                  <div><strong>Efficiency:</strong> {realTimeData.sensorReadings.sortingEfficiency.toFixed(1)}%</div>
                </div>
              </div>

              {/* Material Composition */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>🔬 Real-time Composition Analysis</h4>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {Object.entries(realTimeData.currentBatch.composition).map(([material, data]) => (
                    <div key={material} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px',
                      background: '#f9f9f9',
                      borderRadius: '8px',
                      border: `2px solid ${getCriticalityColor(material)}`
                    }}>
                      <div>
                        <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{material}</span>
                        {['lithium', 'cobalt', 'rareEarths'].includes(material) && (
                          <span style={{ 
                            marginLeft: '8px', 
                            background: '#f44336', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '10px', 
                            fontSize: '0.7rem' 
                          }}>
                            CRITICAL
                          </span>
                        )}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold' }}>{data.percentage.toFixed(2)}%</div>
                        <div style={{ fontSize: '0.9rem', color: '#4CAF50' }}>
                          ${data.value.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Device Breakdown */}
              <div>
                <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>📱 Device Type Analysis</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {realTimeData.currentBatch.deviceTypes.map((device, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px',
                      background: '#f9f9f9',
                      borderRadius: '8px'
                    }}>
                      <span>{device.type}</span>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold' }}>{device.count} units</div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{device.contribution}% value</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Market Prices */}
        <div className="card">
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>💰 Live Market Prices</h3>
          
          <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '15px', textAlign: 'center' }}>
            Updated: {new Date().toLocaleTimeString()}
          </div>
          
          <div style={{ display: 'grid', gap: '10px' }}>
            {Object.entries(marketPrices).map(([material, data]) => (
              <div key={material} style={{
                padding: '12px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: `2px solid ${getCriticalityColor(material)}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{material}</span>
                  <span style={{
                    color: getChangeColor(data.change),
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}
                  </span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2E7D32' }}>
                  {data.price.toFixed(2)} {data.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facility Performance */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📊 Facility Performance</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: '#f9f9f9',
            borderRadius: '12px',
            border: '3px solid #4CAF50'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💰</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '5px' }}>
              ${facilityStats.dailyValue?.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Daily Value Recovery</div>
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: '#f9f9f9',
            borderRadius: '12px',
            border: '3px solid #2196F3'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>⚡</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2196F3', marginBottom: '5px' }}>
              {facilityStats.efficiency}%
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Processing Efficiency</div>
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: '#f9f9f9',
            borderRadius: '12px',
            border: '3px solid #FF9800'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🌍</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FF9800', marginBottom: '5px' }}>
              {facilityStats.co2Avoided} tons
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>CO₂ Avoided vs Mining</div>
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: '#f9f9f9',
            borderRadius: '12px',
            border: '3px solid #9C27B0'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>⚡</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#9C27B0', marginBottom: '5px' }}>
              {facilityStats.energySaved} MWh
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Energy Saved</div>
          </div>
        </div>

        {/* Critical Minerals Recovery */}
        <div>
          <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>🔥 Critical Minerals Recovered (This Month)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            {Object.entries(facilityStats.criticalMineralsRecovered || {}).map(([mineral, amount]) => (
              <div key={mineral} style={{
                textAlign: 'center',
                padding: '15px',
                background: '#ffebee',
                borderRadius: '8px',
                border: '2px solid #f44336'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f44336', marginBottom: '5px' }}>
                  {amount} kg
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'capitalize' }}>
                  {mineral}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>CRITICAL MINERAL</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Batch Analysis */}
      <div className="card">
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🔍 Detailed Batch Analysis</h3>
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={analyzeBatch}
            disabled={loading || !realTimeData}
            style={{
              fontSize: '1.2rem',
              padding: '15px 30px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
              border: 'none',
              borderRadius: '25px',
              color: 'white',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '🤖 Analyzing Current Batch...' : '🔬 Analyze Current Batch'}
          </button>
        </div>

        {selectedBatch && (
          <div style={{
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            padding: '20px',
            borderRadius: '12px',
            border: '2px solid #2196F3'
          }}>
            <h4 style={{ color: '#1976d2', marginBottom: '15px' }}>
              📊 Batch {selectedBatch.id} - Detailed Analysis
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <h5 style={{ marginBottom: '10px' }}>🔬 Processing Requirements</h5>
                <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <p><strong>Processing Time:</strong> {selectedBatch.detailedAnalysis.processingTime}</p>
                  <p><strong>Energy Required:</strong> {selectedBatch.detailedAnalysis.energyRequired}</p>
                  <p><strong>Water Usage:</strong> {selectedBatch.detailedAnalysis.waterUsage}</p>
                </div>
              </div>
              
              <div>
                <h5 style={{ marginBottom: '10px' }}>📈 Market Analysis</h5>
                <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <p><strong>Demand:</strong> {selectedBatch.marketAnalysis.demandForecast}</p>
                  <p><strong>Strategic Value:</strong> {selectedBatch.marketAnalysis.strategicValue}</p>
                  <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                    <strong>Recommendation:</strong> {selectedBatch.marketAnalysis.recommendedAction}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EWasteProspector;