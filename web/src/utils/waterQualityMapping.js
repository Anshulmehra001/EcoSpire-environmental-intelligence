/**
 * Aqua-Lens Water Quality Mapping Utilities
 * Real-time mapping and geospatial analysis
 */

import { waterQualityDB } from './waterQualityDatabase.js';

export class WaterQualityMapper {
  constructor() {
    this.mapData = new Map();
    this.alertZones = new Map();
    this.heatmapData = [];
  }

  /**
   * Generate map data for visualization
   */
  async generateMapData(centerLat = null, centerLng = null, radiusKm = 50) {
    try {
      let waterTests;
      
      if (centerLat && centerLng) {
        waterTests = await waterQualityDB.getWaterTestsByLocation(centerLat, centerLng, radiusKm);
      } else {
        waterTests = await waterQualityDB.getAllWaterTests(1000);
      }

      const mapPoints = waterTests
        .filter(test => test.latitude && test.longitude)
        .map(test => ({
          id: test.id,
          lat: test.latitude,
          lng: test.longitude,
          waterSource: test.waterSource,
          quality: test.overallQuality,
          safety: test.safetyLevel,
          timestamp: test.timestamp,
          results: test.results,
          alerts: test.alerts,
          color: this.getQualityColor(test.overallQuality, test.safetyLevel),
          size: this.getMarkerSize(test.confidence),
          popup: this.generatePopupContent(test)
        }));

      return {
        points: mapPoints,
        center: this.calculateCenter(mapPoints),
        bounds: this.calculateBounds(mapPoints),
        statistics: this.calculateMapStatistics(mapPoints)
      };
    } catch (error) {
      console.error('Failed to generate map data:', error);
      return { points: [], center: null, bounds: null, statistics: {} };
    }
  }

  /**
   * Generate alert zones for dangerous areas
   */
  async generateAlertZones(centerLat = null, centerLng = null, radiusKm = 100) {
    try {
      let alerts;
      
      if (centerLat && centerLng) {
        alerts = await waterQualityDB.getAlertsByLocation(centerLat, centerLng, radiusKm);
      } else {
        alerts = await waterQualityDB.getAllAlerts();
      }

      const alertZones = alerts
        .filter(alert => alert.latitude && alert.longitude && !alert.resolved)
        .map(alert => ({
          id: alert.id,
          lat: alert.latitude,
          lng: alert.longitude,
          severity: alert.severity,
          message: alert.message,
          timestamp: alert.timestamp,
          waterSource: alert.waterSource,
          radius: this.getAlertRadius(alert.severity),
          color: this.getAlertColor(alert.severity),
          opacity: this.getAlertOpacity(alert.timestamp)
        }));

      return alertZones;
    } catch (error) {
      console.error('Failed to generate alert zones:', error);
      return [];
    }
  }

  /**
   * Generate heatmap data for water quality visualization
   */
  async generateHeatmapData(parameter = 'overall', centerLat = null, centerLng = null, radiusKm = 50) {
    try {
      let waterTests;
      
      if (centerLat && centerLng) {
        waterTests = await waterQualityDB.getWaterTestsByLocation(centerLat, centerLng, radiusKm);
      } else {
        waterTests = await waterQualityDB.getAllWaterTests(1000);
      }

      const heatmapPoints = waterTests
        .filter(test => test.latitude && test.longitude)
        .map(test => {
          let intensity;
          
          if (parameter === 'overall') {
            intensity = this.getQualityIntensity(test.overallQuality, test.safetyLevel);
          } else if (test.results && test.results[parameter] !== undefined) {
            intensity = this.getParameterIntensity(parameter, test.results[parameter]);
          } else {
            intensity = 0.5; // Default intensity
          }

          return {
            lat: test.latitude,
            lng: test.longitude,
            intensity: intensity,
            weight: test.confidence / 100 || 0.5
          };
        });

      return heatmapPoints;
    } catch (error) {
      console.error('Failed to generate heatmap data:', error);
      return [];
    }
  }

  /**
   * Get quality color for map markers
   */
  getQualityColor(quality, safety) {
    if (safety === 'Unsafe') return '#FF0000'; // Red
    
    switch (quality) {
      case 'Excellent': return '#00FF00'; // Green
      case 'Good': return '#90EE90';      // Light Green
      case 'Fair': return '#FFFF00';      // Yellow
      case 'Poor': return '#FFA500';      // Orange
      default: return '#808080';          // Gray
    }
  }

