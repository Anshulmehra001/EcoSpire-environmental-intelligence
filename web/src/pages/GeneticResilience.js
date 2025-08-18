import React, { useState, useRef } from 'react';
import { Upload, DNA, TrendingUp, Thermometer, Droplets, Wind, Target } from 'lucide-react';

const GeneticResilience = () => {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [targetRegion, setTargetRegion] = useState('');
  const [climateScenario, setClimateScenario] = useState('2030');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genomicFile, setGenomicFile] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGenomicFile(file);
    }
  };

  const analyzeGeneticResilience = async () => {
    setLoading(true);
    
    setTimeout(async () => {
      const scenario = climateScenarios.find(s => s.id === climateScenario);
      const mockAnalysis = {
        crop: selectedCrop,
        region: targetRegion || 'Global Analysis',
        climateScenario: scenario,
        analysisDate: new Date().toISOString(),
        confidence: 92,
        
        currentVulnerabilities: [
          {
            factor: 'Heat Stress',
            severity: 'High',
            impact: 'Reduced yield by 25-40% above 35°C',
            affectedGenes: ['HSP70', 'HSP90', 'DREB2A'],
            currentTolerance: '32°C maximum'
          },
          {
            factor: 'Drought Stress',
            severity: 'Critical',
            impact: 'Yield loss 15-60% with water deficit',
            affectedGenes: ['ABA2', 'NCED3', 'RD29A'],
            currentTolerance: '40% water reduction limit'
          },
          {
            factor: 'Salt Tolerance',
            severity: 'Medium',
            impact: 'Growth inhibition in saline soils',
            affectedGenes: ['SOS1', 'NHX1', 'HKT1'],
            currentTolerance: '4 dS/m salinity'
          }
        ],

        geneticSolutions: [
          {
            trait: 'Enhanced Heat Tolerance',
            targetGenes: ['HSP101', 'HSFA2', 'APX2'],
            source: 'Aegilops tauschii (wild wheat)',
            mechanism: 'Heat shock protein upregulation',
            expectedImprovement: 'Tolerance up to 42°C (+10°C)',
            yieldProtection: '85% yield retention at 38°C',
            breedingTime: '6-8 years',
            difficulty: 'Medium',
            confidence: 94
          },
          {
            trait: 'Drought Resistance',
            targetGenes: ['DREB1A', 'LEA14', 'P5CS1'],
            source: 'Triticum turgidum (durum wheat)',
            mechanism: 'Osmotic adjustment and water retention',
            expectedImprovement: 'Survive 60% water reduction',
            yieldProtection: '70% yield under drought stress',
            breedingTime: '5-7 years',
            difficulty: 'High',
            confidence: 89
          },
          {
            trait: 'Improved Water Use Efficiency',
            targetGenes: ['AQP7', 'PIP2-1', 'TIP1-1'],
            source: 'Synthetic wheat varieties',
            mechanism: 'Enhanced aquaporin expression',
            expectedImprovement: '40% better water efficiency',
            yieldProtection: 'Maintain yield with 30% less water',
            breedingTime: '4-6 years',
            difficulty: 'Medium',
            confidence: 91
          }
        ],

        breedingStrategy: {
          phase1: {
            name: 'Genetic Screening',
            duration: '12-18 months',
            activities: [
              'Screen wild relatives for target genes',
              'Validate gene function in controlled conditions',
              'Develop molecular markers'
            ]
          },
          phase2: {
            name: 'Cross-breeding Program',
            duration: '3-4 years',
            activities: [
              'Cross elite varieties with wild donors',
              'Marker-assisted selection',
              'Backcrossing to recover elite background'
            ]
          },
          phase3: {
            name: 'Field Testing',
            duration: '2-3 years',
            activities: [
              'Multi-location trials',
              'Climate stress testing',
              'Yield stability assessment'
            ]
          }
        },

        impactProjections: {
          yieldStability: '+35% under climate stress',
          waterSavings: '2.1 billion liters annually',
          co2Reduction: '450,000 tons (reduced irrigation)',
          foodSecurity: '15% increase in reliable production',
          economicValue: '$2.8 billion in protected yields'
        },

        riskAssessment: {
          technicalRisks: [
            'Gene linkage drag reducing other traits',
            'Unintended effects on grain quality',
            'Adaptation to local growing conditions'
          ],
          timelineRisks: [
            'Regulatory approval delays',
            'Farmer adoption challenges',
            'Climate change accelerating faster than breeding'
          ],
          mitigationStrategies: [
            'Multiple gene sources and pathways',
            'Extensive quality testing protocols',
            'Participatory breeding with farmers'
          ]
        }
      };
      
      setAnalysis(mockAnalysis);
      
      // Log activity for dashboard
      try {
        const { authManager } = await import('../utils/auth');
        await authManager.logActivity('Genetic resilience analyzed', {
          crop: selectedCrop,
          climateScenario: climateScenario,
          region: targetRegion,
          solutions: mockAnalysis.geneticSolutions.length
        });
      } catch (error) {
        console.warn('Failed to log activity:', error);
      }
      
      setLoading(false);
    }, 3500);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#f44336';
      case 'High': return '#FF9800';
      case 'Medium': return '#FFC107';
      case 'Low': return '#4CAF50';
      default: return '#666';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'High': return '#f44336';
      case 'Medium': return '#FF9800';
      case 'Low': return '#4CAF50';
      default: return '#666';
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🧬 Genetic Resilience Engine: Climate Crop Analysis
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          AI-powered discovery of climate-resilient crop traits for food security
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
          🧬 Genomic Analysis • 🌡️ Climate Modeling • 🌾 Breeding Strategy • 📊 Impact Projection
        </div>
      </div>

      {/* Problem Statement */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
        border: '2px solid #f44336'
      }}>
        <h3 style={{ color: '#d32f2f', marginBottom: '15px' }}>🚨 The Climate-Food Crisis</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '15px' }}>
          <strong>Climate change threatens global food security as rising temperatures and changing precipitation 
          patterns make traditional crops vulnerable.</strong> Developing climate-resilient varieties through 
          conventional breeding takes 15-20 years - too slow for accelerating climate change.
        </p>
        <div style={{
          background: 'rgba(244, 67, 54, 0.1)',
          padding: '15px',
          borderRadius: '8px',
          fontSize: '0.95rem'
        }}>
          • Global crop yields declining 1-5% per decade due to climate change<br />
          • Heat waves and droughts causing $5 billion annual crop losses<br />
          • Traditional breeding too slow for accelerating climate impacts<br />
          • 828 million people face acute food insecurity
        </div>
      </div>

      {/* Solution */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
        border: '2px solid #4CAF50'
      }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>💡 The Genetic Acceleration Revolution</h3>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid #4CAF50'
        }}>
          <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>🎯 AI-Accelerated Crop Breeding:</h4>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            <strong>Compress decades of breeding into years using AI.</strong> Our system analyzes vast genomic 
            databases, climate projections, and crop performance data to identify the exact genes needed for 
            climate resilience, dramatically accelerating the development of climate-adapted crops.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneticResilience;