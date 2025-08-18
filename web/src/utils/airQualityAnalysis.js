/**
 * Air Quality Analysis System
 * Real-time air quality monitoring and assessment
 */

export class AirQualityAnalyzer {
  constructor() {
    this.aqiBreakpoints = {
      pm25: [
        { low: 0, high: 12, aqi_low: 0, aqi_high: 50, category: 'Good', color: '#00e400' },
        { low: 12.1, high: 35.4, aqi_low: 51, aqi_high: 100, category: 'Moderate', color: '#ffff00' },
        { low: 35.5, high: 55.4, aqi_low: 101, aqi_high: 150, category: 'Unhealthy for Sensitive Groups', color: '#ff7e00' },
        { low: 55.5, high: 150.4, aqi_low: 151, aqi_high: 200, category: 'Unhealthy', color: '#ff0000' },
        { low: 150.5, high: 250.4, aqi_low: 201, aqi_high: 300, category: 'Very Unhealthy', color: '#8f3f97' },
        { low: 250.5, high: 500, aqi_low: 301, aqi_high: 500, category: 'Hazardous', color: '#7e0023' }
      ],
      pm10: [
        { low: 0, high: 54, aqi_low: 0, aqi_high: 50, category: 'Good', color: '#00e400' },
        { low: 55, high: 154, aqi_low: 51, aqi_high: 100, category: 'Moderate', color: '#ffff00' },
        { low: 155, high: 254, aqi_low: 101, aqi_high: 150, category: 'Unhealthy for Sensitive Groups', color: '#ff7e00' },
        { low: 255, high: 354, aqi_low: 151, aqi_high: 200, category: 'Unhealthy', color: '#ff0000' },
        { low: 355, high: 424, aqi_low: 201, aqi_high: 300, category: 'Very Unhealthy', color: '#8f3f97' },
        { low: 425, high: 604, aqi_low: 301, aqi_high: 500, category: 'Hazardous', color: '#7e0023' }
      ],
      o3: [
        { low: 0, high: 54, aqi_low: 0, aqi_high: 50, category: 'Good', color: '#00e400' },
        { low: 55, high: 70, aqi_low: 51, aqi_high: 100, category: 'Moderate', color: '#ffff00' },
        { low: 71, high: 85, aqi_low: 101, aqi_high: 150, category: 'Unhealthy for Sensitive Groups', color: '#ff7e00' },
        { low: 86, high: 105, aqi_low: 151, aqi_high: 200, category: 'Unhealthy', color: '#ff0000' },
        { low: 106, high: 200, aqi_low: 201, aqi_high: 300, category: 'Very Unhealthy', color: '#8f3f97' }
      ]
    };

    this.healthRecommendations = {
      'Good': {
        general: 'Air quality is satisfactory. Enjoy outdoor activities!',
        sensitive: 'No health concerns for sensitive individuals.',
        activities: ['Outdoor exercise', 'Windows open', 'Outdoor events']
      },
      'Moderate': {
        general: 'Air quality is acceptable for most people.',
        sensitive: 'Sensitive individuals may experience minor symptoms.',
        activities: ['Normal outdoor activities', 'Monitor sensitive individuals']
      },
      'Unhealthy for Sensitive Groups': {
        general: 'Most people can continue normal activities.',
        sensitive: 'Sensitive groups should limit prolonged outdoor exertion.',
        activities: ['Reduce outdoor exercise', 'Close windows', 'Use air purifiers']
      },
      'Unhealthy': {
        general: 'Everyone may experience health effects.',
        sensitive: 'Sensitive groups should avoid outdoor activities.',
        activities: ['Limit outdoor activities', 'Wear masks outdoors', 'Stay indoors']
      },
      'Very Unhealthy': {
        general: 'Health alert: everyone may experience serious health effects.',
        sensitive: 'Sensitive groups should remain indoors.',
        activities: ['Avoid outdoor activities', 'Keep windows closed', 'Use air purifiers']
      },
      'Hazardous': {
        general: 'Emergency conditions: everyone should avoid outdoor activities.',
        sensitive: 'Everyone should remain indoors.',
        activities: ['Stay indoors', 'Seal windows/doors', 'Use high-quality air purifiers']
      }
    };
  }

