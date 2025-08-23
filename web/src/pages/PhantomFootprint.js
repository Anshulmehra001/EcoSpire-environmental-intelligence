import React, { useState } from 'react';

const PhantomFootprint = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  // This is the fully functional, backend-connected function
  const analyzeURL = async () => {
    if (!url || !url.startsWith('http')) {
      setError("Please enter a valid product URL (e.g., https://...)");
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysis(null);
    setError(null);
      
    try {
      const response = await fetch('http://localhost:5000/api/analyze-footprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
        
      const analysisData = await response.json();

      if (!response.ok || analysisData.error) {
        throw new Error(analysisData.error || 'Analysis failed due to a server error.');
      }
      
      console.log("DEBUG: Received footprint analysis:", analysisData);
      setAnalysis(analysisData);
        
    } catch (err) {
      console.error("Phantom Footprint analysis error:", err);
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getImpactColor = (score) => {
    if (score > 75) return '#f44336'; // Red for High Impact
    if (score > 50) return '#FF9800'; // Orange for Medium Impact
    return '#4CAF50'; // Green for Low Impact
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          👻 Phantom Footprint
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          Uncover the hidden environmental costs of your online purchases
        </p>
        <div style={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
          color: 'white', padding: '15px 30px', borderRadius: '25px',
          display: 'inline-block', fontSize: '1rem', fontWeight: 'bold'
        }}>
          🔍 URL Analysis • 💧 Water Footprint • 💨 Carbon Tracking • 💡 Smart Choices
        </div>
      </div>

      {/* Problem Statement Card (Inspired by your other pages) */}
      <div className="card" style={{
        marginBottom: '30px', background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
        border: '2px solid #f44336'
      }}>
        <h3 style={{ color: '#d32f2f', marginBottom: '15px' }}>🚨 The Hidden Cost of Convenience</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          Online shopping is easy, but the price tag doesn't show the whole story. Every product has a "phantom footprint"—hidden costs in water, carbon emissions from global shipping, and waste from packaging and returns—that harm our planet.
        </p>
      </div>

      {/* Solution Card (Inspired by your other pages) */}
      <div className="card" style={{
        marginBottom: '30px', background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
        border: '2px solid #4CAF50'
      }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>💡 Making the Invisible, Visible</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Our AI analyzes any product URL to calculate its true environmental price tag. We instantly visualize the hidden water, waste, and carbon costs, empowering you to make conscious, sustainable purchasing decisions.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: '3rem' }}>🔗</div><h4 style={{ color: '#2E7D32' }}>1. Paste URL</h4><p>Provide a product link.</p></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: '3rem' }}>🤖</div><h4 style={{ color: '#2E7D32' }}>2. AI Analysis</h4><p>We calculate its lifecycle costs.</p></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: '3rem' }}>📊</div><h4 style={{ color: '#2E7D32' }}>3. See Report</h4><p>View the hidden footprint.</p></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: '3rem' }}>🌱</div><h4 style={{ color: '#2E7D32' }}>4. Choose Better</h4><p>Make a smarter choice.</p></div>
        </div>
      </div>

      {/* Main Analysis Input Card */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🔍 Analyze a Product URL</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="url"
            placeholder="Paste a product URL from a major online retailer..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isAnalyzing}
            style={{
                width: '100%', padding: '12px', fontSize: '1rem',
                borderRadius: '8px', border: error ? '2px solid #f44336' : '2px solid #ccc'
            }}
          />
          <button
            onClick={analyzeURL}
            disabled={isAnalyzing || !url}
            style={{
              fontSize: '1rem', padding: '12px 24px',
              background: isAnalyzing ? '#ccc' : 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
              border: 'none', borderRadius: '8px', color: 'white',
              fontWeight: 'bold', cursor: isAnalyzing ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {isAnalyzing ? 'Analyzing...' : 'Reveal Footprint'}
          </button>
        </div>
        {error && <p style={{ color: '#d32f2f', marginTop: '10px' }}>{error}</p>}
      </div>

      {/* Loading Spinner */}
      {isAnalyzing && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px', height: '48px', border: '4px solid #f3f3f3',
            borderTop: '4px solid #4CAF50', borderRadius: '50%',
            animation: 'spin 1s linear infinite', margin: '0 auto 20px'
          }}></div>
          <p>Scanning product data and calculating hidden costs...</p>
        </div>
      )}

      {/* Results Section */}
      {analysis && (
        <div className="card" style={{
            animation: 'fadeIn 0.5s ease-in-out'
        }}>
          {/* Results Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd' }}>
            <div>
              <p style={{ color: '#666', margin: 0 }}>Analysis for:</p>
              <h3 style={{ color: '#2E7D32', fontSize: '1.8rem', margin: 0 }}>
                {analysis.productName}
              </h3>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '70px', height: '70px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: getImpactColor(analysis.impactScore),
                color: 'white', fontSize: '1.8rem', fontWeight: 'bold',
                border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                {analysis.impactScore}
              </div>
              <p style={{ margin: '5px 0 0', fontWeight: 'bold', color: '#2E7D32' }}>Impact Score</p>
            </div>
          </div>

          {/* Impact Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1E88E5' }}>💧 {analysis.phantomFootprint.hiddenWaterUsageLiters.toLocaleString()} L</div>
                <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>Hidden Water Usage</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#43A047' }}>💨 {analysis.phantomFootprint.totalCO2EquivalentKg} kg</div>
                <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>Total CO₂ Footprint</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FB8C00' }}>🗑️ {analysis.phantomFootprint.productionWasteKg} kg</div>
                <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>Production Waste</p>
            </div>
             <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7E57C2' }}>✈️ {analysis.phantomFootprint.breakdown.transportCO2Kg} kg</div>
                <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>Transport CO₂ from {analysis.originCountry}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>💡 Eco-Friendly Recommendations</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {analysis.insights.map((rec, index) => (
                <li key={index} style={{
                  display: 'flex', alignItems: 'center',
                  padding: '12px', background: 'rgba(255,255,255,0.6)',
                  borderRadius: '8px', marginBottom: '8px'
                }}>
                  <span style={{ marginRight: '15px', color: '#1B5E20', fontSize: '1.5rem' }}>🌱</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PhantomFootprint;