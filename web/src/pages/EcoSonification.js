import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AudioEngine } from '../utils/AudioEngine';

// --- UI Sub-Components ---
// These are helper components; their styling is controlled by the main component's structure.

const AnimationStyles = () => (
  <style>{`@keyframes pulse{0%{transform:scale(.95);opacity:.7}50%{transform:scale(1.05);opacity:1}100%{transform:scale(.95);opacity:.7}}@keyframes pulse-inner{0%{transform:scale(1)}50%{transform:scale(.9)}100%{transform:scale(1)}}`}</style>
);

const PlanetaryAura = ({ health }) => (
  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '200px', height: '200px', margin: 'auto' }}>
    <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', transition: 'all 1s', backgroundColor: `hsl(${health * 1.2}, 70%, 50%)`, filter: "blur(24px)", animation: `pulse ${3 - health * 1.5}s infinite ease-in-out` }} />
    <div style={{ position: 'absolute', width: '75%', height: '75%', borderRadius: '50%', backgroundColor: `hsla(${health * 1.2}, 80%, 60%, 0.7)`, animation: `pulse-inner ${3 - health * 1.5}s infinite ease-in-out` }} />
  </div>
);

const ControlSlider = ({ label, value, unit, onChange, min, max, icon }) => (
  <div>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
      <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>{icon}</span>
      {label} - <span style={{ fontWeight: 'normal' }}>{Math.round(value)}{unit}</span>
    </label>
    <input
      type="range"
      min={min} max={max} value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      style={{ width: '100%' }}
    />
  </div>
);


// --- Main EcoSonification Component ---

const PRESETS = {
  '1850': { forest: 90, biodiversity: 95, water: 98, co2: 280, text: "Listen. A world in balance. The clear, harmonious sound of a stable climate." },
  '1970': { forest: 70, biodiversity: 75, water: 65, co2: 325, text: "The Great Acceleration begins. A subtle tension appears as industrial hums enter the soundscape." },
  '2025': { forest: 55, biodiversity: 60, water: 50, co2: 420, text: "This is the sound of today. A complex, strained harmony, battling a persistent dissonant hum." },
  '2050': { forest: 75, biodiversity: 80, water: 85, co2: 350, text: "A possible future. The dissonance fades, allowing the planet's natural harmony to begin its recovery." },
};