  /**
   * Analyze air quality from sensor data or API
   */
  async analyzeAirQuality(data, location = null) {
    try {
      console.log('🌬️ Starting air quality analysis...');

      let airQualityData;
      
      if (typeof data === 'object' && data.pm25 !== undefined) {
        // Direct sensor data
        airQualityData = data;
      } else if (location) {
        // Fetch from API or simulate based on location
        airQualityData = await this.fetchAirQualityData(location);
      } else {
        // Generate realistic mock data
        airQualityData = this.generateMockAirQualityData();
      }

      // Calculate AQI for each pollutant
      const aqiResults = {};
      const pollutants = ['pm25', 'pm10', 'o3', 'no2', 'so2', 'co'];
      
      pollutants.forEach(pollutant => {
        if (airQualityData[pollutant] !== undefined) {
          aqiResults[pollutant] = this.calculateAQI(pollutant, airQualityData[pollutant]);
        }
      });

      // Determine overall AQI (highest individual AQI)
      const overallAQI = Math.max(...Object.values(aqiResults).map(r => r.aqi));
      const dominantPollutant = Object.keys(aqiResults).find(p => aqiResults[p].aqi === overallAQI);
      const category = aqiResults[dominantPollutant]?.category || 'Unknown';

      // Generate health recommendations
      const recommendations = this.generateHealthRecommendations(category, aqiResults);

      // Calculate air quality trends (mock for now)
      const trends = this.calculateAirQualityTrends(airQualityData);

      // Generate detailed analysis
      const analysis = {
        timestamp: new Date().toISOString(),
        location: location,
        overallAQI: overallAQI,
        category: category,
        dominantPollutant: dominantPollutant,
        color: aqiResults[dominantPollutant]?.color || '#666666',
        pollutants: airQualityData,
        aqiBreakdown: aqiResults,
        healthRecommendations: recommendations,
        trends: trends,
        confidence: this.calculateConfidence(airQualityData),
        dataSource: airQualityData.source || 'Simulated',
        lastUpdated: airQualityData.timestamp || new Date().toISOString()
      };

      console.log('✅ Air quality analysis completed');
      return analysis;

    } catch (error) {
      console.error('Air quality analysis failed:', error);
      throw new Error(`Air quality analysis failed: ${error.message}`);
    }
  }

  /**
   * Calculate AQI for a specific pollutant
   */
  calculateAQI(pollutant, concentration) {
    const breakpoints = this.aqiBreakpoints[pollutant];
    if (!breakpoints) {
      return { aqi: 0, category: 'Unknown', color: '#666666' };
    }

    // Find the appropriate breakpoint
    let breakpoint = breakpoints.find(bp => concentration >= bp.low && concentration <= bp.high);
    
    if (!breakpoint) {
      // Handle values outside normal ranges
      if (concentration < breakpoints[0].low) {
        breakpoint = breakpoints[0];
      } else {
        breakpoint = breakpoints[breakpoints.length - 1];
      }
    }

    // Calculate AQI using linear interpolation
    const aqi = Math.round(
      ((breakpoint.aqi_high - breakpoint.aqi_low) / (breakpoint.high - breakpoint.low)) *
      (concentration - breakpoint.low) + breakpoint.aqi_low
    );

    return {
      aqi: Math.max(0, Math.min(500, aqi)),
      category: breakpoint.category,
      color: breakpoint.color,
      concentration: concentration,
      unit: this.getPollutantUnit(pollutant)
    };
  }

  /**
   * Get pollutant unit
   */
  getPollutantUnit(pollutant) {
    const units = {
      pm25: 'μg/m³',
      pm10: 'μg/m³',
      o3: 'ppb',
      no2: 'ppb',
      so2: 'ppb',
      co: 'ppm'
    };
    return units[pollutant] || '';
  }

