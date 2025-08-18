/**
 * Soil Health Analyzer
 * Comprehensive soil quality assessment and agricultural insights
 */

export class SoilHealthAnalyzer {
  constructor() {
    this.soilParameters = {
      ph: {
        optimal: [6.0, 7.5],
        acceptable: [5.5, 8.0],
        critical: [4.0, 9.0],
        unit: '',
        name: 'pH Level'
      },
      nitrogen: {
        optimal: [20, 40],
        acceptable: [10, 60],
        critical: [0, 100],
        unit: 'ppm',
        name: 'Nitrogen (N)'
      },
      phosphorus: {
        optimal: [30, 60],
        acceptable: [15, 80],
        critical: [0, 120],
        unit: 'ppm',
        name: 'Phosphorus (P)'
      },
      potassium: {
        optimal: [150, 300],
        acceptable: [100, 400],
        critical: [0, 600],
        unit: 'ppm',
        name: 'Potassium (K)'
      },
      organicMatter: {
        optimal: [3.0, 6.0],
        acceptable: [2.0, 8.0],
        critical: [0.5, 12.0],
        unit: '%',
        name: 'Organic Matter'
      },
      moisture: {
        optimal: [40, 60],
        acceptable: [25, 75],
        critical: [10, 90],
        unit: '%',
        name: 'Soil Moisture'
      },
      temperature: {
        optimal: [15, 25],
        acceptable: [10, 30],
        critical: [0, 40],
        unit: '°C',
        name: 'Soil Temperature'
      },
      salinity: {
        optimal: [0, 2],
        acceptable: [0, 4],
        critical: [0, 8],
        unit: 'dS/m',
        name: 'Electrical Conductivity'
      }
    };

    this.cropRequirements = {
      tomatoes: { ph: [6.0, 6.8], nitrogen: 'high', phosphorus: 'medium', potassium: 'high' },
      corn: { ph: [6.0, 6.8], nitrogen: 'high', phosphorus: 'high', potassium: 'medium' },
      wheat: { ph: [6.0, 7.0], nitrogen: 'medium', phosphorus: 'medium', potassium: 'medium' },
      soybeans: { ph: [6.0, 7.0], nitrogen: 'low', phosphorus: 'medium', potassium: 'high' },
      lettuce: { ph: [6.0, 7.0], nitrogen: 'high', phosphorus: 'medium', potassium: 'high' },
      carrots: { ph: [5.5, 6.5], nitrogen: 'medium', phosphorus: 'medium', potassium: 'high' },
      potatoes: { ph: [5.0, 6.0], nitrogen: 'medium', phosphorus: 'high', potassium: 'high' },
      beans: { ph: [6.0, 7.0], nitrogen: 'low', phosphorus: 'medium', potassium: 'medium' }
    };

    this.soilTypes = {
      clay: { drainage: 'poor', fertility: 'high', workability: 'difficult' },
      loam: { drainage: 'good', fertility: 'high', workability: 'excellent' },
      sand: { drainage: 'excellent', fertility: 'low', workability: 'easy' },
      silt: { drainage: 'moderate', fertility: 'medium', workability: 'good' },
      peat: { drainage: 'poor', fertility: 'variable', workability: 'difficult' },
      chalk: { drainage: 'good', fertility: 'low', workability: 'good' }
    };
  }

