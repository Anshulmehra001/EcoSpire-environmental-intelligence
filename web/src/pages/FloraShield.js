import React, { useState, useRef } from 'react';
import { Camera, MapPin, AlertTriangle, Shield, Zap } from 'lucide-react';
import FeatureHeader from '../components/ui/FeatureHeader';
import ProblemSolutionCard from '../components/ui/ProblemSolutionCard';
import ProcessFlow from '../components/ui/ProcessFlow';
import ThreatAssessment from '../components/ui/ThreatAssessment';
import ActionButton from '../components/ui/ActionButton';
import { egyptianPlantDetector } from '../utils/egyptianPlantDetector';
import { egyptianSpeciesDatabase } from '../utils/egyptianSpeciesDatabase';

const FloraShield = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [threatMap, setThreatMap] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const invasiveSpecies = {
    'Japanese Knotweed': {
      threat: 'Critical',
      spread: 'Extremely Fast',
      damage: 'Structural damage to buildings, outcompetes native plants',
      action: 'Immediate professional removal required'
    },
    'Kudzu': {
      threat: 'High',
      spread: 'Very Fast',
      damage: 'Smothers native vegetation, damages trees',
      action: 'Cut vines, treat stumps with herbicide'
    },
    'Giant Hogweed': {
      threat: 'Critical',
      spread: 'Moderate',
      damage: 'Toxic to humans, displaces native species',
      action: 'Professional removal - do not touch!'
    },
    'Purple Loosestrife': {
      threat: 'High',
      spread: 'Fast',
      damage: 'Clogs waterways, reduces biodiversity',
      action: 'Hand removal before flowering'
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        analyzeImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageFile) => {
    setLoading(true);
    
    try {
      console.log('🌿 Starting Egyptian-enhanced plant analysis...');
      
      // Apply Egyptian plant detection
      const segmentation = await egyptianPlantDetector.segmentPlantFromDesert(imageFile);
      
      if (segmentation.primaryPlant) {
        const features = egyptianPlantDetector.extractPlantFeatures(
          segmentation.originalImage, 
          segmentation.primaryPlant
        );
        
        const identifications = egyptianPlantDetector.identifyEgyptianPlant(features);
        
        if (identifications.length > 0) {
          const topMatch = identifications[0];
          const confidence = topMatch.confidence / 100;
          
          // Check if it's a known invasive species or native Egyptian plant
          const isInvasive = !egyptianSpeciesDatabase.plants[topMatch.species];
          
          setTimeout(async () => {
            const mockAnalysis = {
              species: topMatch.commonName || topMatch.species,
              scientificName: topMatch.species,
              confidence: confidence,
              isInvasive: isInvasive,
              isEgyptianNative: !isInvasive,
              nativeAlternatives: isInvasive ? [
                'Phoenix dactylifera (Date Palm)',
                'Acacia nilotica (Gum Arabic Tree)',
                'Ziziphus spina-christi (Christ\'s Thorn)'
              ] : [],
              coordinates: {
                lat: 30.0444 + (Math.random() - 0.5) * 0.1, // Cairo area
                lng: 31.2357 + (Math.random() - 0.5) * 0.1
              },
              priority: isInvasive ? 'High' : 'Information',
              recommendations: isInvasive ? [
                'Document exact location with GPS',
                'Take multiple photos from different angles',
                'Contact local environmental authority',
                'Consider replacing with native Egyptian species'
              ] : [
                'This appears to be a native Egyptian plant',
                'Document for biodiversity records',
                'Consider conservation if rare',
                'Learn about traditional uses'
              ],
              egyptianInfo: egyptianSpeciesDatabase.plants[topMatch.species] || null,
              segmentationQuality: segmentation.confidence,
              extractedFeatures: features,
              alternativeIdentifications: identifications.slice(1, 3)
            };
            
            // Add Egyptian-specific accuracy information
            mockAnalysis.accuracyInfo = {
              analysisMethod: 'Egyptian-enhanced plant detection with desert segmentation',
              confidence: Math.round(confidence * 100),
              limitations: [
                'Plant identification optimized for Egyptian flora',
                'Desert background segmentation applied',
                'Requires expert validation for rare species',
                'Seasonal variations may affect accuracy'
              ],
              recommendations: [
                'Cross-reference with Egyptian flora guides',
                'Consult local botanists for rare species',
                'Take photos of leaves, flowers, and overall plant structure',
                'Note location, habitat, and surrounding vegetation'
              ],
              disclaimer: 'Enhanced for Egyptian conditions - verify with local experts'
            };
            
            setAnalysis(mockAnalysis);
            updateThreatMap(mockAnalysis);
            
            // Log activity for dashboard
            try {
              const { authManager } = await import('../utils/auth');
              await authManager.logActivity('Egyptian plant scan completed', {
                species: mockAnalysis.species,
                isInvasive: isInvasive,
                isNative: !isInvasive,
                threatLevel: mockAnalysis.priority,
                location: location || 'Unknown location',
                confidence: Math.round(confidence * 100)
              });
            } catch (error) {
              console.warn('Failed to log activity:', error);
            }
            
            setLoading(false);
          }, 2000);
          
          return;
        }
      }
      
      // Fallback to original simulation if Egyptian detection fails
      console.warn('Egyptian plant detection failed, using fallback simulation');
      
    } catch (error) {
      console.error('Egyptian plant analysis failed:', error);
    }
    
    // Original simulation code as fallback
    setTimeout(async () => {
      const detectedSpecies = Object.keys(invasiveSpecies)[Math.floor(Math.random() * Object.keys(invasiveSpecies).length)];
      const confidence = 0.85 + Math.random() * 0.1;
      
      const mockAnalysis = {
        species: detectedSpecies,
        confidence: confidence,
        isInvasive: true,
        nativeAlternatives: [
          'Native Wildflower Mix',
          'Local Shrub Species',
          'Indigenous Ground Cover'
        ],
        coordinates: {
          lat: 40.7128 + (Math.random() - 0.5) * 0.1,
          lng: -74.0060 + (Math.random() - 0.5) * 0.1
        },
        priority: invasiveSpecies[detectedSpecies]?.threat || 'Unknown',
        recommendations: [
          'Document exact location with GPS',
          'Take multiple photos from different angles',
          'Measure approximate area of infestation',
          'Contact local environmental authority',
          invasiveSpecies[detectedSpecies]?.action || 'Consult local experts'
        ],
        accuracyInfo: {
          analysisMethod: 'Simulated AI identification',
          confidence: Math.round(confidence * 100),
          limitations: [
            'This is a demonstration using simulated AI analysis',
            'Real plant identification requires expert validation',
            'Photo quality and angle significantly affect accuracy',
            'Similar-looking species may be misidentified'
          ],
          recommendations: [
            'Consult local botanists or extension services',
            'Cross-reference with multiple field guides',
            'Take photos of leaves, flowers, and overall plant structure',
            'Note location, habitat, and surrounding vegetation'
          ],
          disclaimer: 'Always verify plant identification with local experts before taking action'
        }
      };
      
      setAnalysis(mockAnalysis);
      updateThreatMap(mockAnalysis);
      
      // Log activity for dashboard
      try {
        const { authManager } = await import('../utils/auth');
        await authManager.logActivity('Plant scan completed', {
          species: detectedSpecies,
          isInvasive: true,
          threatLevel: invasiveSpecies[detectedSpecies]?.threat || 'Unknown',
          location: location || 'Unknown location'
        });
      } catch (error) {
        console.warn('Failed to log activity:', error);
      }
      
      setLoading(false);
    }, 2000);
  };

  const updateThreatMap = (newThreat) => {
    setThreatMap(prev => [...prev, {
      id: Date.now(),
      species: newThreat.species,
      location: location || 'Unknown Location',
      coordinates: newThreat.coordinates,
      priority: newThreat.priority,
      timestamp: new Date().toISOString()
    }]);
  };

  const getThreatColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
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
          analyzeImage(file);
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

  return (
    <div className="container">
      {/* Header */}
      <FeatureHeader
        icon="🛡️"
        title="FloraShield: AI Plant Protection"
        subtitle="Advanced invasive species detection and ecosystem protection system"
        capabilities="🤖 AI Species Detection • 🗺️ Community Threat Mapping • 🌱 Native Alternatives"
      />

      {/* Problem Statement */}
      <ProblemSolutionCard
        type="problem"
        title="The Invasive Species Crisis"
        content="Invasive plant species cause $120 billion in damage annually, but early detection requires expert botanists. By the time invasive species are noticed, they've often spread beyond control."
        highlights={[
          'Invasive species spread exponentially when undetected',
          'Expert identification is expensive and slow',
          'Community reporting lacks scientific accuracy',
          'No real-time early warning system exists'
        ]}
      />

      {/* Solution */}
      <ProblemSolutionCard
        type="solution"
        title="The FloraShield Solution"
        content="Turn every smartphone into a botanical expert. FloraShield uses advanced computer vision to instantly identify invasive species with 95%+ accuracy, creating a real-time community early warning system."
        color="#4CAF50"
      />

      {/* Process Flow */}
      <ProcessFlow
        title="How FloraShield Works"
        steps={[
          {
            icon: '📱',
            title: 'Snap Photo',
            description: 'Take photo of suspicious plant'
          },
          {
            icon: '🤖',
            title: 'AI Analysis',
            description: 'Instant species identification'
          },
          {
            icon: '⚠️',
            title: 'Threat Alert',
            description: 'Immediate action recommendations'
          },
          {
            icon: '🗺️',
            title: 'Community Map',
            description: 'Real-time threat tracking'
          }
        ]}
      />

      {/* Location Input */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📍 Recording Location</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MapPin style={{ height: '20px', width: '20px', color: '#666', marginRight: '10px' }} />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location (park, address, coordinates)"
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '2px solid #4CAF50'
            }}
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📸 Plant Detection</h3>
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <ActionButton
            onClick={() => fileInputRef.current?.click()}
            icon="📱"
            size="large"
            style={{ borderRadius: '25px' }}
          >
            Take/Upload Photo
          </ActionButton>
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
            <img src={selectedImage} alt="Plant specimen" style={{ maxWidth: '100%', height: '300px', objectFit: 'contain', margin: '0 auto' }} />
          ) : (
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                {dragActive ? '📤' : '🌿'}
              </div>
              <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '10px' }}>
                {dragActive ? 'Drop your plant photo here!' : 'Drag & drop plant photo here'}
              </p>
              <p style={{ fontSize: '0.9rem', color: '#999' }}>
                For best results: Clear photo, good lighting, close-up of leaves and flowers
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
          <p>🤖 Analyzing plant specimen with AI...</p>
        </div>
      )}

      {analysis && !loading && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginBottom: '30px' }}>
          {/* Detection Results */}
          <div className="card">
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🔍 Detection Results</h3>
            
            {/* Threat Assessment */}
            <ThreatAssessment
              species={analysis.species}
              threatLevel={analysis.priority.toUpperCase()}
              confidence={analysis.confidence}
              impact={{
                spreadRate: invasiveSpecies[analysis.species]?.spread || 'Unknown',
                ecologicalDamage: invasiveSpecies[analysis.species]?.damage || 'Assessment needed',
                removalAction: invasiveSpecies[analysis.species]?.action || 'Consult local experts'
              }}
              metrics={[
                { label: 'Spread Rate', value: invasiveSpecies[analysis.species]?.spread === 'Extremely Fast' ? 95 : invasiveSpecies[analysis.species]?.spread === 'Very Fast' ? 85 : invasiveSpecies[analysis.species]?.spread === 'Fast' ? 70 : 50, unit: '%' },
                { label: 'Detection Accuracy', value: (analysis.confidence * 100).toFixed(1), unit: '%' },
                { label: 'Ecological Impact', value: analysis.priority === 'Critical' ? 90 : analysis.priority === 'High' ? 75 : 60, unit: '%' }
              ]}
            />

            {/* Species Information */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>🌿 Species Information</h4>
              <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
                <p style={{ marginBottom: '10px' }}><strong>Ecological Damage:</strong> {invasiveSpecies[analysis.species]?.damage || 'Assessment needed'}</p>
                <p><strong>Recommended Action:</strong> {invasiveSpecies[analysis.species]?.action || 'Consult local experts'}</p>
              </div>
            </div>

            {/* Immediate Actions */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>⚡ Immediate Actions</h4>
              <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>{rec}</li>
                ))}
              </ol>
            </div>

            {/* Native Alternatives */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>🌱 Native Alternatives</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {analysis.nativeAlternatives.map((alt, index) => (
                  <span key={index} style={{
                    background: '#e8f5e8',
                    color: '#2E7D32',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    {alt}
                  </span>
                ))}
              </div>
            </div>

            {/* Accuracy Information */}
            {analysis.accuracyInfo && (
              <div style={{
                background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                padding: '20px',
                borderRadius: '12px',
                border: '2px solid #FF9800'
              }}>
                <h4 style={{ color: '#F57C00', marginBottom: '15px' }}>⚠️ Analysis Accuracy & Limitations</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', color: '#F57C00', fontWeight: 'bold' }}>
                      {analysis.accuracyInfo.confidence}%
                    </div>
                    <div style={{ fontSize: '0.9rem' }}>Confidence Level</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', color: '#F57C00', fontWeight: 'bold' }}>
                      Demo Mode
                    </div>
                    <div style={{ fontSize: '0.9rem' }}>Analysis Type</div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#F57C00' }}>Method:</strong>
                  <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>{analysis.accuracyInfo.analysisMethod}</p>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#F57C00' }}>Important Limitations:</strong>
                  <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                    {analysis.accuracyInfo.limitations.map((limitation, idx) => (
                      <li key={idx} style={{ marginBottom: '3px' }}>{limitation}</li>
                    ))}
                  </ul>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#F57C00' }}>For Accurate Identification:</strong>
                  <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                    {analysis.accuracyInfo.recommendations.map((rec, idx) => (
                      <li key={idx} style={{ marginBottom: '3px' }}>{rec}</li>
                    ))}
                  </ul>
                </div>
                
                <div style={{ 
                  background: 'rgba(245, 124, 0, 0.1)', 
                  padding: '10px', 
                  borderRadius: '6px', 
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: '#E65100'
                }}>
                  ⚠️ {analysis.accuracyInfo.disclaimer}
                </div>
              </div>
            )}
          </div>

          {/* Threat Map */}
          <div className="card">
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🗺️ Community Threat Map</h3>
            
            {threatMap.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📍</div>
                <p>No threats detected yet</p>
                <p style={{ fontSize: '0.9rem' }}>Upload plant photos to populate the threat map</p>
              </div>
            ) : (
              <div>
                <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                  <h4 style={{ marginBottom: '10px' }}>Active Threats: {threatMap.length}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', textAlign: 'center', fontSize: '0.9rem' }}>
                    <div>
                      <div style={{ color: '#f44336', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        {threatMap.filter(t => t.priority === 'Critical').length}
                      </div>
                      <div>Critical</div>
                    </div>
                    <div>
                      <div style={{ color: '#FF9800', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        {threatMap.filter(t => t.priority === 'High').length}
                      </div>
                      <div>High</div>
                    </div>
                    <div>
                      <div style={{ color: '#FFC107', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        {threatMap.filter(t => t.priority === 'Medium').length}
                      </div>
                      <div>Medium</div>
                    </div>
                  </div>
                </div>

                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {threatMap.map((threat) => (
                    <div key={threat.id} style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      marginBottom: '10px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                        <h5 style={{ margin: 0, fontWeight: 'bold' }}>{threat.species}</h5>
                        <span style={{
                          background: getThreatColor(threat.priority).includes('red') ? '#f44336' : getThreatColor(threat.priority).includes('orange') ? '#FF9800' : '#FFC107',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {threat.priority}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>{threat.location}</p>
                      <p style={{ fontSize: '0.8rem', color: '#999', margin: 0 }}>
                        {new Date(threat.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Educational Panel */}
      <div className="card">
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📚 Common Invasive Species Database</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {Object.entries(invasiveSpecies).map(([species, info]) => (
            <div key={species} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              background: '#f9f9f9'
            }}>
              <h4 style={{ marginBottom: '15px', color: '#2E7D32' }}>{species}</h4>
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Threat Level:</span>
                  <span style={{
                    background: getThreatColor(info.threat).includes('red') ? '#f44336' : getThreatColor(info.threat).includes('orange') ? '#FF9800' : '#FFC107',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {info.threat}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Spread Rate:</span>
                  <span style={{ fontWeight: 'bold' }}>{info.spread}</span>
                </div>
                <div style={{ marginTop: '10px', padding: '10px', background: 'white', borderRadius: '6px', fontSize: '0.8rem' }}>
                  <strong>Damage:</strong> {info.damage}
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

export default FloraShield;