  /**
   * Generate health recommendations
   */
  generateHealthRecommendations(category, aqiResults) {
    const baseRecommendations = this.healthRecommendations[category] || this.healthRecommendations['Good'];
    
    const recommendations = {
      ...baseRecommendations,
      specific: []
    };

    // Add specific recommendations based on pollutants
    Object.keys(aqiResults).forEach(pollutant => {
      const result = aqiResults[pollutant];
      if (result.aqi > 100) {
        switch (pollutant) {
          case 'pm25':
          case 'pm10':
            recommendations.specific.push('High particulate matter - consider wearing N95 masks outdoors');
            break;
          case 'o3':
            recommendations.specific.push('High ozone levels - avoid outdoor exercise during peak hours');
            break;
          case 'no2':
            recommendations.specific.push('High nitrogen dioxide - avoid busy roads and traffic areas');
            break;
        }
      }
    });

    return recommendations;
  }

  /**
   * Calculate air quality trends
   */
  calculateAirQualityTrends(currentData) {
    // Mock trend data - in real implementation, this would use historical data
    const trends = {
      hourly: this.generateHourlyTrend(),
      daily: this.generateDailyTrend(),
      weekly: this.generateWeeklyTrend(),
      forecast: this.generateForecast()
    };

    return trends;
  }

  generateHourlyTrend() {
    const hours = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      hours.push({
        time: hour.toISOString(),
        aqi: Math.floor(Math.random() * 100) + 20,
        category: this.getAQICategory(Math.floor(Math.random() * 100) + 20)
      });
    }
    
