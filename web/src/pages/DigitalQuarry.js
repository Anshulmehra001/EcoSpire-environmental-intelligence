import React, { useState, useRef } from 'react';
import { Camera, Building, Recycle, DollarSign, Truck, MapPin, Search, Filter } from 'lucide-react';

const DigitalQuarry = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('demolition');
  const [marketplace, setMarketplace] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        analyzeBuildingMaterials(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeBuildingMaterials = async (imageFile) => {
    setLoading(true);
    
    // Simulate AI analysis of building materials
    setTimeout(async () => {
      const mockAnalysis = {
        buildingType: 'Commercial Office Building',
        totalValue: 485000,
        co2Savings: 1250, // tons CO2 saved vs new materials
        materials: [
          {
            type: 'Structural Steel I-Beams',
            quantity: '45 units (30-foot)',
            grade: 'A992 Grade 50',
            condition: 'Excellent',
            estimatedValue: 125000,
            weight: '18,500 lbs',
            co2Savings: 425, // tons
            applications: ['High-rise construction', 'Industrial buildings', 'Bridges']
          },
          {
            type: 'Concrete Slabs',
            quantity: '2,400 sq ft',
            grade: '4000 PSI',
            condition: 'Good',
            estimatedValue: 85000,
            weight: '240,000 lbs',
            co2Savings: 380,
            applications: ['Foundation work', 'Parking structures', 'Flooring']
          },
          {
            type: 'Hardwood Flooring',
            quantity: '3,200 sq ft',
            grade: 'Red Oak Premium',
            condition: 'Very Good',
            estimatedValue: 95000,
            weight: '8,000 lbs',
            co2Savings: 125,
            applications: ['Residential flooring', 'Commercial spaces', 'Furniture']
          },
          {
            type: 'Copper Wiring',
            quantity: '2,800 linear feet',
            grade: '12 AWG THHN',
            condition: 'Excellent',
            estimatedValue: 45000,
            weight: '850 lbs',
            co2Savings: 85,
            applications: ['Electrical systems', 'HVAC', 'Telecommunications']
          },
          {
            type: 'Aluminum Windows',
            quantity: '28 units',
            grade: 'Double-pane Low-E',
            condition: 'Good',
            estimatedValue: 65000,
            weight: '1,200 lbs',
            co2Savings: 95,
            applications: ['Residential construction', 'Office buildings', 'Renovations']
          },
          {
            type: 'Brick Facade',
            quantity: '8,500 bricks',
            grade: 'Clay Common Brick',
            condition: 'Excellent',
            estimatedValue: 35000,
            weight: '42,500 lbs',
            co2Savings: 140,
            applications: ['Exterior walls', 'Landscaping', 'Decorative features']
          }
        ],
        logistics: {
          demolitionDate: '2024-03-15',
          location: 'Downtown Seattle, WA',
          accessibility: 'Good - Street level access',
          storageRequired: '2 weeks',
          transportationCost: 12000
        },
        marketDemand: {
          steel: 'High - 15 active buyers within 50 miles',
          concrete: 'Medium - 8 active buyers',
          hardwood: 'Very High - 22 active buyers',
          copper: 'Critical - 31 active buyers',
          aluminum: 'High - 18 active buyers',
          brick: 'Medium - 12 active buyers'
        }
      };
      
      setAnalysis(mockAnalysis);
      
      // Log activity for dashboard
      try {
        const { authManager } = await import('../utils/auth');
        await authManager.logActivity('Building materials analyzed', {
          buildingType: mockAnalysis.buildingType,
          totalValue: mockAnalysis.totalValue,
          co2Savings: mockAnalysis.co2Savings,
          materialsCount: mockAnalysis.materials.length
        });
      } catch (error) {
        console.warn('Failed to log activity:', error);
      }
      
      setLoading(false);
    }, 3000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
          analyzeBuildingMaterials(file);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload an image file');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return '#4CAF50';
      case 'Very Good': return '#8BC34A';
      case 'Good': return '#FF9800';
      case 'Fair': return '#FF5722';
      default: return '#666';
    }
  };

  const getDemandColor = (demand) => {
    if (!demand || typeof demand !== 'string') return '#4CAF50';
    if (demand.includes('Critical')) return '#f44336';
    if (demand.includes('Very High')) return '#FF5722';
    if (demand.includes('High')) return '#FF9800';
    return '#4CAF50';
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🏗️ Digital Quarry: Construction Waste Marketplace
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          AI-powered platform turning demolition waste into construction gold
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
          🤖 LiDAR Analysis • 💰 B2B Marketplace • 🌍 1,250 Tons CO₂ Saved • 📊 Real-time Matching
        </div>
      </div>

      {/* Prototype Disclaimer */}
      <div className="card" style={{
        marginBottom: '30px',
        background: '#fff3e0',
        border: '1px solid #ffb74d',
        borderLeft: '4px solid #ff9800'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ 
            fontSize: '1.5rem', 
            color: '#ff9800',
            marginTop: '2px'
          }}>
            ⚠️
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ 
              color: '#e65100', 
              marginBottom: '8px',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Prototype Demonstration
            </h4>
            <p style={{ 
              fontSize: '0.95rem', 
              lineHeight: '1.5', 
              color: '#bf360c',
              marginBottom: '8px'
            }}>
              <strong>This tool uses simulated data for demonstration purposes.</strong>
            </p>
            <p style={{ 
              fontSize: '0.85rem', 
              color: '#8d4e00', 
              lineHeight: '1.4'
            }}>
              All building analysis, material valuations, and marketplace data are generated examples. 
              Production version would integrate with real LiDAR equipment and live commodity markets.
            </p>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
        border: '2px solid #f44336'
      }}>
        <h3 style={{ color: '#d32f2f', marginBottom: '15px' }}>🚨 The Construction Waste Crisis</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '15px' }}>
          <strong>Construction waste accounts for 40% of global solid waste, while new material production generates 15% of global CO₂ emissions.</strong>
          Perfectly good steel beams, concrete, and fixtures are crushed and landfilled while new buildings demand fresh materials.
        </p>
        <div style={{
          background: 'rgba(244, 67, 54, 0.1)',
          padding: '15px',
          borderRadius: '8px',
          fontSize: '0.95rem'
        }}>
          • 600 million tons of construction waste generated annually in US<br />
          • $4.3 billion worth of reusable materials sent to landfills yearly<br />
          • Steel and concrete production account for 15% of global CO₂ emissions<br />
          • No efficient marketplace connecting demolition sites with construction projects
        </div>
      </div>

      {/* Solution */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
        border: '2px solid #4CAF50'
      }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>💡 The Digital Quarry Revolution</h3>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid #4CAF50'
        }}>
          <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>🎯 Urban Mining with AI:</h4>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            <strong>Transform every demolition site into a digital quarry.</strong> Our AI scans buildings before demolition, 
            identifies and grades every reusable material, then connects supply with demand through a real-time B2B marketplace.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📱</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>1. Scan Building</h4>
            <p style={{ color: '#666' }}>LiDAR/photo analysis of structure</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🤖</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>2. AI Cataloging</h4>
            <p style={{ color: '#666' }}>Identify, grade, and value materials</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏪</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>3. B2B Marketplace</h4>
            <p style={{ color: '#666' }}>Match supply with construction demand</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚚</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>4. Logistics</h4>
            <p style={{ color: '#666' }}>Coordinate pickup and delivery</p>
          </div>
        </div>
      </div>

      {/* User Type Selection */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>👤 I am a...</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <button
            onClick={() => setUserType('demolition')}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: userType === 'demolition' ? '3px solid #4CAF50' : '2px solid #ddd',
              background: userType === 'demolition' ? '#e8f5e8' : 'white',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏗️</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>Demolition Company</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Have building materials to sell</div>
          </button>
          
          <button
            onClick={() => setUserType('construction')}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: userType === 'construction' ? '3px solid #4CAF50' : '2px solid #ddd',
              background: userType === 'construction' ? '#e8f5e8' : 'white',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏢</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>Construction Company</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Looking for reclaimed materials</div>
          </button>
          
          <button
            onClick={() => setUserType('architect')}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: userType === 'architect' ? '3px solid #4CAF50' : '2px solid #ddd',
              background: userType === 'architect' ? '#e8f5e8' : 'white',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📐</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>Architect/Designer</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Designing with reclaimed materials</div>
          </button>
        </div>
      </div>

      {userType === 'demolition' && (
        <>
          {/* Building Analysis Upload */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📸 Building Material Analysis</h3>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  fontSize: '1.2rem',
                  padding: '15px 30px',
                  background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                📱 Upload Building Photos/LiDAR
              </button>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${dragActive ? '#4CAF50' : '#ccc'}`,
                borderRadius: '12px',
                padding: '40px 20px',
                textAlign: 'center',
                background: dragActive ? '#e8f5e8' : '#f9f9f9',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Building analysis" style={{ maxWidth: '100%', height: '300px', objectFit: 'contain', margin: '0 auto' }} />
              ) : (
                <div>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                    {dragActive ? '📤' : '🏗️'}
                  </div>
                  <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '10px' }}>
                    {dragActive ? 'Drop building photos here!' : 'Drag & drop building photos or LiDAR scans'}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#999' }}>
                    For best results: Multiple angles, interior/exterior, structural elements visible
                  </p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Analysis Results */}
          {loading && (
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #4CAF50',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px'
              }}></div>
              <p>🤖 Analyzing building materials with AI...</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Identifying structural elements, grading condition, calculating value...</p>
            </div>
          )}

          {analysis && !loading && (
            <div style={{ display: 'grid', gap: '30px' }}>
              {/* Overview */}
              <div className="card">
                <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📊 Building Analysis Overview</h3>
                
                <div style={{
                  background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  border: '2px solid #4CAF50'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h4 style={{ color: '#2E7D32', margin: 0 }}>
                      Building: {analysis.buildingType}
                    </h4>
                    <div style={{
                      background: '#4CAF50',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      Total Value: ${analysis.totalValue.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', fontSize: '0.9rem' }}>
                    <div><strong>Materials Identified:</strong> {analysis.materials.length}</div>
                    <div><strong>CO₂ Savings:</strong> {analysis.co2Savings} tons</div>
                    <div><strong>Demolition Date:</strong> {analysis.logistics.demolitionDate}</div>
                    <div><strong>Location:</strong> {analysis.logistics.location}</div>
                  </div>
                </div>

                {/* Materials Breakdown */}
                <div style={{ display: 'grid', gap: '15px' }}>
                  {analysis.materials.map((material, index) => (
                    <div key={index} style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '20px',
                      background: '#f9f9f9'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                        <div>
                          <h5 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '5px' }}>{material.type}</h5>
                          <p style={{ color: '#666', fontSize: '0.9rem' }}>{material.quantity} • {material.grade}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            background: getConditionColor(material.condition),
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            marginBottom: '5px'
                          }}>
                            {material.condition}
                          </div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#4CAF50' }}>
                            ${material.estimatedValue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '0.9rem', marginBottom: '15px' }}>
                        <div><strong>Weight:</strong> {material.weight}</div>
                        <div><strong>CO₂ Savings:</strong> {material.co2Savings} tons</div>
                        <div style={{ color: getDemandColor(analysis.marketDemand[material.type.toLowerCase().split(' ')[0]] || 'Medium') }}>
                          <strong>Market Demand:</strong> {analysis.marketDemand[material.type.toLowerCase().split(' ')[0]] || 'Medium'}
                        </div>
                      </div>
                      
                      <div>
                        <strong style={{ fontSize: '0.9rem' }}>Applications:</strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                          {material.applications.map((app, appIndex) => (
                            <span key={appIndex} style={{
                              background: '#e8f5e8',
                              color: '#2E7D32',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '0.8rem',
                              fontWeight: 'bold'
                            }}>
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marketplace Listing */}
              <div className="card">
                <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🏪 List on Marketplace</h3>
                <div style={{ textAlign: 'center' }}>
                  <button
                    style={{
                      fontSize: '1.2rem',
                      padding: '15px 40px',
                      background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                      border: 'none',
                      borderRadius: '25px',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    🚀 List All Materials on Marketplace
                  </button>
                  <p style={{ marginTop: '15px', color: '#666' }}>
                    Estimated total interest: <strong>89 potential buyers</strong> within 50 miles
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {userType === 'construction' && (
        <div className="card">
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🔍 Browse Available Materials</h3>
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏗️</div>
            <p>Construction marketplace coming soon!</p>
            <p style={{ fontSize: '0.9rem' }}>Browse reclaimed materials from demolition sites in your area</p>
          </div>
        </div>
      )}

      {userType === 'architect' && (
        <div className="card">
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📐 Design with Reclaimed Materials</h3>
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎨</div>
            <p>Architect tools coming soon!</p>
            <p style={{ fontSize: '0.9rem' }}>Design sustainable buildings with available reclaimed materials</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DigitalQuarry;