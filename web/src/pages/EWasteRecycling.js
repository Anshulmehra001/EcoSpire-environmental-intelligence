import React, { useState, useRef } from 'react';
import { detectDevice, getDeviceInfo } from '../utils/deviceDatabase';
import { deviceDatabase, calculatePrice, getRecyclingOptions } from '../utils/eWastePriceCalculator';

function EWasteRecycling() {
    const [deviceType, setDeviceType] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [condition, setCondition] = useState('');
    const [storage, setStorage] = useState('128GB');
    const [accessories, setAccessories] = useState([]);
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const fileInputRef = useRef(null);

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

    // Enhanced analysis helper functions
    const analyzeMaterialComposition = async (deviceType) => {
        const compositions = {
            'Laptop': {
                metals: { gold: 0.034, silver: 0.3, copper: 7.2, aluminum: 14.2, steel: 23.5 },
                plastics: 23.8,
                glass: 4.2,
                rareEarths: 0.8,
                other: 26.134
            },
            'Smartphone': {
                metals: { gold: 0.024, silver: 0.25, copper: 15.8, aluminum: 8.5, steel: 12.3 },
                plastics: 35.2,
                glass: 18.7,
                rareEarths: 1.2,
                other: 8.006
            },
            'Tablet': {
                metals: { gold: 0.028, silver: 0.28, copper: 12.4, aluminum: 18.6, steel: 8.2 },
                plastics: 28.5,
                glass: 22.8,
                rareEarths: 1.0,
                other: 8.112
            },
            'Mixed': {
                metals: { gold: 0.029, silver: 0.27, copper: 11.8, aluminum: 13.8, steel: 14.7 },
                plastics: 29.2,
                glass: 15.2,
                rareEarths: 1.0,
                other: 13.931
            }
        };
        
        return compositions[deviceType] || compositions['Mixed'];
    };

    const calculateRecyclingPotential = (analysis) => {
        const baseScores = {
            'Laptop': { reuse: 70, recycle: 90, refurbish: 75 },
            'Smartphone': { reuse: 80, recycle: 85, refurbish: 85 },
            'Tablet': { reuse: 75, recycle: 88, refurbish: 80 },
            'Mixed': { reuse: 75, recycle: 85, refurbish: 70 }
        };
        
        const scores = baseScores[analysis.deviceType] || baseScores['Mixed'];
        const conditionMultiplier = analysis.confidence > 80 ? 1.1 : analysis.confidence > 60 ? 1.0 : 0.9;
        
        return {
            reuseScore: Math.round(scores.reuse * conditionMultiplier),
            recycleScore: Math.round(scores.recycle * conditionMultiplier),
            refurbishScore: Math.round(scores.refurbish * conditionMultiplier),
            totalScore: Math.round(((scores.reuse + scores.recycle + scores.refurbish) / 3) * conditionMultiplier)
        };
    };

    const calculateCarbonFootprint = (analysis) => {
        const footprints = {
            'Laptop': { manufacturing: 3.2, recycling: -1.1 },
            'Smartphone': { manufacturing: 0.8, recycling: -0.3 },
            'Tablet': { manufacturing: 1.5, recycling: -0.5 },
            'Mixed': { manufacturing: 2.5, recycling: -0.8 }
        };
        
        const footprint = footprints[analysis.deviceType] || footprints['Mixed'];
        const netImpact = footprint.manufacturing + footprint.recycling;
        
        return {
            manufacturing: `${footprint.manufacturing} tons CO2`,
            recycling: `${footprint.recycling} tons CO2`,
            netImpact: `${Math.abs(netImpact)} tons CO2 ${netImpact < 0 ? 'saved' : 'impact'} through proper recycling`
        };
    };

    const calculateSustainabilityScore = (analysis) => {
        let score = 50; // Base score
        
        // Boost for high recycling potential
        if (analysis.recyclingPotential?.totalScore > 80) score += 20;
        else if (analysis.recyclingPotential?.totalScore > 60) score += 10;
        
        // Boost for high confidence detection
        if (analysis.confidence > 80) score += 15;
        else if (analysis.confidence > 60) score += 10;
        
        // Boost for valuable materials
        if (analysis.materialComposition?.metals?.gold > 0.03) score += 10;
        if (analysis.materialComposition?.metals?.silver > 0.25) score += 5;
        
        return Math.min(100, Math.max(0, score));
    };

    const getEnhancedEnvironmentalImpact = (deviceType) => {
        return {
            positiveImpacts: [
                'Prevents toxic materials from entering landfills',
                'Recovers valuable metals reducing mining needs',
                'Reduces electronic waste accumulation',
                'Supports circular economy principles'
            ],
            materialRecovery: '85-95%',
            materialRecoveryDetails: {
                metals: '85-95% recovery rate',
                plastics: '70-80% recovery rate',
                glass: '90-95% recovery rate',
                rareEarths: '60-70% recovery rate'
            },
            energySavings: 'Up to 95% less energy than mining new materials',
            co2Saved: '2.5 tons',
            energySaved: '15 MWh',
            waterSaved: '5,000L'
        };
    };

    const getAdvancedRecyclingTips = (deviceType) => {
        return [
            '🔒 Perform complete data wipe using manufacturer tools',
            '🔋 Remove batteries separately for specialized recycling',
            '📱 Keep original accessories to increase resale value',
            '🏭 Use certified e-waste recyclers (R2 or e-Stewards)',
            '💰 Consider trade-in programs for newer devices',
            '🌱 Donate functional devices to extend their lifecycle',
            '📋 Get certificate of data destruction for business devices'
        ];
    };

    const getComprehensiveDataWipeInstructions = () => {
        return {
            smartphones: [
                'Factory reset through Settings > System > Reset',
                'Remove SIM card and SD card',
                'Sign out of all accounts (Google, Apple, etc.)',
                'Use manufacturer data wipe tools if available'
            ],
            computers: [
                'Use DBAN (Darik\'s Boot and Nuke) for secure wipe',
                'Remove hard drives for separate destruction',
                'Clear BIOS/UEFI settings',
                'Physically destroy drives containing sensitive data'
            ],
            tablets: [
                'Factory reset through device settings',
                'Sign out of all cloud accounts',
                'Remove external storage',
                'Use encryption before wiping for extra security'
            ]
        };
    };

    const getRealSellingOptions = () => {
        const recyclingOptions = getRecyclingOptions();
        return [
            ...recyclingOptions.sellOnline.map(option => ({
                name: option.name,
                type: 'Online Marketplace',
                description: option.description,
                estimatedValue: 'Market Rate',
                processingTime: option.paymentTime,
                pros: ['Wide reach', 'Competitive prices'],
                cons: ['Shipping required', 'Processing fees'],
                website: option.url
            })),
            ...recyclingOptions.tradeIn.map(option => ({
                name: option.name,
                type: 'Trade-In Program',
                description: option.description,
                estimatedValue: 'Credit/Gift Card',
                processingTime: '1-2 weeks',
                pros: ['Convenient', 'Guaranteed acceptance'],
                cons: ['Lower value', 'Store credit only'],
                website: option.url
            }))
        ];
    };

    const handleAccessoryChange = (accessory) => {
        setAccessories(prev => 
            prev.includes(accessory) 
                ? prev.filter(a => a !== accessory)
                : [...prev, accessory]
        );
    };

    // Manual device analysis using form data
    const analyzeEWaste = async () => {
        if (!deviceType || !brand || !model || !condition) {
            alert('Please fill in all required fields');
            return;
        }

        setIsAnalyzing(true);

        try {
            // Calculate price using the price calculator
            const priceResult = calculatePrice(deviceType, brand, model, condition, storage, accessories);
            
            if (priceResult.error) {
                throw new Error(priceResult.error);
            }

            // Build comprehensive analysis from manual input
            const deviceAnalysis = {
                deviceType: deviceType.charAt(0).toUpperCase() + deviceType.slice(1, -1), // Remove 's' and capitalize (fixed spelling)
                brand: brand,
                model: model,
                confidence: 95, // High confidence since manually selected
                isHighConfidence: true,
                classificationMethod: 'Manual Selection',
                overallCondition: `${condition} - User specified condition`,
                
                // Price information
                totalRecycleValue: `$${priceResult.minPrice}-${priceResult.maxPrice}`,
                recycleValue: `$${priceResult.estimatedValue} (estimated)`,
                condition: condition,
                
                // Enhanced analysis
                materialComposition: await analyzeMaterialComposition(deviceType.charAt(0).toUpperCase() + deviceType.slice(0, -1)),
                recyclingPotential: calculateRecyclingPotential({ deviceType: deviceType.charAt(0).toUpperCase() + deviceType.slice(0, -1), confidence: 95 }),
                carbonFootprint: calculateCarbonFootprint({ deviceType: deviceType.charAt(0).toUpperCase() + deviceType.slice(0, -1) }),
                sustainabilityScore: calculateSustainabilityScore({ 
                    recyclingPotential: { totalScore: 85 }, 
                    confidence: 95,
                    materialComposition: { metals: { gold: 0.03, silver: 0.25 } }
                }),
                
                // Additional analysis
                environmentalImpact: getEnhancedEnvironmentalImpact(deviceType.charAt(0).toUpperCase() + deviceType.slice(0, -1)),
                nearbyRecyclers: getRealSellingOptions(),
                recyclingTips: getAdvancedRecyclingTips(deviceType.charAt(0).toUpperCase() + deviceType.slice(0, -1)),
                dataWipeInstructions: getComprehensiveDataWipeInstructions(),
                
                // Metadata
                timestamp: new Date().toISOString(),
                analysisNote: `Manual device selection with high accuracy. Device: ${brand} ${model} in ${condition} condition. Estimated value: $${priceResult.estimatedValue}.`
            };
            
            setAnalysis(deviceAnalysis);
            
        } catch (error) {
            console.error('E-waste analysis failed:', error);
            
            // Fallback analysis
            const fallbackAnalysis = {
                deviceType: deviceType.charAt(0).toUpperCase() + deviceType.slice(0, -1),
                brand: brand,
                model: model,
                confidence: 75,
                isHighConfidence: true,
                classificationMethod: 'Manual Selection (Fallback)',
                overallCondition: `${condition} - User specified`,
                totalRecycleValue: '$100-400 (estimated range)',
                materialComposition: await analyzeMaterialComposition('Mixed'),
                recyclingPotential: {
                    reuseScore: 75,
                    recycleScore: 85,
                    refurbishScore: 60,
                    totalScore: 73
                },
                carbonFootprint: {
                    manufacturing: '2.5 tons CO2',
                    recycling: '-0.8 tons CO2',
                    netImpact: '1.7 tons CO2 saved through proper recycling'
                },
                sustainabilityScore: 78,
                environmentalImpact: getEnhancedEnvironmentalImpact('Mixed'),
                nearbyRecyclers: getRealSellingOptions(),
                recyclingTips: getAdvancedRecyclingTips('mixed'),
                dataWipeInstructions: getComprehensiveDataWipeInstructions(),
                analysisNote: 'Manual device selection completed. Price calculation encountered an issue, showing estimated range.',
                error: error.message
            };
            
            setAnalysis(fallbackAnalysis);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px 0'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ 
                        fontSize: '3rem', 
                        color: 'white', 
                        marginBottom: '10px',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>
                        ♻️ E-Waste Recycling
                    </h1>
                    <p style={{ 
                        fontSize: '1.2rem', 
                        color: 'rgba(255,255,255,0.9)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                    }}>
                        Electronic Waste Management
                    </p>
                </div>

                {/* Stats Cards */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '20px', 
                    marginBottom: '40px' 
                }}>
                    <div style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)',
                        borderRadius: '15px', 
                        padding: '20px', 
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <div style={{ fontSize: '2rem', color: '#4CAF50', marginBottom: '10px' }}>0</div>
                        <div style={{ color: 'white', fontSize: '0.9rem' }}>CO2 Saved (kg)</div>
                    </div>
                    <div style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)',
                        borderRadius: '15px', 
                        padding: '20px', 
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <div style={{ fontSize: '2rem', color: '#2196F3', marginBottom: '10px' }}>0</div>
                        <div style={{ color: 'white', fontSize: '0.9rem' }}>Waste Tests</div>
                    </div>
                    <div style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)',
                        borderRadius: '15px', 
                        padding: '20px', 
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <div style={{ fontSize: '2rem', color: '#FF9800', marginBottom: '10px' }}>0</div>
                        <div style={{ color: 'white', fontSize: '0.9rem' }}>Bio Score</div>
                    </div>
                    <div style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)',
                        borderRadius: '15px', 
                        padding: '20px', 
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <button style={{
                            background: '#00BCD4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 'bold'
                        }}>
                            🔄 Refresh
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: analysis ? '1fr 1fr' : '1fr', 
                    gap: '30px' 
                }}>
                    {/* Device Selection Form */}
                    <div style={{ 
                        background: 'rgba(255,255,255,0.95)', 
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px', 
                        padding: '30px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <h2 style={{ 
                            fontSize: '1.8rem', 
                            color: '#333', 
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            📱 Device Details
                        </h2>
                        
                        {/* Device Type */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px', 
                                fontWeight: 'bold', 
                                color: '#555' 
                            }}>
                                Device Type *
                            </label>
                            <select 
                                value={deviceType} 
                                onChange={(e) => {
                                    setDeviceType(e.target.value);
                                    setBrand('');
                                    setModel('');
                                }}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: '2px solid #e0e0e0',
                                    fontSize: '1rem',
                                    background: 'white'
                                }}
                            >
                                <option value="">Select device type</option>
                                {deviceTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Brand */}
                        {deviceType && (
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px', 
                                    fontWeight: 'bold', 
                                    color: '#555' 
                                }}>
                                    Brand *
                                </label>
                                <select 
                                    value={brand} 
                                    onChange={(e) => {
                                        setBrand(e.target.value);
                                        setModel('');
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        border: '2px solid #e0e0e0',
                                        fontSize: '1rem',
                                        background: 'white'
                                    }}
                                >
                                    <option value="">Select brand</option>
                                    {brands.map(brandName => (
                                        <option key={brandName} value={brandName}>
                                            {brandName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Model */}
                        {brand && (
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px', 
                                    fontWeight: 'bold', 
                                    color: '#555' 
                                }}>
                                    Model *
                                </label>
                                <select 
                                    value={model} 
                                    onChange={(e) => setModel(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        border: '2px solid #e0e0e0',
                                        fontSize: '1rem',
                                        background: 'white'
                                    }}
                                >
                                    <option value="">Select model</option>
                                    {models.map(modelName => (
                                        <option key={modelName} value={modelName}>
                                            {modelName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Condition */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px', 
                                fontWeight: 'bold', 
                                color: '#555' 
                            }}>
                                Condition *
                            </label>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                {conditions.map(cond => (
                                    <label key={cond.value} style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        padding: '10px', 
                                        border: '2px solid #e0e0e0', 
                                        borderRadius: '10px', 
                                        cursor: 'pointer',
                                        background: condition === cond.value ? '#e3f2fd' : 'white',
                                        borderColor: condition === cond.value ? '#2196F3' : '#e0e0e0'
                                    }}>
                                        <input
                                            type="radio"
                                            name="condition"
                                            value={cond.value}
                                            checked={condition === cond.value}
                                            onChange={(e) => setCondition(e.target.value)}
                                            style={{ marginRight: '10px' }}
                                        />
                                        <div>
                                            <div style={{ fontWeight: 'bold', color: '#333' }}>{cond.value}</div>
                                            <div style={{ fontSize: '0.9rem', color: '#666' }}>{cond.description}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Storage (for phones and tablets) */}
                        {(deviceType === 'smartphones' || deviceType === 'tablets') && (
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px', 
                                    fontWeight: 'bold', 
                                    color: '#555' 
                                }}>
                                    Storage Capacity
                                </label>
                                <select 
                                    value={storage} 
                                    onChange={(e) => setStorage(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        border: '2px solid #e0e0e0',
                                        fontSize: '1rem',
                                        background: 'white'
                                    }}
                                >
                                    {storageOptions.map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Accessories */}
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px', 
                                fontWeight: 'bold', 
                                color: '#555' 
                            }}>
                                Included Accessories (increases value)
                            </label>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                {accessoryOptions.map(accessory => (
                                    <label key={accessory} style={{ 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        padding: '8px',
                                        cursor: 'pointer'
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={accessories.includes(accessory)}
                                            onChange={() => handleAccessoryChange(accessory)}
                                            style={{ marginRight: '10px' }}
                                        />
                                        <span style={{ color: '#333' }}>{accessory}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Analyze Button */}
                        <button
                            onClick={analyzeEWaste}
                            disabled={isAnalyzing || !deviceType || !brand || !model || !condition}
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: isAnalyzing ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '15px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {isAnalyzing ? '🔄 Analyzing...' : '💰 Calculate Value & Find Recyclers'}
                        </button>
                    </div>

                    {/* Results Panel */}
                    {analysis && (
                        <div style={{ 
                            background: 'rgba(255,255,255,0.95)', 
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px', 
                            padding: '30px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <h2 style={{ 
                                fontSize: '1.8rem', 
                                color: '#333', 
                                marginBottom: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                🎯 Detection Results
                            </h2>

                            {/* Confidence Level */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    marginBottom: '10px'
                                }}>
                                    <span style={{ fontWeight: 'bold', color: '#333' }}>Confidence Level:</span>
                                    <span style={{ 
                                        color: analysis.confidence > 80 ? '#4CAF50' : '#FF9800',
                                        fontWeight: 'bold'
                                    }}>
                                        {analysis.confidence}%
                                    </span>
                                </div>
                                <div style={{ 
                                    width: '100%', 
                                    height: '8px', 
                                    background: '#e0e0e0', 
                                    borderRadius: '4px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{ 
                                        width: `${analysis.confidence}%`, 
                                        height: '100%', 
                                        background: analysis.confidence > 80 ? '#4CAF50' : '#FF9800',
                                        transition: 'width 0.3s ease'
                                    }}></div>
                                </div>
                            </div>

                            {/* Device Analysis */}
                            <div style={{ 
                                background: '#f8f9fa', 
                                borderRadius: '15px', 
                                padding: '20px', 
                                marginBottom: '20px' 
                            }}>
                                <h3 style={{ 
                                    fontSize: '1.3rem', 
                                    color: '#333', 
                                    marginBottom: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    📱 Device Analysis
                                </h3>
                                
                                <div style={{ display: 'grid', gap: '15px' }}>
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        padding: '15px', 
                                        background: 'white', 
                                        borderRadius: '10px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                    }}>
                                        <div style={{ 
                                            width: '60px', 
                                            height: '60px', 
                                            background: '#2196F3', 
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem',
                                            marginRight: '15px'
                                        }}>
                                            📱
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>
                                                {analysis.deviceType}
                                            </div>
                                            <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                                {analysis.brand} {analysis.model}
                                            </div>
                                            <div style={{ color: '#4CAF50', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                {analysis.totalRecycleValue}
                                            </div>
                                        </div>
                                        <div style={{ 
                                            background: analysis.confidence > 80 ? '#4CAF50' : '#FF9800',
                                            color: 'white',
                                            padding: '5px 10px',
                                            borderRadius: '15px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {analysis.confidence}%
                                        </div>
                                    </div>

                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        padding: '15px', 
                                        background: 'white', 
                                        borderRadius: '10px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                    }}>
                                        <div style={{ 
                                            width: '60px', 
                                            height: '60px', 
                                            background: '#FF9800', 
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem',
                                            marginRight: '15px'
                                        }}>
                                            ⚡
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>
                                                {analysis.overallCondition}
                                            </div>
                                            <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                                Manual verification recommended
                                            </div>
                                        </div>
                                        <div style={{ 
                                            background: '#FF9800',
                                            color: 'white',
                                            padding: '5px 10px',
                                            borderRadius: '15px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold'
                                        }}>
                                            43%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Material Composition */}
                            {analysis.materialComposition && (
                                <div style={{ 
                                    background: '#f8f9fa', 
                                    borderRadius: '15px', 
                                    padding: '20px', 
                                    marginBottom: '20px' 
                                }}>
                                    <h3 style={{ 
                                        fontSize: '1.3rem', 
                                        color: '#333', 
                                        marginBottom: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        🧪 Material Composition
                                    </h3>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
                                        {Object.entries(analysis.materialComposition).map(([material, percentage]) => (
                                            <div key={material} style={{ 
                                                background: 'white', 
                                                padding: '10px', 
                                                borderRadius: '8px',
                                                textAlign: 'center',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}>
                                                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
                                                    {material.charAt(0).toUpperCase() + material.slice(1)}
                                                </div>
                                                <div style={{ color: '#666', fontSize: '0.8rem' }}>
                                                    {typeof percentage === 'object' ? 
                                                        Object.entries(percentage).map(([subMat, subPerc]) => (
                                                            <div key={subMat}>{subMat}: {subPerc}%</div>
                                                        )) :
                                                        `${percentage}%`
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Recycling Options */}
                            {analysis.nearbyRecyclers && (
                                <div style={{ 
                                    background: '#f8f9fa', 
                                    borderRadius: '15px', 
                                    padding: '20px', 
                                    marginBottom: '20px' 
                                }}>
                                    <h3 style={{ 
                                        fontSize: '1.3rem', 
                                        color: '#333', 
                                        marginBottom: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        ♻️ Selling & Recycling Options
                                    </h3>
                                    
                                    <div style={{ display: 'grid', gap: '10px' }}>
                                        {analysis.nearbyRecyclers.slice(0, 4).map((option, index) => (
                                            <div key={index} style={{ 
                                                background: 'white', 
                                                padding: '15px', 
                                                borderRadius: '10px',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <div>
                                                    <div style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>
                                                        {option.name}
                                                    </div>
                                                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                                        {option.type} - {option.estimatedValue}
                                                    </div>
                                                    <div style={{ color: '#888', fontSize: '0.8rem' }}>
                                                        Processing: {option.processingTime}
                                                    </div>
                                                </div>
                                                <a 
                                                    href={option.website} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        background: '#4CAF50',
                                                        color: 'white',
                                                        padding: '8px 15px',
                                                        borderRadius: '8px',
                                                        textDecoration: 'none',
                                                        fontSize: '0.9rem',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    Visit →
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Recommendations */}
                            {analysis.recyclingTips && (
                                <div style={{ 
                                    background: '#e8f5e8', 
                                    borderRadius: '15px', 
                                    padding: '20px' 
                                }}>
                                    <h3 style={{ 
                                        fontSize: '1.3rem', 
                                        color: '#2E7D32', 
                                        marginBottom: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        💡 Recommendations
                                    </h3>
                                    
                                    <div style={{ display: 'grid', gap: '8px' }}>
                                        {analysis.recyclingTips.map((tip, index) => (
                                            <div key={index} style={{ 
                                                background: 'white', 
                                                padding: '10px 15px', 
                                                borderRadius: '8px',
                                                color: '#333',
                                                fontSize: '0.9rem',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                            }}>
                                                {tip}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EWasteRecycling;