  /**
   * Get marker size based on confidence
   */
  getMarkerSize(confidence) {
    if (confidence >= 95) return 'large';
    if (confidence >= 85) return 'medium';
    return 'small';
  }

  /**
   * Get alert color based on severity
   */
  getAlertColor(severity) {
    switch (severity) {
      case 'critical': return '#8B0000'; // Dark Red
      case 'high': return '#FF0000';     // Red
      case 'medium': return '#FFA500';   // Orange
      case 'low': return '#FFFF00';      // Yellow
      default: return '#808080';         // Gray
    }
  }

  /**
   * Get alert radius based on severity
   */
  getAlertRadius(severity) {
    switch (severity) {
      case 'critical': return 2000; // 2km
      case 'high': return 1000;     // 1km
      case 'medium': return 500;    // 500m
      case 'low': return 200;       // 200m
      default: return 100;          // 100m
    }
  }

  /**
   * Get alert opacity based on age
   */
  getAlertOpacity(timestamp) {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const ageHours = (now - alertTime) / (1000 * 60 * 60);
    
    if (ageHours < 1) return 0.8;   // Very recent
    if (ageHours < 6) return 0.6;   // Recent
    if (ageHours < 24) return 0.4;  // Today
    if (ageHours < 168) return 0.2; // This week
    return 0.1; // Older
  }

  /**
   * Get quality intensity for heatmap (0-1 scale)
   */
  getQualityIntensity(quality, safety) {
    if (safety === 'Unsafe') return 1.0;
    
    switch (quality) {
      case 'Poor': return 0.8;
      case 'Fair': return 0.6;
      case 'Good': return 0.3;
      case 'Excellent': return 0.1;
      default: return 0.5;
    }
  }

  /**
   * Get parameter intensity for heatmap
   */
  getParameterIntensity(parameter, value) {
    const standards = {
      ph: { safe: [6.5, 8.5], critical: [5.0, 9.5] },
      chlorine: { safe: [0.2, 2.0], critical: [0, 5.0] },
      nitrates: { safe: [0, 10], critical: [0, 50] },
      hardness: { safe: [60, 120], critical: [0, 400] },
      alkalinity: { safe: [80, 120], critical: [0, 300] },
      bacteria: { safe: [0, 0], critical: [0, 1] }
    };

    const standard = standards[parameter];
    if (!standard) return 0.5;

    // Check if value is in critical range
    if (value < standard.critical[0] || value > standard.critical[1]) {
      return 1.0; // Maximum intensity
    }

    // Check if value is outside safe range
    if (value < standard.safe[0] || value > standard.safe[1]) {
      return 0.7; // High intensity
    }

    // Value is in safe range
    return 0.2; // Low intensity
  }

  /**
   * Generate popup content for map markers
   */
  generatePopupContent(test) {
    const date = new Date(test.timestamp).toLocaleDateString();
    const time = new Date(test.timestamp).toLocaleTimeString();
    
    let content = `
      <div class="water-quality-popup">
        <h4>${test.waterSource}</h4>
        <p><strong>Quality:</strong> ${test.overallQuality}</p>
        <p><strong>Safety:</strong> ${test.safetyLevel}</p>
        <p><strong>Date:</strong> ${date} ${time}</p>
    `;

    if (test.results) {
      content += '<div class="parameters">';
      Object.keys(test.results).forEach(param => {
        const value = test.results[param];
        const unit = this.getParameterUnit(param);
        content += `<p><strong>${param}:</strong> ${value}${unit}</p>`;
      });
      content += '</div>';
    }

    if (test.alerts && test.alerts.length > 0) {
      content += '<div class="alerts">';
      content += '<p><strong>Alerts:</strong></p>';
      test.alerts.forEach(alert => {
        content += `<p class="alert">⚠️ ${alert}</p>`;
      });
      content += '</div>';
    }

    content += '</div>';
    return content;
  }

  /**
   * Get parameter unit
   */
  getParameterUnit(parameter) {
    const units = {
      ph: '',
      chlorine: ' ppm',
      nitrates: ' ppm',
      hardness: ' ppm',
      alkalinity: ' ppm',
      bacteria: ''
    };
    return units[parameter] || '';
  }

