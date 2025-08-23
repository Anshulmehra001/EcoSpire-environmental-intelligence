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
    }
  };

  const analyzeDNA = async (dnaFile) => {
    setLoading(true);
    setAnalysis(null); // It's good practice to clear old results

    // FormData will package the file for sending
    const formData = new FormData();
    formData.append('dnaFile', dnaFile);

    try {
      // This is the new code that calls your server
      const response = await fetch('http://localhost:5000/api/analyze-dna', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const analysisData = await response.json();
      console.log("Frontend: Received analysis from backend:", analysisData);

      // Update the screen with the real data from the backend
      const finalReport = {
        ...analysisData,
        fileName: dnaFile.name,
        fileSize: (dnaFile.size / 1024 / 1024).toFixed(2) + ' MB',
      };
      setAnalysis(finalReport);

    } catch (error) {
      console.error('Failed to fetch DNA analysis:', error);
    } finally {
      // This part always runs to make sure the spinner stops
      setLoading(false);
    }
  };
    

    

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
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

        {/* --- NEW ANALYSIS BUTTON --- */}
{selectedFile && !loading && !analysis && (
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <button
      onClick={() => analyzeDNA(selectedFile)} // Pass the selected file to the function
      style={{
        fontSize: '1.2rem',
        padding: '15px 30px',
        background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
        border: 'none',
        borderRadius: '25px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
    >
      🔬 Analyze DNA Sequence
    </button>
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

      
                   {/* --- FINAL, ULTRA-ROBUST RESULTS DISPLAY --- */}
      {analysis && !loading && (
        <div style={{ display: 'grid', gap: '30px' }}>

          {/* --- Analysis Overview Card --- */}
          {analysis.biodiversityMetrics && (
            <div className="card">
              <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📊 Genetic Analysis Overview</h3>
              <div style={{
                background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                padding: '20px', borderRadius: '12px', border: '2px solid #4CAF50'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ color: '#2E7D32', margin: 0 }}>
                    Ecosystem Health: {analysis.biodiversityMetrics.ecosystemHealth || 'N/A'}
                  </h4>
                  <div style={{
                    background: getHealthColor(analysis.biodiversityMetrics.ecosystemHealth),
                    color: 'white', padding: '8px 16px', borderRadius: '20px',
                    fontSize: '0.9rem', fontWeight: 'bold'
                  }}>
                    Biodiversity Score: {analysis.biodiversityMetrics.biodiversityScore || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- Detected Species Card --- */}
          <div className="card">
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🔬 Detected Species</h3>
            {analysis.detectedSpecies && analysis.detectedSpecies.length > 0 ? (
              <div style={{ display: 'grid', gap: '15px' }}>
                {analysis.detectedSpecies.map((species, index) => (
                  <div key={index} style={{
                    border: '1px solid #ddd', borderRadius: '8px',
                    padding: '20px', background: '#f9f9f9'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                      <h5 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '5px' }}>
  {species.species || 'Unknown Species'} ({species.commonName || ''})
</h5>
<p style={{ color: '#666', fontSize: '0.8rem', fontFamily: 'monospace' }}>
  ID: {species.blastId || 'N/A'}
</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          background: getAbundanceColor(species.abundance),
                          color: 'white', padding: '4px 8px', borderRadius: '12px'
                        }}>
                          {species.abundance || 'N/A'} Abundance
                        </div>
                        <p>{species.confidence || 'N/A'}% Confidence</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
               <p>{analysis.error ? `Analysis Error: ${analysis.error}` : "No species from the database were detected in this sample."}</p>
            )}
          </div>

          {/* --- Recommendations Card --- */}
          {analysis.waterQualityAssessment && (
            <div className="card">
              <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📋 Recommendations</h3>
              <ul>
                {analysis.waterQualityAssessment.recommendations?.map((rec, i) => <li key={i}>{rec}</li>) || <li>No recommendations available.</li>}
              </ul>
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

export default BioStreamAI;