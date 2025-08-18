/**
 * Carbon Footprint Tracker
 * Comprehensive carbon footprint calculation and tracking system
 */

export class CarbonFootprintTracker {
  constructor() {
    // Emission factors (kg CO2e per unit)
    this.emissionFactors = {
      transportation: {
        car_gasoline: 0.404, // per mile
        car_diesel: 0.411,
        car_hybrid: 0.200,
        car_electric: 0.100, // varies by grid
        bus: 0.089,
        train: 0.045,
        subway: 0.040,
        bicycle: 0.000,
        walking: 0.000,
        motorcycle: 0.280,
        airplane_domestic: 0.255, // per mile
        airplane_international: 0.195,
        taxi: 0.450,
        rideshare: 0.350
      },
      energy: {
        electricity_grid: 0.707, // per kWh (US average)
        electricity_renewable: 0.050,
        natural_gas: 5.300, // per therm
        heating_oil: 10.180, // per gallon
        propane: 5.750, // per gallon
        coal: 2.230, // per kg
        wood: 0.000 // considered carbon neutral
      },
      food: {
        beef: 27.0, // per kg
        lamb: 24.5,
        pork: 7.6,
        chicken: 4.6,
        fish: 3.0,
        dairy: 3.2,
        eggs: 1.9,
        rice: 2.3,
        vegetables: 0.4,
        fruits: 0.3,
        grains: 0.8,
        legumes: 0.4,
        nuts: 0.3
      },
      waste: {
        landfill: 0.57, // per kg
        recycling: -0.30, // negative = avoided emissions
        composting: -0.20,
        incineration: 0.40
      },
      water: {
        tap_water: 0.0004, // per liter
        bottled_water: 0.24, // per liter
        shower: 0.006, // per minute
        bath: 0.024, // per bath
        dishwasher: 0.012, // per load
        washing_machine: 0.018 // per load
      }
    };

    // Activity categories and their typical ranges
    this.activityRanges = {
      transportation: { min: 0, max: 50, unit: 'kg CO2e/day' },
      energy: { min: 0, max: 30, unit: 'kg CO2e/day' },
      food: { min: 1, max: 15, unit: 'kg CO2e/day' },
      waste: { min: 0, max: 5, unit: 'kg CO2e/day' },
      water: { min: 0, max: 3, unit: 'kg CO2e/day' }
    };

    // Global averages for comparison
    this.globalAverages = {
      daily: 16.4, // kg CO2e per person per day (global average)
      annual: 6000, // kg CO2e per person per year
      sustainable: 2300 // kg CO2e per person per year (1.5°C target)
    };
  }

  /**
   * Calculate carbon footprint from activities
   */
  async calculateCarbonFootprint(activities, timeframe = 'daily') {
    try {
      console.log('🌱 Calculating carbon footprint...');

      const footprint = {
        timestamp: new Date().toISOString(),
        timeframe: timeframe,
        activities: activities,
        breakdown: {},
        total: 0,
        comparison: {},
        recommendations: [],
        trends: {},
        confidence: 90
      };

      // Calculate emissions by category
      Object.keys(this.emissionFactors).forEach(category => {
        footprint.breakdown[category] = this.calculateCategoryEmissions(category, activities[category] || {});
        footprint.total += footprint.breakdown[category].total;
      });

      // Scale to requested timeframe
      footprint.total = this.scaleToTimeframe(footprint.total, 'daily', timeframe);
      Object.keys(footprint.breakdown).forEach(category => {
        footprint.breakdown[category].total = this.scaleToTimeframe(
          footprint.breakdown[category].total, 'daily', timeframe
        );
      });

      // Generate comparisons
      footprint.comparison = this.generateComparisons(footprint.total, timeframe);

      // Generate recommendations
      footprint.recommendations = this.generateRecommendations(footprint.breakdown, footprint.total);

      // Calculate trends (mock for now)
      footprint.trends = this.calculateTrends(footprint);

      // Assess confidence
      footprint.confidence = this.assessConfidence(activities);

      console.log('✅ Carbon footprint calculation completed');
      return footprint;

    } catch (error) {
      console.error('Carbon footprint calculation failed:', error);
      throw new Error(`Carbon footprint calculation failed: ${error.message}`);
    }
  }

  /**
   * Calculate emissions for a specific category
   */
  calculateCategoryEmissions(category, activities) {
    const categoryData = {
      total: 0,
      activities: {},
      percentage: 0
    };

    const factors = this.emissionFactors[category];
    if (!factors) return categoryData;

    Object.keys(activities).forEach(activity => {
      const amount = activities[activity];
      const factor = factors[activity];
      
      if (factor && amount > 0) {
        const emissions = amount * factor;
        categoryData.activities[activity] = {
          amount: amount,
          factor: factor,
          emissions: Math.round(emissions * 1000) / 1000,
          unit: this.getActivityUnit(category, activity)
        };
        categoryData.total += emissions;
      }
    });

    categoryData.total = Math.round(categoryData.total * 1000) / 1000;
    return categoryData;
  }

  /**
   * Get unit for activity
   */
  getActivityUnit(category, activity) {
    const units = {
      transportation: 'miles',
      energy: category === 'energy' && activity.includes('electricity') ? 'kWh' : 
              activity.includes('gas') ? 'therms' : 'gallons',
      food: 'kg',
      waste: 'kg',
      water: activity.includes('shower') ? 'minutes' : 
             activity.includes('load') ? 'loads' : 'liters'
    };
    return units[category] || 'units';
  }

  /**
   * Scale emissions to different timeframes
   */
  scaleToTimeframe(dailyEmissions, fromTimeframe, toTimeframe) {
    const scales = {
      daily: 1,
      weekly: 7,
      monthly: 30.44, // average days per month
      annual: 365.25
    };

    const fromScale = scales[fromTimeframe] || 1;
    const toScale = scales[toTimeframe] || 1;
    
    return (dailyEmissions / fromScale) * toScale;
  }

  /**
   * Generate comparisons with averages and targets
   */
  generateComparisons(totalEmissions, timeframe) {
    const dailyEmissions = this.scaleToTimeframe(totalEmissions, timeframe, 'daily');
    const annualEmissions = this.scaleToTimeframe(totalEmissions, timeframe, 'annual');

    return {
      vsGlobalAverage: {
        value: Math.round((dailyEmissions / this.globalAverages.daily) * 100),
        message: dailyEmissions > this.globalAverages.daily ? 'above' : 'below'
      },
      vsSustainableTarget: {
        value: Math.round((annualEmissions / this.globalAverages.sustainable) * 100),
        message: annualEmissions > this.globalAverages.sustainable ? 'above' : 'below'
      },
      annualProjection: Math.round(annualEmissions),
      dailyAverage: Math.round(dailyEmissions * 100) / 100,
      category: this.getCarbonFootprintCategory(annualEmissions)
    };
  }

  /**
   * Get carbon footprint category
   */
  getCarbonFootprintCategory(annualEmissions) {
    if (annualEmissions <= 2300) return 'Excellent';
    if (annualEmissions <= 4000) return 'Good';
    if (annualEmissions <= 6000) return 'Average';
    if (annualEmissions <= 10000) return 'High';
    return 'Very High';
  }

  /**
   * Generate personalized recommendations
   */
  generateRecommendations(breakdown, totalEmissions) {
    const recommendations = [];

    // Find highest emission categories
    const sortedCategories = Object.keys(breakdown)
      .sort((a, b) => breakdown[b].total - breakdown[a].total)
      .slice(0, 3);

    sortedCategories.forEach(category => {
      const categoryEmissions = breakdown[category];
      if (categoryEmissions.total > 0) {
        const categoryRecs = this.getCategoryRecommendations(category, categoryEmissions);
        recommendations.push(...categoryRecs);
      }
    });

    // Add general recommendations based on total emissions
    const annualProjection = this.scaleToTimeframe(totalEmissions, 'daily', 'annual');
    if (annualProjection > this.globalAverages.sustainable) {
      recommendations.push({
        category: 'general',
        priority: 'high',
        action: 'Reduce overall carbon footprint',
        impact: `Target reduction: ${Math.round(annualProjection - this.globalAverages.sustainable)} kg CO2e/year`,
        difficulty: 'medium'
      });
    }

    return recommendations.slice(0, 8); // Limit to top 8 recommendations
  }

  /**
   * Get category-specific recommendations
   */
  getCategoryRecommendations(category, categoryData) {
    const recommendations = [];

    switch (category) {
      case 'transportation':
        if (categoryData.activities.car_gasoline?.emissions > 5) {
          recommendations.push({
            category: 'transportation',
            priority: 'high',
            action: 'Switch to hybrid or electric vehicle',
            impact: 'Reduce emissions by 50-75%',
            difficulty: 'high'
          });
        }
        if (categoryData.activities.airplane_domestic?.emissions > 10) {
          recommendations.push({
            category: 'transportation',
            priority: 'medium',
            action: 'Reduce air travel or offset flights',
            impact: 'Significant emission reduction',
            difficulty: 'medium'
          });
        }
        recommendations.push({
          category: 'transportation',
          priority: 'low',
          action: 'Use public transport, bike, or walk more',
          impact: 'Reduce daily transport emissions',
          difficulty: 'low'
        });
        break;

      case 'energy':
        if (categoryData.activities.electricity_grid?.emissions > 8) {
          recommendations.push({
            category: 'energy',
            priority: 'high',
            action: 'Switch to renewable energy provider',
            impact: 'Reduce home emissions by 80%+',
            difficulty: 'low'
          });
        }
        recommendations.push({
          category: 'energy',
          priority: 'medium',
          action: 'Improve home insulation and efficiency',
          impact: 'Reduce energy consumption by 20-30%',
          difficulty: 'medium'
        });
        break;

      case 'food':
        if (categoryData.activities.beef?.emissions > 3) {
          recommendations.push({
            category: 'food',
            priority: 'high',
            action: 'Reduce red meat consumption',
            impact: 'Major dietary emission reduction',
            difficulty: 'medium'
          });
        }
        recommendations.push({
          category: 'food',
          priority: 'low',
          action: 'Eat more plant-based meals',
          impact: 'Reduce food emissions by 30-50%',
          difficulty: 'low'
        });
        break;

      case 'waste':
        recommendations.push({
          category: 'waste',
          priority: 'low',
          action: 'Increase recycling and composting',
          impact: 'Reduce waste emissions and create negative emissions',
          difficulty: 'low'
        });
        break;
    }

    return recommendations;
  }

  /**
   * Calculate trends (mock implementation)
   */
  calculateTrends(footprint) {
    // In a real implementation, this would use historical data
    return {
      weekly: this.generateWeeklyTrend(),
      monthly: this.generateMonthlyTrend(),
      category: this.generateCategoryTrends(footprint.breakdown),
      projection: this.generateProjection(footprint.total)
    };
  }

  generateWeeklyTrend() {
    const trend = [];
    const baseEmission = 15 + Math.random() * 10;
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const variation = (Math.random() - 0.5) * 6;
      trend.push({
        date: date.toISOString().split('T')[0],
        emissions: Math.round((baseEmission + variation) * 100) / 100,
        day: date.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }
    
    return trend;
  }

  generateMonthlyTrend() {
    const trend = [];
    const baseEmission = 450 + Math.random() * 200;
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      
      const variation = (Math.random() - 0.5) * 100;
      trend.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        emissions: Math.round(baseEmission + variation),
        change: i === 11 ? 0 : Math.round((Math.random() - 0.5) * 20)
      });
    }
    
    return trend;
  }

  generateCategoryTrends(breakdown) {
    const trends = {};
    
    Object.keys(breakdown).forEach(category => {
      trends[category] = {
        current: breakdown[category].total,
        trend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
        change: Math.round((Math.random() - 0.5) * 20 * 100) / 100
      };
    });
    
    return trends;
  }

  generateProjection(currentDaily) {
    const annual = this.scaleToTimeframe(currentDaily, 'daily', 'annual');
    
    return {
      currentAnnual: Math.round(annual),
      projectedReduction: Math.round(annual * 0.15), // 15% reduction potential
      targetAnnual: this.globalAverages.sustainable,
      yearsToTarget: Math.max(1, Math.ceil((annual - this.globalAverages.sustainable) / (annual * 0.15)))
    };
  }

  /**
   * Assess confidence in calculation
   */
  assessConfidence(activities) {
    let confidence = 90;
    
    // Reduce confidence for missing data
    const totalCategories = Object.keys(this.emissionFactors).length;
    const providedCategories = Object.keys(activities).length;
    
    if (providedCategories < totalCategories) {
      confidence -= (totalCategories - providedCategories) * 5;
    }

    // Check data completeness within categories
    Object.keys(activities).forEach(category => {
      const categoryActivities = activities[category];
      if (Object.keys(categoryActivities).length < 2) {
        confidence -= 5;
      }
    });

    return Math.max(60, Math.min(98, confidence));
  }

  /**
   * Generate sample activities for testing
   */
  generateSampleActivities() {
    return {
      transportation: {
        car_gasoline: 25, // miles per day
        bus: 5,
        walking: 2
      },
      energy: {
        electricity_grid: 30, // kWh per day
        natural_gas: 2 // therms per day
      },
      food: {
        chicken: 0.2, // kg per day
        vegetables: 0.5,
        dairy: 0.3,
        grains: 0.4
      },
      waste: {
        landfill: 1.5, // kg per day
        recycling: 0.8
      },
      water: {
        shower: 10, // minutes per day
        tap_water: 8 // liters per day
      }
    };
  }

  /**
   * Calculate offset recommendations
   */
  calculateOffsetRecommendations(annualEmissions) {
    const offsetOptions = [
      {
        type: 'Forest Conservation',
        costPerTon: 15,
        description: 'Protect existing forests from deforestation',
        certification: 'VCS, REDD+'
      },
      {
        type: 'Renewable Energy',
        costPerTon: 25,
        description: 'Support wind and solar energy projects',
        certification: 'Gold Standard, VCS'
      },
      {
        type: 'Reforestation',
        costPerTon: 20,
        description: 'Plant new trees and restore forests',
        certification: 'VCS, CDM'
      },
      {
        type: 'Direct Air Capture',
        costPerTon: 150,
        description: 'Remove CO2 directly from atmosphere',
        certification: 'Emerging technology'
      }
    ];

    const emissionsToOffset = Math.round(annualEmissions);
    
    return offsetOptions.map(option => ({
      ...option,
      annualCost: Math.round(emissionsToOffset * option.costPerTon),
      monthlyCost: Math.round((emissionsToOffset * option.costPerTon) / 12),
      tonsToOffset: emissionsToOffset
    }));
  }
}

// Create singleton instance
export const carbonFootprintTracker = new CarbonFootprintTracker();

// Export main calculation function
export const calculateCarbonFootprint = async (activities, timeframe = 'daily') => {
  try {
    return await carbonFootprintTracker.calculateCarbonFootprint(activities, timeframe);
  } catch (error) {
    console.error('Carbon footprint calculation error:', error);
    throw error;
  }
};

// Export sample data generator
export const generateSampleCarbonData = () => {
  return carbonFootprintTracker.generateSampleActivities();
};

export default carbonFootprintTracker;