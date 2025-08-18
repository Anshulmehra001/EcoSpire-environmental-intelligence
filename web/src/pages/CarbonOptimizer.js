import React, { useState, useEffect } from 'react';

function CarbonOptimizer() {
  const [userProfile, setUserProfile] = useState({
    location: '',
    householdSize: 1,
    homeType: '',
    transportMode: '',
    dietType: '',
    energySource: ''
  });
  const [carbonData, setCarbonData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // AI-powered carbon analysis
  const analyzeCarbonFootprint = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calculate carbon footprint based on profile
    const calculations = {
      housing: calculateHousingEmissions(userProfile),
      transport: calculateTransportEmissions(userProfile),
      food: calculateFoodEmissions(userProfile),
      consumption: calculateConsumptionEmissions(userProfile)
    };
    
    const totalAnnual = Object.values(calculations).reduce((sum, val) => sum + val, 0);
    
    setCarbonData({
      ...calculations,
      totalAnnual,
      monthlyAverage: totalAnnual / 12,
      dailyAverage: totalAnnual / 365,
      comparison: {
        nationalAverage: 16.0, // US average tons CO2/year
        globalAverage: 4.8,
        target2030: 2.3
      }
    });
    
    // Generate AI recommendations
    const aiRecommendations = generateAIRecommendations(userProfile, calculations);
    setRecommendations(aiRecommendations);
    
    // Validate calculation accuracy
    try {
      const { accuracyValidator } = await import('../utils/accuracyValidator');
      const validation = await accuracyValidator.validateCarbonCalculations({
        profile: userProfile,
        calculations: calculations,
        totalAnnual: totalAnnual
      });
      
      setCarbonData(prevData => ({
        ...prevData,
        accuracyInfo: {
          confidence: validation.accuracy,
          methodology: validation.methodology || 'EPA and IPCC emission factors',
          limitations: validation.limitations || [
            'Estimates based on average consumption patterns',
            'Regional variations in energy sources not fully captured',
            'Individual behavior variations may affect accuracy'
          ],
          dataQuality: validation.dataQuality || 'Good',
          lastUpdated: new Date().toISOString()
        }
      }));
      
      console.log('🎯 Carbon calculation accuracy:', validation.accuracy + '%');
    } catch (validationError) {
      console.warn('Carbon validation failed:', validationError.message);
      setCarbonData(prevData => ({
        ...prevData,
        accuracyInfo: {
          confidence: 75,
          methodology: 'Standard emission factors (EPA/IPCC)',
          limitations: [
            'Estimates based on general consumption patterns',
            'Individual variations may affect accuracy',
            'Regional energy mix variations not fully captured'
          ],
          dataQuality: 'Estimated',
          lastUpdated: new Date().toISOString()
        }
      }));
    }

    // Log activity for dashboard
    try {
      const { authManager } = await import('../utils/auth');
      await authManager.logActivity('Carbon footprint analysis completed', {
        totalAnnual: totalAnnual,
        homeType: userProfile.homeType,
        transportMode: userProfile.transportMode,
        dietType: userProfile.dietType
      });
    } catch (error) {
      console.warn('Failed to log activity:', error);
    }
    
    setIsAnalyzing(false);
  };

  const calculateHousingEmissions = (profile) => {
    const baseEmissions = {
      'Apartment': 8.5,
      'House': 12.2,
      'Condo': 9.8,
      'Townhouse': 11.1
    };
    
    const sizeMultiplier = 0.8 + (profile.householdSize * 0.3);
    const energyMultiplier = {
      'Grid (Mixed)': 1.0,
      'Natural Gas': 1.2,
      'Coal': 1.8,
      'Solar': 0.1,
      'Wind': 0.05,
      'Nuclear': 0.2
    };
    
    return (baseEmissions[profile.homeType] || 10) * sizeMultiplier * (energyMultiplier[profile.energySource] || 1.0);
  };

  const calculateTransportEmissions = (profile) => {
    const transportEmissions = {
      'Car (Gas)': 4.6,
      'Car (Hybrid)': 2.3,
      'Car (Electric)': 1.2,
      'Public Transit': 1.8,
      'Bike/Walk': 0.2,
      'Mixed': 3.2
    };
    
    return transportEmissions[profile.transportMode] || 3.0;
  };

  const calculateFoodEmissions = (profile) => {
    const dietEmissions = {
      'Omnivore': 3.3,
      'Pescatarian': 2.5,
      'Vegetarian': 1.7,
      'Vegan': 1.0,
      'Flexitarian': 2.2
    };
    
    return dietEmissions[profile.dietType] || 2.8;
  };

  const calculateConsumptionEmissions = (profile) => {
    // Base consumption emissions
    return 2.5 + (profile.householdSize * 0.8);
  };

  const generateAIRecommendations = (profile, calculations) => {
    const recs = [];
    
    // Housing recommendations
    if (calculations.housing > 10) {
      recs.push({
        category: 'Housing',
        title: 'Smart Thermostat Installation',
        impact: '15-23% heating/cooling reduction',
        savings: '$180/year',
        co2Reduction: '1.8 tons/year',
        difficulty: 'Medium',
        cost: '$200-300',
        payback: '1.5 years',
        icon: '🌡️',
        description: 'AI-powered temperature control reduces energy waste by learning your schedule and preferences.',
        steps: [
          'Research compatible smart thermostats',
          'Schedule professional installation',
          'Configure learning algorithms',
          'Monitor savings through app'
        ]
      });
    }
    
    // Transport recommendations
    if (calculations.transport > 3) {
      recs.push({
        category: 'Transport',
        title: 'Electric Vehicle Transition',
        impact: '60-80% transport emissions reduction',
        savings: '$1,200/year in fuel',
        co2Reduction: '2.8 tons/year',
        difficulty: 'High',
        cost: '$25,000-40,000',
        payback: '5-7 years',
        icon: '🚗',
        description: 'Switch to electric vehicle for dramatic emissions reduction and long-term savings.',
        steps: [
          'Calculate total cost of ownership',
          'Research available EV models',
          'Check local incentives and rebates',
          'Plan home charging installation'
        ]
      });
    }
    
    // Food recommendations
    if (calculations.food > 2.5) {
      recs.push({
        category: 'Food',
        title: 'Plant-Forward Diet Shift',
        impact: '30-50% food emissions reduction',
        savings: '$400/year groceries',
        co2Reduction: '1.2 tons/year',
        difficulty: 'Medium',
        cost: '$0 (saves money)',
        payback: 'Immediate',
        icon: '🌱',
        description: 'Reduce meat consumption by 50% and increase plant-based meals.',
        steps: [
          'Plan 3 plant-based meals per week',
          'Find local plant-based recipes',
          'Shop at farmers markets',
          'Track nutrition and satisfaction'
        ]
      });
    }
    
    // Always include energy efficiency
    recs.push({
      category: 'Energy',
      title: 'Home Energy Audit & Upgrades',
      impact: '20-30% energy reduction',
      savings: '$300/year',
      co2Reduction: '2.1 tons/year',
      difficulty: 'Medium',
      cost: '$500-2,000',
      payback: '2-3 years',
      icon: '🏠',
      description: 'Professional audit identifies biggest energy waste opportunities.',
      steps: [
        'Schedule professional energy audit',
        'Prioritize recommendations by ROI',
        'Apply for utility rebates',
        'Implement top 3 recommendations'
      ]
    });
    
    return recs.slice(0, 4); // Return top 4 recommendations
  };

  const getEmissionColor = (value, category) => {
    const thresholds = {
      housing: { low: 8, high: 15 },
      transport: { low: 2, high: 5 },
      food: { low: 1.5, high: 3.5 },
      consumption: { low: 2, high: 4 }
    };
    
    const threshold = thresholds[category];
    if (value <= threshold.low) return '#4CAF50';
    if (value <= threshold.high) return '#FF9800';
    return '#f44336';
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🤖 AI Carbon Footprint Optimizer
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          Personalized AI recommendations to minimize your environmental impact
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
          🎯 Precision Analysis • 💡 Smart Recommendations • 📊 Impact Tracking
        </div>
      </div>

      {/* Profile Setup */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>👤 Your Carbon Profile</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Home Type:</label>
            <select
              value={userProfile.homeType}
              onChange={(e) => setUserProfile({...userProfile, homeType: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #4CAF50' }}
            >
              <option value="">Select...</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Household Size:</label>
            <select
              value={userProfile.householdSize}
              onChange={(e) => setUserProfile({...userProfile, householdSize: parseInt(e.target.value)})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #4CAF50' }}
            >
              {[1,2,3,4,5,6].map(size => (
                <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Primary Transport:</label>
            <select
              value={userProfile.transportMode}
              onChange={(e) => setUserProfile({...userProfile, transportMode: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #4CAF50' }}
            >
              <option value="">Select...</option>
              <option value="Car (Gas)">Car (Gasoline)</option>
              <option value="Car (Hybrid)">Car (Hybrid)</option>
              <option value="Car (Electric)">Car (Electric)</option>
              <option value="Public Transit">Public Transit</option>
              <option value="Bike/Walk">Bike/Walk</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Diet Type:</label>
            <select
              value={userProfile.dietType}
              onChange={(e) => setUserProfile({...userProfile, dietType: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #4CAF50' }}
            >
              <option value="">Select...</option>
              <option value="Omnivore">Omnivore</option>
              <option value="Flexitarian">Flexitarian</option>
              <option value="Pescatarian">Pescatarian</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Energy Source:</label>
            <select
              value={userProfile.energySource}
              onChange={(e) => setUserProfile({...userProfile, energySource: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #4CAF50' }}
            >
              <option value="">Select...</option>
              <option value="Grid (Mixed)">Grid (Mixed)</option>
              <option value="Natural Gas">Natural Gas</option>
              <option value="Solar">Solar</option>
              <option value="Wind">Wind</option>
              <option value="Nuclear">Nuclear</option>
              <option value="Coal">Coal</option>
            </select>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={analyzeCarbonFootprint}
            disabled={isAnalyzing || !userProfile.homeType || !userProfile.transportMode}
            style={{
              fontSize: '1.2rem',
              padding: '15px 40px',
              background: isAnalyzing || !userProfile.homeType || !userProfile.transportMode ? '#ccc' : 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
              border: 'none',
              borderRadius: '25px',
              color: 'white',
              fontWeight: 'bold',
              cursor: isAnalyzing || !userProfile.homeType || !userProfile.transportMode ? 'not-allowed' : 'pointer'
            }}
          >
            {isAnalyzing ? '🤖 AI Analysis in Progress...' : '🔍 Analyze My Carbon Footprint'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {carbonData && (
        <>
          {/* Carbon Footprint Overview */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📊 Your Carbon Footprint Analysis</h3>
            
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ 
                fontSize: '4rem', 
                color: carbonData.totalAnnual > 16 ? '#f44336' : carbonData.totalAnnual > 8 ? '#FF9800' : '#4CAF50',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                {carbonData.totalAnnual.toFixed(1)}
              </div>
              <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                tons CO₂ per year
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', color: '#666', marginBottom: '5px' }}>
                    {carbonData.monthlyAverage.toFixed(1)}
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>tons/month</div>
                </div>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', color: '#666', marginBottom: '5px' }}>
                    {(carbonData.dailyAverage * 1000).toFixed(0)}
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>lbs/day</div>
                </div>
              </div>
            </div>

            {/* Breakdown by Category */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ 
                textAlign: 'center', 
                padding: '20px', 
                background: '#f9f9f9', 
                borderRadius: '12px',
                border: `3px solid ${getEmissionColor(carbonData.housing, 'housing')}`
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🏠</div>
                <div style={{ fontSize: '1.8rem', color: getEmissionColor(carbonData.housing, 'housing'), fontWeight: 'bold' }}>
                  {carbonData.housing.toFixed(1)}
                </div>
                <div style={{ fontWeight: 'bold' }}>Housing</div>
              </div>
              
              <div style={{ 
                textAlign: 'center', 
                padding: '20px', 
                background: '#f9f9f9', 
                borderRadius: '12px',
                border: `3px solid ${getEmissionColor(carbonData.transport, 'transport')}`
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🚗</div>
                <div style={{ fontSize: '1.8rem', color: getEmissionColor(carbonData.transport, 'transport'), fontWeight: 'bold' }}>
                  {carbonData.transport.toFixed(1)}
                </div>
                <div style={{ fontWeight: 'bold' }}>Transport</div>
              </div>
              
              <div style={{ 
                textAlign: 'center', 
                padding: '20px', 
                background: '#f9f9f9', 
                borderRadius: '12px',
                border: `3px solid ${getEmissionColor(carbonData.food, 'food')}`
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🍽️</div>
                <div style={{ fontSize: '1.8rem', color: getEmissionColor(carbonData.food, 'food'), fontWeight: 'bold' }}>
                  {carbonData.food.toFixed(1)}
                </div>
                <div style={{ fontWeight: 'bold' }}>Food</div>
              </div>
              
              <div style={{ 
                textAlign: 'center', 
                padding: '20px', 
                background: '#f9f9f9', 
                borderRadius: '12px',
                border: `3px solid ${getEmissionColor(carbonData.consumption, 'consumption')}`
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🛍️</div>
                <div style={{ fontSize: '1.8rem', color: getEmissionColor(carbonData.consumption, 'consumption'), fontWeight: 'bold' }}>
                  {carbonData.consumption.toFixed(1)}
                </div>
                <div style={{ fontWeight: 'bold' }}>Consumption</div>
              </div>
            </div>

            {/* Comparison */}
            <div style={{ 
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', 
              padding: '20px', 
              borderRadius: '12px',
              border: '2px solid #2196F3'
            }}>
              <h4 style={{ color: '#1976d2', marginBottom: '15px' }}>📈 How You Compare</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', color: '#1976d2', fontWeight: 'bold' }}>
                    {carbonData.comparison.nationalAverage}
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>US Average</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', color: '#1976d2', fontWeight: 'bold' }}>
                    {carbonData.comparison.globalAverage}
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>Global Average</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', color: '#1976d2', fontWeight: 'bold' }}>
                    {carbonData.comparison.target2030}
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>2030 Target</div>
                </div>
              </div>
            </div>

            {/* Accuracy Information */}
            {carbonData.accuracyInfo && (
              <div style={{ 
                background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)', 
                padding: '20px', 
                borderRadius: '12px',
                border: '2px solid #9C27B0',
                marginTop: '20px'
              }}>
                <h4 style={{ color: '#7B1FA2', marginBottom: '15px' }}>🎯 Calculation Accuracy & Methodology</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', color: '#7B1FA2', fontWeight: 'bold' }}>
                      {carbonData.accuracyInfo.confidence}%
                    </div>
                    <div style={{ fontSize: '0.9rem' }}>Calculation Confidence</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', color: '#7B1FA2', fontWeight: 'bold' }}>
                      {carbonData.accuracyInfo.dataQuality}
                    </div>
                    <div style={{ fontSize: '0.9rem' }}>Data Quality</div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#7B1FA2' }}>Methodology:</strong>
                  <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>{carbonData.accuracyInfo.methodology}</p>
                </div>
                
                <div>
                  <strong style={{ color: '#7B1FA2' }}>Limitations:</strong>
                  <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                    {carbonData.accuracyInfo.limitations.map((limitation, idx) => (
                      <li key={idx} style={{ marginBottom: '3px' }}>{limitation}</li>
                    ))}
                  </ul>
                </div>
                
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>
                  Last updated: {new Date(carbonData.accuracyInfo.lastUpdated).toLocaleString()}
                </div>
              </div>
            )}
          </div>

          {/* AI Recommendations */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🤖 AI-Powered Recommendations</h3>
            <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>
              Based on your profile, here are the most impactful changes you can make:
            </p>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              {recommendations.map((rec, index) => (
                <div key={index} style={{
                  background: '#f9f9f9',
                  padding: '25px',
                  borderRadius: '12px',
                  border: '1px solid #ddd'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <span style={{ fontSize: '2.5rem' }}>{rec.icon}</span>
                      <div>
                        <h4 style={{ margin: 0, color: '#2E7D32' }}>{rec.title}</h4>
                        <p style={{ margin: '5px 0 0 0', color: '#666' }}>{rec.description}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        background: '#4CAF50',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                      }}>
                        -{rec.co2Reduction}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        {rec.difficulty} • {rec.payback}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ background: '#e8f5e8', padding: '15px', borderRadius: '8px' }}>
                      <div style={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: '5px' }}>Environmental Impact</div>
                      <div style={{ fontSize: '0.9rem' }}>{rec.impact}</div>
                    </div>
                    <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '8px' }}>
                      <div style={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '5px' }}>Financial Savings</div>
                      <div style={{ fontSize: '0.9rem' }}>{rec.savings}</div>
                    </div>
                    <div style={{ background: '#fff3e0', padding: '15px', borderRadius: '8px' }}>
                      <div style={{ fontWeight: 'bold', color: '#F57C00', marginBottom: '5px' }}>Investment</div>
                      <div style={{ fontSize: '0.9rem' }}>{rec.cost}</div>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#2E7D32' }}>Action Steps:</div>
                    <ol style={{ margin: 0, paddingLeft: '20px' }}>
                      {rec.steps.map((step, stepIndex) => (
                        <li key={stepIndex} style={{ marginBottom: '5px', fontSize: '0.9rem' }}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <button
                    onClick={() => alert('Action started! This would integrate with your calendar and task management.')}
                    style={{
                      background: '#4CAF50',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '20px',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    🚀 Start This Action
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CarbonOptimizer;