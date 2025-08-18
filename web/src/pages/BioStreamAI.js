import React, { useState, useRef } from 'react';
import { Upload, DNA, Search, BarChart3, MapPin, Download, Share2, Microscope } from 'lucide-react';

const BioStreamAI = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [sampleLocation, setSampleLocation] = useState('');
  const [waterSource, setWaterSource] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      analyzeDNA(file);
    }
  };

  const analyzeDNA = async (dnaFile) => {
    setLoading(true);
    
    // Simulate advanced DNA analysis
    setTimeout(async () => {
      const mockAnalysis = {
        fileName: dnaFile.name,
        fileSize: (dnaFile.size / 1024 / 1024).toFixed(2) + ' MB',
        sequenceLength: '2.4 million base pairs',
        processingTime: '3.7 seconds',
        confidence: 94,
        waterSource: waterSource || 'Unknown',
        location: sampleLocation || 'Unknown',
        detectedSpecies: [
          {
            species: 'Salmo trutta',
            commonName: 'Brown Trout',
            kingdom: 'Animalia',
            phylum: 'Chordata',
            confidence: 98.5,
            abundance: 'High',
            dnaFragments: 1247,
            ecologicalRole: 'Top predator',
            conservationStatus: 'Least Concern',
            indicators: ['Healthy fish population', 'Good water quality']
          },
          {
            species: 'Procambarus clarkii',
            commonName: 'Red Swamp Crayfish',
            kingdom: 'Animalia',
            phylum: 'Arthropoda',
            confidence: 96.2,
            abundance: 'Medium',
            dnaFragments: 892,
            ecologicalRole: 'Detritivore',
            conservationStatus: 'Invasive Species',
            indicators: ['Ecosystem disruption', 'Non-native presence']
          },
          {
            species: 'Chlorella vulgaris',
            commonName: 'Green Algae',
            kingdom: 'Plantae',
            phylum: 'Chlorophyta',
            confidence: 94.8,
            abundance: 'Very High',
            dnaFragments: 2156,
            ecologicalRole: 'Primary producer',
            conservationStatus: 'Native',
            indicators: ['High nutrient levels', 'Eutrophication risk']
          },
          {
            species: 'Escherichia coli',
            commonName: 'E. coli',
            kingdom: 'Bacteria',
            phylum: 'Proteobacteria',
            confidence: 99.1,
            abundance: 'Low',
            dnaFragments: 445,
            ecologicalRole: 'Decomposer',
            conservationStatus: 'Pathogen Indicator',
            indicators: ['Fecal contamination', 'Health risk']
          },
          {
            species: 'Daphnia magna',
            commonName: 'Water Flea',
            kingdom: 'Animalia',
            phylum: 'Arthropoda',
            confidence: 97.3,
            abundance: 'High',
            dnaFragments: 1034,
            ecologicalRole: 'Filter feeder',
            conservationStatus: 'Native',
            indicators: ['Healthy zooplankton', 'Good food web']
          },
          {
            species: 'Pseudomonas aeruginosa',
            commonName: 'Blue-green Bacteria',
            kingdom: 'Bacteria',
            phylum: 'Proteobacteria',
            confidence: 91.7,
            abundance: 'Medium',
            dnaFragments: 623,
            ecologicalRole: 'Biofilm former',
            conservationStatus: 'Opportunistic Pathogen',
            indicators: ['Biofilm presence', 'Potential contamination']
          },
          {
            species: 'Lemna minor',
            commonName: 'Common Duckweed',
            kingdom: 'Plantae',
            phylum: 'Angiosperms',
            confidence: 95.4,
            abundance: 'Medium',
            dnaFragments: 756,
            ecologicalRole: 'Aquatic plant',
            conservationStatus: 'Native',
            indicators: ['Nutrient uptake', 'Habitat structure']
          },
          {
            species: 'Chironomus plumosus',
            commonName: 'Midge Larvae',
            kingdom: 'Animalia',
            phylum: 'Arthropoda',
            confidence: 93.6,
            abundance: 'High',
            dnaFragments: 987,
            ecologicalRole: 'Detritivore',
            conservationStatus: 'Native',
            indicators: ['Sediment health', 'Nutrient cycling']
          }
        ],
        biodiversityMetrics: {
          speciesRichness: 8,
          shannonIndex: 2.34,
          simpsonIndex: 0.82,
          evenness: 0.78,
          biodiversityScore: 85,
          ecosystemHealth: 'Good'
        },
        ecologicalAnalysis: {
          trophicLevels: {
            producers: 2,
            primaryConsumers: 3,
            secondaryConsumers: 1,
            decomposers: 2
          },
          foodWebComplexity: 'Moderate',
          keySpeciesPresent: ['Brown Trout', 'Water Flea', 'Green Algae'],
          ecologicalConcerns: ['Invasive crayfish', 'E. coli contamination', 'Eutrophication risk'],
          positiveIndicators: ['Diverse fish population', 'Active nutrient cycling', 'Stable food web']
        },
        waterQualityAssessment: {
          overallQuality: 'Good',
          pollutionLevel: 'Low to Moderate',
          pathogenRisk: 'Low',
          eutrophicationRisk: 'Moderate',
          biodiversityHealth: 'Good',
          recommendations: [
            'Monitor E. coli levels regularly',
            'Control invasive crayfish population',
            'Reduce nutrient inputs to prevent algal blooms',
            'Maintain riparian vegetation',
            'Continue biodiversity monitoring'
          ]
        },
        genomicInsights: {
          totalDNAFragments: 8140,
          uniqueGenomes: 8,
          averageFragmentLength: '295 base pairs',
          sequencingDepth: '45x coverage',
          novelSequences: 12,
          functionalGenes: {
            nitrogenCycle: 23,
            carbonCycle: 18,
            pollutantDegradation: 7,
            antibioticResistance: 3
          }
        }
      };
      
      setAnalysis(mockAnalysis);
      
      // Log activity for dashboard
      try {
        const { authManager } = await import('../utils/auth');
        await authManager.logActivity('Environmental DNA analyzed', {
          speciesDetected: mockAnalysis.detectedSpecies.length,
          biodiversityScore: mockAnalysis.biodiversityMetrics.biodiversityScore,
          waterSource: waterSource,
          location: sampleLocation
        });
      } catch (error) {
        console.warn('Failed to log activity:', error);
      }
      
      setLoading(false);
    }, 4000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
      analyzeDNA(files[0]);
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

  const getAbundanceColor = (abundance) => {
    switch (abundance) {
      case 'Very High': return '#f44336';
      case 'High': return '#FF9800';
      case 'Medium': return '#4CAF50';
      case 'Low': return '#2196F3';
      default: return '#666';
    }
  };

  const getStatusColor = (status) => {
    if (status.includes('Invasive') || status.includes('Pathogen')) return '#f44336';
    if (status.includes('Concern')) return '#FF9800';
    return '#4CAF50';
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'Excellent': return '#4CAF50';
      case 'Good': return '#8BC34A';
      case 'Fair': return '#FF9800';
      case 'Poor': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🧬 Bio-Stream AI: Environmental DNA Analysis
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          Revolutionary genetic-level ecosystem monitoring from a single drop of water
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
          🧬 DNA Sequencing • 🤖 AI Species ID • 📊 Biodiversity Analysis • 🌍 Ecosystem Health
        </div>
      </div>

      {/* Problem Statement */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
        border: '2px solid #f44336'
      }}>
        <h3 style={{ color: '#d32f2f', marginBottom: '15px' }}>🚨 The Biodiversity Blindness Crisis</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '15px' }}>
          <strong>We have no idea what's truly living in our water systems.</strong> Traditional surveys are slow, 
          expensive, and miss 99% of life (especially microbial). We are blind to the true state of our biodiversity.
        </p>
        <div style={{
          background: 'rgba(244, 67, 54, 0.1)',
          padding: '15px',
          borderRadius: '8px',
          fontSize: '0.95rem'
        }}>
          • Traditional biodiversity surveys take months and cost $50,000+<br />
          • Visual identification misses 99% of microbial life<br />
          • No real-time ecosystem health monitoring<br />
          • Pollution and invasive species go undetected until it's too late
        </div>
      </div>

      {/* Solution */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
        border: '2px solid #4CAF50'
      }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>💡 The Genetic Barcode Revolution</h3>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid #4CAF50'
        }}>
          <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>🎯 Environmental DNA (eDNA) Analysis:</h4>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            <strong>Every living creature sheds DNA into its environment.</strong> This eDNA is a "genetic barcode" 
            floating in the water. Our AI analyzes raw DNA sequences to create a complete, species-level census 
            of an ecosystem from a single water sample.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💧</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>1. Collect Sample</h4>
            <p style={{ color: '#666' }}>Single drop of water contains all DNA</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🧬</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>2. DNA Sequencing</h4>
            <p style={{ color: '#666' }}>Extract and sequence environmental DNA</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🤖</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>3. AI Analysis</h4>
            <p style={{ color: '#666' }}>Match DNA to species database</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📊</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>4. Ecosystem Report</h4>
            <p style={{ color: '#666' }}>Complete biodiversity analysis</p>
          </div>
        </div>
      </div>

      {/* Sample Information */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📍 Sample Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
              Sample Location
            </label>
            <input
              type="text"
              value={sampleLocation}
              onChange={(e) => setSampleLocation(e.target.value)}
              placeholder="e.g., Lake Washington, Seattle, WA"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '2px solid #4CAF50'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
              Water Source Type
            </label>
            <select
              value={waterSource}
              onChange={(e) => setWaterSource(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '2px solid #4CAF50'
              }}
            >
              <option value="">Select source...</option>
              <option value="Lake">Lake</option>
              <option value="River">River</option>
              <option value="Stream">Stream</option>
              <option value="Pond">Pond</option>
              <option value="Ocean">Ocean</option>
              <option value="Wetland">Wetland</option>
              <option value="Groundwater">Groundwater</option>
            </select>
          </div>
        </div>
      </div>

      {/* DNA File Upload */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🧬 Upload DNA Sequence File</h3>
        
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
            📁 Upload DNA Sequence File
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
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
            {dragActive ? '📤' : '🧬'}
          </div>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '10px' }}>
            {dragActive ? 'Drop DNA sequence file here!' : 'Drag & drop DNA sequence file'}
          </p>
          <p style={{ fontSize: '0.9rem', color: '#999' }}>
            Supports: FASTA, FASTQ, TXT • Raw sequencer output from MinION, Illumina, etc.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".fasta,.fastq,.txt,.fa,.fq"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />

        {selectedFile && (
          <div style={{ 
            background: '#e8f5e8', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid #4CAF50'
          }}>
            <p><strong>Selected File:</strong> {selectedFile.name}</p>
            <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}
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
          <p>🧬 Analyzing environmental DNA with AI...</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Sequencing DNA fragments, matching to species database, calculating biodiversity metrics...
          </p>
        </div>
      )}

      {analysis && !loading && (
        <div style={{ display: 'grid', gap: '30px' }}>
          {/* Analysis Overview */}
          <div className="card">
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📊 Genetic Analysis Overview</h3>
            
            <div style={{
              background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              border: '2px solid #4CAF50'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 style={{ color: '#2E7D32', margin: 0 }}>
                  Ecosystem Health: {analysis.biodiversityMetrics.ecosystemHealth}
                </h4>
                <div style={{
                  background: getHealthColor(analysis.biodiversityMetrics.ecosystemHealth),
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  Biodiversity Score: {analysis.biodiversityMetrics.biodiversityScore}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', fontSize: '0.9rem' }}>
                <div><strong>Species Detected:</strong> {analysis.detectedSpecies.length}</div>
                <div><strong>DNA Fragments:</strong> {analysis.genomicInsights.totalDNAFragments.toLocaleString()}</div>
                <div><strong>Processing Time:</strong> {analysis.processingTime}</div>
                <div><strong>Confidence:</strong> {analysis.confidence}%</div>
              </div>
            </div>

            {/* Biodiversity Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50' }}>
                  {analysis.biodiversityMetrics.speciesRichness}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Species Richness</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196F3' }}>
                  {analysis.biodiversityMetrics.shannonIndex}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Shannon Index</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF9800' }}>
                  {analysis.biodiversityMetrics.evenness}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Evenness</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9C27B0' }}>
                  {analysis.biodiversityMetrics.simpsonIndex}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Simpson Index</div>
              </div>
            </div>
          </div>

          {/* Species Detection */}
          <div className="card">
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🔬 Detected Species</h3>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {analysis.detectedSpecies.map((species, index) => (
                <div key={index} style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  background: '#f9f9f9'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h5 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '5px' }}>
                        {species.species} ({species.commonName})
                      </h5>
                      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '5px' }}>
                        {species.kingdom} • {species.phylum}
                      </p>
                      <p style={{ color: '#666', fontSize: '0.9rem' }}>
                        Role: {species.ecologicalRole}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        background: getAbundanceColor(species.abundance),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                      }}>
                        {species.abundance} Abundance
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        {species.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '0.9rem', marginBottom: '15px' }}>
                    <div>
                      <strong>DNA Fragments:</strong> {species.dnaFragments.toLocaleString()}
                    </div>
                    <div style={{ color: getStatusColor(species.conservationStatus) }}>
                      <strong>Status:</strong> {species.conservationStatus}
                    </div>
                  </div>
                  
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>Ecological Indicators:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      {species.indicators.map((indicator, i) => (
                        <span key={i} style={{
                          background: indicator.includes('risk') || indicator.includes('contamination') || indicator.includes('disruption') ? '#ffebee' : '#e8f5e8',
                          color: indicator.includes('risk') || indicator.includes('contamination') || indicator.includes('disruption') ? '#d32f2f' : '#2E7D32',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {indicator}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ecological Analysis */}
          <div className="card">
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🌊 Ecosystem Analysis</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>🔗 Food Web Structure</h4>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {Object.entries(analysis.ecologicalAnalysis.trophicLevels).map(([level, count]) => (
                    <div key={level} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px',
                      background: '#f9f9f9',
                      borderRadius: '8px'
                    }}>
                      <span style={{ textTransform: 'capitalize' }}>{level.replace(/([A-Z])/g, ' $1')}:</span>
                      <span style={{ fontWeight: 'bold' }}>{count} species</span>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#666' }}>
                  <strong>Food Web Complexity:</strong> {analysis.ecologicalAnalysis.foodWebComplexity}
                </p>
              </div>
              
              <div>
                <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>⚠️ Ecological Concerns</h4>
                <div style={{ marginBottom: '20px' }}>
                  {analysis.ecologicalAnalysis.ecologicalConcerns.map((concern, index) => (
                    <div key={index} style={{
                      padding: '8px 12px',
                      background: '#ffebee',
                      color: '#d32f2f',
                      borderRadius: '8px',
                      marginBottom: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      • {concern}
                    </div>
                  ))}
                </div>
                
                <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>✅ Positive Indicators</h4>
                <div>
                  {analysis.ecologicalAnalysis.positiveIndicators.map((indicator, index) => (
                    <div key={index} style={{
                      padding: '8px 12px',
                      background: '#e8f5e8',
                      color: '#2E7D32',
                      borderRadius: '8px',
                      marginBottom: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      • {indicator}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Water Quality Assessment */}
          <div className="card">
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>💧 Water Quality Assessment</h3>
            
            <div style={{
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              border: '2px solid #2196F3'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 style={{ color: '#1976d2', margin: 0 }}>
                  Overall Quality: {analysis.waterQualityAssessment.overallQuality}
                </h4>
                <div style={{
                  background: '#2196F3',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {analysis.waterQualityAssessment.pollutionLevel} Pollution
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', fontSize: '0.9rem' }}>
                <div><strong>Pathogen Risk:</strong> {analysis.waterQualityAssessment.pathogenRisk}</div>
                <div><strong>Eutrophication Risk:</strong> {analysis.waterQualityAssessment.eutrophicationRisk}</div>
                <div><strong>Biodiversity Health:</strong> {analysis.waterQualityAssessment.biodiversityHealth}</div>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>📋 Recommendations</h4>
              <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                {analysis.waterQualityAssessment.recommendations.map((rec, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>{rec}</li>
                ))}
              </ol>
            </div>
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

export default BioStreamAI;