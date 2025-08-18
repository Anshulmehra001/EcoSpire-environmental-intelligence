import React, { useState, useEffect } from 'react';
import { Droplets, Thermometer, Activity, Zap, MapPin, Settings, TrendingUp, AlertTriangle } from 'lucide-react';

const MycoRemediation = () => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [sensorData, setSensorData] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contaminantType, setContaminantType] = useState('petroleum');
  const [siteAnalysis, setSiteAnalysis] = useState(null);

  useEffect(() => {
    // Load mock sensor data
    loadSensorData();
  }, []);

  const loadSensorData = () => {
    const mockSensors = [
      {
        id: 'POD-001',
        location: { lat: 47.6062, lng: -122.3321 },
        depth: '2 feet',
        status: 'Active',
        lastUpdate: new Date().toISOString(),
        readings: {
          moisture: 65, // %
          temperature: 18, // °C
          pH: 6.8,
          conductivity: 450, // µS/cm
          contaminantLevel: 850, // ppm petroleum
          myceliumDensity: 78 // % coverage
        },
        aiActions: [
          { time: '2 hours ago', action: 'Increased moisture by 5%', reason: 'Optimal growth conditions' },
          { time: '6 hours ago', action: 'Added nitrogen nutrients', reason: 'Accelerate decomposition' },
          { time: '12 hours ago', action: 'Adjusted pH to 6.8', reason: 'Optimize fungal activity' }
        ]
      },
      {
        id: 'POD-002',
        location: { lat: 47.6065, lng: -122.3318 },
        depth: '3 feet',
        status: 'Active',
        lastUpdate: new Date().toISOString(),
        readings: {
          moisture: 58,
          temperature: 19,
          pH: 7.2,
          conductivity: 380,
          contaminantLevel: 620,
          myceliumDensity: 85
        },
        aiActions: [
          { time: '1 hour ago', action: 'Micro-dose water injection', reason: 'Maintain moisture levels' },
          { time: '4 hours ago', action: 'Temperature regulation', reason: 'Prevent overheating' }
        ]
      },
      {
        id: 'POD-003',
        location: { lat: 47.6068, lng: -122.3315 },
        depth: '2.5 feet',
        status: 'Optimizing',
        lastUpdate: new Date().toISOString(),
        readings: {
          moisture: 72,
          temperature: 17,
          pH: 6.5,
          conductivity: 520,
          contaminantLevel: 1200,
          myceliumDensity: 45
        },
        aiActions: [
          { time: '30 minutes ago', action: 'Spore inoculation', reason: 'Boost mycelium growth' },
          { time: '3 hours ago', action: 'Nutrient cocktail delivery', reason: 'Accelerate breakdown' }
        ]
      }
    ];
    
    setSensorData(mockSensors);
  };

  const analyzeSite = async (contaminant) => {
    setLoading(true);
    
    // Simulate AI analysis
    setTimeout(async () => {
      const mockAnalysis = {
        contaminantType: contaminant,
        siteSize: '2.3 acres',
        contaminationLevel: 'Moderate to High',
        estimatedCleanupTime: '8-12 months',
        costSavings: 450000, // vs traditional methods
        co2Reduction: 85, // tons vs excavation
        optimalFungi: [
          {
            species: 'Pleurotus ostreatus',
            commonName: 'Oyster Mushroom',
            effectiveness: 92,
            degradationRate: '15-25% per month',
            optimalConditions: {
              temperature: '15-25°C',
              moisture: '60-80%',
              pH: '6.0-7.5',
              nutrients: 'High nitrogen, moderate phosphorus'
            },
            targetContaminants: ['Petroleum hydrocarbons', 'PAHs', 'Diesel fuel'],
            advantages: ['Fast growth', 'High degradation rate', 'Produces edible mushrooms']
          },
          {
            species: 'Trametes versicolor',
            commonName: 'Turkey Tail',
            effectiveness: 88,
            degradationRate: '12-20% per month',
            optimalConditions: {
              temperature: '10-30°C',
              moisture: '55-75%',
              pH: '4.5-7.0',
              nutrients: 'Low nitrogen, high lignin'
            },
            targetContaminants: ['Heavy metals', 'Pesticides', 'Industrial solvents'],
            advantages: ['Broad spectrum', 'Metal tolerance', 'Soil structure improvement']
          },
          {
            species: 'Phanerochaete chrysosporium',
            commonName: 'White Rot Fungus',
            effectiveness: 95,
            degradationRate: '20-35% per month',
            optimalConditions: {
              temperature: '25-40°C',
              moisture: '70-85%',
              pH: '4.0-6.0',
              nutrients: 'High carbon, low nitrogen'
            },
            targetContaminants: ['Chlorinated compounds', 'Dioxins', 'PCBs'],
            advantages: ['Highest degradation rate', 'Breaks down complex toxins', 'Complete mineralization']
          }
        ],
        aiStrategy: {
          phase1: 'Site preparation and sensor deployment (2 weeks)',
          phase2: 'Fungal inoculation and establishment (4-6 weeks)',
          phase3: 'AI-optimized growth and degradation (6-10 months)',
          phase4: 'Monitoring and soil restoration (2-4 weeks)'
        },
        predictedOutcome: {
          contaminantReduction: '85-95%',
          soilHealthImprovement: '300%',
          biodiversityIncrease: '150%',
          carbonSequestration: '12 tons CO2'
        }
      };
      
      setSiteAnalysis(mockAnalysis);
      
      // Log activity for dashboard
      try {
        const { authManager } = await import('../utils/auth');
        await authManager.logActivity('Myco-remediation site analyzed', {
          contaminantType: contaminant,
          siteSize: mockAnalysis.siteSize,
          costSavings: mockAnalysis.costSavings,
          co2Reduction: mockAnalysis.co2Reduction
        });
      } catch (error) {
        console.warn('Failed to log activity:', error);
      }
      
      setLoading(false);
    }, 2500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#4CAF50';
      case 'Optimizing': return '#FF9800';
      case 'Alert': return '#f44336';
      default: return '#666';
    }
  };

  const getReadingColor = (value, optimal) => {
    const diff = Math.abs(value - optimal) / optimal;
    if (diff < 0.1) return '#4CAF50';
    if (diff < 0.2) return '#FF9800';
    return '#f44336';
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🍄 Myco-Remediation Network: AI Fungal Cleanup
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          AI-controlled living systems that eat pollution and restore contaminated environments
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
          🤖 AI Mycologist • 🌐 Sensor Network • 🧬 Living Cleanup • 📊 Real-time Optimization
        </div>
      </div>

      {/* Problem Statement */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
        border: '2px solid #f44336'
      }}>
        <h3 style={{ color: '#d32f2f', marginBottom: '15px' }}>🚨 The Soil Contamination Crisis</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '15px' }}>
          <strong>Traditional soil cleanup costs $50-500 per cubic yard and often just moves contaminated dirt elsewhere.</strong>
          Bioremediation using fungi is promising but slow and unreliable because we can't control underground conditions.
        </p>
        <div style={{
          background: 'rgba(244, 67, 54, 0.1)',
          padding: '15px',
          borderRadius: '8px',
          fontSize: '0.95rem'
        }}>
          • 450,000 contaminated sites in the US need cleanup<br />
          • Traditional cleanup costs $100+ billion and generates massive CO₂<br />
          • Bioremediation is 90% cheaper but unpredictable and slow<br />
          • No way to actively manage underground fungal growth
        </div>
      </div>

      {/* Solution */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
        border: '2px solid #4CAF50'
      }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>💡 The Living Cleanup Revolution</h3>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid #4CAF50'
        }}>
          <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>🧬 Bio-Digital Nervous System:</h4>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            <strong>Create an AI-controlled underground ecosystem.</strong> Deploy sensor pods that monitor soil conditions 
            in real-time, while an AI "mycologist" optimizes fungal growth by precisely delivering water, nutrients, 
            and environmental controls to accelerate pollution breakdown.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔬</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>1. Deploy Sensors</h4>
            <p style={{ color: '#666' }}>Underground pods monitor conditions</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🍄</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>2. Inoculate Fungi</h4>
            <p style={{ color: '#666' }}>AI selects optimal species for contaminants</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🤖</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>3. AI Optimization</h4>
            <p style={{ color: '#666' }}>Real-time nutrient and moisture control</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌱</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>4. Soil Restoration</h4>
            <p style={{ color: '#666' }}>Clean soil with improved biodiversity</p>
          </div>
        </div>
      </div>

      {/* Contaminant Selection */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🧪 Select Contaminant Type</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          {[
            { id: 'petroleum', name: 'Petroleum Hydrocarbons', icon: '⛽' },
            { id: 'heavy_metals', name: 'Heavy Metals', icon: '🏭' },
            { id: 'pesticides', name: 'Pesticides/Herbicides', icon: '🌾' },
            { id: 'industrial', name: 'Industrial Solvents', icon: '🧪' },
            { id: 'pcbs', name: 'PCBs/Dioxins', icon: '⚠️' }
          ].map(contaminant => (
            <button
              key={contaminant.id}
              onClick={() => setContaminantType(contaminant.id)}
              style={{
                padding: '15px',
                borderRadius: '8px',
                border: contaminantType === contaminant.id ? '3px solid #4CAF50' : '2px solid #ddd',
                background: contaminantType === contaminant.id ? '#e8f5e8' : 'white',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{contaminant.icon}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{contaminant.name}</div>
            </button>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => analyzeSite(contaminantType)}
            disabled={loading}
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
            {loading ? '🤖 AI Analyzing Site...' : '🔍 Analyze Remediation Strategy'}
          </button>
        </div>
      </div>

      {/* Site Analysis Results */}
      {siteAnalysis && !loading && (
        <div style={{ display: 'grid', gap: '30px', marginBottom: '30px' }}>
          {/* Strategy Overview */}
          <div className="card">
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🎯 AI Remediation Strategy</h3>
            
            <div style={{
              background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              border: '2px solid #4CAF50'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 style={{ color: '#2E7D32', margin: 0 }}>
                  Site: {siteAnalysis.siteSize} • {siteAnalysis.contaminationLevel} Contamination
                </h4>
                <div style={{
                  background: '#4CAF50',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  ${siteAnalysis.costSavings.toLocaleString()} Savings
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', fontSize: '0.9rem' }}>
                <div><strong>Cleanup Time:</strong> {siteAnalysis.estimatedCleanupTime}</div>
                <div><strong>CO₂ Reduction:</strong> {siteAnalysis.co2Reduction} tons</div>
                <div><strong>Success Rate:</strong> {siteAnalysis.predictedOutcome.contaminantReduction}</div>
                <div><strong>Soil Health:</strong> +{siteAnalysis.predictedOutcome.soilHealthImprovement}</div>
              </div>
            </div>

            {/* Optimal Fungi */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>🍄 AI-Selected Optimal Fungi</h4>
              <div style={{ display: 'grid', gap: '15px' }}>
                {siteAnalysis.optimalFungi.map((fungus, index) => (
                  <div key={index} style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '15px',
                    background: '#f9f9f9'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                      <div>
                        <h5 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '5px' }}>
                          {fungus.species} ({fungus.commonName})
                        </h5>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>
                          Degradation Rate: {fungus.degradationRate}
                        </p>
                      </div>
                      <div style={{
                        background: '#4CAF50',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {fungus.effectiveness}% Effective
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '0.9rem' }}>
                      <div>
                        <strong>Target Contaminants:</strong>
                        <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                          {fungus.targetContaminants.map((contaminant, i) => (
                            <li key={i}>{contaminant}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong>Key Advantages:</strong>
                        <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                          {fungus.advantages.map((advantage, i) => (
                            <li key={i}>{advantage}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Strategy Phases */}
            <div>
              <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>📋 AI Implementation Strategy</h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                {Object.entries(siteAnalysis.aiStrategy).map(([phase, description], index) => (
                  <div key={phase} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    background: '#f9f9f9',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                  }}>
                    <div style={{
                      background: '#4CAF50',
                      color: 'white',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginRight: '15px'
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <strong style={{ textTransform: 'capitalize' }}>{phase.replace(/([A-Z])/g, ' $1')}:</strong> {description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Sensor Network */}
      <div className="card">
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🌐 Live Sensor Network</h3>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          {sensorData.map((sensor) => (
            <div key={sensor.id} style={{
              border: `2px solid ${getStatusColor(sensor.status)}`,
              borderRadius: '12px',
              padding: '20px',
              background: '#f9f9f9'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 style={{ margin: 0 }}>Sensor Pod {sensor.id}</h4>
                <div style={{
                  background: getStatusColor(sensor.status),
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {sensor.status}
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                <div style={{ textAlign: 'center', padding: '10px', background: 'white', borderRadius: '8px' }}>
                  <Droplets style={{ height: '20px', width: '20px', color: '#2196F3', margin: '0 auto 5px' }} />
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: getReadingColor(sensor.readings.moisture, 65) }}>
                    {sensor.readings.moisture}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Moisture</div>
                </div>
                
                <div style={{ textAlign: 'center', padding: '10px', background: 'white', borderRadius: '8px' }}>
                  <Thermometer style={{ height: '20px', width: '20px', color: '#FF5722', margin: '0 auto 5px' }} />
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: getReadingColor(sensor.readings.temperature, 18) }}>
                    {sensor.readings.temperature}°C
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Temperature</div>
                </div>
                
                <div style={{ textAlign: 'center', padding: '10px', background: 'white', borderRadius: '8px' }}>
                  <Activity style={{ height: '20px', width: '20px', color: '#4CAF50', margin: '0 auto 5px' }} />
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: getReadingColor(sensor.readings.pH, 6.8) }}>
                    {sensor.readings.pH}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>pH Level</div>
                </div>
                
                <div style={{ textAlign: 'center', padding: '10px', background: 'white', borderRadius: '8px' }}>
                  <Zap style={{ height: '20px', width: '20px', color: '#FF9800', margin: '0 auto 5px' }} />
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4CAF50' }}>
                    {sensor.readings.myceliumDensity}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Mycelium</div>
                </div>
                
                <div style={{ textAlign: 'center', padding: '10px', background: 'white', borderRadius: '8px' }}>
                  <AlertTriangle style={{ height: '20px', width: '20px', color: '#f44336', margin: '0 auto 5px' }} />
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: sensor.readings.contaminantLevel > 1000 ? '#f44336' : '#FF9800' }}>
                    {sensor.readings.contaminantLevel}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Contaminant (ppm)</div>
                </div>
              </div>
              
              <div>
                <h5 style={{ marginBottom: '10px', color: '#2E7D32' }}>🤖 Recent AI Actions:</h5>
                <div style={{ fontSize: '0.9rem' }}>
                  {sensor.aiActions.map((action, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      padding: '5px 0',
                      borderBottom: index < sensor.aiActions.length - 1 ? '1px solid #eee' : 'none'
                    }}>
                      <span><strong>{action.action}</strong> - {action.reason}</span>
                      <span style={{ color: '#666' }}>{action.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
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

export default MycoRemediation;