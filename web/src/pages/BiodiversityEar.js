import React, { useState, useRef, useEffect } from 'react';
// The 'analyzeAudioForSpecies' utility is no longer used as analysis is now handled by the backend.
import { biodiversityDB } from '../utils/biodiversityDatabase';

// --- Child Component for displaying overall statistics ---
function BiodiversityStats({ recordings }) {
  if (!recordings || recordings.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        No recordings available for statistics
      </div>
    );
  }

  const totalSpecies = new Set(
    recordings.flatMap(r => r.detectedSpecies?.map(s => s.name) || [])
  ).size;

  const avgBiodiversity = recordings.reduce((sum, r) => 
    sum + (r.biodiversityMetrics?.biodiversityScore || 0), 0
  ) / recordings.length;

  const ecosystemHealthCounts = recordings.reduce((acc, r) => {
    const health = r.biodiversityMetrics?.ecosystemHealth || 'Unknown';
    acc[health] = (acc[health] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
      <div style={{ textAlign: 'center', padding: '20px', background: '#e8f5e8', borderRadius: '8px' }}>
        <div style={{ fontSize: '2rem', color: '#2E7D32', marginBottom: '10px' }}>{totalSpecies}</div>
        <div style={{ fontWeight: 'bold' }}>Unique Species</div>
      </div>
      <div style={{ textAlign: 'center', padding: '20px', background: '#e3f2fd', borderRadius: '8px' }}>
        <div style={{ fontSize: '2rem', color: '#1976d2', marginBottom: '10px' }}>{Math.round(avgBiodiversity)}</div>
        <div style={{ fontWeight: 'bold' }}>Avg Biodiversity Score</div>
      </div>
      <div style={{ textAlign: 'center', padding: '20px', background: '#fff3e0', borderRadius: '8px' }}>
        <div style={{ fontSize: '2rem', color: '#F57C00', marginBottom: '10px' }}>{recordings.length}</div>
        <div style={{ fontWeight: 'bold' }}>Total Recordings</div>
      </div>
      <div style={{ textAlign: 'center', padding: '20px', background: '#fce4ec', borderRadius: '8px' }}>
        <div style={{ fontSize: '1.2rem', color: '#C2185B', marginBottom: '10px' }}>
          {Object.entries(ecosystemHealthCounts).map(([health, count]) => (
            <div key={health}>{health}: {count}</div>
          ))}
        </div>
        <div style={{ fontWeight: 'bold' }}>Ecosystem Health</div>
      </div>
    </div>
  );
}


// --- Main BiodiversityEar Component ---
function BiodiversityEar({ onActivityComplete }) {
  // State hooks for managing component data and UI status
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null); // URL for the audio player
  const [analysis, setAnalysis] = useState(null); // Stores results from the backend
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Controls loading indicators
  const [recordings, setRecordings] = useState([]); // List of past recordings
  const [selectedHabitat, setSelectedHabitat] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('North America');
  const [uploadedFile, setUploadedFile] = useState(null); // The actual audio file object
  const [userLocation, setUserLocation] = useState(null);
  const [dragActive, setDragActive] = useState(false); // For drag-and-drop UI

  // Refs for DOM elements and media recorder instance
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);

  const habitats = [
    "Urban Park", "Forest Edge", "Wetland/Marsh", "Suburban Garden",
    "Agricultural Field", "Coastal Area", "Mountain Trail", "Desert Scrub",
    "Backyard", "Nature Reserve", "Riverside", "Prairie Grassland"
  ];
  const regions = ["North America", "Europe", "Asia", "South America", "Africa", "Australia"];

  // Effect hook to run on component mount
  useEffect(() => {
    // Fetches initial data like past recordings and user location
    const initializeApp = async () => {
      try {
        await biodiversityDB.init();
        const savedRecordings = await biodiversityDB.getAllRecordings(50);
        setRecordings(savedRecordings);
      } catch (error) {
        console.warn('Database initialization failed:', error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),
        (error) => console.log('Location access denied:', error)
      );
    }
    initializeApp();
  }, []);

  // --- Core Component Methods ---

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioData(audioUrl);
        setUploadedFile(audioBlob); // Set the file object for upload
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      const audioUrl = URL.createObjectURL(file);
      setAudioData(audioUrl);
      setUploadedFile(file); // Set the file object for upload
    }
  };

  // Drag and drop event handlers
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload({ target: { files: e.dataTransfer.files } });
    }
  };
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); };


  const analyzeAudio = async () => {
    // Ensure a file has been uploaded or recorded before proceeding.
    if (!uploadedFile) {
      alert('No valid audio file is ready for analysis.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null); // Clear previous results to prepare for new analysis.

    try {
      // Create a FormData object to package the file for HTTP transport.
      const formData = new FormData();
      formData.append('audioFile', uploadedFile); // 'audioFile' must match the key expected by the server.
      formData.append('region', selectedRegion);
      formData.append('habitat', selectedHabitat);

      // Send the audio file to the backend server for processing.
      // The server is expected to be running on localhost:5000.
      const response = await fetch('http://localhost:5000/api/analyze-audio', {
        method: 'POST',
        body: formData,
      });

      // Handle non-successful HTTP responses.
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'The analysis server returned an error.');
      }

      // Parse the JSON results returned from the backend.
      const analysisResults = await response.json();

      // Assemble the final analysis object for state and UI rendering.
      const finalAnalysis = {
        id: biodiversityDB.generateId(),
        timestamp: new Date().toISOString(),
        location: userLocation,
        habitat: selectedHabitat || 'Unknown',
        region: selectedRegion,
        ...analysisResults // Spread the results from the backend (species, metrics, etc.)
      };

      setAnalysis(finalAnalysis);

      // Log activity for environmental impact tracking
      try {
        const { authManager } = await import('../utils/auth');
        await authManager.logActivity('Biodiversity scan completed', {
          type: 'biodiversity_scan',
          region: selectedRegion,
          speciesCount: finalAnalysis.speciesDetected?.length || 0,
          ecosystemHealth: finalAnalysis.biodiversityMetrics?.ecosystemHealth || 'Unknown',
          points: 25,
          amount: 1 // For biodiversityScans counter
        });
        console.log('✅ Biodiversity scan activity logged successfully');
      } catch (error) {
        console.warn('Failed to log biodiversity activity:', error);
      }

      // Persist the results to the local client-side database.
      try {
        await biodiversityDB.saveRecording(finalAnalysis);
        
        // If an onActivityComplete callback is provided, call it to update parent state.
        if (onActivityComplete) {
          onActivityComplete({ type: 'bio_scan' });
        }

      } catch (dbError) {
        console.warn('Failed to save recording to local DB:', dbError);
      }

      // Refresh the list of recent recordings from the database.
      const updatedRecordings = await biodiversityDB.getAllRecordings(50);
      setRecordings(updatedRecordings);

    } catch (error) {
      console.error('An error occurred during the analysis process:', error);
      alert(`Analysis Failed: ${error.message}. Please check the connection to the server and try again.`);
    } finally {
      // Ensure the loading state is turned off, regardless of success or failure.
      setIsAnalyzing(false);
    }
  };

  // Helper functions for styling the results dynamically
  const getQualityColor = (ecosystemHealth) => {
    switch (ecosystemHealth) {
      case 'Excellent': return '#4CAF50';
      case 'Good': return '#8BC34A';
      case 'Fair': return '#FF9800';
      case 'Poor': return '#f44336';
      default: return '#666';
    }
  };
  const getConservationColor = (status) => {
    switch (status) {
      case 'Least Concern': return '#4CAF50';
      case 'Threatened': return '#f44336';
      default: return '#666';
    }
  };

  // --- JSX Rendering ---
  return (
    <div className="container">
      {/* The entire UI structure from your original file is preserved below */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🎧 BiodiversityEar: AI Ecosystem Monitoring
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          Mapping ecosystem health through the acoustic fingerprint of nature
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
          🌍 Real-Time Ecosystem Monitoring • 🤖 AI Species Detection • 📊 Live Biodiversity Mapping
        </div>
      </div>

      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
        border: '2px solid #f44336'
      }}>
        <h3 style={{ color: '#d32f2f', marginBottom: '15px' }}>🚨 The Biodiversity Crisis</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '15px' }}>
          <strong>Traditional biodiversity tracking is slow, expensive, and requires expert biologists on-site.</strong>
          We have no real-time, large-scale way to know if an ecosystem is recovering or collapsing.
        </p>
        <div style={{
          background: 'rgba(244, 67, 54, 0.1)',
          padding: '15px',
          borderRadius: '8px',
          fontSize: '0.95rem'
        }}>
          • Ecosystem monitoring takes months or years to show results<br />
          • Requires expensive equipment and trained specialists<br />
          • No global, real-time view of biodiversity health<br />
          • Climate change is accelerating faster than our ability to track it
        </div>
      </div>

      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
        border: '2px solid #4CAF50'
      }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🎯 The BiodiversityEar Revolution</h3>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid #4CAF50'
        }}>
          <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>💡 The "One-of-a-Kind" Insight:</h4>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            <strong>Every ecosystem has a unique "soundscape"</strong>—a combination of birdsong, insect calls,
            frog croaks, and animal movements. BiodiversityEar uses machine learning to listen to this symphony
            and identify its players, creating a real-time acoustic map of planetary health.
          </p>
        </div>

        <div className="grid grid-4" style={{ marginTop: '20px' }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎤</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>1. Record</h4>
            <p style={{ color: '#666' }}>Capture 30-second audio recordings anywhere</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🤖</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>2. Analyze</h4>
            <p style={{ color: '#666' }}>AI identifies species by acoustic signatures</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📊</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>3. Assess</h4>
            <p style={{ color: '#666' }}>Calculate biodiversity and ecosystem health</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🗺️</div>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>4. Map</h4>
            <p style={{ color: '#666' }}>Create real-time biodiversity hotspot maps</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🌍 Recording Location</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Region:</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '2px solid #4CAF50'
              }}
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Habitat:</label>
            <select
              value={selectedHabitat}
              onChange={(e) => setSelectedHabitat(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '2px solid #4CAF50'
              }}
            >
              <option value="">Choose habitat...</option>
              {habitats.map(habitat => (
                <option key={habitat} value={habitat}>{habitat}</option>
              ))}
            </select>
          </div>
        </div>
        {userLocation && (
          <div style={{ marginTop: '15px', padding: '10px', background: '#e8f5e8', borderRadius: '8px', fontSize: '0.9rem' }}>
            📍 Current Location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
          </div>
        )}
      </div>

      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        border: '2px solid #2196F3'
      }}>
        <h3 style={{ color: '#1976d2', marginBottom: '20px' }}>💡 Pro Tips for Better Bird Detection</h3>
        <div className="grid grid-2" style={{ gap: '20px' }}>
          <div>
            <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>🕐 Best Recording Times</h4>
            <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <li><strong>Dawn Chorus (5-7 AM):</strong> Peak bird activity</li>
              <li><strong>Evening (6-8 PM):</strong> Second peak activity</li>
              <li><strong>Spring/Summer:</strong> Breeding season = more songs</li>
              <li><strong>Calm Weather:</strong> Avoid windy or rainy days</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>🎯 Recording Quality Tips</h4>
            <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <li><strong>Duration:</strong> Record for 30-60 seconds minimum</li>
              <li><strong>Distance:</strong> Get within 50 feet of bird sounds</li>
              <li><strong>Background:</strong> Minimize traffic, wind, human noise</li>
              <li><strong>Format:</strong> Use high-quality audio settings</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🎤 Audio Recording</h3>
        
        {!isRecording ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={startRecording}
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
                  🎤 Start Recording
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    fontSize: '1.1rem',
                    padding: '15px 30px',
                    borderRadius: '25px',
                    background: '#FF9800',
                    color: 'white',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  📁 Upload Audio
                </button>
              </div>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              style={{
                border: `2px dashed ${dragActive ? '#4CAF50' : '#ccc'}`,
                borderRadius: '12px',
                padding: '40px 20px',
                textAlign: 'center',
                background: dragActive ? '#e8f5e8' : '#f9f9f9',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                {dragActive ? '📤' : '🎵'}
              </div>
              <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '10px' }}>
                {dragActive ? 'Drop your audio file here!' : 'Drag & drop audio files here'}
              </p>
              <p style={{ fontSize: '0.9rem', color: '#999' }}>
                Supports: MP3, WAV, M4A, OGG • Best results: 30+ seconds, minimal background noise
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '4rem',
              color: '#f44336',
              marginBottom: '20px',
              animation: 'pulse 1s infinite'
            }}>
              🔴
            </div>
            <button
              onClick={stopRecording}
              style={{
                fontSize: '1.2rem',
                padding: '15px 30px',
                background: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ⏹️ Stop Recording
            </button>
            <p style={{ marginTop: '15px', color: '#666' }}>
              Recording in progress... Capture at least 30 seconds for best results
            </p>
          </div>
        )}
      </div>

      {audioData && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🎵 Audio Analysis</h3>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <h4 style={{ marginBottom: '15px', color: '#2E7D32' }}>
                🎵 {uploadedFile && uploadedFile.name ? 'Uploaded Audio' : 'Recorded Audio'}
              </h4>
              <audio
                controls
                src={audioData}
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  marginBottom: '15px'
                }}
              />
              {uploadedFile && uploadedFile.size && (
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  File Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
              )}
            </div>
            
            <button
              onClick={analyzeAudio}
              disabled={isAnalyzing}
              style={{
                fontSize: '1.2rem',
                padding: '15px 40px',
                background: isAnalyzing ? '#ccc' : 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                border: 'none',
                borderRadius: '25px',
                color: 'white',
                fontWeight: 'bold',
                cursor: isAnalyzing ? 'not-allowed' : 'pointer'
              }}
            >
              {isAnalyzing ? '🤖 Analyzing Audio...' : '🔍 Analyze with AI'}
            </button>
          </div>
        </div>
      )}

      {analysis && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📊 Biodiversity Analysis Results</h3>
          
          <div style={{
            background: `linear-gradient(135deg, ${getQualityColor(analysis.biodiversityMetrics.ecosystemHealth)}20 0%, ${getQualityColor(analysis.biodiversityMetrics.ecosystemHealth)}40 100%)`,
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: `2px solid ${getQualityColor(analysis.biodiversityMetrics.ecosystemHealth)}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ color: getQualityColor(analysis.biodiversityMetrics.ecosystemHealth), margin: 0 }}>
                Ecosystem Health: {analysis.biodiversityMetrics.ecosystemHealth}
              </h4>
              <div style={{
                background: '#2E7D32',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                Confidence: {Math.round(analysis.confidence)}%
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', fontSize: '0.9rem' }}>
              <div><strong>Species Detected:</strong> {analysis.detectedSpecies.length}</div>
              <div><strong>Biodiversity Score:</strong> {Math.round(analysis.biodiversityMetrics.biodiversityScore || 0)}</div>
              <div><strong>Shannon Index:</strong> {analysis.biodiversityMetrics.shannonIndex}</div>
              <div><strong>Audio Quality:</strong> {analysis.audioQuality}</div>
            </div>
          </div>
          
          {analysis.detectedSpecies.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>🐦 Detected Species</h4>
              <div style={{ display: 'grid', gap: '15px' }}>
                {analysis.detectedSpecies.map((species, index) => (
                  <div key={index} style={{
                    background: '#f9f9f9',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #ddd'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '2rem' }}>{species.icon}</span>
                        <div>
                          <h5 style={{ margin: 0, color: '#2E7D32' }}>{species.name}</h5>
                          <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic', color: '#666' }}>
                            {species.scientificName}
                          </p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          background: '#4CAF50',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          marginBottom: '5px'
                        }}>
                          {species.confidence}% confidence
                        </div>
                        <div style={{
                          background: getConservationColor(species.conservationStatus),
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '0.8rem'
                        }}>
                          {species.conservationStatus}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
                        {species.description}
                      </p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.8rem', color: '#666' }}>
                      <div><strong>Habitat:</strong> {species.habitat}</div>
                      <div><strong>Frequency:</strong> {species.frequency}</div>
                      <div><strong>Call Type:</strong> {species.callType}</div>
                      <div><strong>Sound:</strong> {species.sound}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis.recommendations && analysis.recommendations.length > 0 && (
            <div style={{
              background: '#e3f2fd',
              border: '2px solid #2196F3',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '20px'
            }}>
              <h5 style={{ color: '#1976d2', marginBottom: '10px' }}>💡 Recommendations</h5>
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} style={{ color: '#1976d2', marginBottom: '5px' }}>
                  • {recommendation}
                </div>
              ))}
            </div>
          )}

          <div style={{
            background: '#f5f5f5',
            padding: '15px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            <strong>Analysis Details:</strong><br />
            Region: {analysis.region} • Habitat: {analysis.habitat}<br />
            Timestamp: {new Date(analysis.timestamp).toLocaleString()}<br />
            {analysis.location && (
              <>Location: {analysis.location.latitude.toFixed(4)}, {analysis.location.longitude.toFixed(4)}</>
            )}
          </div>
        </div>
      )}

      {recordings.length > 0 && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📈 Biodiversity Statistics</h3>
          <BiodiversityStats recordings={recordings} />
        </div>
      )}

      {recordings.length > 0 && (
        <div className="card">
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🎵 Recent Recordings</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {recordings.slice(0, 10).map(recording => (
              <div key={recording.id} style={{
                background: '#f9f9f9',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '10px',
                border: '1px solid #ddd'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div>
                    <strong>{recording.habitat || 'Unknown Habitat'}</strong>
                    <span style={{
                      marginLeft: '10px',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      background: getQualityColor(recording.biodiversityMetrics?.ecosystemHealth),
                      color: 'white'
                    }}>
                      {recording.biodiversityMetrics?.ecosystemHealth || 'Unknown'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {new Date(recording.timestamp).toLocaleDateString()} {new Date(recording.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', fontSize: '0.9rem' }}>
                  <div>Species: <strong>{recording.detectedSpecies?.length || 0}</strong></div>
                  <div>Score: <strong>{Math.round(recording.biodiversityMetrics?.biodiversityScore || 0)}</strong></div>
                  <div>Duration: <strong>{recording.duration?.toFixed(1) || 0}s</strong></div>
                  <div>Confidence: <strong>{recording.confidence || 0}%</strong></div>
                </div>

                {recording.detectedSpecies && recording.detectedSpecies.length > 0 && (
                  <div style={{ marginTop: '10px', fontSize: '0.8rem' }}>
                    <strong>Species:</strong> {recording.detectedSpecies.map(s => s.name).join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BiodiversityEar;