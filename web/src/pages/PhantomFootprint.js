import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import FeatureHeader from '../components/ui/FeatureHeader';
import ImpactMetrics from '../components/ui/ImpactMetrics';

const PhantomFootprint = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [browserExtensionInstalled, setBrowserExtensionInstalled] = useState(false);

  const analyzeURL = async () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const mockAnalysis = {
        product: extractProductName(url),
        hiddenImpacts: {
          returnRate: Math.floor(Math.random() * 30) + 10,
          packagingWaste: Math.floor(Math.random() * 500) + 100,
          carbonFootprint: Math.floor(Math.random() * 50) + 20,
          waterUsage: Math.floor(Math.random() * 1000) + 200
        },
        recommendations: [
          'Consider buying from local retailers to reduce shipping emissions',
          'Check return policy - high return rates indicate sizing issues',
          'Look for minimal packaging options',
          'Consider product longevity and repairability'
        ],
        impactScore: Math.floor(Math.random() * 40) + 30
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const extractProductName = (url) => {
    const products = [
      'Wireless Headphones',
      'Smartphone Case',
      'Running Shoes',
      'Laptop Backpack',
      'Coffee Maker',
      'Desk Lamp',
      'Bluetooth Speaker',
      'Fitness Tracker'
    ];
    return products[Math.floor(Math.random() * products.length)];
  };

  const installExtension = () => {
    // Simulate extension installation
    setBrowserExtensionInstalled(true);
    alert('Browser extension installed! (Simulated for demo)');
  };

  const impactData = analysis ? [
    {
      label: 'Return Rate Impact',
      value: `${analysis.hiddenImpacts.returnRate}%`,
      description: 'Products returned due to sizing/quality issues',
      color: 'red'
    },
    {
      label: 'Packaging Waste',
      value: `${analysis.hiddenImpacts.packagingWaste}g`,
      description: 'Estimated packaging materials per item',
      color: 'orange'
    },
    {
      label: 'Carbon Footprint',
      value: `${analysis.hiddenImpacts.carbonFootprint}kg CO₂`,
      description: 'Total carbon emissions including returns',
      color: 'gray'
    },
    {
      label: 'Water Usage',
      value: `${analysis.hiddenImpacts.waterUsage}L`,
      description: 'Water used in production and logistics',
      color: 'blue'
    }
  ] : [];

  return (
    <div className="phantom-footprint">
      <FeatureHeader
        title="👻 Phantom Footprint"
        subtitle="Hidden Impact Tracker"
        description="Reveal the hidden environmental costs of online shopping and returns"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-xl font-semibold mb-4">Analyze Product URL</h3>
            
            <div className="space-y-4">
              <Input
                type="url"
                placeholder="Paste product URL (e.g., amazon.com/product/...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              
              <Button 
                onClick={analyzeURL}
                disabled={isAnalyzing || !url}
                className="w-full"
              >
                {isAnalyzing ? 'Analyzing Hidden Impacts...' : 'Reveal Hidden Footprint'}
              </Button>
            </div>

            {analysis && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium">Analysis: {analysis.product}</h4>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    analysis.impactScore > 70 ? 'bg-red-100 text-red-800' :
                    analysis.impactScore > 50 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    Impact Score: {analysis.impactScore}/100
                  </div>
                </div>

                <ImpactMetrics metrics={impactData} />

                <div className="mt-6">
                  <h5 className="font-medium mb-3">💡 Recommendations</h5>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="text-xl font-semibold mb-4">Browser Extension</h3>
            
            {!browserExtensionInstalled ? (
              <div className="text-center">
                <div className="text-4xl mb-4">🔌</div>
                <p className="text-sm text-gray-600 mb-4">
                  Install our browser extension for real-time impact notifications while shopping
                </p>
                <Button onClick={installExtension} className="w-full">
                  Install Extension
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-sm text-green-600 mb-4">
                  Extension installed! You'll now see environmental impact warnings while shopping online.
                </p>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-700">
                    Demo: Extension will show popup warnings for high-impact products
                  </p>
                </div>
              </div>
            )}
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-3">Hidden Impact Categories</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-red-500">📦</span>
                <div>
                  <p className="font-medium text-sm">Return Shipping</p>
                  <p className="text-xs text-gray-600">Double carbon footprint from returns</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-orange-500">🗑️</span>
                <div>
                  <p className="font-medium text-sm">Packaging Waste</p>
                  <p className="text-xs text-gray-600">Excessive packaging materials</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-blue-500">💧</span>
                <div>
                  <p className="font-medium text-sm">Water Footprint</p>
                  <p className="text-xs text-gray-600">Hidden water usage in production</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-gray-500">⚡</span>
                <div>
                  <p className="font-medium text-sm">Energy Consumption</p>
                  <p className="text-xs text-gray-600">Manufacturing and logistics energy</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <h3 className="text-xl font-semibold mb-4">How Phantom Footprint Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">🔍</div>
            <h4 className="font-medium mb-2">URL Analysis</h4>
            <p className="text-sm text-gray-600">
              Analyze product pages for hidden impact indicators
            </p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium mb-2">Impact Calculation</h4>
            <p className="text-sm text-gray-600">
              Calculate return rates, packaging, and carbon footprint
            </p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">⚠️</div>
            <h4 className="font-medium mb-2">Real-time Alerts</h4>
            <p className="text-sm text-gray-600">
              Browser extension shows impact warnings
            </p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-2">💡</div>
            <h4 className="font-medium mb-2">Recommendations</h4>
            <p className="text-sm text-gray-600">
              Suggest eco-friendly alternatives and practices
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PhantomFootprint;