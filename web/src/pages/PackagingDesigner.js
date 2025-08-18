import React, { useState } from 'react';

function PackagingDesigner() {
  const [productInfo, setProductInfo] = useState({
    productType: '',
    dimensions: { length: '', width: '', height: '' },
    weight: '',
    fragility: '',
    shippingDistance: '',
    targetMarket: ''
  });
  const [designResults, setDesignResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzePackaging = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generate AI-powered packaging recommendations
    const results = {
      recommendedMaterials: [
        {
          name: 'Mushroom Packaging (Mycelium)',
          sustainability: 95,
          cost: 'Medium',
          protection: 'High',
          biodegradable: true,
          compostable: true,
          description: 'Grown from agricultural waste and mushroom roots, fully biodegradable in 30 days',
          co2Impact: '-2.3 kg CO₂ vs plastic',
          applications: ['Electronics', 'Fragile items', 'Cosmetics']
        },
        {
          name: 'Seaweed-Based Film',
          sustainability: 92,
          cost: 'Medium-High',
          protection: 'Medium',
          biodegradable: true,
          compostable: true,
          description: 'Made from abundant seaweed, dissolves in water, edible and non-toxic',
          co2Impact: '-1.8 kg CO₂ vs plastic',
          applications: ['Food packaging', 'Small items', 'Sachets']
        },
        {
          name: 'Recycled Cardboard (FSC)',
          sustainability: 78,
          cost: 'Low',
          protection: 'Medium',
          biodegradable: true,
          compostable: true,
          description: 'Forest Stewardship Council certified, 90% recycled content',
          co2Impact: '-0.9 kg CO₂ vs virgin cardboard',
          applications: ['Books', 'Clothing', 'General shipping']
        }
      ],
      designOptimizations: [
        {
          optimization: 'Right-Size Packaging',
          impact: '23% material reduction',
          description: 'AI-calculated optimal dimensions reduce waste and shipping costs',
          implementation: 'Custom box sizes: 18cm × 12cm × 8cm',
          savings: '$0.85 per package'
        },
        {
          optimization: 'Honeycomb Structure',
          impact: '40% weight reduction',
          description: 'Biomimetic internal structure provides strength with less material',
          implementation: 'Hexagonal void pattern in protective layers',
          savings: '$0.45 per package'
        },
        {
          optimization: 'Modular Design',
          impact: '60% assembly time reduction',
          description: 'Interlocking components eliminate tape and adhesives',
          implementation: 'Origami-inspired folding mechanism',
          savings: '$0.30 per package'
        }
      ],
      environmentalImpact: {
        co2Reduction: '4.2 kg per 100 packages',
        wasteReduction: '78% vs traditional packaging',
        waterSavings: '340L per 100 packages',
        energySavings: '45 kWh per 100 packages'
      },
      costAnalysis: {
        materialCost: '$2.15 per package',
        traditionalCost: '$1.85 per package',
        breakEvenVolume: '5,000 units',
        longTermSavings: '$0.65 per package at scale'
      },
      certifications: [
        'FSC Certified',
        'Cradle to Cradle',
        'ASTM D6400 Compostable',
        'BPI Certified',
        'OK Compost HOME'
      ]
    };
    
    setDesignResults(results);
    setIsAnalyzing(false);
  };

  const getSustainabilityColor = (score) => {
    if (score >= 90) return '#4CAF50';
    if (score >= 75) return '#8BC34A';
    if (score >= 60) return '#FF9800';
    return '#f44336';
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          📦 AI Sustainable Packaging Designer
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          Design eco-friendly packaging that protects products and the planet
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
          🌱 Biomaterial Selection • 🔬 AI Optimization • 📊 Impact Analysis
        </div>
      </div>

      {/* Problem Statement */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
        border: '2px solid #f44336'
      }}>
        <h3 style={{ color: '#d32f2f', marginBottom: '15px' }}>🚨 The Packaging Crisis</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', color: '#f44336', marginBottom: '10px' }}>165B</div>
            <div style={{ fontWeight: 'bold' }}>Packages Shipped Annually</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', color: '#f44336', marginBottom: '10px' }}>30%</div>
            <div style={{ fontWeight: 'bold' }}>Packaging Waste</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', color: '#f44336', marginBottom: '10px' }}>400</div>
            <div style={{ fontWeight: 'bold' }}>Years to Decompose</div>
          </div>
        </div>
      </div>

      {/* Product Information Form */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📋 Product Information</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Product Type:</label>
            <select
              value={productInfo.productType}
              onChange={(e) => setProductInfo({...productInfo, productType: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #4CAF50' }}
            >
              <option value="">Select product type...</option>
              <option value="Electronics">Electronics</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Food">Food & Beverages</option>
              <option value="Clothing">Clothing & Textiles</option>
              <option value="Books">Books & Media</option>
              <option value="Fragile">Fragile Items</option>
              <option value="Chemicals">Chemicals & Liquids</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Weight (kg):</label>
            <input
              type="number"
              value={productInfo.weight}
              onChange={(e) => setProductInfo({...productInfo, weight: e.target.value})}
              placeholder="Product weight"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #4CAF50' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Fragility Level:</label>
            <select
              value={productInfo.fragility}
              onChange={(e) => setProductInfo({...productInfo, fragility: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #4CAF50' }}
            >
              <option value="">Select fragility...</option>
              <option value="Low">Low (Books, Clothing)</option>
              <option value="Medium">Medium (Electronics)</option>
              <option value="High">High (Glass, Ceramics)</option>
              <option value="Extreme">Extreme (Scientific Equipment)</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Shipping Distance:</label>
            <select
              value={productInfo.shippingDistance}
              onChange={(e) => setProductInfo({...productInfo, shippingDistance: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #4CAF50' }}
            >
              <option value="">Select distance...</option>
              <option value="Local">Local (&lt; 100 miles)</option>
              <option value="Regional">Regional (100-500 miles)</option>
              <option value="National">National (500-2000 miles)</option>
              <option value="International">International (&gt; 2000 miles)</option>
            </select>
          </div>
        </div>

        {/* Dimensions */}
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Product Dimensions (cm):</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
            <input
              type="number"
              value={productInfo.dimensions.length}
              onChange={(e) => setProductInfo({
                ...productInfo, 
                dimensions: {...productInfo.dimensions, length: e.target.value}
              })}
              placeholder="Length"
              style={{ padding: '12px', borderRadius: '8px', border: '2px solid #4CAF50' }}
            />
            <input
              type="number"
              value={productInfo.dimensions.width}
              onChange={(e) => setProductInfo({
                ...productInfo, 
                dimensions: {...productInfo.dimensions, width: e.target.value}
              })}
              placeholder="Width"
              style={{ padding: '12px', borderRadius: '8px', border: '2px solid #4CAF50' }}
            />
            <input
              type="number"
              value={productInfo.dimensions.height}
              onChange={(e) => setProductInfo({
                ...productInfo, 
                dimensions: {...productInfo.dimensions, height: e.target.value}
              })}
              placeholder="Height"
              style={{ padding: '12px', borderRadius: '8px', border: '2px solid #4CAF50' }}
            />
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={analyzePackaging}
            disabled={isAnalyzing || !productInfo.productType || !productInfo.weight}
            className="btn btn-primary"
            style={{
              fontSize: '1.2rem',
              padding: '15px 40px',
              background: isAnalyzing ? '#ccc' : 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
              border: 'none',
              borderRadius: '25px',
              color: 'white'
            }}
          >
            {isAnalyzing ? '🤖 AI Design in Progress...' : '🎨 Design Sustainable Packaging'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {designResults && (
        <>
          {/* Recommended Materials */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🌱 AI-Recommended Materials</h3>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              {designResults.recommendedMaterials.map((material, index) => (
                <div key={index} style={{
                  background: '#f9f9f9',
                  padding: '25px',
                  borderRadius: '12px',
                  border: `3px solid ${getSustainabilityColor(material.sustainability)}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <div>
                      <h4 style={{ margin: 0, color: '#2E7D32', marginBottom: '5px' }}>{material.name}</h4>
                      <p style={{ margin: 0, color: '#666', fontSize: '1rem' }}>{material.description}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        background: getSustainabilityColor(material.sustainability),
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                      }}>
                        {material.sustainability}% Sustainable
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        Cost: {material.cost}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ background: '#e8f5e8', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: '5px' }}>Protection</div>
                      <div style={{ fontSize: '0.9rem' }}>{material.protection}</div>
                    </div>
                    <div style={{ background: '#e3f2fd', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '5px' }}>CO₂ Impact</div>
                      <div style={{ fontSize: '0.9rem', color: '#4CAF50' }}>{material.co2Impact}</div>
                    </div>
                    <div style={{ background: '#fff3e0', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontWeight: 'bold', color: '#F57C00', marginBottom: '5px' }}>Biodegradable</div>
                      <div style={{ fontSize: '0.9rem' }}>{material.biodegradable ? '✅ Yes' : '❌ No'}</div>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#2E7D32' }}>Best Applications:</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {material.applications.map((app, appIndex) => (
                        <span key={appIndex} style={{
                          background: '#4CAF50',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '0.8rem'
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

          {/* Design Optimizations */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>⚡ AI Design Optimizations</h3>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              {designResults.designOptimizations.map((opt, index) => (
                <div key={index} style={{
                  background: '#f9f9f9',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #ddd'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h4 style={{ margin: 0, color: '#2E7D32' }}>{opt.optimization}</h4>
                    <div style={{
                      background: '#4CAF50',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {opt.impact}
                    </div>
                  </div>
                  
                  <p style={{ color: '#666', marginBottom: '15px' }}>{opt.description}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div style={{ background: '#e8f5e8', padding: '15px', borderRadius: '8px' }}>
                      <div style={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: '5px' }}>Implementation</div>
                      <div style={{ fontSize: '0.9rem' }}>{opt.implementation}</div>
                    </div>
                    <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '8px' }}>
                      <div style={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '5px' }}>Cost Savings</div>
                      <div style={{ fontSize: '0.9rem', color: '#4CAF50' }}>{opt.savings}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🌍 Environmental Impact Analysis</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ textAlign: 'center', padding: '20px', background: '#e8f5e8', borderRadius: '12px' }}>
                <div style={{ fontSize: '2.5rem', color: '#4CAF50', marginBottom: '10px' }}>
                  {designResults.environmentalImpact.co2Reduction}
                </div>
                <div style={{ fontWeight: 'bold' }}>CO₂ Reduction</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: '#e3f2fd', borderRadius: '12px' }}>
                <div style={{ fontSize: '2.5rem', color: '#2196F3', marginBottom: '10px' }}>
                  {designResults.environmentalImpact.wasteReduction}
                </div>
                <div style={{ fontWeight: 'bold' }}>Waste Reduction</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: '#e1f5fe', borderRadius: '12px' }}>
                <div style={{ fontSize: '2.5rem', color: '#00BCD4', marginBottom: '10px' }}>
                  {designResults.environmentalImpact.waterSavings}
                </div>
                <div style={{ fontWeight: 'bold' }}>Water Savings</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: '#fff3e0', borderRadius: '12px' }}>
                <div style={{ fontSize: '2.5rem', color: '#FF9800', marginBottom: '10px' }}>
                  {designResults.environmentalImpact.energySavings}
                </div>
                <div style={{ fontWeight: 'bold' }}>Energy Savings</div>
              </div>
            </div>
          </div>

          {/* Cost Analysis */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>💰 Cost Analysis</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ textAlign: 'center', padding: '20px', background: '#fff3e0', borderRadius: '12px' }}>
                <div style={{ fontSize: '2rem', color: '#FF9800', marginBottom: '10px' }}>
                  {designResults.costAnalysis.materialCost}
                </div>
                <div style={{ fontWeight: 'bold' }}>Sustainable Cost</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: '#ffebee', borderRadius: '12px' }}>
                <div style={{ fontSize: '2rem', color: '#f44336', marginBottom: '10px' }}>
                  {designResults.costAnalysis.traditionalCost}
                </div>
                <div style={{ fontWeight: 'bold' }}>Traditional Cost</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: '#e8f5e8', borderRadius: '12px' }}>
                <div style={{ fontSize: '2rem', color: '#4CAF50', marginBottom: '10px' }}>
                  {designResults.costAnalysis.breakEvenVolume}
                </div>
                <div style={{ fontWeight: 'bold' }}>Break-Even Volume</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: '#e3f2fd', borderRadius: '12px' }}>
                <div style={{ fontSize: '2rem', color: '#2196F3', marginBottom: '10px' }}>
                  {designResults.costAnalysis.longTermSavings}
                </div>
                <div style={{ fontWeight: 'bold' }}>Long-term Savings</div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🏆 Available Certifications</h3>
            
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {designResults.certifications.map((cert, index) => (
                <div key={index} style={{
                  background: '#4CAF50',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ✅ {cert}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PackagingDesigner;