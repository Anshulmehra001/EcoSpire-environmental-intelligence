import React, { useState, useEffect } from 'react';

function GeneticResilience({ onNavigate, onActivityComplete }) {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [climateScenario, setClimateScenario] = useState('current');
  const [selectedRegion, setSelectedRegion] = useState('midwest');

  const cropDatabase = {
    wheat: {
      name: 'Winter Wheat',
      icon: '�',
      currentYield: '47.2 bu/acre',
      resilience: 72,
      threats: ['Heat Stress', 'Drought', 'Rust Disease'],
      adaptations: ['Heat-tolerant varieties', 'Drought-resistant genes', 'Disease resistance'],
      geneticMarkers: ['TaHSP90', 'TaDREB1', 'TaWRKY19'],
      climateImpact: {
        current: { yield: 47.2, risk: 'Medium' },
        '2030': { yield: 43.8, risk: 'High' },
        '2050': { yield: 38.5, risk: 'Very High' }
      }
    },
    corn: {
      name: 'Field Corn',
      icon: '🌽',
      currentYield: '172.0 bu/acre',
      resilience: 68,
      threats: ['Heat Waves', 'Water Stress', 'Corn Borer'],
      adaptations: ['Drought tolerance', 'Heat shock proteins', 'Bt resistance'],
      geneticMarkers: ['ZmDREB2A', 'ZmHSP101', 'ZmNAC111'],
      climateImpact: {
        current: { yield: 172.0, risk: 'Medium' },
        '2030': { yield: 165.4, risk: 'High' },
        '2050': { yield: 151.2, risk: 'Very High' }
      }
    },
    soybean: {
      name: 'Soybeans',
      icon: '🫘',
      currentYield: '50.2 bu/acre',
      resilience: 75,
      threats: ['Temperature Extremes', 'Flooding', 'Soybean Rust'],
      adaptations: ['Flood tolerance', 'Temperature stability', 'Fungal resistance'],
      geneticMarkers: ['GmDREB1', 'GmHSF4', 'GmWRKY142'],
      climateImpact: {
        current: { yield: 50.2, risk: 'Low' },
        '2030': { yield: 48.9, risk: 'Medium' },
        '2050': { yield: 45.1, risk: 'High' }
      }
    },
    rice: {
      name: 'Rice',
      icon: '🍚',
      currentYield: '7,510 lbs/acre',
      resilience: 81,
      threats: ['Salinity', 'Submergence', 'Blast Disease'],
      adaptations: ['Salt tolerance', 'Submergence tolerance', 'Blast resistance'],
      geneticMarkers: ['OsDREB2A', 'OsSUB1A', 'OsPi21'],
      climateImpact: {
        current: { yield: 7510, risk: 'Low' },
        '2030': { yield: 7285, risk: 'Medium' },
        '2050': { yield: 6890, risk: 'Medium' }
      }
    }
  };

  const regions = {
    midwest: { name: 'Midwest USA', climate: 'Continental', avgTemp: '10.5°C' },
    southeast: { name: 'Southeast USA', climate: 'Humid Subtropical', avgTemp: '18.2°C' },
    southwest: { name: 'Southwest USA', climate: 'Arid', avgTemp: '16.8°C' },
    pacific: { name: 'Pacific Northwest', climate: 'Oceanic', avgTemp: '11.1°C' }
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const crop = cropDatabase[selectedCrop];
    const region = regions[selectedRegion];
    
    const results = {
      crop: crop,
      region: region,
      resilience: {
        overall: crop.resilience,
        drought: Math.floor(Math.random() * 30) + 60,
        heat: Math.floor(Math.random() * 25) + 65,
        disease: Math.floor(Math.random() * 35) + 55,
        flood: Math.floor(Math.random() * 40) + 50
      },
      recommendations: generateRecommendations(crop, region),
      geneticProfile: generateGeneticProfile(crop),
      projections: crop.climateImpact
    };
    
    setAnalysisResults(results);
    setIsAnalyzing(false);

    // Log activity
    if (onActivityComplete) {
      onActivityComplete({
        type: 'carbon_reduction',
        amount: 2,
        points: 25,
        description: `Analyzed genetic resilience for ${crop.name}`
      });
    }
  };

  const generateRecommendations = (crop, region) => {
    const recommendations = [
      {
        category: 'Genetic Enhancement',
        priority: 'High',
        action: `Introduce ${crop.geneticMarkers[0]} gene for enhanced stress tolerance`,
        impact: 'Increase yield stability by 15-20%',
        timeline: '2-3 growing seasons'
      },
      {
        category: 'Breeding Strategy',
        priority: 'High',
        action: 'Cross with drought-resistant local varieties',
        impact: 'Improve water use efficiency by 25%',
        timeline: '3-4 years'
      },
      {
        category: 'Management Practice',
        priority: 'Medium',
        action: 'Implement precision irrigation systems',
        impact: 'Reduce water usage by 30%',
        timeline: '1 growing season'
      },
      {
        category: 'Climate Adaptation',
        priority: 'High',
        action: 'Develop heat-shock protein expression',
        impact: 'Maintain yield under +3°C temperature increase',
        timeline: '4-5 years'
      }
    ];
    
    return recommendations;
  };

  const generateGeneticProfile = (crop) => {
    return {
      totalGenes: Math.floor(Math.random() * 5000) + 25000,
      stressGenes: Math.floor(Math.random() * 200) + 150,
      yieldGenes: Math.floor(Math.random() * 100) + 80,
      diseaseResistance: Math.floor(Math.random() * 50) + 30,
      keyMarkers: crop.geneticMarkers,
      diversity: Math.floor(Math.random() * 20) + 70
    };
  };

  const getRiskColor = (risk) => {
    const colors = {
      'Low': '#4CAF50',
      'Medium': '#FF9800',
      'High': '#FF5722',
      'Very High': '#D32F2F'
    };
    return colors[risk] || '#666';
  };

  const getResilienceColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#8BC34A';
    if (score >= 40) return '#FF9800';
    return '#FF5722';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', color: '#2E7D32', marginBottom: '10px' }}>
          🧬 Genetic Resilience Analyzer
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
          AI-powered climate adaptation analysis for crop genetic enhancement
        </p>
        <div style={{
          background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
          color: 'white',
          padding: '12px 25px',
          borderRadius: '20px',
          display: 'inline-block',
          fontSize: '0.9rem',
          fontWeight: 'bold'
        }}>
          🌾 Climate-Smart Agriculture • 🧬 Genetic Engineering • 📊 Predictive Modeling
        </div>
      </div>

      {/* Prototype Disclaimer */}
      <div style={{
        background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
        border: '2px solid #ff9800',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <div style={{ fontSize: '2.5rem' }}>⚠️</div>
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
            All genetic analysis, resilience scores, and climate projections are generated examples. 
            Production version would integrate with real genomic databases and climate modeling systems.
          </p>
        </div>
      </div>

      {/* Analysis Controls */}
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#2E7D32', marginBottom: '25px', textAlign: 'center' }}>
          🔬 Configure Analysis Parameters
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          {/* Crop Selection */}
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
              🌾 Select Crop Type
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #ddd',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              {Object.entries(cropDatabase).map(([key, crop]) => (
                <option key={key} value={key}>
                  {crop.icon} {crop.name}
                </option>
              ))}
            </select>
          </div>

          {/* Region Selection */}
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
              🌍 Growing Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #ddd',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              {Object.entries(regions).map(([key, region]) => (
                <option key={key} value={key}>
                  {region.name} ({region.climate})
                </option>
              ))}
            </select>
          </div>

          {/* Climate Scenario */}
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
              🌡️ Climate Scenario
            </label>
            <select
              value={climateScenario}
              onChange={(e) => setClimateScenario(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #ddd',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              <option value="current">Current Climate (2024)</option>
              <option value="2030">Near Future (2030)</option>
              <option value="2050">Mid-Century (2050)</option>
            </select>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            style={{
              background: isAnalyzing 
                ? 'linear-gradient(135deg, #ccc 0%, #999 100%)'
                : 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              borderRadius: '25px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: isAnalyzing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '0 auto'
            }}
          >
            {isAnalyzing ? '🔄 Analyzing Genetic Data...' : '🧬 Run Resilience Analysis'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <div style={{ display: 'grid', gap: '25px' }}>
          {/* Overview Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
                {analysisResults.crop.icon}
              </div>
              <h3 style={{ color: '#2E7D32', marginBottom: '10px' }}>
                {analysisResults.crop.name}
              </h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF9800' }}>
                {analysisResults.crop.currentYield}
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>Current Yield</div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🛡️</div>
              <h3 style={{ color: '#2E7D32', marginBottom: '10px' }}>
                Resilience Score
              </h3>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: getResilienceColor(analysisResults.resilience.overall)
              }}>
                {analysisResults.resilience.overall}/100
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>Climate Adaptation</div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🧬</div>
              <h3 style={{ color: '#2E7D32', marginBottom: '10px' }}>
                Genetic Diversity
              </h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9C27B0' }}>
                {analysisResults.geneticProfile.diversity}%
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>Genetic Variation</div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚠️</div>
              <h3 style={{ color: '#2E7D32', marginBottom: '10px' }}>
                Climate Risk
              </h3>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: getRiskColor(analysisResults.projections[climateScenario].risk)
              }}>
                {analysisResults.projections[climateScenario].risk}
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                {climateScenario === 'current' ? '2024' : climateScenario}
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
            {/* Resilience Breakdown */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>
                🛡️ Resilience Breakdown
              </h3>
              {Object.entries(analysisResults.resilience).map(([key, value]) => {
                if (key === 'overall') return null;
                return (
                  <div key={key} style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                        {key} Tolerance
                      </span>
                      <span style={{ color: getResilienceColor(value), fontWeight: 'bold' }}>
                        {value}%
                      </span>
                    </div>
                    <div style={{
                      background: '#f0f0f0',
                      borderRadius: '10px',
                      height: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: getResilienceColor(value),
                        height: '100%',
                        width: `${value}%`,
                        borderRadius: '10px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Climate Projections */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>
                📈 Yield Projections
              </h3>
              {Object.entries(analysisResults.projections).map(([scenario, data]) => (
                <div key={scenario} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  marginBottom: '10px',
                  background: scenario === climateScenario ? '#e8f5e8' : '#f9f9f9',
                  borderRadius: '8px',
                  border: scenario === climateScenario ? '2px solid #4CAF50' : '1px solid #ddd'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>
                      {scenario === 'current' ? 'Current (2024)' : scenario}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {typeof data.yield === 'number' ? data.yield.toLocaleString() : data.yield} 
                      {selectedCrop === 'rice' ? ' lbs/acre' : ' bu/acre'}
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    borderRadius: '15px',
                    background: getRiskColor(data.risk),
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {data.risk}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>
              💡 Enhancement Recommendations
            </h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              {analysisResults.recommendations.map((rec, index) => (
                <div key={index} style={{
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '20px',
                  background: rec.priority === 'High' ? '#fff3e0' : '#f9f9f9'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ color: '#2E7D32', margin: 0 }}>
                      {rec.category}
                    </h4>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '15px',
                      background: rec.priority === 'High' ? '#FF9800' : '#4CAF50',
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {rec.priority} Priority
                    </span>
                  </div>
                  <p style={{ margin: '10px 0', color: '#333' }}>
                    <strong>Action:</strong> {rec.action}
                  </p>
                  <p style={{ margin: '10px 0', color: '#666' }}>
                    <strong>Expected Impact:</strong> {rec.impact}
                  </p>
                  <p style={{ margin: '10px 0', color: '#666' }}>
                    <strong>Timeline:</strong> {rec.timeline}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneticResilience;