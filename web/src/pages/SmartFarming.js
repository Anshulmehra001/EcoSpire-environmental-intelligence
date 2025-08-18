import React, { useState, useEffect } from 'react';
import { soilHealthAnalyzer } from '../utils/soilHealthAnalyzer';
import { climateImpactAssessment } from '../utils/climateImpactAssessment';
import { realTimeEnvironmentalAPI } from '../utils/realTimeEnvironmentalAPI';

function SmartFarming() {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [currentPractices, setCurrentPractices] = useState([]);
  const [realTimeData, setRealTimeData] = useState(null);
  const [location, setLocation] = useState({ lat: 40.7128, lon: -74.0060 }); // Default to NYC
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Load real-time environmental data
  useEffect(() => {
    loadRealTimeData();
    
    // Update data every 10 minutes
    const interval = setInterval(loadRealTimeData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location]);

  const loadRealTimeData = async () => {
    setIsLoadingData(true);
    try {
      const data = await realTimeEnvironmentalAPI.getComprehensiveData(location.lat, location.lon);
      setRealTimeData(data);
    } catch (error) {
      console.error('Failed to load real-time data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied, using default location');
        }
      );
    }
  }, []);

  const farmingTechniques = [
    {
      id: 1,
      name: "Precision Agriculture",
      icon: "🎯",
      category: "Technology",
      description: "Use GPS, sensors, and data analytics to optimize crop yields while minimizing inputs",
      benefits: [
        "20-30% reduction in fertilizer use",
        "15-25% increase in crop yields",
        "50% reduction in water usage",
        "Reduced environmental impact"
      ],
      implementation: [
        "Install soil moisture sensors",
        "Use GPS-guided tractors",
        "Implement variable rate technology",
        "Monitor with drones or satellites"
      ],
      cost: "Medium to High",
      roi: "2-3 years",
      difficulty: "Advanced"
    },
    {
      id: 2,
      name: "Regenerative Agriculture",
      icon: "🌱",
      category: "Soil Health",
      description: "Farming practices that restore soil health, increase biodiversity, and sequester carbon",
      benefits: [
        "Improved soil organic matter",
        "Enhanced water retention",
        "Increased biodiversity",
        "Carbon sequestration"
      ],
      implementation: [
        "Plant diverse cover crops",
        "Implement rotational grazing",
        "Minimize soil disturbance",
        "Integrate livestock and crops"
      ],
      cost: "Low to Medium",
      roi: "3-5 years",
      difficulty: "Intermediate"
    },
    {
      id: 3,
      name: "Vertical Farming",
      icon: "🏢",
      category: "Space Optimization",
      description: "Grow crops in vertically stacked layers using controlled environment agriculture",
      benefits: [
        "95% less water usage",
        "365-day growing season",
        "No pesticides needed",
        "95% less land required"
      ],
      implementation: [
        "Set up LED grow lights",
        "Install hydroponic systems",
        "Control temperature and humidity",
        "Automate nutrient delivery"
      ],
      cost: "High",
      roi: "5-7 years",
      difficulty: "Advanced"
    },
    {
      id: 4,
      name: "Integrated Pest Management",
      icon: "🐛",
      category: "Pest Control",
      description: "Eco-friendly approach combining biological, cultural, and chemical pest control",
      benefits: [
        "80% reduction in pesticide use",
        "Lower input costs",
        "Preserved beneficial insects",
        "Reduced resistance development"
      ],
      implementation: [
        "Monitor pest populations",
        "Use beneficial insects",
        "Implement crop rotation",
        "Apply targeted treatments"
      ],
      cost: "Low",
      roi: "1-2 years",
      difficulty: "Beginner"
    },
    {
      id: 5,
      name: "Agroforestry",
      icon: "🌳",
      category: "Biodiversity",
      description: "Integrate trees and shrubs into crop and livestock systems",
      benefits: [
        "Increased biodiversity",
        "Improved soil health",
        "Additional income streams",
        "Climate resilience"
      ],
      implementation: [
        "Plant trees along field borders",
        "Create windbreaks",
        "Establish silvopasture systems",
        "Integrate fruit/nut trees"
      ],
      cost: "Medium",
      roi: "5-10 years",
      difficulty: "Intermediate"
    },
    {
      id: 6,
      name: "Smart Irrigation",
      icon: "💧",
      category: "Water Management",
      description: "Automated irrigation systems using sensors and weather data",
      benefits: [
        "30-50% water savings",
        "Improved crop quality",
        "Reduced labor costs",
        "Optimized nutrient delivery"
      ],
      implementation: [
        "Install soil moisture sensors",
        "Set up drip irrigation",
        "Connect to weather stations",
        "Use mobile monitoring apps"
      ],
      cost: "Medium",
      roi: "2-3 years",
      difficulty: "Intermediate"
    }
  ];

  const cropRecommendations = {
    "Corn": {
      techniques: ["Precision Agriculture", "Smart Irrigation", "Integrated Pest Management"],
      seasonalTips: [
        "Spring: Use cover crops to improve soil health",
        "Summer: Monitor for corn borer and apply IPM",
        "Fall: Implement no-till practices for next season"
      ],
      sustainability: "Plant nitrogen-fixing cover crops between seasons"
    },
    "Wheat": {
      techniques: ["Regenerative Agriculture", "Precision Agriculture", "Agroforestry"],
      seasonalTips: [
        "Fall: Plant winter wheat with diverse cover crop mix",
        "Spring: Apply precision fertilizer based on soil tests",
        "Summer: Use integrated pest management for aphids"
      ],
      sustainability: "Rotate with legumes to reduce nitrogen fertilizer needs"
    },
    "Soybeans": {
      techniques: ["Regenerative Agriculture", "Integrated Pest Management", "Smart Irrigation"],
      seasonalTips: [
        "Spring: Inoculate seeds with rhizobia bacteria",
        "Summer: Monitor for soybean aphids and spider mites",
        "Fall: Leave crop residue to protect soil"
      ],
      sustainability: "Natural nitrogen fixation reduces fertilizer requirements"
    },
    "Vegetables": {
      techniques: ["Vertical Farming", "Smart Irrigation", "Integrated Pest Management"],
      seasonalTips: [
        "Year-round: Use succession planting for continuous harvest",
        "Spring: Start with cold-hardy varieties",
        "Summer: Implement shade structures for heat protection"
      ],
      sustainability: "Companion planting and beneficial insect habitats"
    }
  };

  const farmingApps = [
    {
      name: "Climate FieldView",
      category: "Data Analytics",
      description: "Digital farming platform for data-driven decisions",
      features: ["Field mapping", "Yield analysis", "Weather monitoring"],
      link: "https://climate.com/fieldview",
      rating: 4.5
    },
    {
      name: "FarmLogs",
      category: "Farm Management",
      description: "Simple farm record keeping and field management",
      features: ["Activity tracking", "Input management", "Profit analysis"],
      link: "https://farmlogs.com",
      rating: 4.3
    },
    {
      name: "AgriWebb",
      category: "Livestock",
      description: "Livestock management and pasture monitoring",
      features: ["Animal tracking", "Grazing management", "Health records"],
      link: "https://agriwebb.com",
      rating: 4.4
    },
    {
      name: "Plantix",
      category: "Crop Health",
      description: "AI-powered crop disease detection",
      features: ["Disease diagnosis", "Treatment recommendations", "Expert advice"],
      link: "https://plantix.net",
      rating: 4.2
    },
    {
      name: "iCell.net",
      category: "Weather",
      description: "Hyperlocal weather forecasting for agriculture",
      features: ["Micro-climate data", "Disease risk alerts", "Spray advisories"],
      link: "https://icellnet.com",
      rating: 4.1
    },
    {
      name: "Cropio",
      category: "Satellite Monitoring",
      description: "Satellite-based crop monitoring and analytics",
      features: ["NDVI mapping", "Growth stage tracking", "Yield prediction"],
      link: "https://cropio.com",
      rating: 4.0
    }
  ];

  const sustainabilityPractices = [
    {
      practice: "Carbon Farming",
      description: "Sequester carbon in soil through regenerative practices",
      impact: "1-3 tons CO2/acre/year",
      incentives: "Carbon credit payments: $10-50/ton CO2"
    },
    {
      practice: "Biodiversity Conservation",
      description: "Create wildlife habitats and pollinator corridors",
      impact: "30% increase in beneficial insects",
      incentives: "Conservation program payments: $50-200/acre"
    },
    {
      practice: "Water Conservation",
      description: "Implement efficient irrigation and water management",
      impact: "30-50% reduction in water use",
      incentives: "Utility rebates and tax credits available"
    },
    {
      practice: "Renewable Energy",
      description: "Install solar panels or wind turbines on farm",
      impact: "50-100% energy independence",
      incentives: "30% federal tax credit + state incentives"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#f44336';
      default: return '#666';
    }
  };

  const getCostColor = (cost) => {
    switch (cost) {
      case 'Low': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'High': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🌾 Smart Farming Hub
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          Advanced agricultural techniques for sustainable and profitable farming
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
          🚜 Precision Agriculture • 🌱 Regenerative Practices • 📊 Data-Driven Decisions
        </div>
      </div>

      {/* Real-Time Environmental Data */}
      {realTimeData && (
        <div className="card" style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)' }}>
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🌍 Real-Time Environmental Conditions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            
            {/* Weather Data */}
            <div style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h4 style={{ color: '#1976D2', marginBottom: '10px' }}>🌤️ Weather</h4>
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                <div><strong>Temperature:</strong> {realTimeData.weather.temperature}°C</div>
                <div><strong>Humidity:</strong> {realTimeData.weather.humidity}%</div>
                <div><strong>Wind:</strong> {realTimeData.weather.windSpeed} m/s</div>
                <div><strong>UV Index:</strong> {realTimeData.weather.uvIndex}</div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                  Source: {realTimeData.weather.source}
                </div>
              </div>
            </div>

            {/* Air Quality */}
            <div style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h4 style={{ color: '#FF9800', marginBottom: '10px' }}>🌬️ Air Quality</h4>
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                <div><strong>AQI:</strong> {realTimeData.airQuality.aqi}</div>
                <div><strong>PM2.5:</strong> {realTimeData.airQuality.pm25} μg/m³</div>
                <div><strong>PM10:</strong> {realTimeData.airQuality.pm10} μg/m³</div>
                <div><strong>O₃:</strong> {realTimeData.airQuality.o3} μg/m³</div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                  Source: {realTimeData.airQuality.source}
                </div>
              </div>
            </div>

            {/* Agricultural Conditions */}
            <div style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h4 style={{ color: '#4CAF50', marginBottom: '10px' }}>🌱 Crop Conditions</h4>
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                <div><strong>Soil Moisture:</strong> {realTimeData.agricultural.soilMoisture}%</div>
                <div><strong>Soil Temp:</strong> {realTimeData.agricultural.soilTemperature}°C</div>
                <div><strong>NDVI:</strong> {realTimeData.agricultural.ndvi.toFixed(2)}</div>
                <div><strong>Crop Stage:</strong> {realTimeData.agricultural.cropStage}</div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                  Growing Degree Days: {realTimeData.agricultural.growingDegreeDays}
                </div>
              </div>
            </div>

            {/* Data Quality Indicator */}
            <div style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h4 style={{ color: '#9C27B0', marginBottom: '10px' }}>📊 Data Quality</h4>
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                <div><strong>Quality Score:</strong> {realTimeData.dataQuality.score}%</div>
                <div><strong>Level:</strong> {realTimeData.dataQuality.level}</div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                  Last Updated: {new Date(realTimeData.timestamp).toLocaleTimeString()}
                </div>
                {isLoadingData && (
                  <div style={{ color: '#2196F3', fontSize: '0.8rem', marginTop: '5px' }}>
                    🔄 Updating data...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Farm Assessment */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🎯 Farm Assessment & Recommendations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Primary Crop:</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '2px solid #4CAF50'
              }}
            >
              <option value="">Select your main crop...</option>
              <option value="Corn">Corn</option>
              <option value="Wheat">Wheat</option>
              <option value="Soybeans">Soybeans</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Rice">Rice</option>
              <option value="Cotton">Cotton</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Farm Size:</label>
            <select
              value={farmSize}
              onChange={(e) => setFarmSize(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '2px solid #4CAF50'
              }}
            >
              <option value="">Select farm size...</option>
              <option value="Small">Small (1-50 acres)</option>
              <option value="Medium">Medium (51-500 acres)</option>
              <option value="Large">Large (500+ acres)</option>
            </select>
          </div>
        </div>

        {selectedCrop && cropRecommendations[selectedCrop] && (
          <div style={{ marginTop: '20px', padding: '20px', background: '#e8f5e8', borderRadius: '12px' }}>
            <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>
              🌾 Recommendations for {selectedCrop}
            </h4>
            <div style={{ marginBottom: '15px' }}>
              <strong>Recommended Techniques:</strong>
              <ul style={{ marginTop: '5px' }}>
                {cropRecommendations[selectedCrop].techniques.map((technique, index) => (
                  <li key={index}>{technique}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Seasonal Tips:</strong>
              <ul style={{ marginTop: '5px' }}>
                {cropRecommendations[selectedCrop].seasonalTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Sustainability Focus:</strong> {cropRecommendations[selectedCrop].sustainability}
            </div>
            
            {/* Accuracy Disclaimer */}
            <div style={{
              background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
              padding: '15px',
              borderRadius: '8px',
              border: '2px solid #FF9800',
              marginTop: '15px'
            }}>
              <h5 style={{ color: '#F57C00', marginBottom: '10px' }}>⚠️ Recommendation Accuracy</h5>
              <p style={{ fontSize: '0.9rem', marginBottom: '10px', lineHeight: '1.5' }}>
                These recommendations are based on general agricultural best practices and may need adjustment for your specific:
              </p>
              <ul style={{ fontSize: '0.9rem', paddingLeft: '20px', margin: 0 }}>
                <li>Local climate and soil conditions</li>
                <li>Farm size and equipment availability</li>
                <li>Regional regulations and market conditions</li>
                <li>Specific crop varieties and growing methods</li>
              </ul>
              <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px', margin: 0 }}>
                <strong>Always consult with local agricultural extension services and soil testing before implementing new techniques.</strong>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Farming Techniques */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
          🚜 Advanced Farming Techniques
        </h3>
        <div className="grid grid-2">
          {farmingTechniques.map(technique => (
            <div key={technique.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ fontSize: '2.5rem', marginRight: '15px' }}>{technique.icon}</div>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#2E7D32' }}>{technique.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: '#FF9800', fontWeight: 'bold' }}>
                    {technique.category}
                  </div>
                </div>
              </div>

              <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
                {technique.description}
              </p>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ color: '#2E7D32', marginBottom: '8px' }}>🌟 Benefits:</h5>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                  {technique.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ color: '#2E7D32', marginBottom: '8px' }}>🔧 Implementation:</h5>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                  {technique.implementation.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', fontSize: '0.8rem' }}>
                <div style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  background: getCostColor(technique.cost),
                  color: 'white'
                }}>
                  Cost: {technique.cost}
                </div>
                <div style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  background: getDifficultyColor(technique.difficulty),
                  color: 'white'
                }}>
                  {technique.difficulty}
                </div>
                <div style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  background: '#2196F3',
                  color: 'white'
                }}>
                  ROI: {technique.roi}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farming Apps */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
          📱 Essential Farming Apps
        </h3>
        <div className="grid grid-3">
          {farmingApps.map((app, index) => (
            <div key={index} className="card" style={{ textAlign: 'center' }}>
              <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>{app.name}</h4>
              <div style={{
                fontSize: '0.8rem',
                color: '#FF9800',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                {app.category}
              </div>
              <p style={{ fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.4' }}>
                {app.description}
              </p>
              <div style={{ marginBottom: '15px' }}>
                <strong style={{ fontSize: '0.8rem' }}>Features:</strong>
                <ul style={{ fontSize: '0.8rem', textAlign: 'left', marginTop: '5px' }}>
                  {app.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>Rating: </span>
                <span style={{ color: '#FF9800', fontWeight: 'bold' }}>
                  {'⭐'.repeat(Math.floor(app.rating))} {app.rating}
                </span>
              </div>
              <a
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#4CAF50',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}
              >
                📲 Get App
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability Practices */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
          🌱 Sustainability & Incentives
        </h3>
        <div className="grid grid-2">
          {sustainabilityPractices.map((item, index) => (
            <div key={index} className="card">
              <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>{item.practice}</h4>
              <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
                {item.description}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '0.9rem' }}>
                <div style={{ background: '#e8f5e8', padding: '10px', borderRadius: '8px' }}>
                  <strong style={{ color: '#2E7D32' }}>Environmental Impact:</strong><br />
                  {item.impact}
                </div>
                <div style={{ background: '#fff3e0', padding: '10px', borderRadius: '8px' }}>
                  <strong style={{ color: '#F57C00' }}>Financial Incentives:</strong><br />
                  {item.incentives}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
          🏆 Success Stories
        </h3>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2E7D32' }}>40%</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Yield Increase</div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
              Iowa corn farmer using precision agriculture
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2E7D32' }}>60%</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Water Savings</div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
              California almond grower with smart irrigation
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2E7D32' }}>$50K</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Annual Savings</div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
              Texas ranch implementing regenerative practices
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmartFarming;