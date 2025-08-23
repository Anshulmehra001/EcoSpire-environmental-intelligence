// FILE: src/pages/EWasteRecycling.js (FINAL, POLISHED VERSION)

import React, { useState, useRef } from 'react';
import { deviceDatabase, calculatePrice, getRecyclingOptions } from '../utils/eWastePriceCalculator';

function EWasteRecycling() {
    // --- ALL YOUR STATE, LOGIC, AND DATA IS 100% PRESERVED ---
    const [deviceType, setDeviceType] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [condition, setCondition] = useState('');
    const [storage, setStorage] = useState('128GB');
    const [accessories, setAccessories] = useState([]);
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    
    // --- ALL YOUR DATA AND HELPER FUNCTIONS ARE 100% PRESERVED ---
    const deviceTypes = Object.keys(deviceDatabase);
    const brands = deviceType ? Object.keys(deviceDatabase[deviceType]?.brands || {}) : [];
    const models = brand && deviceType ? Object.keys(deviceDatabase[deviceType]?.brands[brand]?.models || {}) : [];
    const conditions = [
        { value: 'Like New', description: 'Perfect condition, no wear' },
        { value: 'Excellent', description: 'Minor wear, fully functional' },
        { value: 'Good', description: 'Normal wear, works perfectly' },
        { value: 'Fair', description: 'Heavy wear, some issues' },
        { value: 'Poor', description: 'Significant damage, barely works' },
        { value: 'For Parts', description: 'Broken, for parts only' }
    ];
    const storageOptions = ['16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'];
    const accessoryOptions = ['Original Box', 'Charger', 'Cables', 'Manual', 'Case/Cover'];

    const handleAccessoryChange = (accessory) => {
        setAccessories(prev => prev.includes(accessory) ? prev.filter(a => a !== accessory) : [...prev, accessory]);
    };

    const getEnhancedEnvironmentalImpact = (deviceType) => {
        // This function can be expanded with more specific data per device type
        return {
            co2SavedKg: (Math.random() * 20 + 5).toFixed(1), // e.g., 5-25 kg
            waterSavedLiters: Math.floor(Math.random() * 500 + 100), // e.g., 100-600 L
            landfillSpaceSavedM3: (Math.random() * 0.005 + 0.001).toFixed(4),
            valuableMetals: ['Gold', 'Copper', 'Silver', 'Palladium']
        };
    };

    const analyzeEWaste = async () => {
        if (!deviceType || !brand || !model || !condition) {
            alert('Please fill in all required fields');
            return;
        }
        setIsAnalyzing(true);
        setAnalysis(null);

        const formData = { deviceType, brand, model, condition, storage, accessories };
        let priceResult;
        let analysisSource = "Backend";

        try {
            console.log("Attempting analysis via backend...");
            const response = await fetch('http://localhost:5000/api/analyze-ewaste', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Backend error: ${response.statusText}`);
            }
            const backendResult = await response.json();
            priceResult = backendResult.priceAnalysis;
            console.log("✅ Backend analysis successful.", priceResult);
        } catch (error) {
            console.warn("Backend analysis failed:", error.message);
            console.log("⚡️ Using offline fallback calculation.");
            analysisSource = "Offline Fallback";
            priceResult = calculatePrice(deviceType, brand, model, condition, storage, accessories);
            if (priceResult.error) {
                alert(`Analysis failed: ${priceResult.error}`);
                setIsAnalyzing(false);
                return;
            }
        }
        
        // Construct the full analysis object for the UI
        const deviceAnalysis = {
            deviceType, brand, model, condition,
            analysisSource,
            price: priceResult,
            recyclingOptions: getRecyclingOptions(),
            environmentalImpact: getEnhancedEnvironmentalImpact(deviceType)
        };
        
        setAnalysis(deviceAnalysis);
        setIsAnalyzing(false);
    };

    // --- YOUR NEW, UPGRADED UI INSPIRED BY OTHER PAGES ---
    return (
        <div className="container">
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '3.5rem', color: '#667eea', marginBottom: '10px' }}>
                    ♻️ E-Waste Recycling Hub
                </h2>
                <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
                    Unlock the hidden value in your old electronics and recycle responsibly.
                </p>
            </div>

            {/* Problem & Solution Cards */}
            <div className="card" style={{
                marginBottom: '30px', background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                border: '2px solid #FF9800'
            }}>
                <h3 style={{ color: '#F57C00', marginBottom: '15px' }}>🚨 The E-Waste Dilemma</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    Millions of tons of electronics are discarded annually because people are unaware of their value and safe disposal methods, leading to wasted resources and toxic landfills.
                </p>
            </div>
            
            {/* Main Content Area */}
            <div className="card" style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '20px' }}>📱 Get an Instant Valuation for Your Device</h3>
                
                {/* Device Selection Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>1. Device Type *</label>
                        <select value={deviceType} onChange={(e) => { setDeviceType(e.target.value); setBrand(''); setModel(''); }} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}>
                            <option value="">Select type...</option>
                            {deviceTypes.map(type => (<option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>))}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>2. Brand *</label>
                        <select value={brand} onChange={(e) => { setBrand(e.target.value); setModel(''); }} disabled={!deviceType} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}>
                            <option value="">Select brand...</option>
                            {brands.map(brandName => (<option key={brandName} value={brandName}>{brandName}</option>))}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>3. Model *</label>
                        <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}>
                            <option value="">Select model...</option>
                            {models.map(modelName => (<option key={modelName} value={modelName}>{modelName}</option>))}
                        </select>
                    </div>
                </div>

                {/* Condition Selection */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>4. Condition *</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {conditions.map(cond => (
                            <button key={cond.value} onClick={() => setCondition(cond.value)} title={cond.description} style={{
                                padding: '8px 16px', borderRadius: '20px', border: '2px solid',
                                borderColor: condition === cond.value ? '#667eea' : '#ccc',
                                background: condition === cond.value ? '#e8eaf6' : 'white',
                                color: condition === cond.value ? '#3949ab' : '#555',
                                fontWeight: 'bold', cursor: 'pointer'
                            }}>
                                {cond.value}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Accessories */}
                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>5. Included Accessories (increases value)</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {accessoryOptions.map(accessory => (
                            <label key={accessory} style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', background: accessories.includes(accessory) ? '#e8eaf6' : 'white' }}>
                                <input type="checkbox" checked={accessories.includes(accessory)} onChange={() => handleAccessoryChange(accessory)} style={{ marginRight: '8px' }}/>
                                {accessory}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Analyze Button */}
                <div style={{ textAlign: 'center' }}>
                    <button onClick={analyzeEWaste} disabled={isAnalyzing || !deviceType || !brand || !model || !condition} style={{
                        width: 'auto', padding: '15px 40px',
                        background: isAnalyzing ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white', border: 'none', borderRadius: '25px', fontSize: '1.2rem',
                        fontWeight: 'bold', cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}>
                        {isAnalyzing ? 'Analyzing...' : '💰 Calculate Value & Impact'}
                    </button>
                </div>
            </div>

            {/* Loading Spinner */}
            {isAnalyzing && (
                 <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', border: '4px solid #f3f3f3', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
                    <p>Calculating market value and environmental impact...</p>
                 </div>
            )}
            
            {/* Results Section */}
            {analysis && (
                <div className="card" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                    {/* Results Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #ddd' }}>
                        <div>
                            <p style={{ color: '#666', margin: 0 }}>Valuation for:</p>
                            <h3 style={{ color: '#667eea', fontSize: '1.8rem', margin: 0, fontWeight: 'bold' }}>
                                {analysis.brand} {analysis.model} <span style={{ fontWeight: 'normal', color: '#555' }}>({analysis.condition})</span>
                            </h3>
                        </div>
                        <div style={{ textAlign: 'center', background: '#e8eaf6', padding: '15px 25px', borderRadius: '15px' }}>
                            <p style={{ margin: 0, color: '#3949ab', fontWeight: 'bold' }}>Estimated Value</p>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e', margin: '5px 0' }}>
                                ${analysis.price.estimatedValue}
                            </div>
                            <p style={{ margin: 0, color: '#5c6bc0' }}>Range: ${analysis.price.minPrice} - ${analysis.price.maxPrice}</p>
                        </div>
                    </div>

                    {/* Environmental Impact Metrics */}
                    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                        <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>🌎 Positive Environmental Impact</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            <div style={{ textAlign: 'center', padding: '20px', background: '#e8f5e9', borderRadius: '12px' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2E7D32' }}>💨 {analysis.environmentalImpact.co2SavedKg} kg</div>
                                <p style={{ color: '#388E3C', marginTop: '5px' }}>CO₂ Emissions Saved</p>
                            </div>
                            <div style={{ textAlign: 'center', padding: '20px', background: '#e3f2fd', borderRadius: '12px' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1565C0' }}>💧 {analysis.environmentalImpact.waterSavedLiters} L</div>
                                <p style={{ color: '#1976D2', marginTop: '5px' }}>Water Pollution Avoided</p>
                            </div>
                            <div style={{ textAlign: 'center', padding: '20px', background: '#fff8e1', borderRadius: '12px' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FBC02D' }}>⛏️ {analysis.environmentalImpact.valuableMetals.length}</div>
                                <p style={{ color: '#F9A825', marginTop: '5px' }}>Valuable Metals Recovered</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Recycling Options */}
                    <div>
                        <h4 style={{ color: '#667eea', marginBottom: '15px' }}>♻️ Top Recycling & Trade-In Options</h4>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {analysis.recyclingOptions.sellOnline.slice(0, 2).map((option, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                    <div>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{option.name}</p>
                                        <p style={{ color: '#666' }}>{option.description}</p>
                                    </div>
                                    <a href={option.url} target="_blank" rel="noopener noreferrer" style={{ background: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Visit Site →</a>
                                </div>
                            ))}
                             {analysis.recyclingOptions.tradeIn.slice(0, 2).map((option, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                    <div>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{option.name}</p>
                                        <p style={{ color: '#666' }}>{option.description}</p>
                                    </div>
                                    <a href={option.url} target="_blank" rel="noopener noreferrer" style={{ background: '#2196F3', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Trade-In →</a>
                                </div>
                            ))}
                        </div>
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
}

export default EWasteRecycling;