  /**
   * Calculate map center from points
   */
  calculateCenter(points) {
    if (points.length === 0) return null;

    const totalLat = points.reduce((sum, point) => sum + point.lat, 0);
    const totalLng = points.reduce((sum, point) => sum + point.lng, 0);

    return {
      lat: totalLat / points.length,
      lng: totalLng / points.length
    };
  }

  /**
   * Calculate map bounds from points
   */
  calculateBounds(points) {
    if (points.length === 0) return null;

    const lats = points.map(p => p.lat);
    const lngs = points.map(p => p.lng);

    return {
      north: Math.max(...lats),
      south: Math.min(...lats),
      east: Math.max(...lngs),
      west: Math.min(...lngs)
    };
  }

  /**
   * Calculate map statistics
   */
  calculateMapStatistics(points) {
    if (points.length === 0) return {};

    const stats = {
      totalPoints: points.length,
      safePoints: points.filter(p => p.safety === 'Safe').length,
      unsafePoints: points.filter(p => p.safety === 'Unsafe').length,
      qualityDistribution: {
        excellent: points.filter(p => p.quality === 'Excellent').length,
        good: points.filter(p => p.quality === 'Good').length,
        fair: points.filter(p => p.quality === 'Fair').length,
        poor: points.filter(p => p.quality === 'Poor').length
      },
      sourceDistribution: {}
    };

    // Calculate source distribution
    points.forEach(point => {
      const source = point.waterSource || 'Unknown';
      stats.sourceDistribution[source] = (stats.sourceDistribution[source] || 0) + 1;
    });

    return stats;
  }

  /**
   * Find nearby water sources
   */
  async findNearbyWaterSources(latitude, longitude, radiusKm = 5, limit = 10) {
    try {
      const nearbyTests = await waterQualityDB.getWaterTestsByLocation(latitude, longitude, radiusKm);
      
      // Group by location (approximate)
      const locationGroups = new Map();
      
      nearbyTests.forEach(test => {
        const key = `${test.latitude.toFixed(3)}_${test.longitude.toFixed(3)}`;
        if (!locationGroups.has(key)) {
          locationGroups.set(key, []);
        }
        locationGroups.get(key).push(test);
      });

      // Convert to nearby sources with latest data
      const nearbySources = Array.from(locationGroups.entries()).map(([key, tests]) => {
        const latestTest = tests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        const distance = this.calculateDistance(latitude, longitude, latestTest.latitude, latestTest.longitude);
        
        return {
          location: {
            lat: latestTest.latitude,
            lng: latestTest.longitude
          },
          distance: distance,
          waterSource: latestTest.waterSource,
          latestQuality: latestTest.overallQuality,
          latestSafety: latestTest.safetyLevel,
          testCount: tests.length,
          lastTested: latestTest.timestamp,
          averageQuality: this.calculateAverageQuality(tests)
        };
      });

      // Sort by distance and limit results
      return nearbySources
        .sort((a, b) => a.distance - b.distance)
        .slice(0, limit);

    } catch (error) {
      console.error('Failed to find nearby water sources:', error);
      return [];
    }
  }

  /**
   * Calculate average quality from multiple tests
   */
  calculateAverageQuality(tests) {
    const qualityScores = {
      'Excellent': 4,
      'Good': 3,
      'Fair': 2,
      'Poor': 1
    };

    const totalScore = tests.reduce((sum, test) => {
      return sum + (qualityScores[test.overallQuality] || 1);
    }, 0);

    const averageScore = totalScore / tests.length;
    
    if (averageScore >= 3.5) return 'Excellent';
    if (averageScore >= 2.5) return 'Good';
    if (averageScore >= 1.5) return 'Fair';
    return 'Poor';
  }

