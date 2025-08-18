// Real-time environmental data integration
class RealTimeEnvironmentalData {
  constructor() {
    this.apiKeys = {
      openWeather: process.env.REACT_APP_OPENWEATHER_API_KEY,
      airQuality: process.env.REACT_APP_AIRQUALITY_API_KEY,
      nasa: process.env.REACT_APP_NASA_API_KEY
    };
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Real-time air quality data from multiple sources
  async getAirQualityData(lat, lon) {
    const cacheKey = `air_${lat}_${lon}`;
    if (this.isCached(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      // Primary: OpenWeatherMap Air Pollution API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKeys.openWeather}`
      );
      const data = await response.json();
      
      const processedData = {
        timestamp: new Date().toISOString(),
        location: { lat, lon },
        aqi: data.list[0].main.aqi,
        components: {
          co: data.list[0].components.co,
          no: data.list[0].components.no,
          no2: data.list[0].components.no2,
          o3: data.list[0].components.o3,
          so2: data.list[0].components.so2,
          pm2_5: data.list[0].components.pm2_5,
          pm10: data.list[0].components.pm10,
          nh3: data.list[0].components.nh3
        },
        healthRisk: this.calculateHealthRisk(data.list[0].main.aqi),
        recommendations: this.getHealthRecommendations(data.list[0].main.aqi)
      };
      
      this.cache.set(cacheKey, { data: processedData, timestamp: Date.now() });
      return processedData;
    } catch (error) {
      console.warn('Failed to fetch real-time air quality data:', error);
      return this.getFallbackAirQualityData(lat, lon);
    }
  }

  // Real-time weather and climate data
  async getClimateData(lat, lon) {
    const cacheKey = `climate_${lat}_${lon}`;
    if (this.isCached(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      const [current, forecast] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKeys.openWeather}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKeys.openWeather}&units=metric`)
      ]);
      
      const currentData = await current.json();
      const forecastData = await forecast.json();
      
      const processedData = {
        timestamp: new Date().toISOString(),
        location: { lat, lon, name: currentData.name },
        current: {
          temperature: currentData.main.temp,
          humidity: currentData.main.humidity,
          pressure: currentData.main.pressure,
          windSpeed: currentData.wind.speed,
          windDirection: currentData.wind.deg,
          visibility: currentData.visibility,
          uvIndex: currentData.uvi || 'N/A',
          cloudCover: currentData.clouds.all
        },
        forecast: forecastData.list.slice(0, 5).map(item => ({
          datetime: item.dt_txt,
          temperature: item.main.temp,
          humidity: item.main.humidity,
          description: item.weather[0].description,
          precipitation: item.rain ? item.rain['3h'] || 0 : 0
        })),
        climateIndicators: this.calculateClimateIndicators(currentData, forecastData)
      };
      
      this.cache.set(cacheKey, { data: processedData, timestamp: Date.now() });
      return processedData;
    } catch (error) {
      console.warn('Failed to fetch real-time climate data:', error);
      return this.getFallbackClimateData(lat, lon);
    }
  }

  // Real biodiversity data from GBIF and iNaturalist
  async getBiodiversityData(lat, lon, radius = 10) {
    const cacheKey = `biodiversity_${lat}_${lon}_${radius}`;
    if (this.isCached(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      // GBIF API for species occurrence data
      const gbifResponse = await fetch(
        `https://api.gbif.org/v1/occurrence/search?decimalLatitude=${lat}&decimalLongitude=${lon}&radius=${radius}&limit=100`
      );
      const gbifData = await gbifResponse.json();
      
      // Process GBIF data
      const speciesData = gbifData.results.reduce((acc, occurrence) => {
        if (occurrence.species && occurrence.scientificName) {
          const key = occurrence.species;
          if (!acc[key]) {
            acc[key] = {
              scientificName: occurrence.scientificName,
              commonName: occurrence.vernacularName || 'Unknown',
              kingdom: occurrence.kingdom,
              phylum: occurrence.phylum,
              class: occurrence.class,
              order: occurrence.order,
              family: occurrence.family,
              genus: occurrence.genus,
              occurrences: 0,
              lastSeen: null,
              conservationStatus: this.getConservationStatus(occurrence.species)
            };
          }
          acc[key].occurrences++;
          if (!acc[key].lastSeen || new Date(occurrence.eventDate) > new Date(acc[key].lastSeen)) {
            acc[key].lastSeen = occurrence.eventDate;
          }
        }
        return acc;
      }, {});
      
      const processedData = {
        timestamp: new Date().toISOString(),
        location: { lat, lon, radius },
        totalSpecies: Object.keys(speciesData).length,
        totalOccurrences: gbifData.count,
        species: Object.values(speciesData),
        biodiversityIndex: this.calculateBiodiversityIndex(Object.values(speciesData)),
        threatLevel: this.assessThreatLevel(Object.values(speciesData)),
        recommendations: this.getBiodiversityRecommendations(Object.values(speciesData))
      };
      
      this.cache.set(cacheKey, { data: processedData, timestamp: Date.now() });
      return processedData;
    } catch (error) {
      console.warn('Failed to fetch real-time biodiversity data:', error);
      return this.getFallbackBiodiversityData(lat, lon);
    }
  }

  // Real-time carbon emissions data
  async getCarbonEmissionsData(country = 'US') {
    const cacheKey = `carbon_${country}`;
    if (this.isCached(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      // CO2 Signal API for real-time carbon intensity
      const response = await fetch(
        `https://api.co2signal.com/v1/latest?countryCode=${country}`,
        {
          headers: {
            'auth-token': process.env.REACT_APP_CO2_SIGNAL_API_KEY
          }
        }
      );
      const data = await response.json();
      
      const processedData = {
        timestamp: new Date().toISOString(),
        country: country,
        carbonIntensity: data.data.carbonIntensity,
        fossilFuelPercentage: data.data.fossilFuelPercentage,
        renewablePercentage: 100 - data.data.fossilFuelPercentage,
        energyMix: {
          nuclear: data.data.powerConsumptionBreakdown?.nuclear || 0,
          geothermal: data.data.powerConsumptionBreakdown?.geothermal || 0,
          biomass: data.data.powerConsumptionBreakdown?.biomass || 0,
          coal: data.data.powerConsumptionBreakdown?.coal || 0,
          wind: data.data.powerConsumptionBreakdown?.wind || 0,
          solar: data.data.powerConsumptionBreakdown?.solar || 0,
          hydro: data.data.powerConsumptionBreakdown?.hydro || 0,
          gas: data.data.powerConsumptionBreakdown?.gas || 0,
          oil: data.data.powerConsumptionBreakdown?.oil || 0
        },
        trend: this.calculateCarbonTrend(data.data.carbonIntensity),
        recommendations: this.getCarbonRecommendations(data.data.carbonIntensity)
      };
      
      this.cache.set(cacheKey, { data: processedData, timestamp: Date.now() });
      return processedData;
    } catch (error) {
      console.warn('Failed to fetch real-time carbon data:', error);
      return this.getFallbackCarbonData(country);
    }
  }

  // Helper methods
  isCached(key) {
    const cached = this.cache.get(key);
    return cached && (Date.now() - cached.timestamp) < this.cacheTimeout;
  }

  calculateHealthRisk(aqi) {
    if (aqi <= 1) return 'Good';
    if (aqi <= 2) return 'Fair';
    if (aqi <= 3) return 'Moderate';
    if (aqi <= 4) return 'Poor';
    return 'Very Poor';
  }

  getHealthRecommendations(aqi) {
    const recommendations = {
      1: ['Air quality is good. Enjoy outdoor activities!'],
      2: ['Air quality is fair. Sensitive individuals should consider reducing outdoor activities.'],
      3: ['Air quality is moderate. Consider wearing a mask during outdoor activities.'],
      4: ['Air quality is poor. Limit outdoor activities, especially for sensitive groups.'],
      5: ['Air quality is very poor. Avoid outdoor activities. Keep windows closed.']
    };
    return recommendations[aqi] || recommendations[5];
  }

  calculateClimateIndicators(current, forecast) {
    const temps = forecast.list.map(item => item.main.temp);
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    const tempVariation = Math.max(...temps) - Math.min(...temps);
    
    return {
      temperatureTrend: avgTemp > current.main.temp ? 'Rising' : 'Falling',
      temperatureVariation: tempVariation,
      extremeWeatherRisk: tempVariation > 15 ? 'High' : tempVariation > 10 ? 'Medium' : 'Low',
      climateStability: tempVariation < 5 ? 'Stable' : tempVariation < 10 ? 'Moderate' : 'Unstable'
    };
  }

  calculateBiodiversityIndex(species) {
    if (species.length === 0) return 0;
    
    const totalOccurrences = species.reduce((sum, s) => sum + s.occurrences, 0);
    let shannonIndex = 0;
    
    species.forEach(s => {
      const proportion = s.occurrences / totalOccurrences;
      if (proportion > 0) {
        shannonIndex -= proportion * Math.log(proportion);
      }
    });
    
    return Math.round(shannonIndex * 100) / 100;
  }

  getConservationStatus(speciesKey) {
    // This would typically query IUCN Red List API
    // For now, return random status for demo
    const statuses = ['Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  assessThreatLevel(species) {
    const threatenedCount = species.filter(s => 
      ['Vulnerable', 'Endangered', 'Critically Endangered'].includes(s.conservationStatus)
    ).length;
    const threatRatio = threatenedCount / species.length;
    
    if (threatRatio > 0.5) return 'High';
    if (threatRatio > 0.3) return 'Medium';
    return 'Low';
  }

  getBiodiversityRecommendations(species) {
    const recommendations = [];
    const threatenedCount = species.filter(s => 
      ['Vulnerable', 'Endangered', 'Critically Endangered'].includes(s.conservationStatus)
    ).length;
    
    if (threatenedCount > 0) {
      recommendations.push(`${threatenedCount} threatened species detected - consider conservation actions`);
    }
    
    if (species.length < 10) {
      recommendations.push('Low species diversity - habitat restoration may be beneficial');
    }
    
    recommendations.push('Support local conservation efforts and sustainable practices');
    return recommendations;
  }

  calculateCarbonTrend(intensity) {
    if (intensity < 200) return 'Very Low';
    if (intensity < 400) return 'Low';
    if (intensity < 600) return 'Moderate';
    if (intensity < 800) return 'High';
    return 'Very High';
  }

  getCarbonRecommendations(intensity) {
    const recommendations = [];
    
    if (intensity > 600) {
      recommendations.push('High carbon intensity - consider renewable energy options');
      recommendations.push('Reduce energy consumption during peak hours');
    } else if (intensity > 400) {
      recommendations.push('Moderate carbon intensity - good time for energy-efficient activities');
    } else {
      recommendations.push('Low carbon intensity - optimal time for energy-intensive activities');
    }
    
    return recommendations;
  }

  // Fallback data methods for when APIs fail
  getFallbackAirQualityData(lat, lon) {
    return {
      timestamp: new Date().toISOString(),
      location: { lat, lon },
      aqi: 2,
      components: {
        co: 233.4,
        no: 0.01,
        no2: 13.4,
        o3: 54.3,
        so2: 7.8,
        pm2_5: 8.9,
        pm10: 15.2,
        nh3: 2.1
      },
      healthRisk: 'Fair',
      recommendations: ['Air quality is fair. Sensitive individuals should consider reducing outdoor activities.'],
      dataSource: 'Fallback - API unavailable'
    };
  }

  getFallbackClimateData(lat, lon) {
    return {
      timestamp: new Date().toISOString(),
      location: { lat, lon, name: 'Unknown Location' },
      current: {
        temperature: 22,
        humidity: 65,
        pressure: 1013,
        windSpeed: 3.2,
        windDirection: 180,
        visibility: 10000,
        uvIndex: 5,
        cloudCover: 40
      },
      forecast: [],
      climateIndicators: {
        temperatureTrend: 'Stable',
        temperatureVariation: 8,
        extremeWeatherRisk: 'Low',
        climateStability: 'Stable'
      },
      dataSource: 'Fallback - API unavailable'
    };
  }

  getFallbackBiodiversityData(lat, lon) {
    return {
      timestamp: new Date().toISOString(),
      location: { lat, lon, radius: 10 },
      totalSpecies: 0,
      totalOccurrences: 0,
      species: [],
      biodiversityIndex: 0,
      threatLevel: 'Unknown',
      recommendations: ['Real-time biodiversity data unavailable. Consider manual species observation.'],
      dataSource: 'Fallback - API unavailable'
    };
  }

  getFallbackCarbonData(country) {
    return {
      timestamp: new Date().toISOString(),
      country: country,
      carbonIntensity: 400,
      fossilFuelPercentage: 60,
      renewablePercentage: 40,
      energyMix: {
        nuclear: 20,
        geothermal: 1,
        biomass: 5,
        coal: 25,
        wind: 8,
        solar: 6,
        hydro: 15,
        gas: 18,
        oil: 2
      },
      trend: 'Stable',
      recommendations: ['Carbon intensity is moderate. Consider renewable energy options.'],
      dataSource: 'Fallback - API unavailable'
    };
  }
}

export default new RealTimeEnvironmentalData();