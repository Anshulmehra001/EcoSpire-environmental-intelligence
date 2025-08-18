/**
 * Climate Impact Assessment
 * Comprehensive climate change impact analysis and adaptation planning
 */

export class ClimateImpactAssessment {
  constructor() {
    this.climateIndicators = {
      temperature: {
        current: null,
        historical: null,
        projected: null,
        threshold: { warning: 1.5, critical: 2.0 }, // °C above pre-industrial
        unit: '°C'
      },
      precipitation: {
        current: null,
        historical: null,
        projected: null,
        threshold: { warning: 20, critical: 40 }, // % change
        unit: 'mm'
      },
      seaLevel: {
        current: null,
        historical: null,
        projected: null,
        threshold: { warning: 0.3, critical: 0.6 }, // meters
        unit: 'm'
      },
      extremeEvents: {
        heatwaves: { frequency: 0, intensity: 0 },
        droughts: { frequency: 0, severity: 0 },
        floods: { frequency: 0, magnitude: 0 },
        storms: { frequency: 0, intensity: 0 }
      }
    };

    this.vulnerabilitySectors = {
      agriculture: {
        indicators: ['temperature', 'precipitation', 'extremeEvents'],
        sensitivity: 'high',
        adaptiveCapacity: 'medium'
      },
      water: {
        indicators: ['precipitation', 'temperature', 'extremeEvents'],
        sensitivity: 'high',
        adaptiveCapacity: 'low'
      },
      coastal: {
        indicators: ['seaLevel', 'storms', 'temperature'],
        sensitivity: 'very_high',
        adaptiveCapacity: 'low'
      },
      urban: {
        indicators: ['temperature', 'precipitation', 'extremeEvents'],
        sensitivity: 'medium',
        adaptiveCapacity: 'high'
      },
      ecosystems: {
        indicators: ['temperature', 'precipitation', 'extremeEvents'],
        sensitivity: 'very_high',
        adaptiveCapacity: 'very_low'
      },
      health: {
        indicators: ['temperature', 'extremeEvents', 'precipitation'],
        sensitivity: 'high',
        adaptiveCapacity: 'medium'
      }
    };

    this.adaptationStrategies = {
      agriculture: [
        'Drought-resistant crop varieties',
        'Improved irrigation systems',
        'Crop diversification',
        'Soil conservation practices',
        'Climate-smart agriculture techniques'
      ],
      water: [
        'Water conservation measures',
        'Rainwater harvesting',
        'Groundwater management',
        'Water recycling systems',
        'Drought preparedness plans'
      ],
      coastal: [
        'Sea wall construction',
        'Mangrove restoration',
        'Managed retreat strategies',
        'Early warning systems',
        'Coastal zone planning'
      ],
      urban: [
        'Green infrastructure',
        'Heat island mitigation',
        'Flood management systems',
        'Building codes adaptation',
        'Emergency preparedness'
      ],
      ecosystems: [
        'Protected area expansion',
        'Habitat connectivity',
        'Species conservation',
        'Ecosystem restoration',
        'Assisted migration'
      ],
      health: [
        'Heat wave preparedness',
        'Disease surveillance',
        'Healthcare system strengthening',
        'Public health education',
        'Vulnerable population protection'
      ]
    };
  }