  /**
   * Analyze soil health from test data or image
   */
  async analyzeSoilHealth(data, location = null, cropType = null) {
    try {
      console.log('🌱 Starting soil health analysis...');

      let soilData;
      
      if (typeof data === 'object' && data.ph !== undefined) {
        // Direct test data
        soilData = data;
      } else if (typeof data === 'string' || data instanceof Blob) {
        // Image analysis
        soilData = await this.analyzeImageForSoilData(data);
      } else {
        // Generate mock data for demonstration
        soilData = this.generateMockSoilData(location);
      }

      // Analyze each parameter
      const parameterAnalysis = {};
      Object.keys(this.soilParameters).forEach(param => {
        if (soilData[param] !== undefined) {
          parameterAnalysis[param] = this.analyzeParameter(param, soilData[param]);
        }
      });

      // Calculate overall soil health
      const overallHealth = this.calculateOverallHealth(parameterAnalysis);

      // Generate crop-specific recommendations
      const cropRecommendations = cropType ? 
        this.generateCropRecommendations(parameterAnalysis, cropType) : 
        this.generateGeneralRecommendations(parameterAnalysis);

      // Detect soil type
      const soilType = this.detectSoilType(soilData);

      // Calculate fertility index
      const fertilityIndex = this.calculateFertilityIndex(parameterAnalysis);

      // Generate improvement plan
      const improvementPlan = this.generateImprovementPlan(parameterAnalysis, soilType);

      // Create comprehensive analysis
      const analysis = {
        timestamp: new Date().toISOString(),
        location: location,
        cropType: cropType,
        soilData: soilData,
        parameterAnalysis: parameterAnalysis,
        overallHealth: overallHealth,
        soilType: soilType,
        fertilityIndex: fertilityIndex,
        cropRecommendations: cropRecommendations,
        improvementPlan: improvementPlan,
        seasonalAdvice: this.generateSeasonalAdvice(),
        confidence: this.calculateConfidence(soilData),
        dataSource: soilData.source || 'Analysis',
        nextTestDate: this.calculateNextTestDate()
      };

      console.log('✅ Soil health analysis completed');
      return analysis;

    } catch (error) {
      console.error('Soil health analysis failed:', error);
      throw new Error(`Soil health analysis failed: ${error.message}`);
    }
  }

  /**
   * Analyze soil image for basic parameters
   */
  async analyzeImageForSoilData(imageSource) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          // Analyze image colors and texture
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const soilData = this.extractSoilDataFromImage(imageData);
          
