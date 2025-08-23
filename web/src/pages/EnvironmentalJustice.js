import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Users, Factory, TrendingUp } from 'lucide-react';
import FeatureHeader from '../components/ui/FeatureHeader';
import ProblemSolutionCard from '../components/ui/ProblemSolutionCard';
import ThreatAssessment from '../components/ui/ThreatAssessment';
import ImpactMetrics from '../components/ui/ImpactMetrics';

const EnvironmentalJustice = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    loadMapData();
  }, []);

  const loadMapData = () => {
    // --- EXPANDED TO 9 REAL-WORLD SCENARIOS ---
    const mockData = [
      {
        id: 1,
        name: 'South Chicago',
        coordinates: { lat: 41.7, lng: -87.6 },
        population: 45000,
        demographics: { minority: 0.78, lowincome: 0.65 },
        hazards: [
          { type: 'Air Pollution', severity: 'High', source: 'Industrial facilities' },
          { type: 'Water Contamination', severity: 'Medium', source: 'Legacy pollution' },
          { type: 'Noise Pollution', severity: 'High', source: 'Highway proximity' }
        ],
        injusticeScore: 0.82,
        healthImpacts: ['Asthma rates 2.3x higher', 'Cancer rates 1.8x higher']
      },
      {
        id: 2,
        name: 'East Oakland',
        coordinates: { lat: 37.8, lng: -122.2 },
        population: 32000,
        demographics: { minority: 0.85, lowincome: 0.72 },
        hazards: [
          { type: 'Air Pollution', severity: 'Critical', source: 'Port activities' },
          { type: 'Soil Contamination', severity: 'High', source: 'Former industrial sites' }
        ],
        injusticeScore: 0.89,
        healthImpacts: ['Respiratory illness 3.1x higher', 'Childhood asthma 2.7x higher']
      },
      {
        id: 3,
        name: 'Flint, Michigan',
        coordinates: { lat: 43.0, lng: -83.7 },
        population: 95000,
        demographics: { minority: 0.56, lowincome: 0.58 },
        hazards: [
          { type: 'Water Contamination', severity: 'Critical', source: 'Lead pipes' },
          { type: 'Industrial Legacy', severity: 'High', source: 'Former auto plants' }
        ],
        injusticeScore: 0.94,
        healthImpacts: ['Lead poisoning rates 4.2x higher', 'Developmental delays increased']
      },
      {
        id: 4,
        name: 'Cancer Alley, Louisiana',
        coordinates: { lat: 30.2, lng: -90.9 },
        population: 25000,
        demographics: { minority: 0.62, lowincome: 0.55 },
        hazards: [
          { type: 'Petrochemical Plants', severity: 'Critical' },
          { type: 'Air Toxins', severity: 'Critical' }
        ],
        injusticeScore: 0.96,
        healthImpacts: ['Highest cancer risk in the US', 'Frequent chemical spills']
      },
      {
        id: 5,
        name: 'The Bronx, NY',
        coordinates: { lat: 40.8, lng: -73.9 },
        population: 1400000,
        demographics: { minority: 0.91, lowincome: 0.30 },
        hazards: [
          { type: 'Highway Proximity', severity: 'High' },
          { type: 'Waste Transfer Stations', severity: 'High' }
        ],
        injusticeScore: 0.85,
        healthImpacts: ['Highest asthma hospitalization rates in NYC']
      },
      {
        id: 6,
        name: 'Kettleman City, CA',
        coordinates: { lat: 36.0, lng: -120.0 },
        population: 1500,
        demographics: { minority: 0.96, lowincome: 0.45 },
        hazards: [
          { type: 'Hazardous Waste Landfill', severity: 'Critical' },
          { type: 'Pesticide Drift', severity: 'High' }
        ],
        injusticeScore: 0.91,
        healthImpacts: ['Concerns over birth defects and infant mortality']
      },
      {
        id: 7,
        name: 'Pike County, Kentucky',
        coordinates: { lat: 37.4, lng: -82.5 },
        population: 58000,
        demographics: { minority: 0.04, lowincome: 0.28 },
        hazards: [
          { type: 'Coal Ash Ponds', severity: 'Critical' },
          { type: 'Contaminated Groundwater', severity: 'High' }
        ],
        injusticeScore: 0.88,
        healthImpacts: ['High rates of respiratory illness and cancer clusters']
      },
      {
        id: 8,
        name: 'Standing Rock, ND',
        coordinates: { lat: 46.4, lng: -100.8 },
        population: 8200,
        demographics: { minority: 0.85, lowincome: 0.35 },
        hazards: [
          { type: 'Oil Pipeline Risk', severity: 'Critical' },
          { type: 'Water Security Threat', severity: 'Critical' }
        ],
        injusticeScore: 0.93,
        healthImpacts: ['Threats to sacred water sources', 'Stress-related health impacts']
      },
      {
        id: 9,
        name: 'Pacoima, Los Angeles, CA',
        coordinates: { lat: 34.2, lng: -118.4 },
        population: 104000,
        demographics: { minority: 0.92, lowincome: 0.25 },
        hazards: [
          { type: 'Urban Heat Island', severity: 'High' },
          { type: 'Freeway Pollution', severity: 'Critical' },
          { type: 'Lack of Green Space', severity: 'High' }
        ],
        injusticeScore: 0.86,
        healthImpacts: ['Heat-related illnesses', 'High asthma rates due to pollution']
      }
    ];
    
    setMapData(mockData);
  };

  const analyzeRegion = async (region) => {
    setLoading(true);
    setSelectedRegion(region);
    
    setTimeout(() => {
      const analysis = {
        region: region.name,
        demographics: region.demographics,
        environmentalBurden: {
          airQuality: {
            pm25: 15.2,
            ozone: 0.078,
            no2: 25.4,
            nationalAverage: { pm25: 9.1, ozone: 0.065, no2: 18.2 }
          },
          waterQuality: {
            leadLevels: region.name === 'Flint, Michigan' ? 27 : 3.2,
            bacterialContamination: region.name === 'Flint, Michigan' ? 'High' : 'Low',
            nationalAverage: { leadLevels: 2.1 }
          },
          toxicSites: {
            superfundSites: Math.floor(Math.random() * 5) + 1,
            industrialFacilities: Math.floor(Math.random() * 15) + 5,
            wasteDisposal: Math.floor(Math.random() * 8) + 2
          }
        },
        healthOutcomes: {
          asthmaRates: region.demographics.minority > 0.7 ? 18.5 : 12.3,
          cancerRates: region.demographics.minority > 0.7 ? 485 : 420,
          lifeExpectancy: region.demographics.minority > 0.7 ? 72.1 : 78.4,
          nationalAverages: { asthmaRates: 8.2, cancerRates: 439, lifeExpectancy: 78.8 }
        },
        economicFactors: {
          medianIncome: region.demographics.lowincome > 0.6 ? 32000 : 52000,
          povertyRate: region.demographics.lowincome,
          unemploymentRate: region.demographics.lowincome > 0.6 ? 12.4 : 6.8,
          nationalAverages: { medianIncome: 62843, povertyRate: 0.108, unemploymentRate: 5.4 }
        },
        advocacy: {
          organizations: [
            { name: 'Environmental Justice Coalition', contact: 'info@ejcoalition.org', focus: 'Air quality advocacy' },
            { name: 'Community Health Alliance', contact: 'help@healthalliance.org', focus: 'Health impact studies' },
            { name: 'Clean Water Action', contact: 'action@cleanwater.org', focus: 'Water quality monitoring' }
          ],
          officials: [
            { name: 'City Council Environmental Committee', contact: 'environment@city.gov' },
            { name: 'State Environmental Protection Agency', contact: 'complaints@state-epa.gov' },
            { name: 'Congressional Representative', contact: 'environment@house.gov' }
          ]
        }
      };

      // --- ADDED POLICY RECOMMENDATIONS ---
      analysis.policyRecommendations = [
        'Strengthen air quality monitoring in high-risk zones.',
        'Increase buffer zones between industrial sites and residential areas.',
        'Fund local health studies to quantify health impacts.',
        'Establish community-led environmental review boards.',
        'Invest in green infrastructure and clean energy projects in affected communities.'
      ];
      if (analysis.environmentalBurden.waterQuality.leadLevels > 15) {
        analysis.policyRecommendations.unshift('**Immediate action: Replace lead service lines and provide clean water relief.**');
      }
      
      setAnalysisData(analysis);
      setLoading(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score > 0.8) return '#f44336';
    if (score > 0.6) return '#FF9800';
    if (score > 0.4) return '#FFC107';
    return '#4CAF50';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#f44336';
      case 'High': return '#FF9800';
      case 'Medium': return '#FFC107';
      default: return '#4CAF50';
    }
  };

  return (
    <div className="container">
      <FeatureHeader
        icon="⚖️"
        title="Environmental Justice Analyzer"
        subtitle="Comprehensive environmental burden assessment and community advocacy platform"
        capabilities="📊 Demographic Analysis • 🏭 Pollution Mapping • 🏥 Health Impact Assessment • 📢 Advocacy Resources"
      />

      <ProblemSolutionCard
        type="problem"
        title="The Environmental Justice Crisis"
        content="Low-income communities and communities of color face disproportionate environmental burdens - 2x higher pollution exposure, 3x higher asthma rates, yet lack resources for advocacy and change."
        highlights={[
          'Communities of color face 40% higher pollution exposure',
          'Low-income areas have 3x more toxic waste sites',
          'Environmental health disparities persist for generations',
          'Limited access to environmental data and advocacy resources'
        ]}
      />

      <ProblemSolutionCard
        type="solution"
        title="The Environmental Justice Solution"
        content="Democratize environmental data and empower communities. Our platform provides comprehensive environmental burden analysis, health impact assessment, and direct connections to advocacy resources and officials."
        color="#2196F3"
      />

      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#1976D2', marginBottom: '20px' }}>🗺️ Select Community for Analysis</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {mapData.map((region) => (
            <div
              key={region.id}
              onClick={() => analyzeRegion(region)}
              style={{
                border: `3px solid ${getScoreColor(region.injusticeScore)}`,
                borderRadius: '12px',
                padding: '20px',
                background: selectedRegion?.id === region.id ? '#e3f2fd' : '#f9f9f9',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>{region.name}</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>Population: {region.population.toLocaleString()}</p>
                </div>
                <div style={{
                  background: getScoreColor(region.injusticeScore),
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {(region.injusticeScore * 100).toFixed(0)}% Burden
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: '#666' }}>Minority Population:</span>
                    <div style={{ fontWeight: 'bold' }}>{(region.demographics.minority * 100).toFixed(0)}%</div>
                  </div>
                  <div>
                    <span style={{ color: '#666' }}>Low Income:</span>
                    <div style={{ fontWeight: 'bold' }}>{(region.demographics.lowincome * 100).toFixed(0)}%</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '0.9rem' }}>Environmental Hazards</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {region.hazards.map((hazard, index) => (
                    <span
                      key={index}
                      style={{
                        background: getSeverityColor(hazard.severity),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {hazard.type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #2196F3',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>📊 Analyzing environmental burden and health impacts...</p>
        </div>
      )}

      {analysisData && !loading && (
        <div style={{ display: 'grid', gap: '30px' }}>
          <div className="card">
            <h3 style={{ color: '#1976D2', marginBottom: '20px' }}>🏭 Environmental Burden Assessment</h3>
            
            <ThreatAssessment
              species={`${analysisData.region} Community`}
              threatLevel="ENVIRONMENTAL BURDEN"
              confidence={0.95}
              impact={{
                spreadRate: 'Persistent',
                ecologicalDamage: 'Disproportionate pollution exposure affecting community health',
                removalAction: 'Systematic policy change and community advocacy required'
              }}
              metrics={[
                { 
                  label: 'Air Quality Index', 
                  value: Math.round((analysisData.environmentalBurden.airQuality.pm25 / analysisData.environmentalBurden.airQuality.nationalAverage.pm25) * 100), 
                  unit: '% of national avg' 
                },
                { 
                  label: 'Water Quality Score', 
                  value: analysisData.environmentalBurden.waterQuality.leadLevels > 15 ? 25 : 85, 
                  unit: '/100' 
                },
                { 
                  label: 'Toxic Site Density', 
                  value: analysisData.environmentalBurden.toxicSites.superfundSites + analysisData.environmentalBurden.toxicSites.industrialFacilities, 
                  unit: ' sites' 
                }
              ]}
            />
          </div>

          <div className="card">
            <h3 style={{ color: '#1976D2', marginBottom: '20px' }}>🏥 Health Impact Analysis</h3>
            
            <ImpactMetrics
              metrics={[
                {
                  icon: '🫁',
                  value: analysisData.healthOutcomes.asthmaRates,
                  label: 'Asthma Rate',
                  color: analysisData.healthOutcomes.asthmaRates > 15 ? '#f44336' : '#FF9800',
                  unit: '%',
                  description: `National average: ${analysisData.healthOutcomes.nationalAverages.asthmaRates}%`
                },
                {
                  icon: '🎗️',
                  value: analysisData.healthOutcomes.cancerRates,
                  label: 'Cancer Rate',
                  color: analysisData.healthOutcomes.cancerRates > 450 ? '#f44336' : '#FF9800',
                  unit: '/100k',
                  description: `National average: ${analysisData.healthOutcomes.nationalAverages.cancerRates}/100k`
                },
                {
                  icon: '📊',
                  value: analysisData.healthOutcomes.lifeExpectancy,
                  label: 'Life Expectancy',
                  color: analysisData.healthOutcomes.lifeExpectancy < 75 ? '#f44336' : '#4CAF50',
                  unit: ' years',
                  description: `National average: ${analysisData.healthOutcomes.nationalAverages.lifeExpectancy} years`
                }
              ]}
            />
          </div>

          {/* --- SOCIOECONOMIC VULNERABILITY CARD IS INCLUDED --- */}
          <div className="card">
            <h3 style={{ color: '#1976D2', marginBottom: '20px' }}>💰 Socioeconomic Vulnerability</h3>
            <ImpactMetrics
              metrics={[
                {
                  icon: '💵',
                  value: analysisData.economicFactors.medianIncome.toLocaleString(),
                  label: 'Median Income',
                  color: analysisData.economicFactors.medianIncome < 40000 ? '#f44336' : '#FF9800',
                  unit: ' USD',
                  description: `National average: $${analysisData.economicFactors.nationalAverages.medianIncome.toLocaleString()}`
                },
                {
                  icon: '📉',
                  value: (analysisData.economicFactors.povertyRate * 100).toFixed(1),
                  label: 'Poverty Rate',
                  color: analysisData.economicFactors.povertyRate > 0.2 ? '#f44336' : '#FF9800',
                  unit: '%',
                  description: `National average: ${(analysisData.economicFactors.nationalAverages.povertyRate * 100).toFixed(1)}%`
                },
                {
                  icon: '🧑‍💼',
                  value: analysisData.economicFactors.unemploymentRate,
                  label: 'Unemployment',
                  color: analysisData.economicFactors.unemploymentRate > 10 ? '#f44336' : '#FF9800',
                  unit: '%',
                  description: `National average: ${analysisData.economicFactors.nationalAverages.unemploymentRate}%`
                }
              ]}
            />
          </div>

          <div className="card">
            <h3 style={{ color: '#1976D2', marginBottom: '20px' }}>📢 Advocacy & Action Resources</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '15px', color: '#1976D2' }}>🏛️ Advocacy Organizations</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  {analysisData.advocacy.organizations.map((org, index) => (
                    <div key={index} style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      background: '#f9f9f9'
                    }}>
                      <h5 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{org.name}</h5>
                      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>{org.focus}</p>
                      <a href={`mailto:${org.contact}`} style={{ color: '#1976D2', fontSize: '0.9rem', textDecoration: 'none' }}>
                        📧 {org.contact}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '15px', color: '#1976D2' }}>🏛️ Government Officials</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  {analysisData.advocacy.officials.map((official, index) => (
                    <div key={index} style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      background: '#f9f9f9'
                    }}>
                      <h5 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{official.name}</h5>
                      <a href={`mailto:${official.contact}`} style={{ color: '#1976D2', fontSize: '0.9rem', textDecoration: 'none' }}>
                        📧 {official.contact}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- POLICY RECOMMENDATIONS CARD IS INCLUDED --- */}
          {analysisData.policyRecommendations && (
              <div className="card" style={{ background: '#e8f5e8', border: '2px solid #4CAF50' }}>
                <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📜 Policy Recommendations</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {analysisData.policyRecommendations.map((rec, index) => (
                    <div key={index} style={{
                      background: 'white',
                      padding: '12px 15px',
                      borderRadius: '8px',
                      color: '#333',
                      fontSize: '0.95rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span style={{ color: '#2E7D32' }}>•</span>
                      <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: rec.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </div>
                  ))}
                </div>
              </div>
          )}
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

export default EnvironmentalJustice;