  /**
   * Assess climate impact for a location
   */
  async assessClimateImpact(location, timeframe = '2050', sectors = null) {
    try {
      console.log('🌡️ Starting climate impact assessment...');

      // Get climate data for location
      const climateData = await this.getClimateData(location, timeframe);
      
      // Analyze climate indicators
      const indicatorAnalysis = this.analyzeClimateIndicators(climateData);
      
      // Assess vulnerability by sector
      const sectorsToAnalyze = sectors || Object.keys(this.vulnerabilitySectors);
      const vulnerabilityAssessment = this.assessVulnerability(indicatorAnalysis, sectorsToAnalyze);
      
      // Calculate overall risk
      const riskAssessment = this.calculateOverallRisk(vulnerabilityAssessment);
      
      // Generate adaptation recommendations
      const adaptationPlan = this.generateAdaptationPlan(vulnerabilityAssessment, sectorsToAnalyze);
      
      // Create impact timeline
      const impactTimeline = this.createImpactTimeline(climateData, timeframe);
      
      // Generate economic impact estimates
      const economicImpact = this.estimateEconomicImpact(vulnerabilityAssessment);

      const assessment = {
        timestamp: new Date().toISOString(),
        location: location,
        timeframe: timeframe,
        climateData: climateData,
        indicatorAnalysis: indicatorAnalysis,
        vulnerabilityAssessment: vulnerabilityAssessment,
        riskAssessment: riskAssessment,
        adaptationPlan: adaptationPlan,
        impactTimeline: impactTimeline,
        economicImpact: economicImpact,
        confidence: this.calculateConfidence(climateData),
        dataSource: climateData.source || 'Climate Models',
        lastUpdated: new Date().toISOString()
      };

      console.log('✅ Climate impact assessment completed');
      return assessment;

    } catch (error) {
      console.error('Climate impact assessment failed:', error);
      throw new Error(`Climate impact assessment failed: ${error.message}`);
    }
  }

  /**
   * Get climate data for location and timeframe
   */
  async getClimateData(location, timeframe) {
    // In a real implementation, this would call climate APIs
    // For now, generate realistic projections based on location
    
    console.log('🌐 Fetching climate data for:', location, timeframe);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return this.generateClimateProjections(location, timeframe);
  }

