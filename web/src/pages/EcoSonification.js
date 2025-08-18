import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import FileUpload from '../components/ui/FileUpload';
import FeatureHeader from '../components/ui/FeatureHeader';
import Chart from '../components/ui/Chart';

const EcoSonification = () => {
  const [audioData, setAudioData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [environmentalData, setEnvironmentalData] = useState({
    biodiversity: 85,
    waterQuality: 72,
    airQuality: 68,
    soilHealth: 79,
    carbonLevel: 45
  });

  const generateEcoMusic = (data) => {
    // Simulate converting environmental data to musical parameters
    const musicParams = {
      tempo: Math.max(60, Math.min(120, data.biodiversity + 20)),
      harmony: data.waterQuality > 70 ? 'major' : 'minor',
      volume: data.airQuality / 100,
      complexity: data.soilHealth / 10,
      bassline: data.carbonLevel < 50 ? 'stable' : 'unstable'
    };

    return {
      ...musicParams,
      description: `Generated eco-music: ${musicParams.tempo}bpm, ${musicParams.harmony} key, representing current ecosystem health`
    };
  };

  const playEcoMusic = () => {
    const musicTrack = generateEcoMusic(environmentalData);
    setCurrentTrack(musicTrack);
    setIsPlaying(true);
    
    // Simulate playing for 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const handleDataUpload = (file) => {
    // Simulate processing environmental data file
    const mockData = {
      biodiversity: Math.floor(Math.random() * 40) + 60,
      waterQuality: Math.floor(Math.random() * 40) + 50,
      airQuality: Math.floor(Math.random() * 50) + 40,
      soilHealth: Math.floor(Math.random() * 30) + 70,
      carbonLevel: Math.floor(Math.random() * 60) + 20
    };
    
    setEnvironmentalData(mockData);
    setAudioData(file);
  };

  const chartData = [
    { name: 'Biodiversity', value: environmentalData.biodiversity, color: '#10B981' },
    { name: 'Water Quality', value: environmentalData.waterQuality, color: '#3B82F6' },
    { name: 'Air Quality', value: environmentalData.airQuality, color: '#8B5CF6' },
    { name: 'Soil Health', value: environmentalData.soilHealth, color: '#F59E0B' },
    { name: 'Carbon Level', value: 100 - environmentalData.carbonLevel, color: '#EF4444' }
  ];

  return (
    <div className="eco-sonification">
      <FeatureHeader
        title="🎵 EcoSonification"
        subtitle="Environmental Data Through Sound"
        description="Transform environmental data into beautiful, meaningful music that reflects ecosystem health"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-semibold mb-4">Environmental Data Input</h3>
          <FileUpload
            onFileSelect={handleDataUpload}
            acceptedTypes=".csv,.json,.xml"
            label="Upload Environmental Dataset"
          />
          
          {audioData && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">
                ✅ Data loaded: {audioData.name}
              </p>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-4">Current Ecosystem Health</h3>
          <Chart data={chartData} type="bar" />
        </Card>
      </div>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Generated Eco-Music</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Musical Parameters</h4>
            {currentTrack ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tempo:</span>
                  <span className="font-medium">{currentTrack.tempo} BPM</span>
                </div>
                <div className="flex justify-between">
                  <span>Key:</span>
                  <span className="font-medium">{currentTrack.harmony}</span>
                </div>
                <div className="flex justify-between">
                  <span>Volume:</span>
                  <span className="font-medium">{Math.round(currentTrack.volume * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Complexity:</span>
                  <span className="font-medium">{currentTrack.complexity.toFixed(1)}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Bassline:</span>
                  <span className="font-medium">{currentTrack.bassline}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Generate music to see parameters</p>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-3">Music Controls</h4>
            <div className="space-y-3">
              <Button 
                onClick={playEcoMusic}
                disabled={isPlaying}
                className="w-full"
              >
                {isPlaying ? '🎵 Playing...' : '🎵 Generate & Play Eco-Music'}
              </Button>
              
              {currentTrack && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    {currentTrack.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium mb-2">Data Analysis</h4>
            <p className="text-sm text-gray-600">
              Environmental metrics are analyzed and normalized
            </p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">🎼</div>
            <h4 className="font-medium mb-2">Musical Mapping</h4>
            <p className="text-sm text-gray-600">
              Data values are mapped to musical parameters
            </p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">🎵</div>
            <h4 className="font-medium mb-2">Sound Generation</h4>
            <p className="text-sm text-gray-600">
              AI generates harmonious or dissonant music based on ecosystem health
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EcoSonification;