  /**
   * Calculate distance between two coordinates
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Convert degrees to radians
   */
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Generate contamination risk assessment
   */
  async generateRiskAssessment(latitude, longitude, radiusKm = 10) {
    try {
      const nearbyTests = await waterQualityDB.getWaterTestsByLocation(latitude, longitude, radiusKm);
      const nearbyAlerts = await waterQualityDB.getAlertsByLocation(latitude, longitude, radiusKm);

      const riskFactors = {
        unsafeWaterPercentage: 0,
        recentContamination: false,
        multipleAlerts: false,
        poorQualityTrend: false,
        highRiskSources: []
      };

      if (nearbyTests.length > 0) {
        const unsafeTests = nearbyTests.filter(test => test.safetyLevel === 'Unsafe');
        riskFactors.unsafeWaterPercentage = (unsafeTests.length / nearbyTests.length) * 100;

        // Check for recent contamination (last 7 days)
        const recentTests = nearbyTests.filter(test => {
          const testDate = new Date(test.timestamp);
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return testDate > weekAgo && test.safetyLevel === 'Unsafe';
        });
        riskFactors.recentContamination = recentTests.length > 0;

        // Identify high-risk sources
        const sourceRisks = {};
        nearbyTests.forEach(test => {
          const source = test.waterSource;
          if (!sourceRisks[source]) {
            sourceRisks[source] = { total: 0, unsafe: 0 };
          }
          sourceRisks[source].total++;
          if (test.safetyLevel === 'Unsafe') {
            sourceRisks[source].unsafe++;
          }
        });

        Object.keys(sourceRisks).forEach(source => {
          const risk = sourceRisks[source];
          const unsafePercentage = (risk.unsafe / risk.total) * 100;
          if (unsafePercentage > 30) { // More than 30% unsafe
            riskFactors.highRiskSources.push({
              source: source,
              unsafePercentage: unsafePercentage,
              testCount: risk.total
            });
          }
        });
      }

      // Check for multiple active alerts
      const activeAlerts = nearbyAlerts.filter(alert => !alert.resolved);
      riskFactors.multipleAlerts = activeAlerts.length > 2;

      // Calculate overall risk level
      let riskLevel = 'Low';
      let riskScore = 0;

      if (riskFactors.unsafeWaterPercentage > 50) riskScore += 3;
      else if (riskFactors.unsafeWaterPercentage > 25) riskScore += 2;
      else if (riskFactors.unsafeWaterPercentage > 10) riskScore += 1;

      if (riskFactors.recentContamination) riskScore += 2;
      if (riskFactors.multipleAlerts) riskScore += 2;
      if (riskFactors.highRiskSources.length > 0) riskScore += 1;

      if (riskScore >= 6) riskLevel = 'Very High';
      else if (riskScore >= 4) riskLevel = 'High';
      else if (riskScore >= 2) riskLevel = 'Medium';

      return {
        riskLevel: riskLevel,
        riskScore: riskScore,
        factors: riskFactors,
        nearbyTestCount: nearbyTests.length,
        activeAlertCount: activeAlerts.length,
        recommendations: this.generateRiskRecommendations(riskLevel, riskFactors)
      };

    } catch (error) {
      console.error('Failed to generate risk assessment:', error);
      return {
        riskLevel: 'Unknown',
        riskScore: 0,
        factors: {},
        recommendations: ['Unable to assess risk - insufficient data']
      };
    }
  }

  /**
   * Generate risk-based recommendations
   */
  generateRiskRecommendations(riskLevel, riskFactors) {
    const recommendations = [];

    switch (riskLevel) {
      case 'Very High':
        recommendations.push('⚠️ URGENT: Avoid local water sources until further testing');
        recommendations.push('Use bottled water for drinking and cooking');
        recommendations.push('Contact local health authorities immediately');
        break;
      
      case 'High':
        recommendations.push('⚠️ Exercise extreme caution with local water sources');
        recommendations.push('Boil water for at least 1 minute before consumption');
        recommendations.push('Consider alternative water sources');
        break;
      
      case 'Medium':
        recommendations.push('⚠️ Test water before consumption');
        recommendations.push('Monitor local water quality reports');
        recommendations.push('Consider water filtration systems');
        break;
      
      case 'Low':
        recommendations.push('✅ Local water quality appears acceptable');
        recommendations.push('Continue regular testing for peace of mind');
        break;
    }

    if (riskFactors.highRiskSources && riskFactors.highRiskSources.length > 0) {
      recommendations.push(`Avoid these high-risk sources: ${riskFactors.highRiskSources.map(s => s.source).join(', ')}`);
    }

    if (riskFactors.recentContamination) {
      recommendations.push('Recent contamination detected - exercise extra caution');
    }

    return recommendations;
  }
}

// Create singleton instance
export const waterQualityMapper = new WaterQualityMapper();

export default waterQualityMapper;