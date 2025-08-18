import React, { useState } from 'react';
import { testStripGenerator } from '../../utils/testStripGenerator';

const TestStripTester = ({ onTestResult }) => {
  const [selectedScenario, setSelectedScenario] = useState('excellent_water');
  const [testOptions, setTestOptions] = useState({
    lighting: 'normal',
    background: 'white',
    addImperfections: true,
    imperfectionLevel: 'medium',
    addLabels: false
  });
  const [generatedTest, setGeneratedTest] = useState(null);
  const [testResults, setTestResults] = useState([]);

  // Safely get scenarios with fallback
  const scenarios = testStripGenerator?.getAvailableScenarios?.() || [
    { name: 'excellent_water', description: 'Excellent quality drinking water' },
    { name: 'good_water', description: 'Good quality water with minor issues' },
    { name: 'poor_water', description: 'Poor quality water needing treatment' },
    { name: 'contaminated_water', description: 'Contaminated water - unsafe for consumption' }
  ];

  const generateTestImage = () => {
    try {
      if (!testStripGenerator?.generateFromScenario) {
        console.error('Test strip generator not available');
        return;
      }
      
      const testStrip = testStripGenerator.generateFromScenario(selectedScenario, testOptions);
      setGeneratedTest(testStrip);
      
      if (onTestResult) {
        onTestResult(testStrip);
      }
    } catch (error) {
      console.error('Failed to generate test strip:', error);
      alert('Failed to generate test strip. Please try again.');
    }
  };

  const generateFullTestSuite = () => {
    try {
      if (!testStripGenerator?.generateTestSuite) {
        console.error('Test suite generator not available');
        return;
      }
      
      const testSuite = testStripGenerator.generateTestSuite({
        scenarios: ['excellent_water', 'good_water', 'poor_water', 'contaminated_water'],
        lightingConditions: ['dim', 'normal', 'bright'],
        backgrounds: ['white', 'colored']
      });
      
      setTestResults(testSuite);
      console.log('Generated test suite with', testSuite.length, 'test images');
    } catch (error) {
      console.error('Failed to generate test suite:', error);
      alert('Failed to generate test suite. Please try again.');
    }
  };

  const downloadTestSuite = () => {
    try {
      if (testResults.length === 0) {
        generateFullTestSuite();
        return;
      }

      if (!testStripGenerator?.exportTestSuite) {
        console.error('Export function not available');
        return;
      }

      const exportData = testStripGenerator.exportTestSuite(testResults);
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `aqua-lens-test-suite-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download test suite:', error);
      alert('Failed to download test suite. Please try again.');
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      padding: '20px',
      borderRadius: '12px',
      border: '2px solid #2196F3',
      marginBottom: '20px'
    }}>
      <h3 style={{ color: '#1976D2', marginBottom: '20px' }}>
        🧪 AquaLens Accuracy Tester
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Scenario Selection */}
        <div>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Test Scenario:
          </label>
          <select
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          >
            {scenarios.map(scenario => (
              <option key={scenario.name} value={scenario.name}>
                {scenario.description}
              </option>
            ))}
          </select>
        </div>

        {/* Test Options */}
        <div>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Test Conditions:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <select
              value={testOptions.lighting}
              onChange={(e) => setTestOptions({...testOptions, lighting: e.target.value})}
              style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="dim">Dim Light</option>
              <option value="normal">Normal Light</option>
              <option value="bright">Bright Light</option>
            </select>
            
            <select
              value={testOptions.background}
              onChange={(e) => setTestOptions({...testOptions, background: e.target.value})}
              style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="white">White Background</option>
              <option value="colored">Colored Background</option>
              <option value="textured">Textured Background</option>
            </select>
          </div>
        </div>
      </div>

      {/* Options Checkboxes */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={testOptions.addImperfections}
            onChange={(e) => setTestOptions({...testOptions, addImperfections: e.target.checked})}
            style={{ marginRight: '8px' }}
          />
          Add realistic imperfections
        </label>
        
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={testOptions.addLabels}
            onChange={(e) => setTestOptions({...testOptions, addLabels: e.target.checked})}
            style={{ marginRight: '8px' }}
          />
          Add parameter labels
        </label>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={generateTestImage}
          style={{
            padding: '10px 20px',
            background: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🎯 Generate Test Strip
        </button>
        
        <button
          onClick={generateFullTestSuite}
          style={{
            padding: '10px 20px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          📊 Generate Test Suite ({testResults.length} tests)
        </button>
        
        <button
          onClick={downloadTestSuite}
          style={{
            padding: '10px 20px',
            background: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          💾 Download Test Data
        </button>
      </div>

      {/* Generated Test Display */}
      {generatedTest && (
        <div style={{
          background: 'white',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h4 style={{ marginBottom: '15px', color: '#1976D2' }}>Generated Test Strip</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <img
                src={generatedTest.dataURL}
                alt="Generated test strip"
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  border: '2px solid #ddd',
                  borderRadius: '8px'
                }}
              />
            </div>
            
            <div>
              <h5 style={{ marginBottom: '10px' }}>Expected Results:</h5>
              <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                <div><strong>pH:</strong> {generatedTest.expectedResults.ph}</div>
                <div><strong>Chlorine:</strong> {generatedTest.expectedResults.chlorine} ppm</div>
                <div><strong>Nitrates:</strong> {generatedTest.expectedResults.nitrates} ppm</div>
                <div><strong>Hardness:</strong> {generatedTest.expectedResults.hardness} ppm</div>
                <div><strong>Alkalinity:</strong> {generatedTest.expectedResults.alkalinity} ppm</div>
                <div><strong>Bacteria:</strong> {generatedTest.expectedResults.bacteria ? 'Present' : 'Safe'}</div>
                <div style={{ marginTop: '10px' }}>
                  <strong>Overall Quality:</strong> 
                  <span style={{ 
                    color: generatedTest.expectedResults.overallQuality === 'Excellent' ? '#4CAF50' : 
                           generatedTest.expectedResults.overallQuality === 'Good' ? '#8BC34A' :
                           generatedTest.expectedResults.overallQuality === 'Fair' ? '#FF9800' : '#f44336',
                    fontWeight: 'bold',
                    marginLeft: '5px'
                  }}>
                    {generatedTest.expectedResults.overallQuality}
                  </span>
                </div>
                <div>
                  <strong>Safety Level:</strong>
                  <span style={{ 
                    color: generatedTest.expectedResults.safetyLevel === 'Safe' ? '#4CAF50' : 
                           generatedTest.expectedResults.safetyLevel === 'Caution' ? '#FF9800' : '#f44336',
                    fontWeight: 'bold',
                    marginLeft: '5px'
                  }}>
                    {generatedTest.expectedResults.safetyLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Suite Summary */}
      {testResults.length > 0 && (
        <div style={{
          background: 'white',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          marginTop: '15px'
        }}>
          <h4 style={{ marginBottom: '10px', color: '#1976D2' }}>Test Suite Generated</h4>
          <p style={{ marginBottom: '10px' }}>
            Generated {testResults.length} test images covering various scenarios and conditions.
          </p>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            <div>• Multiple lighting conditions (dim, normal, bright)</div>
            <div>• Different backgrounds (white, colored, textured)</div>
            <div>• Various water quality scenarios</div>
            <div>• Realistic imperfections and variations</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestStripTester;