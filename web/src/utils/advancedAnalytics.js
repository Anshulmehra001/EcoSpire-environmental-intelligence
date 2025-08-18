// Advanced Analytics System for EcoSpire
class AdvancedAnalytics {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 10 * 60 * 1000; // 10 minutes
  }

  // Environmental Impact Analysis
  async calculateEnvironmentalImpact(userData) {
    try {
      const impact = {
        carbonFootprint: this.calculateCarbonFootprint(userData),
        waterUsage: this.calculateWaterUsage(userData),
        wasteGeneration: this.calculateWasteGeneration(userData),
        energyConsumption: this.calculateEnergyConsumption(userData),
        biodiversityImpact: this.calculateBiodiversityImpact(userData),
        overallScore: 0
      };

      // Calculate overall environmental score (0-100)
      impact.overallScore = this.calculateOverallScore(impact);
      
      // Generate recommendations
      impact.recommendations = this.generateRecommendations(impact);
      
      // Calculate trends
      impact.trends = await this.calculateTrends(userData);
      
      return impact;
    } catch (error) {
      console.error('Failed to calculate environmental impact:', error);
      return this.getDefaultImpact();
    }
  }

  calculateCarbonFootprint(userData) {
    const activities = userData.activities || [];
    let totalCarbon = 0;
    const breakdown = {
      transportation: 0,
      energy: 0,
      food: 0,
      waste: 0,
      other: 0
    };

    activities.forEach(activity => {
      const carbon = this.getActivityCarbon(activity);
      totalCarbon += carbon.amount;
      breakdown[carbon.category] += carbon.amount;
    });

    return {
      total: Math.round(totalCarbon * 100) / 100,
      breakdown: breakdown,
      comparison: {
        globalAverage: 4800, // kg CO2/year
        countryAverage: 16000, // kg CO2/year (US)
        target: 2300 // kg CO2/year (Paris Agreement target)
      },
      trend: this.calculateCarbonTrend(activities)
    };
  }

  getActivityCarbon(activity) {
    const carbonFactors = {
      // Transportation (kg CO2 per unit)
      'car_gasoline': { factor: 0.404, unit: 'km', category: 'transportation' },
      'car_electric': { factor: 0.053, unit: 'km', category: 'transportation' },
      'bus': { factor: 0.089, unit: 'km', category: 'transportation' },
      'train': { factor: 0.041, unit: 'km', category: 'transportation' },
      'flight_domestic': { factor: 0.255, unit: 'km', category: 'transportation' },
      'flight_international': { factor: 0.195, unit: 'km', category: 'transportation' },
      
      // Energy (kg CO2 per kWh)
      'electricity_grid': { factor: 0.475, unit: 'kWh', category: 'energy' },
      'electricity_renewable': { factor: 0.024, unit: 'kWh', category: 'energy' },
      'natural_gas': { factor: 0.202, unit: 'kWh', category: 'energy' },
      'heating_oil': { factor: 0.264, unit: 'kWh', category: 'energy' },
      
      // Food (kg CO2 per kg)
      'beef': { factor: 60.0, unit: 'kg', category: 'food' },
      'lamb': { factor: 24.0, unit: 'kg', category: 'food' },
      'pork': { factor: 7.0, unit: 'kg', category: 'food' },
      'chicken': { factor: 6.0, unit: 'kg', category: 'food' },
      'fish': { factor: 5.0, unit: 'kg', category: 'food' },
      'dairy': { factor: 3.2, unit: 'kg', category: 'food' },
      'vegetables': { factor: 2.0, unit: 'kg', category: 'food' },
      'fruits': { factor: 1.1, unit: 'kg', category: 'food' },
      
      // Waste (kg CO2 per kg)
      'landfill_waste': { factor: 0.57, unit: 'kg', category: 'waste' },
      'recycled_waste': { factor: -0.3, unit: 'kg', category: 'waste' },
      'composted_waste': { factor: -0.1, unit: 'kg', category: 'waste' }
    };

    const factor = carbonFactors[activity.type] || { factor: 0, category: 'other' };
    return {
      amount: (activity.amount || 0) * factor.factor,
      category: factor.category
    };
  }

  calculateWaterUsage(userData) {
    const activities = userData.activities || [];
    let totalWater = 0;
    const breakdown = {
      domestic: 0,
      food: 0,
      energy: 0,
      transportation: 0,
      other: 0
    };

    // Water footprint calculations (liters per unit)
    const waterFactors = {
      'shower': { factor: 65, unit: 'minute', category: 'domestic' },
      'bath': { factor: 150, unit: 'bath', category: 'domestic' },
      'dishwasher': { factor: 15, unit: 'cycle', category: 'domestic' },
      'washing_machine': { factor: 50, unit: 'cycle', category: 'domestic' },
      'beef': { factor: 15400, unit: 'kg', category: 'food' },
      'pork': { factor: 6000, unit: 'kg', category: 'food' },
      'chicken': { factor: 4300, unit: 'kg', category: 'food' },
      'vegetables': { factor: 322, unit: 'kg', category: 'food' },
      'electricity': { factor: 1.4, unit: 'kWh', category: 'energy' }
    };

    activities.forEach(activity => {
      const factor = waterFactors[activity.type];
      if (factor) {
        const water = (activity.amount || 0) * factor.factor;
        totalWater += water;
        breakdown[factor.category] += water;
      }
    });

    return {
      total: Math.round(totalWater),
      breakdown: breakdown,
      comparison: {
        globalAverage: 1385000, // liters/year
        countryAverage: 2842000, // liters/year (US)
        target: 1000000 // liters/year (sustainable target)
      }
    };
  }

  calculateWasteGeneration(userData) {
    const activities = userData.activities || [];
    let totalWaste = 0;
    const breakdown = {
      landfill: 0,
      recycled: 0,
      composted: 0,
      hazardous: 0
    };

    activities.forEach(activity => {
      if (activity.type.includes('waste')) {
        const amount = activity.amount || 0;
        totalWaste += amount;
        
        if (activity.type.includes('recycled')) {
          breakdown.recycled += amount;
        } else if (activity.type.includes('composted')) {
          breakdown.composted += amount;
        } else if (activity.type.includes('hazardous')) {
          breakdown.hazardous += amount;
        } else {
          breakdown.landfill += amount;
        }
      }
    });

    const recyclingRate = totalWaste > 0 ? (breakdown.recycled + breakdown.composted) / totalWaste * 100 : 0;

    return {
      total: Math.round(totalWaste * 100) / 100,
      breakdown: breakdown,
      recyclingRate: Math.round(recyclingRate * 100) / 100,
      comparison: {
        globalAverage: 740, // kg/year
        countryAverage: 811, // kg/year (US)
        target: 400 // kg/year (sustainable target)
      }
    };
  }

  calculateEnergyConsumption(userData) {
    const activities = userData.activities || [];
    let totalEnergy = 0;
    const breakdown = {
      heating: 0,
      cooling: 0,
      appliances: 0,
      lighting: 0,
      transportation: 0,
      other: 0
    };

    // Energy consumption factors (kWh per unit)
    const energyFactors = {
      'heating': { factor: 15, unit: 'day', category: 'heating' },
      'cooling': { factor: 12, unit: 'day', category: 'cooling' },
      'refrigerator': { factor: 1.5, unit: 'day', category: 'appliances' },
      'washing_machine': { factor: 2.3, unit: 'cycle', category: 'appliances' },
      'dishwasher': { factor: 1.8, unit: 'cycle', category: 'appliances' },
      'led_lighting': { factor: 0.01, unit: 'hour', category: 'lighting' },
      'incandescent_lighting': { factor: 0.06, unit: 'hour', category: 'lighting' },
      'car_electric': { factor: 0.2, unit: 'km', category: 'transportation' }
    };

    activities.forEach(activity => {
      const factor = energyFactors[activity.type];
      if (factor) {
        const energy = (activity.amount || 0) * factor.factor;
        totalEnergy += energy;
        breakdown[factor.category] += energy;
      }
    });

    const renewablePercentage = this.calculateRenewablePercentage(userData);

    return {
      total: Math.round(totalEnergy * 100) / 100,
      breakdown: breakdown,
      renewablePercentage: renewablePercentage,
      comparison: {
        globalAverage: 3500, // kWh/year
        countryAverage: 10500, // kWh/year (US)
        target: 2000 // kWh/year (sustainable target)
      }
    };
  }

  calculateBiodiversityImpact(userData) {
    const activities = userData.activities || [];
    let positiveImpact = 0;
    let negativeImpact = 0;

    // Biodiversity impact factors
    const biodiversityFactors = {
      'tree_planting': { factor: 10, type: 'positive' },
      'native_gardening': { factor: 5, type: 'positive' },
      'habitat_restoration': { factor: 15, type: 'positive' },
      'pesticide_use': { factor: -8, type: 'negative' },
      'land_clearing': { factor: -20, type: 'negative' },
      'invasive_species_removal': { factor: 8, type: 'positive' },
      'wildlife_feeding': { factor: 3, type: 'positive' },
      'composting': { factor: 2, type: 'positive' }
    };

    activities.forEach(activity => {
      const factor = biodiversityFactors[activity.type];
      if (factor) {
        const impact = (activity.amount || 0) * factor.factor;
        if (factor.type === 'positive') {
          positiveImpact += impact;
        } else {
          negativeImpact += Math.abs(impact);
        }
      }
    });

    const netImpact = positiveImpact - negativeImpact;

    return {
      positive: Math.round(positiveImpact * 100) / 100,
      negative: Math.round(negativeImpact * 100) / 100,
      net: Math.round(netImpact * 100) / 100,
      score: Math.max(0, Math.min(100, 50 + netImpact * 2)) // Scale to 0-100
    };
  }

  calculateOverallScore(impact) {
    // Weighted scoring system (0-100)
    const weights = {
      carbon: 0.3,
      water: 0.2,
      waste: 0.2,
      energy: 0.2,
      biodiversity: 0.1
    };

    let score = 0;

    // Carbon score (lower is better)
    const carbonScore = Math.max(0, 100 - (impact.carbonFootprint.total / impact.carbonFootprint.comparison.target * 100));
    score += carbonScore * weights.carbon;

    // Water score (lower is better)
    const waterScore = Math.max(0, 100 - (impact.waterUsage.total / impact.waterUsage.comparison.target * 100));
    score += waterScore * weights.water;

    // Waste score (higher recycling rate is better)
    const wasteScore = impact.wasteGeneration.recyclingRate;
    score += wasteScore * weights.waste;

    // Energy score (lower consumption + higher renewable percentage is better)
    const energyScore = Math.max(0, 100 - (impact.energyConsumption.total / impact.energyConsumption.comparison.target * 100)) * 0.7 + 
                       impact.energyConsumption.renewablePercentage * 0.3;
    score += energyScore * weights.energy;

    // Biodiversity score
    score += impact.biodiversityImpact.score * weights.biodiversity;

    return Math.round(Math.max(0, Math.min(100, score)));
  }

  generateRecommendations(impact) {
    const recommendations = [];

    // Carbon recommendations
    if (impact.carbonFootprint.total > impact.carbonFootprint.comparison.target) {
      if (impact.carbonFootprint.breakdown.transportation > impact.carbonFootprint.total * 0.4) {
        recommendations.push({
          category: 'Transportation',
          priority: 'high',
          action: 'Switch to electric vehicle or use public transport',
          potential: `Save ${Math.round((impact.carbonFootprint.breakdown.transportation * 0.6))} kg CO₂/year`,
          difficulty: 'medium'
        });
      }
      
      if (impact.carbonFootprint.breakdown.energy > impact.carbonFootprint.total * 0.3) {
        recommendations.push({
          category: 'Energy',
          priority: 'high',
          action: 'Switch to renewable energy provider',
          potential: `Save ${Math.round((impact.carbonFootprint.breakdown.energy * 0.8))} kg CO₂/year`,
          difficulty: 'easy'
        });
      }
    }

    // Water recommendations
    if (impact.waterUsage.total > impact.waterUsage.comparison.target) {
      recommendations.push({
        category: 'Water',
        priority: 'medium',
        action: 'Install low-flow fixtures and fix leaks',
        potential: `Save ${Math.round((impact.waterUsage.total * 0.2))} liters/year`,
        difficulty: 'easy'
      });
    }

    // Waste recommendations
    if (impact.wasteGeneration.recyclingRate < 50) {
      recommendations.push({
        category: 'Waste',
        priority: 'medium',
        action: 'Increase recycling and composting',
        potential: `Divert ${Math.round((impact.wasteGeneration.breakdown.landfill * 0.6))} kg from landfill`,
        difficulty: 'easy'
      });
    }

    // Biodiversity recommendations
    if (impact.biodiversityImpact.net < 10) {
      recommendations.push({
        category: 'Biodiversity',
        priority: 'low',
        action: 'Plant native species or create wildlife habitat',
        potential: 'Improve local ecosystem health',
        difficulty: 'medium'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  async calculateTrends(userData) {
    // Calculate trends over time
    const activities = userData.activities || [];
    const monthlyData = this.groupActivitiesByMonth(activities);
    
    return {
      carbon: this.calculateTrendDirection(monthlyData, 'carbon'),
      water: this.calculateTrendDirection(monthlyData, 'water'),
      waste: this.calculateTrendDirection(monthlyData, 'waste'),
      energy: this.calculateTrendDirection(monthlyData, 'energy')
    };
  }

  groupActivitiesByMonth(activities) {
    const grouped = {};
    
    activities.forEach(activity => {
      const date = new Date(activity.timestamp || Date.now());
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(activity);
    });
    
    return grouped;
  }

  calculateTrendDirection(monthlyData, category) {
    const months = Object.keys(monthlyData).sort();
    if (months.length < 2) return 'insufficient_data';
    
    const values = months.map(month => {
      const activities = monthlyData[month];
      return this.calculateCategoryTotal(activities, category);
    });
    
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    const change = ((secondAvg - firstAvg) / firstAvg) * 100;
    
    if (Math.abs(change) < 5) return 'stable';
    return change > 0 ? 'increasing' : 'decreasing';
  }

  calculateCategoryTotal(activities, category) {
    return activities.reduce((total, activity) => {
      const carbon = this.getActivityCarbon(activity);
      if (carbon.category === category) {
        return total + carbon.amount;
      }
      return total;
    }, 0);
  }

  calculateRenewablePercentage(userData) {
    // Calculate percentage of energy from renewable sources
    const energyActivities = userData.activities?.filter(a => a.type.includes('electricity')) || [];
    const renewableActivities = energyActivities.filter(a => a.type.includes('renewable'));
    
    if (energyActivities.length === 0) return 0;
    
    const totalEnergy = energyActivities.reduce((sum, a) => sum + (a.amount || 0), 0);
    const renewableEnergy = renewableActivities.reduce((sum, a) => sum + (a.amount || 0), 0);
    
    return totalEnergy > 0 ? Math.round((renewableEnergy / totalEnergy) * 100) : 0;
  }

  calculateCarbonTrend(activities) {
    // Simple trend calculation
    const recentActivities = activities.slice(-30); // Last 30 activities
    const olderActivities = activities.slice(-60, -30); // Previous 30 activities
    
    if (recentActivities.length === 0 || olderActivities.length === 0) {
      return 'insufficient_data';
    }
    
    const recentCarbon = recentActivities.reduce((sum, a) => sum + this.getActivityCarbon(a).amount, 0);
    const olderCarbon = olderActivities.reduce((sum, a) => sum + this.getActivityCarbon(a).amount, 0);
    
    const change = ((recentCarbon - olderCarbon) / olderCarbon) * 100;
    
    if (Math.abs(change) < 5) return 'stable';
    return change > 0 ? 'increasing' : 'decreasing';
  }

  getDefaultImpact() {
    return {
      carbonFootprint: { total: 0, breakdown: {}, comparison: {}, trend: 'unknown' },
      waterUsage: { total: 0, breakdown: {}, comparison: {} },
      wasteGeneration: { total: 0, breakdown: {}, recyclingRate: 0, comparison: {} },
      energyConsumption: { total: 0, breakdown: {}, renewablePercentage: 0, comparison: {} },
      biodiversityImpact: { positive: 0, negative: 0, net: 0, score: 50 },
      overallScore: 0,
      recommendations: [],
      trends: {}
    };
  }

  // Predictive Analytics
  async predictFutureImpact(userData, timeframe = 12) {
    const currentImpact = await this.calculateEnvironmentalImpact(userData);
    const trends = currentImpact.trends;
    
    const predictions = {
      carbon: this.predictValue(currentImpact.carbonFootprint.total, trends.carbon, timeframe),
      water: this.predictValue(currentImpact.waterUsage.total, trends.water, timeframe),
      waste: this.predictValue(currentImpact.wasteGeneration.total, trends.waste, timeframe),
      energy: this.predictValue(currentImpact.energyConsumption.total, trends.energy, timeframe)
    };
    
    return {
      timeframe: `${timeframe} months`,
      predictions: predictions,
      confidence: this.calculatePredictionConfidence(userData),
      recommendations: this.generatePredictiveRecommendations(predictions, currentImpact)
    };
  }

  predictValue(currentValue, trend, months) {
    const trendMultipliers = {
      'increasing': 1.05, // 5% increase per month
      'decreasing': 0.95, // 5% decrease per month
      'stable': 1.0,
      'insufficient_data': 1.0,
      'unknown': 1.0
    };
    
    const multiplier = trendMultipliers[trend] || 1.0;
    return Math.round(currentValue * Math.pow(multiplier, months) * 100) / 100;
  }

  calculatePredictionConfidence(userData) {
    const activities = userData.activities || [];
    const dataPoints = activities.length;
    const timeSpan = this.calculateTimeSpan(activities);
    
    if (dataPoints < 10) return 'low';
    if (dataPoints < 50 || timeSpan < 30) return 'medium';
    return 'high';
  }

  calculateTimeSpan(activities) {
    if (activities.length === 0) return 0;
    
    const timestamps = activities.map(a => new Date(a.timestamp || Date.now()).getTime());
    const earliest = Math.min(...timestamps);
    const latest = Math.max(...timestamps);
    
    return Math.floor((latest - earliest) / (1000 * 60 * 60 * 24)); // Days
  }

  generatePredictiveRecommendations(predictions, currentImpact) {
    const recommendations = [];
    
    // Check if predictions exceed targets
    if (predictions.carbon > currentImpact.carbonFootprint.comparison.target) {
      recommendations.push({
        category: 'Carbon',
        urgency: 'high',
        action: 'Implement carbon reduction strategies now to avoid exceeding targets',
        timeline: 'immediate'
      });
    }
    
    if (predictions.water > currentImpact.waterUsage.comparison.target) {
      recommendations.push({
        category: 'Water',
        urgency: 'medium',
        action: 'Implement water conservation measures',
        timeline: '3 months'
      });
    }
    
    return recommendations;
  }
}

export const advancedAnalytics = new AdvancedAnalytics();
export default advancedAnalytics;