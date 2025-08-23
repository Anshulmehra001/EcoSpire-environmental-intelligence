import React, { useState } from 'react';

const GeneticResilience = () => {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [targetRegion, setTargetRegion] = useState('');
  const [climateScenario, setClimateScenario] = useState('2030');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const crops = [
    { id: 'wheat', name: 'Wheat', icon: '🌾' },
    { id: 'corn', name: 'Corn/Maize', icon: '🌽' },
    { id: 'rice', name: 'Rice', icon: '🍚' },
    { id: 'soybean', name: 'Soybean', icon: '🫘' },
    { id: 'potato', name: 'Potato', icon: '🥔' },
    { id: 'tomato', name: 'Tomato', icon: '🍅' }
  ];

  const climateScenarios = [
    { id: '2030', name: '2030 Projections', temp: '+1.5°C', precip: '-5%' },
    { id: '2050', name: '2050 Projections', temp: '+2.5°C', precip: '-12%' },
    { id: '2070', name: '2070 Projections', temp: '+3.2°C', precip: '-18%' },
    { id: '2100', name: '2100 Projections', temp: '+4.1°C', precip: '-25%' }
  ];



  const analyzeGeneticResilience = async () => {
    setLoading(true);
    setAnalysis(null);
    
    setTimeout(async () => {
      const scenario = climateScenarios.find(s => s.id === climateScenario);
      const mockAnalysis = {
        crop: selectedCrop, region: targetRegion || 'Global Analysis', climateScenario: scenario,
        analysisDate: new Date().toISOString(), confidence: 92,
        currentVulnerabilities: [
          { factor: 'Heat Stress', severity: 'High', impact: 'Reduced yield by 25-40% above 35°C', affectedGenes: ['HSP70', 'HSP90', 'DREB2A'], currentTolerance: '32°C maximum' },
          { factor: 'Drought Stress', severity: 'Critical', impact: 'Yield loss 15-60% with water deficit', affectedGenes: ['ABA2', 'NCED3', 'RD29A'], currentTolerance: '40% water reduction limit' },
          { factor: 'Salt Tolerance', severity: 'Medium', impact: 'Growth inhibition in saline soils', affectedGenes: ['SOS1', 'NHX1', 'HKT1'], currentTolerance: '4 dS/m salinity' }
        ],
        geneticSolutions: [
          { trait: 'Enhanced Heat Tolerance', targetGenes: ['HSP101', 'HSFA2', 'APX2'], source: 'Aegilops tauschii (wild wheat)', mechanism: 'Heat shock protein upregulation', expectedImprovement: 'Tolerance up to 42°C (+10°C)', yieldProtection: '85% yield retention at 38°C', breedingTime: '6-8 years', difficulty: 'Medium', confidence: 94 },
          { trait: 'Drought Resistance', targetGenes: ['DREB1A', 'LEA14', 'P5CS1'], source: 'Triticum turgidum (durum wheat)', mechanism: 'Osmotic adjustment and water retention', expectedImprovement: 'Survive 60% water reduction', yieldProtection: '70% yield under drought stress', breedingTime: '5-7 years', difficulty: 'High', confidence: 89 },
          { trait: 'Improved Water Use Efficiency', targetGenes: ['AQP7', 'PIP2-1', 'TIP1-1'], source: 'Synthetic wheat varieties', mechanism: 'Enhanced aquaporin expression', expectedImprovement: '40% better water efficiency', yieldProtection: 'Maintain yield with 30% less water', breedingTime: '4-6 years', difficulty: 'Medium', confidence: 91 }
        ],
        breedingStrategy: {
          phase1: { name: 'Genetic Screening', duration: '12-18 months', activities: ['Screen wild relatives for target genes', 'Validate gene function in controlled conditions', 'Develop molecular markers'] },
          phase2: { name: 'Cross-breeding Program', duration: '3-4 years', activities: ['Cross elite varieties with wild donors', 'Marker-assisted selection', 'Backcrossing to recover elite background'] },
          phase3: { name: 'Field Testing', duration: '2-3 years', activities: ['Multi-location trials', 'Climate stress testing', 'Yield stability assessment'] }
        },
        impactProjections: { yieldStability: '+35% under climate stress', waterSavings: '2.1 billion liters annually', co2Reduction: '450,000 tons (reduced irrigation)', foodSecurity: '15% increase in reliable production', economicValue: '$2.8 billion in protected yields' },
        riskAssessment: {
          technicalRisks: ['Gene linkage drag reducing other traits', 'Unintended effects on grain quality', 'Adaptation to local growing conditions'],
          timelineRisks: ['Regulatory approval delays', 'Farmer adoption challenges', 'Climate change accelerating faster than breeding'],
          mitigationStrategies: ['Multiple gene sources and pathways', 'Extensive quality testing protocols', 'Participatory breeding with farmers']
        }
      };
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 3500);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#f44336'; case 'High': return '#FF9800'; case 'Medium': return '#FFC107'; default: return '#4CAF50';
    }
  };



  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🧬 Genetic Resilience Engine
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          AI-powered discovery of climate-resilient crop traits for future food security
        </p>
      </div>

      {/* Problem & Solution Cards */}
      <div className="card" style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)', border: '2px solid #f44336' }}>
        <h3 style={{ color: '#d32f2f', marginBottom: '15px' }}>🚨 The Climate-Food Crisis</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          Climate change threatens global food security. Traditional breeding takes 15-20 years to develop resilient crops — a timeline too slow for our rapidly changing planet.
        </p>
      </div>
      <div className="card" style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)', border: '2px solid #4CAF50' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>💡 The Genetic Acceleration Revolution</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          Our AI compresses decades of breeding into years. By analyzing vast genomic and climate databases, it pinpoints the exact genes for climate resilience, designing the super-crops of tomorrow, today.
        </p>
      </div>

      {/* Input Form */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🔬 Analysis Parameters</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Select Crop:</label>
            <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)} style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}>
              {crops.map(crop => <option key={crop.id} value={crop.id}>{crop.icon} {crop.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Target Region (Optional):</label>
            <input type="text" value={targetRegion} onChange={(e) => setTargetRegion(e.target.value)} placeholder="e.g., Nile Delta, Egypt" style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Climate Scenario:</label>
            <select value={climateScenario} onChange={(e) => setClimateScenario(e.target.value)} style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}>
              {climateScenarios.map(sc => <option key={sc.id} value={sc.id}>{sc.name} ({sc.temp}, {sc.precip})</option>)}
            </select>
          </div>
          <button onClick={analyzeGeneticResilience} disabled={loading} style={{
            padding: '12px 24px', background: loading ? '#ccc' : 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)', border: 'none',
            borderRadius: '8px', color: 'white', fontWeight: 'bold', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer'
          }}>
            {loading ? 'Analyzing...' : 'Run Resilience Analysis'}
          </button>
        </div>
      </div>
      
      {/* Loading Spinner */}
      {loading && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #f3f3f3', borderTop: '4px solid #2E7D32', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p>Analyzing genomic data against climate models...</p>
        </div>
      )}

      {/* Results Dashboard */}
      {analysis && (
        <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
          {/* Top Level Summary Card */}
          <div className="card" style={{ marginBottom: '30px', background: '#f5f5f5' }}>
            <h3 style={{ color: '#2E7D32', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>Analysis Complete: Climate-Resilient {crops.find(c=>c.id === analysis.crop)?.name}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ textAlign: 'center' }}><p style={{margin: 0, fontWeight: 'bold'}}>Target Region</p><p style={{fontSize: '1.2rem'}}>{analysis.region}</p></div>
              <div style={{ textAlign: 'center' }}><p style={{margin: 0, fontWeight: 'bold'}}>Climate Scenario</p><p style={{fontSize: '1.2rem'}}>{analysis.climateScenario.name}</p></div>
              <div style={{ textAlign: 'center' }}><p style={{margin: 0, fontWeight: 'bold'}}>Projected Yield Stability</p><p style={{fontSize: '1.2rem', color: '#4CAF50'}}>{analysis.impactProjections.yieldStability}</p></div>
              <div style={{ textAlign: 'center' }}><p style={{margin: 0, fontWeight: 'bold'}}>Estimated Breeding Time</p><p style={{fontSize: '1.2rem'}}>~{analysis.geneticSolutions[0].breedingTime}</p></div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Column 1: Vulnerabilities & Solutions */}
            <div>
              {/* Current Vulnerabilities */}
              <div className="card" style={{ marginBottom: '30px' }}>
                <h4 style={{ color: '#d32f2f', marginBottom: '15px' }}>Current Vulnerabilities</h4>
                {analysis.currentVulnerabilities.map((vul, i) => (
                  <div key={i} style={{ marginBottom: '10px', borderLeft: `4px solid ${getSeverityColor(vul.severity)}`, paddingLeft: '10px' }}>
                    <strong style={{color: getSeverityColor(vul.severity)}}>{vul.factor} ({vul.severity})</strong>
                    <p style={{fontSize: '0.9rem', color: '#666', margin: '5px 0'}}>Impact: {vul.impact}</p>
                  </div>
                ))}
              </div>
              {/* Genetic Solutions */}
              <div className="card">
                <h4 style={{ color: '#4CAF50', marginBottom: '15px' }}>Proposed Genetic Solutions</h4>
                {analysis.geneticSolutions.map((sol, i) => (
                  <div key={i} style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                    <strong style={{color: '#2E7D32'}}>{sol.trait}</strong>
                    <p style={{fontSize: '0.9rem', color: '#666', margin: '5px 0'}}><strong>Source:</strong> {sol.source}</p>
                    <p style={{fontSize: '0.9rem', color: '#666', margin: '5px 0'}}><strong>Improvement:</strong> <span style={{color: '#4CAF50', fontWeight: 'bold'}}>{sol.expectedImprovement}</span></p>
                  </div>
                ))}
              </div>
            </div>
            {/* Column 2: Strategy and Impact */}
            <div>
              {/* Breeding Strategy */}
              <div className="card">
                <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>Accelerated Breeding Strategy</h4>
                {Object.values(analysis.breedingStrategy).map((phase, i) => (
                  <div key={i} style={{ marginBottom: '15px' }}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <span style={{width: '30px', height: '30px', borderRadius: '50%', background: '#2E7D32', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', fontWeight: 'bold'}}>{i + 1}</span>
                      <h5 style={{margin: 0}}>{phase.name} ({phase.duration})</h5>
                    </div>
                    <ul style={{fontSize: '0.9rem', color: '#666', paddingLeft: '45px', listStyle: 'disc'}}>
                      {phase.activities.map((act, j) => <li key={j}>{act}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default GeneticResilience;