          resolve(soilData);
          
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = reject;
      img.src = typeof imageSource === 'string' ? imageSource : URL.createObjectURL(imageSource);
    });
  }

  /**
   * Extract soil data from image analysis
   */
  extractSoilDataFromImage(imageData) {
    const data = imageData.data;
    let totalR = 0, totalG = 0, totalB = 0;
    let pixelCount = 0;

    // Calculate average color
    for (let i = 0; i < data.length; i += 4) {
      totalR += data[i];
      totalG += data[i + 1];
      totalB += data[i + 2];
      pixelCount++;
    }

    const avgR = totalR / pixelCount;
    const avgG = totalG / pixelCount;
    const avgB = totalB / pixelCount;

    // Estimate soil parameters based on color analysis
    // This is a simplified approach - real implementation would use ML models
    const darkness = (avgR + avgG + avgB) / 3;
    const organicMatter = Math.max(1, 8 - (darkness / 32)); // Darker soil = more organic matter
    
    const redness = avgR - avgG;
    const ph = 6.5 + (redness / 50); // Reddish soil tends to be more acidic
    
    const moisture = Math.max(10, 70 - (darkness / 4)); // Darker soil often indicates moisture

    return {
      ph: Math.max(4.0, Math.min(9.0, ph)),
      organicMatter: Math.max(0.5, Math.min(12.0, organicMatter)),
      moisture: Math.max(10, Math.min(90, moisture)),
      nitrogen: 15 + Math.random() * 20,
      phosphorus: 25 + Math.random() * 30,
      potassium: 120 + Math.random() * 150,
      temperature: 18 + Math.random() * 8,
      salinity: Math.random() * 3,
      source: 'Image Analysis',
      colorProfile: { r: Math.round(avgR), g: Math.round(avgG), b: Math.round(avgB) }
    };
  }

  /**
   * Generate mock soil data for demonstration
   */
  generateMockSoilData(location = null) {
    const baseData = {
      ph: 6.5 + (Math.random() - 0.5) * 2,
      nitrogen: 20 + Math.random() * 30,
      phosphorus: 35 + Math.random() * 40,
      potassium: 180 + Math.random() * 200,
      organicMatter: 3.5 + Math.random() * 3,
      moisture: 45 + Math.random() * 20,
      temperature: 18 + Math.random() * 10,
      salinity: Math.random() * 4
    };

    // Adjust based on location if provided
    if (location) {
      const locationLower = location.toLowerCase();
      
      if (locationLower.includes('desert') || locationLower.includes('arid')) {
        baseData.moisture *= 0.3;
        baseData.organicMatter *= 0.5;
        baseData.salinity *= 2;
      } else if (locationLower.includes('forest') || locationLower.includes('woodland')) {
        baseData.organicMatter *= 1.5;
        baseData.ph -= 0.5; // Forest soils tend to be more acidic
        baseData.nitrogen *= 1.3;
      } else if (locationLower.includes('agricultural') || locationLower.includes('farm')) {
        baseData.nitrogen *= 1.2;
        baseData.phosphorus *= 1.1;
        baseData.potassium *= 1.1;
      }
    }

    // Add seasonal variation
    const month = new Date().getMonth();
    if (month >= 5 && month <= 8) { // Summer
      baseData.temperature += 5;
      baseData.moisture *= 0.8;
    } else if (month >= 11 || month <= 2) { // Winter
      baseData.temperature -= 8;
      baseData.moisture *= 1.2;
    }

    return {
      ...baseData,
      source: 'Simulated Data',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Analyze individual parameter
   */
  analyzeParameter(paramName, value) {
    const param = this.soilParameters[paramName];
    if (!param) return null;

    let status, recommendation;
    
    if (value >= param.optimal[0] && value <= param.optimal[1]) {
      status = 'optimal';
      recommendation = `${param.name} is in the optimal range.`;
    } else if (value >= param.acceptable[0] && value <= param.acceptable[1]) {
      status = 'acceptable';
      if (value < param.optimal[0]) {
        recommendation = `${param.name} is slightly low. Consider gradual improvement.`;
      } else {
        recommendation = `${param.name} is slightly high. Monitor and adjust if needed.`;
      }
    } else if (value >= param.critical[0] && value <= param.critical[1]) {
      status = 'critical';
      if (value < param.acceptable[0]) {
        recommendation = `${param.name} is critically low. Immediate action required.`;
      } else {
        recommendation = `${param.name} is critically high. Immediate correction needed.`;
      }
    } else {
      status = 'extreme';
      recommendation = `${param.name} is at extreme levels. Professional consultation recommended.`;
    }

    return {
      value: Math.round(value * 100) / 100,
      status: status,
      recommendation: recommendation,
      optimal: param.optimal,
      unit: param.unit,
      name: param.name
    };
  }

  /**
   * Calculate overall soil health
   */
  calculateOverallHealth(parameterAnalysis) {
    const statusScores = {
      optimal: 100,
      acceptable: 75,
      critical: 40,
      extreme: 10
    };

    let totalScore = 0;
    let paramCount = 0;

    Object.values(parameterAnalysis).forEach(analysis => {
      if (analysis && analysis.status) {
        totalScore += statusScores[analysis.status] || 0;
        paramCount++;
      }
    });

    const averageScore = paramCount > 0 ? totalScore / paramCount : 0;
    
    let healthCategory;
    if (averageScore >= 90) healthCategory = 'Excellent';
    else if (averageScore >= 75) healthCategory = 'Good';
    else if (averageScore >= 60) healthCategory = 'Fair';
    else if (averageScore >= 40) healthCategory = 'Poor';
    else healthCategory = 'Critical';

    return {
      score: Math.round(averageScore),
      category: healthCategory,
      color: this.getHealthColor(healthCategory)
    };
  }

  getHealthColor(category) {
    const colors = {
      'Excellent': '#4CAF50',
      'Good': '#8BC34A',
      'Fair': '#FF9800',
      'Poor': '#FF5722',
      'Critical': '#F44336'
    };
    return colors[category] || '#666666';
  }

  /**
   * Detect soil type based on parameters
   */
  detectSoilType(soilData) {
    // Simplified soil type detection based on available parameters
    // Real implementation would use particle size analysis
    
    let soilType = 'loam'; // Default
    let confidence = 60;

    // Use organic matter and drainage characteristics to estimate
    if (soilData.organicMatter > 8) {
      soilType = 'peat';
      confidence = 70;
    } else if (soilData.moisture < 30 && soilData.salinity < 1) {
      soilType = 'sand';
      confidence = 65;
    } else if (soilData.moisture > 70 && soilData.organicMatter < 2) {
      soilType = 'clay';
      confidence = 65;
    } else if (soilData.ph > 7.5 && soilData.salinity < 1) {
      soilType = 'chalk';
      confidence = 60;
    }

    return {
      type: soilType,
      confidence: confidence,
      characteristics: this.soilTypes[soilType] || {},
      description: this.getSoilTypeDescription(soilType)
    };
  }

  getSoilTypeDescription(soilType) {
    const descriptions = {
      clay: 'Heavy soil that retains water and nutrients well but can be difficult to work.',
      loam: 'Ideal garden soil with good drainage, fertility, and workability.',
      sand: 'Light, well-draining soil that warms quickly but requires frequent watering and fertilizing.',
      silt: 'Smooth, fertile soil with good water retention but can compact easily.',
      peat: 'Organic-rich soil with excellent water retention but may be acidic.',
      chalk: 'Alkaline soil that drains well but may lack nutrients and organic matter.'
    };
    return descriptions[soilType] || 'Mixed soil type with variable characteristics.';
  }

  /**
   * Calculate fertility index
   */
  calculateFertilityIndex(parameterAnalysis) {
    const keyNutrients = ['nitrogen', 'phosphorus', 'potassium', 'organicMatter'];
    let fertilityScore = 0;
    let nutrientCount = 0;

    keyNutrients.forEach(nutrient => {
      const analysis = parameterAnalysis[nutrient];
      if (analysis) {
        const statusScores = { optimal: 100, acceptable: 75, critical: 40, extreme: 10 };
        fertilityScore += statusScores[analysis.status] || 0;
        nutrientCount++;
      }
    });

    const index = nutrientCount > 0 ? fertilityScore / nutrientCount : 0;
    
    let category;
    if (index >= 90) category = 'Very High';
    else if (index >= 75) category = 'High';
    else if (index >= 60) category = 'Medium';
    else if (index >= 40) category = 'Low';
    else category = 'Very Low';

    return {
      score: Math.round(index),
      category: category,
      description: this.getFertilityDescription(category)
    };
  }

  getFertilityDescription(category) {
    const descriptions = {
      'Very High': 'Excellent nutrient levels support vigorous plant growth.',
      'High': 'Good nutrient availability for most crops.',
      'Medium': 'Adequate nutrients with room for improvement.',
      'Low': 'Limited nutrients may restrict plant growth.',
      'Very Low': 'Significant nutrient deficiencies require immediate attention.'
    };
    return descriptions[category] || 'Nutrient status unclear.';
  }

  /**
   * Generate crop-specific recommendations
   */
  generateCropRecommendations(parameterAnalysis, cropType) {
    const cropReqs = this.cropRequirements[cropType.toLowerCase()];
    if (!cropReqs) {
      return this.generateGeneralRecommendations(parameterAnalysis);
    }

    const recommendations = [];

    // Check pH requirements
    const phAnalysis = parameterAnalysis.ph;
    if (phAnalysis) {
      const [minPh, maxPh] = cropReqs.ph;
      if (phAnalysis.value < minPh) {
        recommendations.push({
          priority: 'high',
          category: 'pH',
          issue: `pH too low for ${cropType}`,
          action: 'Add lime to raise pH',
          target: `${minPh}-${maxPh}`,
          timeframe: '2-4 weeks'
        });
      } else if (phAnalysis.value > maxPh) {
        recommendations.push({
          priority: 'high',
          category: 'pH',
          issue: `pH too high for ${cropType}`,
          action: 'Add sulfur or organic matter to lower pH',
          target: `${minPh}-${maxPh}`,
          timeframe: '4-8 weeks'
        });
      }
    }

    // Check nutrient requirements
    const nutrientReqs = {
      nitrogen: cropReqs.nitrogen,
      phosphorus: cropReqs.phosphorus,
      potassium: cropReqs.potassium
    };

    Object.keys(nutrientReqs).forEach(nutrient => {
      const analysis = parameterAnalysis[nutrient];
      const requirement = nutrientReqs[nutrient];
      
      if (analysis && requirement) {
        if (requirement === 'high' && analysis.status !== 'optimal') {
          recommendations.push({
            priority: 'medium',
            category: 'nutrition',
            issue: `${cropType} requires high ${nutrient}`,
            action: this.getNutrientAction(nutrient, 'increase'),
            target: 'Optimal range',
            timeframe: '1-2 weeks'
          });
        } else if (requirement === 'low' && analysis.status === 'critical' && analysis.value > analysis.optimal[1]) {
          recommendations.push({
            priority: 'low',
            category: 'nutrition',
            issue: `${nutrient} may be too high for ${cropType}`,
            action: 'Reduce fertilizer application',
            target: 'Moderate levels',
            timeframe: '2-4 weeks'
          });
        }
      }
    });

    return recommendations;
  }

  /**
   * Generate general recommendations
   */
  generateGeneralRecommendations(parameterAnalysis) {
    const recommendations = [];

    Object.keys(parameterAnalysis).forEach(param => {
      const analysis = parameterAnalysis[param];
      if (analysis && (analysis.status === 'critical' || analysis.status === 'extreme')) {
        recommendations.push({
          priority: analysis.status === 'extreme' ? 'high' : 'medium',
          category: param,
          issue: analysis.recommendation,
          action: this.getParameterAction(param, analysis),
          timeframe: this.getActionTimeframe(param)
        });
      }
    });

    return recommendations;
  }

  getNutrientAction(nutrient, direction) {
    const actions = {
      nitrogen: {
        increase: 'Apply nitrogen-rich fertilizer or compost',
        decrease: 'Reduce nitrogen fertilizer, plant nitrogen-fixing crops'
      },
      phosphorus: {
        increase: 'Add bone meal or phosphorus fertilizer',
        decrease: 'Avoid phosphorus fertilizers, improve drainage'
      },
      potassium: {
        increase: 'Apply potash or wood ash',
        decrease: 'Improve soil drainage, avoid potassium fertilizers'
      }
    };
    return actions[nutrient]?.[direction] || `Adjust ${nutrient} levels`;
  }

  getParameterAction(param, analysis) {
    const actions = {
      ph: analysis.value < analysis.optimal[0] ? 'Add lime to raise pH' : 'Add sulfur to lower pH',
      organicMatter: 'Add compost, manure, or organic mulch',
      moisture: analysis.value < analysis.optimal[0] ? 'Improve irrigation' : 'Improve drainage',
      salinity: 'Improve drainage, leach salts with fresh water',
      temperature: 'Use mulch to moderate soil temperature'
    };
    return actions[param] || 'Consult soil specialist';
  }

  getActionTimeframe(param) {
    const timeframes = {
      ph: '4-8 weeks',
      nitrogen: '1-2 weeks',
      phosphorus: '2-4 weeks',
      potassium: '2-4 weeks',
      organicMatter: '2-6 months',
      moisture: '1-2 weeks',
      salinity: '4-12 weeks',
      temperature: '1-4 weeks'
    };
    return timeframes[param] || '2-4 weeks';
  }

  /**
   * Generate improvement plan
   */
  generateImprovementPlan(parameterAnalysis, soilType) {
    const plan = {
      immediate: [], // 0-2 weeks
      shortTerm: [], // 2-8 weeks
      longTerm: [], // 2+ months
      seasonal: []
    };

    // Immediate actions
    Object.keys(parameterAnalysis).forEach(param => {
      const analysis = parameterAnalysis[param];
      if (analysis && analysis.status === 'extreme') {
        plan.immediate.push({
          action: `Address critical ${param} levels`,
          description: analysis.recommendation,
          priority: 'critical'
        });
      }
    });

    // Short-term actions
    if (parameterAnalysis.ph && parameterAnalysis.ph.status !== 'optimal') {
      plan.shortTerm.push({
        action: 'Adjust soil pH',
        description: parameterAnalysis.ph.recommendation,
        priority: 'high'
      });
    }

    // Long-term actions
    if (parameterAnalysis.organicMatter && parameterAnalysis.organicMatter.status !== 'optimal') {
      plan.longTerm.push({
        action: 'Improve organic matter content',
        description: 'Regular addition of compost and organic materials',
        priority: 'medium'
      });
    }

    // Seasonal recommendations
    plan.seasonal = this.generateSeasonalAdvice();

    return plan;
  }

  /**
   * Generate seasonal advice
   */
  generateSeasonalAdvice() {
    const month = new Date().getMonth();
    const season = month >= 2 && month <= 4 ? 'spring' :
                  month >= 5 && month <= 7 ? 'summer' :
                  month >= 8 && month <= 10 ? 'fall' : 'winter';

    const advice = {
      spring: [
        'Test soil before planting season',
        'Add compost and organic matter',
        'Apply pre-plant fertilizers',
        'Improve drainage if needed'
      ],
      summer: [
        'Monitor soil moisture regularly',
        'Apply mulch to conserve water',
        'Side-dress crops with nutrients',
        'Watch for nutrient deficiencies'
      ],
      fall: [
        'Conduct end-of-season soil test',
        'Add lime if pH adjustment needed',
        'Plant cover crops',
        'Add organic matter for winter decomposition'
      ],
      winter: [
        'Plan next year\'s soil improvements',
        'Order soil amendments',
        'Protect soil from erosion',
        'Review and analyze soil test results'
      ]
    };

    return {
      currentSeason: season,
      recommendations: advice[season] || []
    };
  }

  /**
   * Calculate confidence in analysis
   */
  calculateConfidence(soilData) {
    let confidence = 85; // Base confidence

    // Increase confidence for more complete data
    const parameterCount = Object.keys(soilData).filter(key => 
      typeof soilData[key] === 'number' && key !== 'timestamp'
    ).length;

    if (parameterCount >= 6) confidence += 10;
    else if (parameterCount >= 4) confidence += 5;
    else if (parameterCount < 3) confidence -= 15;

    // Adjust based on data source
    if (soilData.source === 'Lab Analysis') confidence += 10;
    else if (soilData.source === 'Image Analysis') confidence -= 10;

    return Math.max(60, Math.min(98, confidence));
  }

  /**
   * Calculate next test date
   */
  calculateNextTestDate() {
    const nextTest = new Date();
    nextTest.setMonth(nextTest.getMonth() + 6); // Test every 6 months
    return nextTest.toISOString().split('T')[0];
  }
}

// Create singleton instance
export const soilHealthAnalyzer = new SoilHealthAnalyzer();

// Export main analysis function
export const analyzeSoilHealth = async (data, location, cropType) => {
  try {
    return await soilHealthAnalyzer.analyzeSoilHealth(data, location, cropType);
  } catch (error) {
    console.error('Soil health analysis error:', error);
    throw error;
  }
};

export default soilHealthAnalyzer;