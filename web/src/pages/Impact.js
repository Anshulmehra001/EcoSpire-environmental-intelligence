import React, { useState, useEffect } from 'react';
import Chart from '../components/ui/Chart';
import { advancedAnalytics } from '../utils/advancedAnalytics';
import { apiManager } from '../utils/apiIntegration';
import { realTimeEnvironmentalAPI } from '../utils/realTimeEnvironmentalAPI';

function Impact() {
  const [selectedRegion, setSelectedRegion] = useState('Global');
  const [activeTab, setActiveTab] = useState('global');
  const [personalAnalytics, setPersonalAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [liveData, setLiveData] = useState({
    co2Emissions: 37400000000,
    renewableCapacity: 3400,
    forestLoss: 10000000,
    plasticWaste: 300000000,
    speciesExtinct: 150,
    peopleAffected: 3300000000
  });
  const [realTimeEnvironmentalData, setRealTimeEnvironmentalData] = useState(null);
  const [globalAirQuality, setGlobalAirQuality] = useState(null);

  // Load personal analytics when switching to personal tab
  useEffect(() => {
    if (activeTab === 'personal' && !personalAnalytics) {
      loadPersonalAnalytics();
    }
  }, [activeTab]);

  // Load real-time environmental data
  useEffect(() => {
    loadRealTimeEnvironmentalData();
    
    // Update data every 30 minutes
    const interval = setInterval(loadRealTimeEnvironmentalData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate live data updates for counters
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        co2Emissions: prev.co2Emissions + Math.floor(Math.random() * 1000000),
        renewableCapacity: prev.renewableCapacity + Math.random() * 0.1,
        forestLoss: prev.forestLoss + Math.floor(Math.random() * 100),
        plasticWaste: prev.plasticWaste + Math.floor(Math.random() * 10000),
        speciesExtinct: prev.speciesExtinct + (Math.random() > 0.99 ? 1 : 0),
        peopleAffected: prev.peopleAffected + Math.floor(Math.random() * 1000)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadRealTimeEnvironmentalData = async () => {
    try {
      // Get data for major cities worldwide
      const cities = [
        { name: 'New York', lat: 40.7128, lon: -74.0060 },
        { name: 'London', lat: 51.5074, lon: -0.1278 },
        { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
        { name: 'Delhi', lat: 28.6139, lon: 77.2090 },
        { name: 'Beijing', lat: 39.9042, lon: 116.4074 },
        { name: 'São Paulo', lat: -23.5505, lon: -46.6333 }
      ];

      const cityData = await Promise.all(
        cities.map(async (city) => {
          try {
            const data = await realTimeEnvironmentalAPI.getComprehensiveData(city.lat, city.lon);
            return { ...data, cityName: city.name };
          } catch (error) {
            console.warn(`Failed to get data for ${city.name}:`, error);
            return null;
          }
        })
      );

      const validData = cityData.filter(data => data !== null);
      setRealTimeEnvironmentalData(validData);

      // Calculate global averages
      if (validData.length > 0) {
        const avgAQI = validData.reduce((sum, city) => sum + city.airQuality.aqi, 0) / validData.length;
        const avgTemp = validData.reduce((sum, city) => sum + city.weather.temperature, 0) / validData.length;
        const avgHumidity = validData.reduce((sum, city) => sum + city.weather.humidity, 0) / validData.length;

        setGlobalAirQuality({
          averageAQI: Math.round(avgAQI),
          averageTemp: Math.round(avgTemp),
          averageHumidity: Math.round(avgHumidity),
          citiesMonitored: validData.length,
          lastUpdate: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Failed to load real-time environmental data:', error);
    }
  };

  const loadPersonalAnalytics = async () => {
    setLoading(true);
    try {
      // Get user activity data
      const userData = await getUserActivityData();
      const analytics = await advancedAnalytics.calculateEnvironmentalImpact(userData);
      const predictions = await advancedAnalytics.predictFutureImpact(userData, 12);
      
      setPersonalAnalytics({
        ...analytics,
        predictions: predictions
      });
    } catch (error) {
      console.error('Failed to load personal analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserActivityData = async () => {
    // Get user activity data from localStorage or generate sample data
    const savedActivities = localStorage.getItem('ecospire-user-activities');
    if (savedActivities) {
      return JSON.parse(savedActivities);
    }
    
    // Generate sample user data for demonstration
    return {
      activities: [
        { type: 'car_gasoline', amount: 50, timestamp: Date.now() - 86400000 * 30 },
        { type: 'electricity_grid', amount: 300, timestamp: Date.now() - 86400000 * 25 },
        { type: 'recycled_waste', amount: 15, timestamp: Date.now() - 86400000 * 20 },
        { type: 'tree_planting', amount: 3, timestamp: Date.now() - 86400000 * 15 },
        { type: 'shower', amount: 20, timestamp: Date.now() - 86400000 * 10 },
        { type: 'car_electric', amount: 80, timestamp: Date.now() - 86400000 * 5 },
        { type: 'electricity_renewable', amount: 200, timestamp: Date.now() - 86400000 * 2 },
        { type: 'beef', amount: 2, timestamp: Date.now() - 86400000 * 7 },
        { type: 'vegetables', amount: 10, timestamp: Date.now() - 86400000 * 3 },
        { type: 'composted_waste', amount: 8, timestamp: Date.now() - 86400000 * 1 }
      ]
    };
  };

  const globalStats = [
    {
      title: "Climate Change",
      stats: [
        { label: "Global Temperature Rise", value: "+1.1°C", trend: "↗️", color: "#f44336" },
        { label: "CO2 Concentration", value: "421 ppm", trend: "↗️", color: "#f44336" },
        { label: "Sea Level Rise", value: "+21 cm", trend: "↗️", color: "#f44336" },
        { label: "Arctic Ice Loss", value: "13%/decade", trend: "↘️", color: "#f44336" }
      ]
    },
    {
      title: "Renewable Energy",
      stats: [
        { label: "Global Capacity", value: "3.4 TW", trend: "↗️", color: "#4CAF50" },
        { label: "Annual Growth", value: "+260 GW", trend: "↗️", color: "#4CAF50" },
        { label: "Cost Reduction", value: "-85%", trend: "↘️", color: "#4CAF50" },
        { label: "Jobs Created", value: "13.7M", trend: "↗️", color: "#4CAF50" }
      ]
    },
    {
      title: "Biodiversity",
      stats: [
        { label: "Species at Risk", value: "1M+", trend: "↗️", color: "#FF9800" },
        { label: "Forest Loss", value: "10M ha/yr", trend: "↗️", color: "#f44336" },
        { label: "Protected Areas", value: "18%", trend: "↗️", color: "#4CAF50" },
        { label: "Restoration Projects", value: "2,000+", trend: "↗️", color: "#4CAF50" }
      ]
    },
    {
      title: "Ocean Health",
      stats: [
        { label: "Plastic Pollution", value: "300M tons/yr", trend: "↗️", color: "#f44336" },
        { label: "Ocean Acidification", value: "+30%", trend: "↗️", color: "#f44336" },
        { label: "Marine Protected Areas", value: "8%", trend: "↗️", color: "#4CAF50" },
        { label: "Coral Reef Loss", value: "50%", trend: "↘️", color: "#f44336" }
      ]
    },
    {
      title: "Air Pollution",
      stats: [
        { label: "Deaths from Air Pollution", value: "7M/year", trend: "↗️", color: "#f44336" },
        { label: "Cities Exceeding WHO Limits", value: "90%", trend: "↗️", color: "#f44336" },
        { label: "PM2.5 Global Average", value: "35 μg/m³", trend: "↗️", color: "#FF9800" },
        { label: "Clean Air Initiatives", value: "500+", trend: "↗️", color: "#4CAF50" }
      ]
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Amazon Conservation Association",
      location: "Peru, Amazon Basin",
      category: "Forest Conservation",
      funded: 2400000,
      goal: 3000000,
      impact: "Protecting 1.6 million acres of Amazon rainforest",
      image: "🌳",
      urgency: "Critical",
      timeline: "2024-2027",
      beneficiaries: "50,000 indigenous people"
    },
    {
      id: 2,
      title: "The Ocean Cleanup",
      location: "Great Pacific Garbage Patch",
      category: "Ocean Conservation",
      funded: 35000000,
      goal: 50000000,
      impact: "Remove 90% of floating ocean plastic by 2040",
      image: "🌊",
      urgency: "High",
      timeline: "2024-2040",
      beneficiaries: "Global marine ecosystem"
    },
    {
      id: 3,
      title: "Solar Sister - Women's Clean Energy",
      location: "Nigeria, Tanzania, Uganda",
      category: "Renewable Energy",
      funded: 1200000,
      goal: 2000000,
      impact: "Clean energy access for 2.5 million people",
      image: "☀️",
      urgency: "High",
      timeline: "2024-2026",
      beneficiaries: "2.5M people, 5,000 women entrepreneurs"
    },
    {
      id: 4,
      title: "Coral Restoration Foundation",
      location: "Caribbean, Pacific",
      category: "Marine Conservation",
      funded: 800000,
      goal: 1500000,
      impact: "Restore 100 acres of coral reef ecosystems",
      image: "🐠",
      urgency: "Critical",
      timeline: "2024-2029",
      beneficiaries: "Marine biodiversity, coastal communities"
    },
    {
      id: 5,
      title: "Sahara Forest Project",
      location: "North Africa",
      category: "Desertification",
      funded: 5000000,
      goal: 8000000,
      impact: "Reverse desertification across 10,000 hectares",
      image: "🌵",
      urgency: "High",
      timeline: "2024-2030",
      beneficiaries: "1M people in affected regions"
    },
    {
      id: 6,
      title: "Mangrove Restoration Initiative",
      location: "Southeast Asia",
      category: "Coastal Protection",
      funded: 3200000,
      goal: 4500000,
      impact: "Plant 5 million mangrove trees",
      image: "🌿",
      urgency: "Critical",
      timeline: "2024-2028",
      beneficiaries: "2M coastal residents"
    },
    {
      id: 7,
      title: "Arctic Ice Preservation",
      location: "Arctic Circle",
      category: "Climate Action",
      funded: 1800000,
      goal: 5000000,
      impact: "Develop ice-preserving technologies",
      image: "🧊",
      urgency: "Critical",
      timeline: "2024-2030",
      beneficiaries: "Global climate stability"
    },
    {
      id: 8,
      title: "Urban Forest Initiative",
      location: "Global Cities",
      category: "Urban Environment",
      funded: 2500000,
      goal: 4000000,
      impact: "Plant 1 million trees in urban areas",
      image: "🏙️",
      urgency: "High",
      timeline: "2024-2027",
      beneficiaries: "50M urban residents"
    },
    {
      id: 9,
      title: "Clean Water for All",
      location: "Sub-Saharan Africa",
      category: "Water Security",
      funded: 4200000,
      goal: 6000000,
      impact: "Provide clean water access to 500,000 people",
      image: "💧",
      urgency: "Critical",
      timeline: "2024-2026",
      beneficiaries: "500,000 people in rural communities"
    },
    {
      id: 10,
      title: "Renewable Energy Villages",
      location: "Rural India",
      category: "Energy Access",
      funded: 1500000,
      goal: 3500000,
      impact: "Solar power for 200 remote villages",
      image: "⚡",
      urgency: "High",
      timeline: "2024-2028",
      beneficiaries: "100,000 rural residents"
    },
    {
      id: 11,
      title: "Plastic-Free Oceans",
      location: "Mediterranean Sea",
      category: "Marine Protection",
      funded: 2800000,
      goal: 4200000,
      impact: "Remove 50,000 tons of plastic waste",
      image: "🐢",
      urgency: "High",
      timeline: "2024-2029",
      beneficiaries: "Mediterranean marine life"
    },
    {
      id: 12,
      title: "Bee Conservation Network",
      location: "Europe & North America",
      category: "Biodiversity",
      funded: 900000,
      goal: 2000000,
      impact: "Protect 10,000 bee colonies",
      image: "🐝",
      urgency: "Critical",
      timeline: "2024-2027",
      beneficiaries: "Global food security"
    }
  ];

  const successStories = [
    {
      title: "Costa Rica Reforestation",
      achievement: "Forest cover increased from 24% to 54%",
      timeframe: "1985-2024",
      impact: "Carbon sequestration: 10M tons CO2",
      image: "🇨🇷",
      link: "https://www.worldbank.org/en/news/feature/2019/03/25/costa-ricas-forest-recovery"
    },
    {
      title: "China's Great Green Wall",
      achievement: "66 billion trees planted across 400,000 km²",
      timeframe: "1978-2024",
      impact: "Reduced desertification by 20%",
      image: "🇨🇳",
      link: "https://www.unep.org/news-and-stories/story/chinas-great-green-wall-fights-expanding-desert"
    },
    {
      title: "Rwanda's Plastic Ban",
      achievement: "First plastic-bag-free nation in Africa",
      timeframe: "2008-2024",
      impact: "95% reduction in plastic waste",
      image: "🇷🇼",
      link: "https://www.unep.org/news-and-stories/story/rwanda-champions-plastic-bag-ban"
    },
    {
      title: "Denmark Wind Energy",
      achievement: "50% of electricity from wind power",
      timeframe: "1990-2024",
      impact: "80% reduction in CO2 emissions",
      image: "🇩🇰",
      link: "https://www.iea.org/countries/denmark"
    },
    {
      title: "Bhutan Carbon Negative",
      achievement: "World's only carbon-negative country",
      timeframe: "2009-2024",
      impact: "Absorbs 6M tons CO2 annually",
      image: "🇧🇹",
      link: "https://www.undp.org/bhutan/news/bhutan-small-land-locked-country-big-lessons-world"
    },
    {
      title: "Morocco Solar Complex",
      achievement: "World's largest solar power complex",
      timeframe: "2016-2024",
      impact: "Powers 2M homes, saves 760,000 tons CO2/year",
      image: "🇲🇦",
      link: "https://www.worldbank.org/en/news/feature/2019/04/08/morocco-solar-power"
    },
    {
      title: "Netherlands Circular Economy",
      achievement: "50% circular economy by 2030 target",
      timeframe: "2016-2024",
      impact: "Reduced waste by 30%, created 54,000 jobs",
      image: "🇳🇱",
      link: "https://www.government.nl/topics/circular-economy"
    },
    {
      title: "Singapore Water Independence",
      achievement: "Water self-sufficiency through innovation",
      timeframe: "2003-2024",
      impact: "100% water recycling, 30% desalination",
      image: "🇸🇬",
      link: "https://www.pub.gov.sg/watersupply/fournationaltaps"
    }
  ];

  const regions = ['Global', 'North America', 'Europe', 'Asia', 'Africa', 'South America', 'Oceania'];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical': return '#f44336';
      case 'High': return '#FF9800';
      case 'Medium': return '#2196F3';
      default: return '#4CAF50';
    }
  };

  const getProjectLink = (projectId) => {
    const projectLinks = {
      1: 'https://amazonconservation.org/donate/',
      2: 'https://theoceancleanup.com/donate/',
      3: 'https://solarsister.org/donate/',
      4: 'https://coralrestoration.org/donate/',
      5: 'https://saharaforestproject.com/donate/',
      6: 'https://mangroveactionproject.org/donate/',
      7: 'https://www.arcticwwf.org/work/climate/arctic-ice/',
      8: 'https://onetreeplanted.org/products/cities',
      9: 'https://water.org/donate/',
      10: 'https://www.solarpowerworld.com/donate/',
      11: 'https://plasticoceans.org/donate/',
      12: 'https://www.xerces.org/donate'
    };
    return projectLinks[projectId] || 'https://www.globalgiving.org/';
  };

  const getProjectInfoLink = (projectId) => {
    const infoLinks = {
      1: 'https://amazonconservation.org/',
      2: 'https://theoceancleanup.com/',
      3: 'https://solarsister.org/',
      4: 'https://coralrestoration.org/',
      5: 'https://saharaforestproject.com/',
      6: 'https://mangroveactionproject.org/',
      7: 'https://www.arcticwwf.org/',
      8: 'https://onetreeplanted.org/',
      9: 'https://water.org/',
      10: 'https://www.irena.org/',
      11: 'https://plasticoceans.org/',
      12: 'https://www.xerces.org/'
    };
    return infoLinks[projectId] || 'https://www.globalgiving.org/';
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🌍 Global Environmental Impact
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          Real-time worldwide environmental data, projects, and collective action
        </p>
        <div style={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '25px',
          display: 'inline-block',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}>
          📊 Live Data • 🌱 Active Projects • 🤝 Global Collaboration
        </div>
      </div>

      {/* Live Global Dashboard */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #1976d2 0%, #2196F3 100%)', 
        color: 'white', 
        marginBottom: '30px' 
      }}>
        <h3 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>
          📡 Live Global Environmental Data
        </h3>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
              {(liveData.co2Emissions / 1000000000).toFixed(1)}B
            </div>
            <div style={{ opacity: 0.9 }}>Tons CO₂ This Year</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>↗️ +1.2% from last year</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
              {liveData.renewableCapacity.toFixed(1)}TW
            </div>
            <div style={{ opacity: 0.9 }}>Renewable Capacity</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>↗️ +12% growth rate</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
              {(liveData.peopleAffected / 1000000000).toFixed(1)}B
            </div>
            <div style={{ opacity: 0.9 }}>People Climate Affected</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>↗️ +3.2% annually</div>
          </div>
        </div>
        
        {/* Real-time Global Air Quality */}
        {globalAirQuality && (
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '10px' 
          }}>
            <h4 style={{ color: 'white', marginBottom: '10px', textAlign: 'center' }}>
              🌍 Global Air Quality Monitoring
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {globalAirQuality.averageAQI}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Average AQI</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {globalAirQuality.averageTemp}°C
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Global Temp</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {globalAirQuality.citiesMonitored}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Cities Monitored</div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.7rem', opacity: 0.7 }}>
              Last updated: {new Date(globalAirQuality.lastUpdate).toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>

      {/* Real-time City Data */}
      {realTimeEnvironmentalData && realTimeEnvironmentalData.length > 0 && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
            🏙️ Real-Time City Environmental Data
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            {realTimeEnvironmentalData.slice(0, 6).map((cityData, index) => (
              <div key={index} style={{
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '10px',
                border: '1px solid #e0e0e0'
              }}>
                <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>{cityData.cityName}</h4>
                <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                  <div><strong>AQI:</strong> {cityData.airQuality.aqi}</div>
                  <div><strong>Temperature:</strong> {cityData.weather.temperature}°C</div>
                  <div><strong>Humidity:</strong> {cityData.weather.humidity}%</div>
                  <div><strong>PM2.5:</strong> {cityData.airQuality.pm25} μg/m³</div>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '8px' }}>
                  Source: {cityData.airQuality.source}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regional Filter */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: selectedRegion === region ? '#2E7D32' : '#f0f0f0',
                color: selectedRegion === region ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Global Statistics */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
          📊 Environmental Statistics by Category
        </h3>
        <div className="grid grid-2">
          {globalStats.map((category, index) => (
            <div key={index} className="card">
              <h4 style={{ color: '#2E7D32', marginBottom: '15px', textAlign: 'center' }}>
                {category.title}
              </h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                {category.stats.map((stat, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    background: '#f8f9fa',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '0.9rem' }}>{stat.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ fontWeight: 'bold', color: stat.color }}>
                        {stat.value}
                      </span>
                      <span style={{ fontSize: '0.8rem' }}>{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Projects */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
          💚 Fund Critical Environmental Projects
        </h3>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Support verified environmental projects making measurable impact worldwide
        </p>
        <div className="grid grid-2">
          {projects.map(project => (
            <div key={project.id} className="card" style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                padding: '4px 8px',
                borderRadius: '12px',
                background: getUrgencyColor(project.urgency),
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}>
                {project.urgency}
              </div>
              
              <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '15px' }}>
                {project.image}
              </div>
              
              <h4 style={{ color: '#2E7D32', marginBottom: '8px' }}>{project.title}</h4>
              <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '8px' }}>
                📍 {project.location} • 🏷️ {project.category}
              </p>
              
              <div style={{ marginBottom: '15px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '5px', 
                  fontSize: '0.9rem' 
                }}>
                  <span>${(project.funded / 1000000).toFixed(1)}M raised</span>
                  <span>Goal: ${(project.goal / 1000000).toFixed(1)}M</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  background: '#eee', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(project.funded / project.goal) * 100}%`,
                    height: '100%',
                    background: '#4CAF50'
                  }}></div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                  {Math.round((project.funded / project.goal) * 100)}% funded
                </div>
              </div>
              
              <div style={{ marginBottom: '15px', fontSize: '0.85rem' }}>
                <p style={{ color: '#2E7D32', fontWeight: 'bold', marginBottom: '5px' }}>
                  🎯 {project.impact}
                </p>
                <p style={{ color: '#666', marginBottom: '5px' }}>
                  ⏱️ Timeline: {project.timeline}
                </p>
                <p style={{ color: '#666' }}>
                  👥 Beneficiaries: {project.beneficiaries}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => window.open(getProjectLink(project.id), '_blank')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#2E7D32',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  💚 Support
                </button>
                <button 
                  onClick={() => window.open(getProjectInfoLink(project.id), '_blank')}
                  style={{
                    padding: '10px 15px',
                    background: 'transparent',
                    color: '#2E7D32',
                    border: '2px solid #2E7D32',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ℹ️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
          🏆 Environmental Success Stories
        </h3>
        <div className="grid grid-2">
          {successStories.map((story, index) => (
            <div 
              key={index} 
              className="card" 
              style={{ 
                background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onClick={() => window.open(story.link, '_blank')}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ fontSize: '2.5rem', marginRight: '15px' }}>{story.image}</div>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#2E7D32' }}>{story.title}</h4>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{story.timeframe}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#2E7D32', marginBottom: '10px' }}>
                {story.achievement}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '10px' }}>
                🌍 Impact: {story.impact}
              </p>
              <div style={{ 
                fontSize: '0.8rem', 
                color: '#2E7D32', 
                fontWeight: 'bold',
                textAlign: 'right'
              }}>
                Click to learn more →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)', 
        color: 'white',
        textAlign: 'center'
      }}>
        <h3 style={{ color: 'white', marginBottom: '15px' }}>
          🚀 Join the Global Environmental Movement
        </h3>
        <p style={{ marginBottom: '20px', opacity: 0.9 }}>
          Every action counts. Start your environmental journey today and be part of the solution.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => window.location.href = '/eco-tasks'}
            style={{
              padding: '12px 24px',
              background: 'white',
              color: '#F57C00',
              border: 'none',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🌱 Start Eco Tasks
          </button>
          <button 
            onClick={() => window.location.href = '/learn'}
            style={{
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            📚 Learn More
          </button>
          <button 
            onClick={() => window.open('https://discord.gg/ecospire', '_blank')}
            style={{
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🤝 Join Community
          </button>
        </div>
      </div>
    </div>
  );
}

export default Impact;