    return hours;
  }

  generateDailyTrend() {
    const days = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      days.push({
        date: day.toISOString().split('T')[0],
        avgAQI: Math.floor(Math.random() * 80) + 30,
        maxAQI: Math.floor(Math.random() * 120) + 50,
        category: this.getAQICategory(Math.floor(Math.random() * 80) + 30)
      });
    }
    
    return days;
  }

  generateWeeklyTrend() {
    const weeks = [];
    const now = new Date();
    
    for (let i = 3; i >= 0; i--) {
      const week = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      weeks.push({
        week: `Week of ${week.toISOString().split('T')[0]}`,
        avgAQI: Math.floor(Math.random() * 70) + 35,
        trend: Math.random() > 0.5 ? 'improving' : 'worsening'
      });
    }
    
    return weeks;
  }

  generateForecast() {
    const forecast = [];
    const now = new Date();
    
    for (let i = 1; i <= 3; i++) {
      const day = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      forecast.push({
        date: day.toISOString().split('T')[0],
        predictedAQI: Math.floor(Math.random() * 90) + 25,
        category: this.getAQICategory(Math.floor(Math.random() * 90) + 25),
        confidence: Math.floor(Math.random() * 30) + 70
      });
    }
    
    return forecast;
  }

  /**
   * Get AQI category from numeric value
   */
  getAQICategory(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  }

  /**
   * Fetch air quality data from API or simulate
   */
  async fetchAirQualityData(location) {
    // In a real implementation, this would call an actual API
    // For now, generate realistic mock data based on location
    
    console.log('🌐 Fetching air quality data for:', location);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return this.generateMockAirQualityData(location);
  }

  /**
   * Generate realistic mock air quality data
   */
  generateMockAirQualityData(location = null) {
    // Base values that vary by location type
    let baseValues = {
      pm25: 25,
      pm10: 45,
      o3: 60,
      no2: 30,
      so2: 15,
      co: 1.2
    };

    // Adjust based on location characteristics
    if (location) {
      const locationLower = location.toLowerCase();
      
      if (locationLower.includes('urban') || locationLower.includes('city')) {
        baseValues.pm25 += 15;
        baseValues.pm10 += 20;
        baseValues.no2 += 20;
        baseValues.co += 0.8;
      } else if (locationLower.includes('rural') || locationLower.includes('forest')) {
        baseValues.pm25 -= 10;
        baseValues.pm10 -= 15;
        baseValues.no2 -= 15;
        baseValues.co -= 0.5;
        baseValues.o3 += 10; // Higher ozone in rural areas sometimes
      } else if (locationLower.includes('industrial')) {
        baseValues.pm25 += 25;
        baseValues.pm10 += 30;
        baseValues.so2 += 20;
        baseValues.no2 += 25;
      }
    }

    // Add realistic variation
    const variation = 0.3; // 30% variation
    Object.keys(baseValues).forEach(pollutant => {
      const variance = baseValues[pollutant] * variation * (Math.random() - 0.5);
      baseValues[pollutant] = Math.max(0, baseValues[pollutant] + variance);
    });

    // Add time-of-day effects
    const hour = new Date().getHours();
    if (hour >= 7 && hour <= 9) { // Morning rush hour
      baseValues.no2 *= 1.3;
      baseValues.co *= 1.2;
    } else if (hour >= 17 && hour <= 19) { // Evening rush hour
      baseValues.no2 *= 1.4;
      baseValues.co *= 1.3;
    } else if (hour >= 12 && hour <= 16) { // Afternoon ozone peak
      baseValues.o3 *= 1.2;
    }

    return {
      pm25: Math.round(baseValues.pm25 * 10) / 10,
      pm10: Math.round(baseValues.pm10),
      o3: Math.round(baseValues.o3),
      no2: Math.round(baseValues.no2),
      so2: Math.round(baseValues.so2),
      co: Math.round(baseValues.co * 10) / 10,
      timestamp: new Date().toISOString(),
      source: 'Simulated Data',
      location: location
    };
  }

  /**
   * Calculate confidence in air quality data
   */
  calculateConfidence(data) {
    let confidence = 85; // Base confidence
    
    // Reduce confidence if data seems unrealistic
    if (data.pm25 > 200 || data.pm10 > 400) confidence -= 15;
    if (data.o3 > 150) confidence -= 10;
    
    // Increase confidence for consistent data
    const pollutantCount = Object.keys(data).filter(key => 
      typeof data[key] === 'number' && key !== 'timestamp'
    ).length;
    
    if (pollutantCount >= 5) confidence += 10;
    
    return Math.max(60, Math.min(98, confidence));
  }

  /**
   * Generate air quality alerts
   */
  generateAlerts(analysis) {
    const alerts = [];
    
    if (analysis.overallAQI > 150) {
      alerts.push({
        level: 'high',
        message: `Air quality is ${analysis.category}. Limit outdoor activities.`,
        pollutant: analysis.dominantPollutant,
        aqi: analysis.overallAQI
      });
    } else if (analysis.overallAQI > 100) {
      alerts.push({
        level: 'medium',
        message: `Air quality is ${analysis.category}. Sensitive individuals should be cautious.`,
        pollutant: analysis.dominantPollutant,
        aqi: analysis.overallAQI
      });
    }

    // Check for specific pollutant alerts
    Object.keys(analysis.aqiBreakdown).forEach(pollutant => {
      const result = analysis.aqiBreakdown[pollutant];
      if (result.aqi > 200) {
        alerts.push({
          level: 'high',
          message: `Very high ${pollutant.toUpperCase()} levels detected (${result.concentration} ${result.unit})`,
          pollutant: pollutant,
          aqi: result.aqi
        });
      }
    });

    return alerts;
  }
}

// Create singleton instance
export const airQualityAnalyzer = new AirQualityAnalyzer();

// Export main analysis function
export const analyzeAirQuality = async (data, location) => {
  try {
    const analysis = await airQualityAnalyzer.analyzeAirQuality(data, location);
    const alerts = airQualityAnalyzer.generateAlerts(analysis);
    
    return {
      ...analysis,
      alerts: alerts
    };
  } catch (error) {
    console.error('Air quality analysis error:', error);
    throw error;
  }
};

export default airQualityAnalyzer;