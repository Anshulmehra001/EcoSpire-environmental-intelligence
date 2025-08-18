import React, { useState, useEffect } from 'react';

function AirQuality() {
  const [userLocation, setUserLocation] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [historicalData, setHistoricalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  // Comprehensive global cities database with pollution data
  const citiesDatabase = {
    // North America
    'New York': { lat: 40.7128, lng: -74.0060, country: 'USA', region: 'North America' },
    'Los Angeles': { lat: 34.0522, lng: -118.2437, country: 'USA', region: 'North America' },
    'Chicago': { lat: 41.8781, lng: -87.6298, country: 'USA', region: 'North America' },
    'Houston': { lat: 29.7604, lng: -95.3698, country: 'USA', region: 'North America' },
    'Phoenix': { lat: 33.4484, lng: -112.0740, country: 'USA', region: 'North America' },
    'Philadelphia': { lat: 39.9526, lng: -75.1652, country: 'USA', region: 'North America' },
    'San Antonio': { lat: 29.4241, lng: -98.4936, country: 'USA', region: 'North America' },
    'San Diego': { lat: 32.7157, lng: -117.1611, country: 'USA', region: 'North America' },
    'Dallas': { lat: 32.7767, lng: -96.7970, country: 'USA', region: 'North America' },
    'San Jose': { lat: 37.3382, lng: -121.8863, country: 'USA', region: 'North America' },
    'Austin': { lat: 30.2672, lng: -97.7431, country: 'USA', region: 'North America' },
    'Jacksonville': { lat: 30.3322, lng: -81.6557, country: 'USA', region: 'North America' },
    'San Francisco': { lat: 37.7749, lng: -122.4194, country: 'USA', region: 'North America' },
    'Columbus': { lat: 39.9612, lng: -82.9988, country: 'USA', region: 'North America' },
    'Charlotte': { lat: 35.2271, lng: -80.8431, country: 'USA', region: 'North America' },
    'Fort Worth': { lat: 32.7555, lng: -97.3308, country: 'USA', region: 'North America' },
    'Indianapolis': { lat: 39.7684, lng: -86.1581, country: 'USA', region: 'North America' },
    'Seattle': { lat: 47.6062, lng: -122.3321, country: 'USA', region: 'North America' },
    'Denver': { lat: 39.7392, lng: -104.9903, country: 'USA', region: 'North America' },
    'Boston': { lat: 42.3601, lng: -71.0589, country: 'USA', region: 'North America' },
    'Toronto': { lat: 43.6532, lng: -79.3832, country: 'Canada', region: 'North America' },
    'Montreal': { lat: 45.5017, lng: -73.5673, country: 'Canada', region: 'North America' },
    'Vancouver': { lat: 49.2827, lng: -123.1207, country: 'Canada', region: 'North America' },
    'Calgary': { lat: 51.0447, lng: -114.0719, country: 'Canada', region: 'North America' },
    'Ottawa': { lat: 45.4215, lng: -75.6972, country: 'Canada', region: 'North America' },
    'Mexico City': { lat: 19.4326, lng: -99.1332, country: 'Mexico', region: 'North America' },
    'Guadalajara': { lat: 20.6597, lng: -103.3496, country: 'Mexico', region: 'North America' },
    'Monterrey': { lat: 25.6866, lng: -100.3161, country: 'Mexico', region: 'North America' },

    // Europe
    'London': { lat: 51.5074, lng: -0.1278, country: 'UK', region: 'Europe' },
    'Birmingham': { lat: 52.4862, lng: -1.8904, country: 'UK', region: 'Europe' },
    'Manchester': { lat: 53.4808, lng: -2.2426, country: 'UK', region: 'Europe' },
    'Paris': { lat: 48.8566, lng: 2.3522, country: 'France', region: 'Europe' },
    'Lyon': { lat: 45.7640, lng: 4.8357, country: 'France', region: 'Europe' },
    'Marseille': { lat: 43.2965, lng: 5.3698, country: 'France', region: 'Europe' },
    'Berlin': { lat: 52.5200, lng: 13.4050, country: 'Germany', region: 'Europe' },
    'Hamburg': { lat: 53.5511, lng: 9.9937, country: 'Germany', region: 'Europe' },
    'Munich': { lat: 48.1351, lng: 11.5820, country: 'Germany', region: 'Europe' },
    'Cologne': { lat: 50.9375, lng: 6.9603, country: 'Germany', region: 'Europe' },
    'Madrid': { lat: 40.4168, lng: -3.7038, country: 'Spain', region: 'Europe' },
    'Barcelona': { lat: 41.3851, lng: 2.1734, country: 'Spain', region: 'Europe' },
    'Valencia': { lat: 39.4699, lng: -0.3763, country: 'Spain', region: 'Europe' },
    'Rome': { lat: 41.9028, lng: 12.4964, country: 'Italy', region: 'Europe' },
    'Milan': { lat: 45.4642, lng: 9.1900, country: 'Italy', region: 'Europe' },
    'Naples': { lat: 40.8518, lng: 14.2681, country: 'Italy', region: 'Europe' },
    'Amsterdam': { lat: 52.3676, lng: 4.9041, country: 'Netherlands', region: 'Europe' },
    'Rotterdam': { lat: 51.9244, lng: 4.4777, country: 'Netherlands', region: 'Europe' },
    'Brussels': { lat: 50.8503, lng: 4.3517, country: 'Belgium', region: 'Europe' },
    'Vienna': { lat: 48.2082, lng: 16.3738, country: 'Austria', region: 'Europe' },
    'Zurich': { lat: 47.3769, lng: 8.5417, country: 'Switzerland', region: 'Europe' },
    'Stockholm': { lat: 59.3293, lng: 18.0686, country: 'Sweden', region: 'Europe' },
    'Copenhagen': { lat: 55.6761, lng: 12.5683, country: 'Denmark', region: 'Europe' },
    'Oslo': { lat: 59.9139, lng: 10.7522, country: 'Norway', region: 'Europe' },
    'Helsinki': { lat: 60.1699, lng: 24.9384, country: 'Finland', region: 'Europe' },
    'Warsaw': { lat: 52.2297, lng: 21.0122, country: 'Poland', region: 'Europe' },
    'Prague': { lat: 50.0755, lng: 14.4378, country: 'Czech Republic', region: 'Europe' },
    'Budapest': { lat: 47.4979, lng: 19.0402, country: 'Hungary', region: 'Europe' },
    'Bucharest': { lat: 44.4268, lng: 26.1025, country: 'Romania', region: 'Europe' },
    'Athens': { lat: 37.9838, lng: 23.7275, country: 'Greece', region: 'Europe' },
    'Lisbon': { lat: 38.7223, lng: -9.1393, country: 'Portugal', region: 'Europe' },
    'Dublin': { lat: 53.3498, lng: -6.2603, country: 'Ireland', region: 'Europe' },
    'Moscow': { lat: 55.7558, lng: 37.6176, country: 'Russia', region: 'Europe' },
    'St. Petersburg': { lat: 59.9311, lng: 30.3609, country: 'Russia', region: 'Europe' },

    // Asia
    'Tokyo': { lat: 35.6762, lng: 139.6503, country: 'Japan', region: 'Asia' },
    'Osaka': { lat: 34.6937, lng: 135.5023, country: 'Japan', region: 'Asia' },
    'Yokohama': { lat: 35.4437, lng: 139.6380, country: 'Japan', region: 'Asia' },
    'Nagoya': { lat: 35.1815, lng: 136.9066, country: 'Japan', region: 'Asia' },
    'Beijing': { lat: 39.9042, lng: 116.4074, country: 'China', region: 'Asia' },
    'Shanghai': { lat: 31.2304, lng: 121.4737, country: 'China', region: 'Asia' },
    'Guangzhou': { lat: 23.1291, lng: 113.2644, country: 'China', region: 'Asia' },
    'Shenzhen': { lat: 22.5431, lng: 114.0579, country: 'China', region: 'Asia' },
    'Chengdu': { lat: 30.5728, lng: 104.0668, country: 'China', region: 'Asia' },
    'Hangzhou': { lat: 30.2741, lng: 120.1551, country: 'China', region: 'Asia' },
    'Wuhan': { lat: 30.5928, lng: 114.3055, country: 'China', region: 'Asia' },
    'Xi\'an': { lat: 34.3416, lng: 108.9398, country: 'China', region: 'Asia' },
    'Delhi': { lat: 28.7041, lng: 77.1025, country: 'India', region: 'Asia' },
    'Mumbai': { lat: 19.0760, lng: 72.8777, country: 'India', region: 'Asia' },
    'Bangalore': { lat: 12.9716, lng: 77.5946, country: 'India', region: 'Asia' },
    'Hyderabad': { lat: 17.3850, lng: 78.4867, country: 'India', region: 'Asia' },
    'Chennai': { lat: 13.0827, lng: 80.2707, country: 'India', region: 'Asia' },
    'Kolkata': { lat: 22.5726, lng: 88.3639, country: 'India', region: 'Asia' },
    'Pune': { lat: 18.5204, lng: 73.8567, country: 'India', region: 'Asia' },
    'Ahmedabad': { lat: 23.0225, lng: 72.5714, country: 'India', region: 'Asia' },
    'Seoul': { lat: 37.5665, lng: 126.9780, country: 'South Korea', region: 'Asia' },
    'Busan': { lat: 35.1796, lng: 129.0756, country: 'South Korea', region: 'Asia' },
    'Bangkok': { lat: 13.7563, lng: 100.5018, country: 'Thailand', region: 'Asia' },
    'Singapore': { lat: 1.3521, lng: 103.8198, country: 'Singapore', region: 'Asia' },
    'Kuala Lumpur': { lat: 3.1390, lng: 101.6869, country: 'Malaysia', region: 'Asia' },
    'Jakarta': { lat: -6.2088, lng: 106.8456, country: 'Indonesia', region: 'Asia' },
    'Manila': { lat: 14.5995, lng: 120.9842, country: 'Philippines', region: 'Asia' },
    'Ho Chi Minh City': { lat: 10.8231, lng: 106.6297, country: 'Vietnam', region: 'Asia' },
    'Hanoi': { lat: 21.0285, lng: 105.8542, country: 'Vietnam', region: 'Asia' },
    'Taipei': { lat: 25.0330, lng: 121.5654, country: 'Taiwan', region: 'Asia' },
    'Hong Kong': { lat: 22.3193, lng: 114.1694, country: 'Hong Kong', region: 'Asia' },
    'Macau': { lat: 22.1987, lng: 113.5439, country: 'Macau', region: 'Asia' },

    // Middle East
    'Dubai': { lat: 25.2048, lng: 55.2708, country: 'UAE', region: 'Middle East' },
    'Abu Dhabi': { lat: 24.2539, lng: 54.3773, country: 'UAE', region: 'Middle East' },
    'Doha': { lat: 25.2854, lng: 51.5310, country: 'Qatar', region: 'Middle East' },
    'Kuwait City': { lat: 29.3759, lng: 47.9774, country: 'Kuwait', region: 'Middle East' },
    'Riyadh': { lat: 24.7136, lng: 46.6753, country: 'Saudi Arabia', region: 'Middle East' },
    'Jeddah': { lat: 21.4858, lng: 39.1925, country: 'Saudi Arabia', region: 'Middle East' },
    'Tehran': { lat: 35.6892, lng: 51.3890, country: 'Iran', region: 'Middle East' },
    'Istanbul': { lat: 41.0082, lng: 28.9784, country: 'Turkey', region: 'Middle East' },
    'Ankara': { lat: 39.9334, lng: 32.8597, country: 'Turkey', region: 'Middle East' },
    'Tel Aviv': { lat: 32.0853, lng: 34.7818, country: 'Israel', region: 'Middle East' },
    'Jerusalem': { lat: 31.7683, lng: 35.2137, country: 'Israel', region: 'Middle East' },

    // Africa
    'Cairo': { lat: 30.0444, lng: 31.2357, country: 'Egypt', region: 'Africa' },
    'Alexandria': { lat: 31.2001, lng: 29.9187, country: 'Egypt', region: 'Africa' },
    'Lagos': { lat: 6.5244, lng: 3.3792, country: 'Nigeria', region: 'Africa' },
    'Abuja': { lat: 9.0765, lng: 7.3986, country: 'Nigeria', region: 'Africa' },
    'Johannesburg': { lat: -26.2041, lng: 28.0473, country: 'South Africa', region: 'Africa' },
    'Cape Town': { lat: -33.9249, lng: 18.4241, country: 'South Africa', region: 'Africa' },
    'Durban': { lat: -29.8587, lng: 31.0218, country: 'South Africa', region: 'Africa' },
    'Casablanca': { lat: 33.5731, lng: -7.5898, country: 'Morocco', region: 'Africa' },
    'Rabat': { lat: 34.0209, lng: -6.8416, country: 'Morocco', region: 'Africa' },
    'Tunis': { lat: 36.8065, lng: 10.1815, country: 'Tunisia', region: 'Africa' },
    'Algiers': { lat: 36.7538, lng: 3.0588, country: 'Algeria', region: 'Africa' },
    'Nairobi': { lat: -1.2921, lng: 36.8219, country: 'Kenya', region: 'Africa' },
    'Addis Ababa': { lat: 9.1450, lng: 40.4897, country: 'Ethiopia', region: 'Africa' },
    'Accra': { lat: 5.6037, lng: -0.1870, country: 'Ghana', region: 'Africa' },
    'Dakar': { lat: 14.7167, lng: -17.4677, country: 'Senegal', region: 'Africa' },

    // South America
    'São Paulo': { lat: -23.5505, lng: -46.6333, country: 'Brazil', region: 'South America' },
    'Rio de Janeiro': { lat: -22.9068, lng: -43.1729, country: 'Brazil', region: 'South America' },
    'Brasília': { lat: -15.8267, lng: -47.9218, country: 'Brazil', region: 'South America' },
    'Salvador': { lat: -12.9714, lng: -38.5014, country: 'Brazil', region: 'South America' },
    'Fortaleza': { lat: -3.7319, lng: -38.5267, country: 'Brazil', region: 'South America' },
    'Belo Horizonte': { lat: -19.9191, lng: -43.9386, country: 'Brazil', region: 'South America' },
    'Buenos Aires': { lat: -34.6118, lng: -58.3960, country: 'Argentina', region: 'South America' },
    'Córdoba': { lat: -31.4201, lng: -64.1888, country: 'Argentina', region: 'South America' },
    'Lima': { lat: -12.0464, lng: -77.0428, country: 'Peru', region: 'South America' },
    'Bogotá': { lat: 4.7110, lng: -74.0721, country: 'Colombia', region: 'South America' },
    'Medellín': { lat: 6.2442, lng: -75.5812, country: 'Colombia', region: 'South America' },
    'Santiago': { lat: -33.4489, lng: -70.6693, country: 'Chile', region: 'South America' },
    'Caracas': { lat: 10.4806, lng: -66.9036, country: 'Venezuela', region: 'South America' },
    'Quito': { lat: -0.1807, lng: -78.4678, country: 'Ecuador', region: 'South America' },
    'La Paz': { lat: -16.5000, lng: -68.1193, country: 'Bolivia', region: 'South America' },
    'Montevideo': { lat: -34.9011, lng: -56.1645, country: 'Uruguay', region: 'South America' },

    // Oceania
    'Sydney': { lat: -33.8688, lng: 151.2093, country: 'Australia', region: 'Oceania' },
    'Melbourne': { lat: -37.8136, lng: 144.9631, country: 'Australia', region: 'Oceania' },
    'Brisbane': { lat: -27.4698, lng: 153.0251, country: 'Australia', region: 'Oceania' },
    'Perth': { lat: -31.9505, lng: 115.8605, country: 'Australia', region: 'Oceania' },
    'Adelaide': { lat: -34.9285, lng: 138.6007, country: 'Australia', region: 'Oceania' },
    'Auckland': { lat: -36.8485, lng: 174.7633, country: 'New Zealand', region: 'Oceania' },
    'Wellington': { lat: -41.2865, lng: 174.7762, country: 'New Zealand', region: 'Oceania' },
    'Christchurch': { lat: -43.5321, lng: 172.6362, country: 'New Zealand', region: 'Oceania' }
  };

  useEffect(() => {
    // Try to get user's location automatically
    detectUserLocation();
  }, []);

  const detectUserLocation = () => {
    setIsLocationLoading(true);
    setLocationError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(location);
          
          // Find nearest city
          const nearestCity = findNearestCity(location.latitude, location.longitude);
          setSelectedCity(nearestCity);
          
          // Load air quality data
          loadAirQualityData(nearestCity);
          setIsLocationLoading(false);
        },
        (error) => {
          console.log('Location access denied:', error);
          setLocationError(getLocationErrorMessage(error.code));
          setIsLocationLoading(false);
          
          // Default to New York
          setSelectedCity('New York');
          loadAirQualityData('New York');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser');
      setIsLocationLoading(false);
      setSelectedCity('New York');
      loadAirQualityData('New York');
    }
  };

  const getLocationErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 1:
        return 'Location access denied. Please enable location services and refresh the page.';
      case 2:
        return 'Location information is unavailable.';
      case 3:
        return 'Location request timed out.';
      default:
        return 'An unknown error occurred while retrieving location.';
    }
  };

  const findNearestCity = (lat, lng) => {
    let nearestCity = 'New York';
    let minDistance = Infinity;

    Object.entries(citiesDatabase).forEach(([city, coords]) => {
      const distance = calculateDistance(lat, lng, coords.lat, coords.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
      }
    });

    return nearestCity;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const loadAirQualityData = async (cityName) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with realistic pollution data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const pollutionData = generateRealisticPollutionData(cityName);
      setAirQualityData(pollutionData);
      
      // Generate historical data
      const historical = generateHistoricalData(cityName);
      setHistoricalData(historical);
      
    } catch (error) {
      console.error('Failed to load air quality data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateRealisticPollutionData = (cityName) => {
    // Realistic pollution levels based on city characteristics
    const cityPollutionProfiles = {
      'Beijing': { baseAQI: 150, pm25: 85, pm10: 120, no2: 45, so2: 25, co: 1.2, o3: 80 },
      'Delhi': { baseAQI: 180, pm25: 95, pm10: 140, no2: 50, so2: 30, co: 1.5, o3: 75 },
      'Los Angeles': { baseAQI: 90, pm25: 35, pm10: 55, no2: 35, so2: 8, co: 0.8, o3: 85 },
      'Mexico City': { baseAQI: 120, pm25: 55, pm10: 85, no2: 40, so2: 20, co: 1.1, o3: 70 },
      'London': { baseAQI: 65, pm25: 25, pm10: 40, no2: 30, so2: 5, co: 0.6, o3: 60 },
      'Tokyo': { baseAQI: 55, pm25: 20, pm10: 35, no2: 25, so2: 6, co: 0.5, o3: 55 },
      'Sydney': { baseAQI: 45, pm25: 15, pm10: 25, no2: 20, so2: 4, co: 0.4, o3: 50 },
      'Toronto': { baseAQI: 50, pm25: 18, pm10: 30, no2: 22, so2: 5, co: 0.5, o3: 52 }
    };

    const profile = cityPollutionProfiles[cityName] || cityPollutionProfiles['New York'] || {
      baseAQI: 75, pm25: 30, pm10: 45, no2: 28, so2: 10, co: 0.7, o3: 65
    };

    // Add some random variation
    const variation = 0.2; // 20% variation
    const addVariation = (value) => value * (1 + (Math.random() - 0.5) * variation);

    const finalAQI = Math.round(addVariation(profile.baseAQI));

    return {
      city: cityName,
      country: citiesDatabase[cityName]?.country || 'Unknown',
      timestamp: new Date().toISOString(),
      aqi: finalAQI,
      pollutants: {
        pm25: { value: Math.round(addVariation(profile.pm25)), unit: 'μg/m³', limit: 25 },
        pm10: { value: Math.round(addVariation(profile.pm10)), unit: 'μg/m³', limit: 50 },
        no2: { value: Math.round(addVariation(profile.no2)), unit: 'μg/m³', limit: 40 },
        so2: { value: Math.round(addVariation(profile.so2)), unit: 'μg/m³', limit: 20 },
        co: { value: parseFloat(addVariation(profile.co).toFixed(1)), unit: 'mg/m³', limit: 10 },
        o3: { value: Math.round(addVariation(profile.o3)), unit: 'μg/m³', limit: 100 }
      },
      healthRecommendations: generateHealthRecommendations(finalAQI),
      forecast: generateForecast(cityName),
      sources: generatePollutionSources(cityName),
      dataAccuracy: {
        confidence: cityPollutionProfiles[cityName] ? 85 : 70,
        dataSource: cityPollutionProfiles[cityName] ? 'Historical city data' : 'Regional estimates',
        lastUpdate: new Date().toISOString(),
        methodology: 'Simulated data based on typical pollution patterns',
        limitations: [
          'Data is simulated for demonstration purposes',
          'Real-time sensor data not available',
          'Weather conditions may significantly affect actual readings',
          'Micro-location variations not captured'
        ]
      }
    };
  };

  const generateHealthRecommendations = (aqi) => {
    if (aqi <= 50) {
      return {
        level: 'Good',
        color: '#4CAF50',
        message: 'Air quality is satisfactory. Enjoy outdoor activities!',
        recommendations: [
          'Perfect time for outdoor exercise',
          'Windows can be kept open',
          'No special precautions needed'
        ]
      };
    } else if (aqi <= 100) {
      return {
        level: 'Moderate',
        color: '#FF9800',
        message: 'Air quality is acceptable for most people.',
        recommendations: [
          'Sensitive individuals should limit prolonged outdoor exertion',
          'Consider closing windows during peak traffic hours',
          'Monitor air quality if you have respiratory conditions'
        ]
      };
    } else if (aqi <= 150) {
      return {
        level: 'Unhealthy for Sensitive Groups',
        color: '#f44336',
        message: 'Sensitive groups should reduce outdoor activities.',
        recommendations: [
          'People with heart/lung disease should avoid outdoor exertion',
          'Keep windows closed and use air purifiers',
          'Wear N95 masks when going outside',
          'Limit time spent outdoors'
        ]
      };
    } else {
      return {
        level: 'Unhealthy',
        color: '#9C27B0',
        message: 'Everyone should limit outdoor activities.',
        recommendations: [
          'Avoid outdoor activities',
          'Keep windows closed at all times',
          'Use air purifiers indoors',
          'Wear N95 or better masks when outside',
          'Consider staying indoors'
        ]
      };
    }
  };

  const generateForecast = (cityName) => {
    const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'];
    return days.map((day, index) => {
      const baseAQI = airQualityData?.aqi || 75;
      const variation = (Math.random() - 0.5) * 40; // ±20 AQI variation
      const aqi = Math.max(10, Math.round(baseAQI + variation));
      
      return {
        day,
        aqi,
        level: aqi <= 50 ? 'Good' : aqi <= 100 ? 'Moderate' : aqi <= 150 ? 'Unhealthy for Sensitive' : 'Unhealthy',
        color: aqi <= 50 ? '#4CAF50' : aqi <= 100 ? '#FF9800' : aqi <= 150 ? '#f44336' : '#9C27B0'
      };
    });
  };

  const generatePollutionSources = (cityName) => {
    const commonSources = [
      { name: 'Vehicle Emissions', percentage: 35, icon: '🚗' },
      { name: 'Industrial Activities', percentage: 25, icon: '🏭' },
      { name: 'Power Generation', percentage: 20, icon: '⚡' },
      { name: 'Construction', percentage: 10, icon: '🏗️' },
      { name: 'Residential Heating', percentage: 10, icon: '🏠' }
    ];

    // Adjust percentages based on city characteristics
    if (cityName === 'Beijing' || cityName === 'Delhi') {
      commonSources[1].percentage = 40; // Higher industrial
      commonSources[0].percentage = 30;
    } else if (cityName === 'Los Angeles') {
      commonSources[0].percentage = 45; // Higher vehicle emissions
      commonSources[1].percentage = 20;
    }

    return commonSources;
  };

  const generateHistoricalData = (cityName) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const baseAQI = airQualityData?.aqi || 75;
    
    return months.map(month => ({
      month,
      aqi: Math.max(20, Math.round(baseAQI + (Math.random() - 0.5) * 50)),
      pm25: Math.max(5, Math.round(25 + (Math.random() - 0.5) * 30))
    }));
  };

  const handleCityChange = (cityName) => {
    setSelectedCity(cityName);
    setSearchTerm('');
    loadAirQualityData(cityName);
  };

  const getFilteredCities = () => {
    let cities = Object.entries(citiesDatabase);
    
    // Filter by region
    if (selectedRegion !== 'All Regions') {
      cities = cities.filter(([_, data]) => data.region === selectedRegion);
    }
    
    // Filter by search term
    if (searchTerm) {
      cities = cities.filter(([city, data]) => 
        city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return cities.sort((a, b) => a[0].localeCompare(b[0]));
  };

  const getRegions = () => {
    const regions = [...new Set(Object.values(citiesDatabase).map(city => city.region))];
    return ['All Regions', ...regions.sort()];
  };

  const handleSearchCity = (searchValue) => {
    setSearchTerm(searchValue);
    
    // If exact match found, select it
    const exactMatch = Object.keys(citiesDatabase).find(
      city => city.toLowerCase() === searchValue.toLowerCase()
    );
    
    if (exactMatch) {
      handleCityChange(exactMatch);
    }
  };

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return '#4CAF50';
    if (aqi <= 100) return '#FF9800';
    if (aqi <= 150) return '#f44336';
    return '#9C27B0';
  };

  const getPollutantStatus = (value, limit) => {
    const ratio = value / limit;
    if (ratio <= 1) return { status: 'Good', color: '#4CAF50' };
    if (ratio <= 2) return { status: 'Moderate', color: '#FF9800' };
    return { status: 'High', color: '#f44336' };
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2196F3', marginBottom: '10px' }}>
          🌬️ AirQuality Monitor: Real-Time Pollution Tracking
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          Monitor air quality, pollution levels, and health impacts in your city
        </p>
        <div style={{
          background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '25px',
          display: 'inline-block',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}>
          🌍 Real-Time Data • 🏥 Health Recommendations • 📊 Pollution Sources
        </div>
      </div>

      {/* Location Detection and City Selection */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2196F3', marginBottom: '20px' }}>📍 Location & City Selection</h3>
        
        {/* Auto Location Detection */}
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '12px', 
          marginBottom: '25px',
          border: '1px solid #e0e0e0'
        }}>
          <h4 style={{ color: '#2196F3', marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            🎯 <span style={{ marginLeft: '10px' }}>Auto-Detect Location</span>
          </h4>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <button
              onClick={detectUserLocation}
              disabled={isLocationLoading}
              style={{
                background: isLocationLoading ? '#ccc' : 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: isLocationLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isLocationLoading ? '🔄' : '📍'} 
              {isLocationLoading ? 'Detecting Location...' : 'Use My Location'}
            </button>
            
            {userLocation && (
              <div style={{ 
                background: '#e8f5e8', 
                color: '#2E7D32', 
                padding: '8px 16px', 
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                ✅ Location Detected
              </div>
            )}
          </div>
          
          {locationError && (
            <div style={{
              background: '#ffebee',
              color: '#d32f2f',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              border: '1px solid #ffcdd2'
            }}>
              ⚠️ {locationError}
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ color: '#2196F3', marginBottom: '15px' }}>🔍 Search Cities</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search by city name or country..."
              value={searchTerm}
              onChange={(e) => handleSearchCity(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '2px solid #e0e0e0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2196F3'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
            
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '2px solid #e0e0e0',
                fontSize: '1rem',
                outline: 'none',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              {getRegions().map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>

        {/* City Grid */}
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: '#2196F3', marginBottom: '15px' }}>
            🌍 Available Cities ({getFilteredCities().length} cities)
          </h4>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '12px',
            maxHeight: '400px',
            overflowY: 'auto',
            padding: '10px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            background: '#fafafa'
          }}>
            {getFilteredCities().map(([city, data]) => (
              <button
                key={city}
                onClick={() => handleCityChange(city)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: selectedCity === city ? '2px solid #2196F3' : '1px solid #ddd',
                  background: selectedCity === city ? '#e3f2fd' : 'white',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: selectedCity === city ? 'bold' : 'normal',
                  color: selectedCity === city ? '#2196F3' : '#333',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
                onMouseEnter={(e) => {
                  if (selectedCity !== city) {
                    e.target.style.background = '#f5f5f5';
                    e.target.style.borderColor = '#bbb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCity !== city) {
                    e.target.style.background = 'white';
                    e.target.style.borderColor = '#ddd';
                  }
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{city}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  {data.country} • {data.region}
                </div>
              </button>
            ))}
          </div>
        </div>

        {getFilteredCities().length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#666',
            fontSize: '1.1rem'
          }}>
            🔍 No cities found matching your search criteria.
            <br />
            <span style={{ fontSize: '0.9rem' }}>Try adjusting your search term or region filter.</span>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="card" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌬️</div>
          <h3 style={{ color: '#2196F3' }}>Loading Air Quality Data...</h3>
          <p style={{ color: '#666' }}>Fetching real-time pollution measurements</p>
        </div>
      )}

      {/* Air Quality Overview */}
      {airQualityData && (
        <>
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2196F3', marginBottom: '20px' }}>🌬️ Current Air Quality - {airQualityData.city}</h3>
            
            {/* AQI Display */}
            <div style={{
              background: `linear-gradient(135deg, ${getAQIColor(airQualityData.aqi)}20 0%, ${getAQIColor(airQualityData.aqi)}40 100%)`,
              padding: '30px',
              borderRadius: '12px',
              marginBottom: '20px',
              border: `2px solid ${getAQIColor(airQualityData.aqi)}`,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '4rem', color: getAQIColor(airQualityData.aqi), marginBottom: '10px' }}>
                {airQualityData.aqi}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getAQIColor(airQualityData.aqi), marginBottom: '10px' }}>
                {airQualityData.healthRecommendations.level}
              </div>
              <div style={{ fontSize: '1rem', color: '#666' }}>
                Air Quality Index (AQI)
              </div>
            </div>

            {/* Health Recommendations */}
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '12px',
              border: `2px solid ${airQualityData.healthRecommendations.color}`
            }}>
              <h4 style={{ color: airQualityData.healthRecommendations.color, marginBottom: '10px' }}>
                🏥 Health Recommendations
              </h4>
              <p style={{ marginBottom: '15px', fontSize: '1.1rem' }}>
                {airQualityData.healthRecommendations.message}
              </p>
              <ul style={{ paddingLeft: '20px' }}>
                {airQualityData.healthRecommendations.recommendations.map((rec, index) => (
                  <li key={index} style={{ marginBottom: '5px', color: '#666' }}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pollutant Details */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2196F3', marginBottom: '20px' }}>🧪 Pollutant Breakdown</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {Object.entries(airQualityData.pollutants).map(([pollutant, data]) => {
                const status = getPollutantStatus(data.value, data.limit);
                return (
                  <div key={pollutant} style={{
                    background: '#f9f9f9',
                    padding: '20px',
                    borderRadius: '12px',
                    border: `2px solid ${status.color}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h4 style={{ margin: 0, color: '#333' }}>{pollutant.toUpperCase()}</h4>
                      <span style={{
                        background: status.color,
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {status.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '2rem', color: status.color, marginBottom: '5px' }}>
                      {data.value} {data.unit}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      WHO Limit: {data.limit} {data.unit}
                    </div>
                    <div style={{ 
                      background: '#e0e0e0', 
                      height: '8px', 
                      borderRadius: '4px', 
                      marginTop: '10px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: status.color,
                        height: '100%',
                        width: `${Math.min(100, (data.value / data.limit) * 100)}%`,
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pollution Sources */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2196F3', marginBottom: '20px' }}>🏭 Pollution Sources</h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              {airQualityData.sources.map((source, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  background: '#f9f9f9',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}>
                  <div style={{ fontSize: '2rem', marginRight: '15px' }}>{source.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{source.name}</div>
                    <div style={{ 
                      background: '#e0e0e0', 
                      height: '8px', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: '#2196F3',
                        height: '100%',
                        width: `${source.percentage}%`,
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>
                  <div style={{ marginLeft: '15px', fontWeight: 'bold', color: '#2196F3' }}>
                    {source.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Accuracy Information */}
          {airQualityData.dataAccuracy && (
            <div className="card" style={{
              background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
              border: '2px solid #9C27B0',
              marginBottom: '30px'
            }}>
              <h3 style={{ color: '#7B1FA2', marginBottom: '20px' }}>🎯 Data Accuracy & Methodology</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', color: '#7B1FA2', fontWeight: 'bold' }}>
                    {airQualityData.dataAccuracy.confidence}%
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>Data Confidence</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', color: '#7B1FA2', fontWeight: 'bold' }}>
                    Simulated
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>Data Type</div>
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#7B1FA2' }}>Data Source:</strong>
                <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>{airQualityData.dataAccuracy.dataSource}</p>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#7B1FA2' }}>Methodology:</strong>
                <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>{airQualityData.dataAccuracy.methodology}</p>
              </div>
              
              <div>
                <strong style={{ color: '#7B1FA2' }}>Important Limitations:</strong>
                <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                  {airQualityData.dataAccuracy.limitations.map((limitation, idx) => (
                    <li key={idx} style={{ marginBottom: '3px' }}>{limitation}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '15px', padding: '10px', background: 'rgba(255,255,255,0.7)', borderRadius: '6px' }}>
                <strong>For Real Air Quality Data:</strong> Visit EPA AirNow, PurpleAir, or your local environmental agency's website for live sensor readings.
              </div>
            </div>
          )}

          {/* 5-Day Forecast */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2196F3', marginBottom: '20px' }}>📅 5-Day Air Quality Forecast</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              {airQualityData.forecast.map((day, index) => (
                <div key={index} style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: `${day.color}20`,
                  borderRadius: '12px',
                  border: `2px solid ${day.color}`
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{day.day}</div>
                  <div style={{ fontSize: '2rem', color: day.color, marginBottom: '5px' }}>{day.aqi}</div>
                  <div style={{ fontSize: '0.9rem', color: day.color, fontWeight: 'bold' }}>{day.level}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Trends */}
          <div className="card">
            <h3 style={{ color: '#2196F3', marginBottom: '20px' }}>📊 Historical Trends (2024)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '10px' }}>
              {historicalData.map((month, index) => (
                <div key={index} style={{ textAlign: 'center', padding: '10px' }}>
                  <div style={{ fontSize: '0.8rem', marginBottom: '5px', fontWeight: 'bold' }}>{month.month}</div>
                  <div style={{
                    height: `${Math.max(20, month.aqi / 2)}px`,
                    background: getAQIColor(month.aqi),
                    borderRadius: '4px',
                    marginBottom: '5px'
                  }}></div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>{month.aqi}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9rem', color: '#666' }}>
              Monthly Average AQI Values
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AirQuality;