  /**
   * Generate climate projections based on location
   */
  generateClimateProjections(location, timeframe) {
    const locationLower = location.toLowerCase();
    const year = parseInt(timeframe) || 2050;
    const yearsFromNow = year - new Date().getFullYear();
    
    // Base climate data (current approximate values)
    let baseTemp = 15; // Global average
    let basePrecip = 1000; // mm/year
    let baseSeaLevel = 0; // current level
    
    // Adjust base values by location
    if (locationLower.includes('arctic') || locationLower.includes('polar')) {
      baseTemp = -10;
      basePrecip = 400;
    } else if (locationLower.includes('tropical') || locationLower.includes('equator')) {
      baseTemp = 26;
      basePrecip = 2000;
    } else if (locationLower.includes('desert') || locationLower.includes('arid')) {
      baseTemp = 25;
      basePrecip = 200;
    } else if (locationLower.includes('temperate') || locationLower.includes('europe')) {
      baseTemp = 12;
      basePrecip = 800;
    } else if (locationLower.includes('coastal') || locationLower.includes('island')) {
      baseTemp = 18;
      basePrecip = 1200;
    }

    // Calculate projections based on timeframe
    const tempIncrease = (yearsFromNow / 30) * 1.5; // 1.5°C by 2050
    const precipChange = (Math.random() - 0.5) * 0.4 * (yearsFromNow / 30); // ±20% by 2050
    const seaLevelRise = (yearsFromNow / 30) * 0.3; // 30cm by 2050

    // Generate extreme events based on warming
    const extremeMultiplier = 1 + (tempIncrease / 2);

    return {
      location: location,
      timeframe: timeframe,
      temperature: {
        current: baseTemp,
        historical: baseTemp - 0.8, // Pre-industrial baseline
        projected: baseTemp + tempIncrease,
        change: tempIncrease,
        confidence: 85
      },
      precipitation: {
        current: basePrecip,
        historical: basePrecip,
        projected: basePrecip * (1 + precipChange),
        change: precipChange * 100, // percentage
        confidence: 70
      },
      seaLevel: {
        current: 0,
        historical: -0.2, // 20cm below current
        projected: seaLevelRise,
        change: seaLevelRise,
        confidence: 75
      },
      extremeEvents: {
        heatwaves: {
          frequency: Math.round(2 * extremeMultiplier),
          intensity: Math.round(35 + tempIncrease * 2),
          confidence: 80
        },
        droughts: {
          frequency: Math.round(1.5 * extremeMultiplier),
          severity: Math.round(3 + tempIncrease),
          confidence: 70
        },
        floods: {
          frequency: Math.round(1.8 * extremeMultiplier),
          magnitude: Math.round(150 + Math.abs(precipChange) * 100),
          confidence: 65
        },
        storms: {
          frequency: Math.round(3 * extremeMultiplier),
          intensity: Math.round(120 + tempIncrease * 5),
          confidence: 60
        }
      },
      source: 'Climate Model Projections',
      scenario: 'RCP4.5', // Representative Concentration Pathway
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Analyze climate indicators
   */
  analyzeClimateIndicators(climateData) {
    const analysis = {};

    // Temperature analysis
    const tempChange = climateData.temperature.change;
    analysis.temperature = {
      change: tempChange,
      status: tempChange < 1.5 ? 'moderate' : tempChange < 2.0 ? 'high' : 'critical',
      impact: this.getTemperatureImpact(tempChange),
      confidence: climateData.temperature.confidence
    };

    // Precipitation analysis
    const precipChange = Math.abs(climateData.precipitation.change);
    analysis.precipitation = {
      change: climateData.precipitation.change,
      status: precipChange < 10 ? 'low' : precipChange < 25 ? 'moderate' : 'high',
      impact: this.getPrecipitationImpact(climateData.precipitation.change),
      confidence: climateData.precipitation.confidence
    };

    // Sea level analysis
    const seaLevelChange = climateData.seaLevel.change;
    analysis.seaLevel = {
      change: seaLevelChange,
      status: seaLevelChange < 0.2 ? 'low' : seaLevelChange < 0.5 ? 'moderate' : 'high',
      impact: this.getSeaLevelImpact(seaLevelChange),
      confidence: climateData.seaLevel.confidence
    };

    // Extreme events analysis
    analysis.extremeEvents = {};
    Object.keys(climateData.extremeEvents).forEach(event => {
      const eventData = climateData.extremeEvents[event];
      analysis.extremeEvents[event] = {
        frequency: eventData.frequency,
        intensity: eventData.intensity || eventData.severity || eventData.magnitude,
        status: this.getExtremeEventStatus(event, eventData),
        impact: this.getExtremeEventImpact(event, eventData),
        confidence: eventData.confidence
      };
    });

    return analysis;
  }

  getTemperatureImpact(change) {
    if (change < 1.0) return 'Minimal impact on most systems';
    if (change < 1.5) return 'Moderate impacts on agriculture and ecosystems';
    if (change < 2.0) return 'Significant impacts across multiple sectors';
    return 'Severe and widespread impacts, potential system collapse';
  }

  getPrecipitationImpact(change) {
    const absChange = Math.abs(change);
    if (absChange < 5) return 'Minor changes in water availability';
    if (absChange < 15) return 'Moderate impacts on water resources';
    if (absChange < 25) return 'Significant water stress or flooding risks';
    return change > 0 ? 'Severe flooding and infrastructure damage' : 'Extreme drought and water scarcity';
  }

  getSeaLevelImpact(change) {
    if (change < 0.1) return 'Minimal coastal impacts';
    if (change < 0.3) return 'Moderate coastal erosion and flooding';
    if (change < 0.6) return 'Significant coastal infrastructure at risk';
    return 'Severe coastal flooding, potential displacement';
  }

  getExtremeEventStatus(event, data) {
    const frequency = data.frequency || 0;
    if (frequency <= 1) return 'low';
    if (frequency <= 3) return 'moderate';
    return 'high';
  }

  getExtremeEventImpact(event, data) {
    const impacts = {
      heatwaves: 'Increased heat-related health risks and energy demand',
      droughts: 'Water scarcity and agricultural productivity loss',
      floods: 'Infrastructure damage and displacement risks',
      storms: 'Property damage and economic disruption'
    };
    return impacts[event] || 'Various sectoral impacts';
  }

  /**
   * Assess vulnerability by sector
   */
  assessVulnerability(indicatorAnalysis, sectors) {
    const assessment = {};

    sectors.forEach(sector => {
      const sectorConfig = this.vulnerabilitySectors[sector];
      if (!sectorConfig) return;

      let exposureScore = 0;
      let sensitivityScore = this.getSensitivityScore(sectorConfig.sensitivity);
      let adaptiveCapacityScore = this.getAdaptiveCapacityScore(sectorConfig.adaptiveCapacity);

      // Calculate exposure based on relevant indicators
      sectorConfig.indicators.forEach(indicator => {
        if (indicatorAnalysis[indicator]) {
          exposureScore += this.getExposureScore(indicatorAnalysis[indicator]);
        }
      });

      exposureScore = exposureScore / sectorConfig.indicators.length;

      // Calculate vulnerability (exposure + sensitivity - adaptive capacity)
      const vulnerabilityScore = (exposureScore + sensitivityScore - adaptiveCapacityScore) / 2;
      
      assessment[sector] = {
        exposure: Math.round(exposureScore),
        sensitivity: Math.round(sensitivityScore),
        adaptiveCapacity: Math.round(adaptiveCapacityScore),
        vulnerability: Math.round(Math.max(0, Math.min(100, vulnerabilityScore))),
        riskLevel: this.getRiskLevel(vulnerabilityScore),
        keyThreats: this.getKeyThreats(sector, indicatorAnalysis),
        priority: this.getPriority(vulnerabilityScore)
      };
    });

    return assessment;
  }

  getSensitivityScore(sensitivity) {
    const scores = {
      'very_low': 20,
      'low': 35,
      'medium': 50,
      'high': 70,
      'very_high': 85
    };
    return scores[sensitivity] || 50;
  }

  getAdaptiveCapacityScore(capacity) {
    const scores = {
      'very_low': 20,
      'low': 35,
      'medium': 50,
      'high': 70,
      'very_high': 85
    };
    return scores[capacity] || 50;
  }

  getExposureScore(indicatorAnalysis) {
    const statusScores = {
      'low': 25,
      'moderate': 50,
      'high': 75,
      'critical': 90
    };
    return statusScores[indicatorAnalysis.status] || 50;
  }

  getRiskLevel(vulnerabilityScore) {
    if (vulnerabilityScore < 30) return 'Low';
    if (vulnerabilityScore < 50) return 'Medium';
    if (vulnerabilityScore < 70) return 'High';
    return 'Very High';
  }

  getKeyThreats(sector, indicatorAnalysis) {
    const threats = [];
    
    if (indicatorAnalysis.temperature?.status === 'high' || indicatorAnalysis.temperature?.status === 'critical') {
      threats.push('Rising temperatures');
    }
    
    if (Math.abs(indicatorAnalysis.precipitation?.change || 0) > 15) {
      threats.push(indicatorAnalysis.precipitation.change > 0 ? 'Increased flooding' : 'Increased drought');
    }
    
    if (indicatorAnalysis.seaLevel?.status === 'moderate' || indicatorAnalysis.seaLevel?.status === 'high') {
      threats.push('Sea level rise');
    }
    
    Object.keys(indicatorAnalysis.extremeEvents || {}).forEach(event => {
      if (indicatorAnalysis.extremeEvents[event].status === 'high') {
        threats.push(`Increased ${event}`);
      }
    });

    return threats.slice(0, 3); // Top 3 threats
  }

  getPriority(vulnerabilityScore) {
    if (vulnerabilityScore >= 70) return 'Critical';
    if (vulnerabilityScore >= 50) return 'High';
    if (vulnerabilityScore >= 30) return 'Medium';
    return 'Low';
  }

  /**
   * Calculate overall risk assessment
   */
  calculateOverallRisk(vulnerabilityAssessment) {
    const sectors = Object.keys(vulnerabilityAssessment);
    if (sectors.length === 0) return { level: 'Unknown', score: 0 };

    let totalVulnerability = 0;
    let criticalSectors = 0;
    let highRiskSectors = 0;

    sectors.forEach(sector => {
      const assessment = vulnerabilityAssessment[sector];
      totalVulnerability += assessment.vulnerability;
      
      if (assessment.riskLevel === 'Very High') criticalSectors++;
      else if (assessment.riskLevel === 'High') highRiskSectors++;
    });

    const averageVulnerability = totalVulnerability / sectors.length;
    
    let overallRisk;
    if (criticalSectors > 0 || averageVulnerability >= 70) {
      overallRisk = 'Very High';
    } else if (highRiskSectors > 1 || averageVulnerability >= 50) {
      overallRisk = 'High';
    } else if (averageVulnerability >= 30) {
      overallRisk = 'Medium';
    } else {
      overallRisk = 'Low';
    }

    return {
      level: overallRisk,
      score: Math.round(averageVulnerability),
      criticalSectors: criticalSectors,
      highRiskSectors: highRiskSectors,
      mostVulnerable: this.getMostVulnerableSectors(vulnerabilityAssessment),
      summary: this.generateRiskSummary(overallRisk, criticalSectors, highRiskSectors)
    };
  }

  getMostVulnerable(vulnerabilityAssessment) {
    return Object.keys(vulnerabilityAssessment)
      .sort((a, b) => vulnerabilityAssessment[b].vulnerability - vulnerabilityAssessment[a].vulnerability)
      .slice(0, 3);
  }

  getMostVulnerableSectors(vulnerabilityAssessment) {
    return Object.entries(vulnerabilityAssessment)
      .sort(([,a], [,b]) => b.vulnerability - a.vulnerability)
      .slice(0, 3)
      .map(([sector, data]) => ({
        sector,
        vulnerability: data.vulnerability,
        riskLevel: data.riskLevel
      }));
  }

  generateRiskSummary(overallRisk, criticalSectors, highRiskSectors) {
    if (overallRisk === 'Very High') {
      return `Critical climate risks identified. ${criticalSectors} sectors face severe impacts requiring immediate action.`;
    } else if (overallRisk === 'High') {
      return `Significant climate risks present. ${highRiskSectors} sectors require priority adaptation measures.`;
    } else if (overallRisk === 'Medium') {
      return 'Moderate climate risks. Proactive adaptation planning recommended.';
    } else {
      return 'Low climate risks currently. Continue monitoring and preparedness.';
    }
  }

  /**
   * Generate adaptation plan
   */
  generateAdaptationPlan(vulnerabilityAssessment, sectors) {
    const plan = {
      immediate: [], // 0-2 years
      shortTerm: [], // 2-5 years
      longTerm: [], // 5+ years
      crossCutting: []
    };

    sectors.forEach(sector => {
      const assessment = vulnerabilityAssessment[sector];
      if (!assessment) return;

      const strategies = this.adaptationStrategies[sector] || [];
      
      if (assessment.priority === 'Critical') {
        plan.immediate.push({
          sector: sector,
          strategy: strategies[0] || 'Emergency response planning',
          priority: 'Critical',
          timeframe: '0-2 years',
          cost: 'High',
          effectiveness: 'High'
        });
      } else if (assessment.priority === 'High') {
        plan.shortTerm.push({
          sector: sector,
          strategy: strategies[1] || 'Adaptation infrastructure',
          priority: 'High',
          timeframe: '2-5 years',
          cost: 'Medium',
          effectiveness: 'High'
        });
      } else {
        plan.longTerm.push({
          sector: sector,
          strategy: strategies[2] || 'Long-term resilience building',
          priority: 'Medium',
          timeframe: '5+ years',
          cost: 'Low',
          effectiveness: 'Medium'
        });
      }
    });

    // Add cross-cutting strategies
    plan.crossCutting = [
      {
        strategy: 'Climate monitoring and early warning systems',
        sectors: 'All',
        timeframe: '1-3 years',
        priority: 'High'
      },
      {
        strategy: 'Community education and awareness programs',
        sectors: 'All',
        timeframe: '0-2 years',
        priority: 'Medium'
      },
      {
        strategy: 'Policy and regulatory framework development',
        sectors: 'All',
        timeframe: '2-5 years',
        priority: 'High'
      }
    ];

    return plan;
  }

  /**
   * Create impact timeline
   */
  createImpactTimeline(climateData, targetYear) {
    const currentYear = new Date().getFullYear();
    const timeline = [];

    // Create milestones every 5 years
    for (let year = currentYear + 5; year <= parseInt(targetYear); year += 5) {
      const progress = (year - currentYear) / (parseInt(targetYear) - currentYear);
      
      timeline.push({
        year: year,
        temperature: Math.round((climateData.temperature.current + 
                               climateData.temperature.change * progress) * 10) / 10,
        precipitation: Math.round(climateData.precipitation.current * 
                                (1 + climateData.precipitation.change / 100 * progress)),
        seaLevel: Math.round(climateData.seaLevel.change * progress * 100) / 100,
        keyImpacts: this.getTimelineImpacts(year, progress)
      });
    }

    return timeline;
  }

  getTimelineImpacts(year, progress) {
    const impacts = [];
    
    if (progress > 0.3) {
      impacts.push('Increased frequency of extreme weather events');
    }
    
    if (progress > 0.5) {
      impacts.push('Significant ecosystem shifts begin');
      impacts.push('Agricultural productivity changes');
    }
    
    if (progress > 0.7) {
      impacts.push('Coastal infrastructure increasingly at risk');
      impacts.push('Water resource stress intensifies');
    }
    
    if (progress > 0.9) {
      impacts.push('Major adaptation measures required');
      impacts.push('Economic impacts become substantial');
    }

    return impacts;
  }

  /**
   * Estimate economic impact
   */
  estimateEconomicImpact(vulnerabilityAssessment) {
    let totalImpact = 0;
    const sectorImpacts = {};

    // Rough economic impact estimates (% of GDP)
    const impactFactors = {
      agriculture: 0.15,
      water: 0.08,
      coastal: 0.12,
      urban: 0.20,
      ecosystems: 0.05,
      health: 0.10
    };

    Object.keys(vulnerabilityAssessment).forEach(sector => {
      const vulnerability = vulnerabilityAssessment[sector].vulnerability;
      const factor = impactFactors[sector] || 0.05;
      const impact = (vulnerability / 100) * factor * 100; // % of GDP
      
      sectorImpacts[sector] = {
        impact: Math.round(impact * 100) / 100,
        description: this.getEconomicImpactDescription(sector, impact)
      };
      
      totalImpact += impact;
    });

    return {
      totalImpact: Math.round(totalImpact * 100) / 100,
      sectorImpacts: sectorImpacts,
      adaptationCost: Math.round(totalImpact * 0.3 * 100) / 100, // ~30% of damage cost
      benefitCostRatio: 3.2, // Typical adaptation benefit-cost ratio
      description: this.getOverallEconomicDescription(totalImpact)
    };
  }

  getEconomicImpactDescription(sector, impact) {
    if (impact < 0.5) return 'Minimal economic impact expected';
    if (impact < 1.0) return 'Moderate economic losses likely';
    if (impact < 2.0) return 'Significant economic impacts anticipated';
    return 'Severe economic consequences expected';
  }

  getOverallEconomicDescription(totalImpact) {
    if (totalImpact < 1.0) return 'Low overall economic impact';
    if (totalImpact < 3.0) return 'Moderate economic consequences';
    if (totalImpact < 6.0) return 'Significant economic impacts';
    return 'Severe economic disruption expected';
  }

  /**
   * Calculate confidence in assessment
   */
  calculateConfidence(climateData) {
    let confidence = 75; // Base confidence

    // Adjust based on data quality
    const indicators = ['temperature', 'precipitation', 'seaLevel'];
    indicators.forEach(indicator => {
      if (climateData[indicator]?.confidence) {
        confidence += (climateData[indicator].confidence - 75) * 0.2;
      }
    });

    // Reduce confidence for longer timeframes
    const year = parseInt(climateData.timeframe) || 2050;
    const yearsOut = year - new Date().getFullYear();
    if (yearsOut > 30) confidence -= 10;
    if (yearsOut > 50) confidence -= 15;

    return Math.max(50, Math.min(95, Math.round(confidence)));
  }
}

// Create singleton instance
export const climateImpactAssessment = new ClimateImpactAssessment();

// Export main assessment function
export const assessClimateImpact = async (location, timeframe, sectors) => {
  try {
    return await climateImpactAssessment.assessClimateImpact(location, timeframe, sectors);
  } catch (error) {
    console.error('Climate impact assessment error:', error);
    throw error;
  }
};

export default climateImpactAssessment;