const EcoSonification = () => {
  const audioEngine = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [params, setParams] = useState(PRESETS['2025']);
  const [narrative, setNarrative] = useState(PRESETS['2025'].text);
  const [isSyncing, setIsSyncing] = useState(false);

  const overallHealth = useMemo(() => {
    const forestHealth = params.forest / 100;
    const bioHealth = params.biodiversity / 100;
    const waterHealth = params.water / 100;
    const co2Impact = 1 - (Math.max(0, params.co2 - 280) / 220);
    return ((forestHealth + bioHealth + waterHealth + co2Impact) / 4) * 100;
  }, [params]);

  useEffect(() => {
    audioEngine.current = new AudioEngine();
    return () => { if (audioEngine.current) audioEngine.current.dispose(); };
  }, []);

  useEffect(() => {
    if (isInitialized && audioEngine.current) {
      audioEngine.current.updateForest(params.forest);
      audioEngine.current.updateBiodiversity(params.biodiversity);
      audioEngine.current.updateWater(params.water);
      audioEngine.current.updateCO2(params.co2);
    }
  }, [params, isInitialized]);

  const handlePlayToggle = async () => {
    if (!isInitialized) {
      await audioEngine.current.initialize();
      setIsInitialized(true);
    }
    const newIsPlaying = !isPlaying;
    audioEngine.current.togglePlayback(newIsPlaying);
    setIsPlaying(newIsPlaying);

    // Log activity when user starts playing environmental soundscape
    if (newIsPlaying) {
      try {
        const { authManager } = await import('../utils/auth');
        await authManager.logActivity('Environmental soundscape generated', {
          type: 'general',
          ecosystemHealth: Math.round(overallHealth),
          co2Level: params.co2,
          forestHealth: params.forest,
          biodiversityLevel: params.biodiversity,
          points: 10
        });
        console.log('✅ EcoSonification activity logged successfully');
      } catch (error) {
        console.warn('Failed to log EcoSonification activity:', error);
      }
    }
  };
  
  const handleSliderChange = (param, value) => {
    setParams(prev => ({ ...prev, [param]: value }));
    setNarrative("You are now composing your own planetary soundscape.");
  };

  const handlePresetClick = (presetKey) => {
    setParams(PRESETS[presetKey]);
    setNarrative(PRESETS[presetKey].text);
  };
  
  const handleSyncReality = () => {
    setIsSyncing(true);
    setNarrative("Connecting to global sensors... fetching live planetary data...");
    setTimeout(() => {
      const liveCO2 = 422 + Math.random() * 5;
      setParams(prev => ({ ...prev, co2: liveCO2 }));
      setNarrative(`Sync complete. The current live CO₂ level is approximately ${Math.round(liveCO2)}ppm.`);
      setIsSyncing(false);
    }, 2000);
  };
  
  return (
    <div className="container">
      <AnimationStyles />
      
      {/* Main Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🎵 EcoSonification
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          Feel the Story of Our Planet Through Sound
        </p>
      </div>

      {/* Problem Card */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
        border: '2px solid #f44336'
      }}>
        <h3 style={{ color: '#d32f2f', marginBottom: '15px' }}>🚨 The Silence of the Data</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          We're surrounded by numbers, but they're abstract and fail to connect emotionally. It's hard to feel the urgency in a bar chart.
        </p>
      </div>
      
      {/* Solution Card */}
      <div className="card" style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
        border: '2px solid #4CAF50'
      }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '15px' }}>💡 Giving the Planet a Voice</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          EcoSonification translates data into sound. A healthy planet sounds harmonious. A planet in distress sounds dissonant. You can finally feel the data.
        </p>
      </div>

      {/* The Planetary Instrument Card */}
      <div className="card" style={{ marginBottom: '30px', border: '2px solid #9C27B0' }}>
        <h3 style={{ color: '#9C27B0', marginBottom: '20px' }}>🎛️ The Planetary Instrument</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', alignItems: 'center' }}>
          <div>
            <PlanetaryAura health={overallHealth} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666' }}>
              The sound and color represent the ecosystem you are composing. A vibrant green is balanced; a chaotic red is under stress.
            </p>
            <button
              onClick={handlePlayToggle}
              style={{
                fontSize: '1.2rem',
                padding: '15px 30px',
                background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
                border: 'none',
                borderRadius: '25px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                alignSelf: 'flex-start'
              }}
            >
              {isPlaying ? '⏹️ PAUSE SOUNDSCAPE' : '▶️ PLAY SOUNDSCAPE'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Compose Your Soundscape Card */}
      <div className="card" style={{ marginBottom: '30px', border: '2px solid #2196F3' }}>
        <h3 style={{ color: '#1976d2', marginBottom: '20px' }}>Compose Your Soundscape</h3>

        {/* Section 1: Auditory Snapshots */}
        <div style={{ marginBottom: '30px' }}>
            <h4 style={{ color: '#1976d2', marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>⏳ Auditory Snapshots in Time</h4>
            <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '15px' }}>{narrative}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {Object.keys(PRESETS).map(key => (
                <button key={key} onClick={() => handlePresetClick(key)} style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '16px', background: 'white', cursor: 'pointer' }}>
                  {PRESETS[key].text.split(': ')[1] || PRESETS[key].text}
                </button>
              ))}
              <button onClick={handleSyncReality} disabled={isSyncing} style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '16px', background: 'white', cursor: 'pointer', fontWeight: 'bold', color: '#2E7D32' }}>
                {isSyncing ? 'Syncing...' : '📡 Hear the Planet Now'}
              </button>
            </div>
        </div>

        {/* Section 2: Instrument Controls */}
        <div>
            <h4 style={{ color: '#1976d2', marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>⚙️ Instrument Controls</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <ControlSlider icon="🌳" label="Forest Cover" value={params.forest} unit="%" onChange={(v) => handleSliderChange('forest', v)} min={0} max={100} />
              <ControlSlider icon="🐦" label="Biodiversity" value={params.biodiversity} unit="%" onChange={(v) => handleSliderChange('biodiversity', v)} min={0} max={100} />
              <ControlSlider icon="💧" label="Water Health" value={params.water} unit="%" onChange={(v) => handleSliderChange('water', v)} min={0} max={100} />
              <ControlSlider icon="🏭" label="CO₂ Concentration" value={params.co2} unit=" ppm" onChange={(v) => handleSliderChange('co2', v)} min={280} max={500} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default EcoSonification;