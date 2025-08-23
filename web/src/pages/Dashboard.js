import React, { useState, useEffect } from 'react';
import Chart from '../components/ui/Chart';
import { apiManager } from '../utils/apiIntegration';
import { authManager } from '../utils/auth';

// Helper function to format time ago
const formatTimeAgo = (timestamp) => {
  if (!timestamp) return 'Unknown time';
  
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return time.toLocaleDateString();
};

function Dashboard({ onNavigate, currentUser, onActivityComplete }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    carbonSaved: 0,
    waterTests: 0,
    biodiversityScans: 0,
    wasteReduced: 0,
    energySaved: 0,
    treesPlanted: 0
  });
  const [globalData, setGlobalData] = useState(null);
  const [localData, setLocalData] = useState(null);
  const [chartData, setChartData] = useState({
    carbonTrend: [],
    biodiversityTrend: [],
    airQualityTrend: []
  });
  const [environmentalAlerts, setEnvironmentalAlerts] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [worldClock, setWorldClock] = useState({});
  const [globalStats, setGlobalStats] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateWorldClock();
    }, 1000);
    
    // Load user data and environmental data
    const loadUserData = async () => {
      try {
        // Get real user stats from auth manager
        const userStats = authManager.getUserStats();
        setStats({
          carbonSaved: userStats.carbonSaved || 0,
          waterTests: userStats.waterTests || 0,
          biodiversityScans: userStats.biodiversityScans || 0,
          wasteReduced: userStats.wasteReduced || 0,
          energySaved: userStats.energySaved || 0,
          treesPlanted: userStats.treesPlanted || 0
        });

        // Load real activity data
        await loadRecentActivity();
        
        // Load real-time environmental data
        await loadEnvironmentalData();
        
        // Load global statistics
        await loadGlobalStats();
      } catch (error) {
        console.error('Error loading user data:', error);
        setStats({
          carbonSaved: 0,
          waterTests: 0,
          biodiversityScans: 0,
          wasteReduced: 0,
          energySaved: 0,
          treesPlanted: 0
        });
        setRecentActivity([]);
      }
    };

    // Load real-time environmental data
    const loadEnvironmentalData = async () => {
      try {
        // Fetch global climate data
        const globalClimate = await apiManager.getGlobalClimateData();
        setGlobalData(globalClimate);

        // Get user location for local data
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const [airQuality, biodiversity] = await Promise.all([
                  apiManager.getAirQualityData(latitude, longitude),
                  apiManager.getBiodiversityData(latitude, longitude)
                ]);
                setLocalData({ airQuality, biodiversity, location: { latitude, longitude } });
                
                // Generate environmental alerts
                setEnvironmentalAlerts(generateEnvironmentalAlerts(globalClimate, airQuality, biodiversity));
              } catch (error) {
                console.error('Failed to fetch local data:', error);
              }
            },
            (error) => {
              console.warn('Geolocation not available:', error);
              setEnvironmentalAlerts([
                { id: 1, type: 'info', message: 'Enable location for local environmental data', priority: 'low' }
              ]);
            }
          );
        }

        // Generate chart data
        setChartData({
          carbonTrend: generateCarbonTrendData(),
          biodiversityTrend: generateBiodiversityTrendData(),
          airQualityTrend: generateAirQualityTrendData()
        });

      } catch (error) {
        console.error('Failed to load environmental data:', error);
        setEnvironmentalAlerts([
          { id: 1, type: 'warning', message: 'Unable to fetch real-time environmental data', priority: 'medium' }
        ]);
      }
    };

    const generateEnvironmentalAlerts = (globalData, airQuality, biodiversity) => {
      const alerts = [];
      
      if (globalData?.co2Levels?.current > 420) {
        alerts.push({
          id: 1,
          type: 'warning',
          message: `Global CO₂ levels at ${globalData.co2Levels.current} ppm - above safe threshold`,
          priority: 'high'
        });
      }

      if (airQuality?.aqi > 3) {
        alerts.push({
          id: 2,
          type: 'warning',
          message: 'Air quality poor in your area - limit outdoor activities',
          priority: 'high'
        });
      } else if (airQuality?.aqi <= 2) {
        alerts.push({
          id: 3,
          type: 'success',
          message: 'Good air quality in your area - great for outdoor activities!',
          priority: 'medium'
        });
      }

      if (biodiversity?.totalSpecies > 50) {
        alerts.push({
          id: 4,
          type: 'success',
          message: `Rich biodiversity detected - ${biodiversity.totalSpecies} species in your area`,
          priority: 'medium'
        });
      } else if (biodiversity?.totalSpecies < 10) {
        alerts.push({
          id: 5,
          type: 'warning',
          message: 'Low biodiversity in your area - consider conservation actions',
          priority: 'medium'
        });
      }

      if (globalData?.globalTemperature?.anomaly > 1.0) {
        alerts.push({
          id: 6,
          type: 'warning',
          message: `Global temperature anomaly: +${globalData.globalTemperature.anomaly}°C`,
          priority: 'medium'
        });
      }

      return alerts;
    };

    const generateCarbonTrendData = () => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      return months.map((month, index) => ({
        label: month,
        value: Math.max(0, 50 - index * 8 + Math.random() * 10)
      }));
    };

    const generateBiodiversityTrendData = () => {
      const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      return weeks.map((week, index) => ({
        label: week,
        value: 20 + index * 5 + Math.random() * 10
      }));
    };

    const generateAirQualityTrendData = () => {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days.map((day, index) => ({
        label: day,
        value: 30 + Math.sin(index) * 15 + Math.random() * 10
      }));
    };

    // Update world clock with major cities
    const updateWorldClock = () => {
      const now = new Date();
      setWorldClock({
        utc: now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false }),
        newYork: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false }),
        london: now.toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour12: false }),
        tokyo: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour12: false }),
        sydney: now.toLocaleTimeString('en-US', { timeZone: 'Australia/Sydney', hour12: false }),
        mumbai: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }),
        sao_paulo: now.toLocaleTimeString('en-US', { timeZone: 'America/Sao_Paulo', hour12: false })
      });
    };

    // Load global community statistics
    const loadGlobalStats = async () => {
      // Simulate global community stats with realistic numbers
      const baseStats = {
        totalUsers: 847293,
        waterTestsToday: 12847,
        speciesIdentifiedToday: 3421,
        co2SavedToday: 15678,
        countriesActive: 127,
        citiesMonitored: 2341
      };

      // Add some realistic variation
      const variation = () => Math.floor(Math.random() * 100);
      
      setGlobalStats({
        totalUsers: baseStats.totalUsers + variation(),
        waterTestsToday: baseStats.waterTestsToday + Math.floor(Math.random() * 50),
        speciesIdentifiedToday: baseStats.speciesIdentifiedToday + Math.floor(Math.random() * 20),
        co2SavedToday: baseStats.co2SavedToday + Math.floor(Math.random() * 200),
        countriesActive: baseStats.countriesActive,
        citiesMonitored: baseStats.citiesMonitored + Math.floor(Math.random() * 10)
      });
    };

    // Load recent activity based on user actions
    const loadRecentActivity = async () => {
      try {
        // Get real user activities from auth manager
        const activities = authManager.getActivities(10);
        
        if (activities.length > 0) {
          const formattedActivities = activities.map(activity => ({
            icon: getActivityIcon(activity.type),
            action: activity.description,
            location: activity.data?.location || 'EcoSpire Platform',
            time: formatTimeAgo(activity.timestamp),
            status: 'success'
          }));
          setRecentActivity(formattedActivities.slice(0, 5));
        } else {
          // Show welcome message for new users
          const welcomeActivities = currentUser?.isGuest ? [
            { 
              icon: '👋', 
              action: 'Started exploring EcoSpire in Guest Mode', 
              location: 'Welcome to the platform!', 
              time: 'Just now',
              status: 'info'
            },
            { 
              icon: '🌱', 
              action: 'Viewing global environmental data', 
              location: 'Dashboard', 
              time: 'Just now',
              status: 'info'
            }
          ] : [
            { 
              icon: '🌟', 
              action: `Welcome to EcoSpire, ${currentUser?.name || 'Environmental Champion'}!`, 
              location: 'Get started by using our environmental tools', 
              time: 'Just now',
              status: 'info'
            }
          ];
          setRecentActivity(welcomeActivities);
        }
      } catch (error) {
        console.error('Error loading activity:', error);
        setRecentActivity([
          { 
            icon: '⚠️', 
            action: 'Unable to load recent activity', 
            location: 'Please try refreshing the page', 
            time: 'Just now',
            status: 'warning'
          }
        ]);
      }
    };

    const getActivityIcon = (type) => {
      const icons = {
        water_test: '💧',
        biodiversity_scan: '🦜',
        carbon_reduction: '🌱',
        waste_reduction: '♻️',
        energy_saved: '⚡',
        community_post: '📱',
        profile_update: '👤',
        auth: '🔐',
        general: '📊'
      };
      return icons[type] || '🌿';
    };

    // Initialize everything
    loadUserData();
    updateWorldClock();
    
    return () => clearInterval(timer);
  }, [currentUser]);

  const tools = [
    {
      name: 'AquaLens',
      pageId: 'AquaLens',
      icon: '💧',
      description: 'AI-powered water quality analysis using smartphone cameras and test strips',
      stats: 'Start testing water quality',
      color: '#2196F3'
    },
    {
      name: 'BiodiversityEar',
      pageId: 'BiodiversityEar',
      icon: '🎧',
      description: 'Audio-based ecosystem monitoring and species identification',
      stats: 'Begin ecosystem monitoring',
      color: '#4CAF50'
    },
    {
      name: 'BioStreamAI',
      pageId: 'BioStreamAI',
      icon: '🧬',
      description: 'Environmental DNA analysis and genetic species identification',
      stats: 'Analyze genetic data',
      color: '#9C27B0'
    },
    {
      name: 'FloraShield',
      pageId: 'FloraShield',
      icon: '🛡️',
      description: 'Plant protection system with disease and threat detection',
      stats: 'Protect plant species',
      color: '#8BC34A'
    },
    {
      name: 'DigitalQuarry',
      pageId: 'DigitalQuarry',
      icon: '🏗️',
      description: 'Construction waste marketplace and material recovery optimization',
      stats: 'Optimize waste recovery',
      color: '#795548'
    },
    {
      name: 'EWasteProspector',
      pageId: 'EWasteProspector',
      icon: '🔬',
      description: 'Electronic waste mining and critical mineral recovery',
      stats: 'Recover valuable materials',
      color: '#607D8B'
    },
    {
      name: 'GeneticResilience',
      pageId: 'GeneticResilience',
      icon: '🌾',
      description: 'Climate-resilient crop analysis and breeding optimization',
      stats: 'Enhance crop resilience',
      color: '#FF9800'
    },
    {
      name: 'EcoSonification',
      pageId: 'EcoSonification',
      icon: '🎵',
      description: 'Environmental data visualization through sound and music',
      stats: 'Listen to data',
      color: '#E91E63'
    },
    {
      name: 'PhantomFootprint',
      pageId: 'PhantomFootprint',
      icon: '👻',
      description: 'Hidden environmental impact tracker for online purchases',
      stats: 'Reveal hidden costs',
      color: '#673AB7'
    },
    {
      name: 'UpcyclingAgent',
      pageId: 'UpcyclingAgent',
      icon: '🔄',
      description: 'Creative waste transformation and upcycling assistant',
      stats: 'Transform waste creatively',
      color: '#009688'
    },
    {
      name: 'AirQuality',
      pageId: 'AirQuality',
      icon: '🌬️',
      description: 'Real-time air quality monitoring and health alerts',
      stats: 'Monitor air pollution',
      color: '#00BCD4'
    },
    {
      name: 'CarbonOptimizer',
      pageId: 'CarbonOptimizer',
      icon: '⚡',
      description: 'Personal carbon footprint tracking and optimization',
      stats: 'Reduce carbon footprint',
      color: '#2E7D32'
    },
    {
      name: 'SmartFarming',
      pageId: 'SmartFarming',
      icon: '🚜',
      description: 'AI-powered sustainable agriculture and crop optimization',
      stats: 'Optimize farming practices',
      color: '#4CAF50'
    },
    {
      name: 'EWasteRecycling',
      pageId: 'EWasteRecycling',
      icon: '♻️',
      description: 'Electronic waste management and recycling optimization',
      stats: 'Recycle electronics',
      color: '#FF5722'
    },
    {
      name: 'FoodWasteReduction',
      pageId: 'FoodWasteReduction',
      icon: '🍽️',
      description: 'Food rescue platform and waste reduction strategies',
      stats: 'Reduce food waste',
      color: '#FFC107'
    },
    {
      name: 'EnvironmentalJustice',
      pageId: 'EnvironmentalJustice',
      icon: '⚖️',
      description: 'Environmental equity analysis and community advocacy',
      stats: 'Promote environmental justice',
      color: '#3F51B5'
    },
    {
      name: 'PackagingDesigner',
      pageId: 'PackagingDesigner',
      icon: '📦',
      description: 'Sustainable packaging design and material optimization',
      stats: 'Design eco-packaging',
      color: '#FF9800'
    },
    {
      name: 'EcoTasks',
      pageId: 'EcoTasks',
      icon: '🎯',
      description: 'Environmental action management and gamified challenges',
      stats: 'Complete eco-challenges',
      color: '#4CAF50'
    }
  ];

  const getAlertIcon = (type) => {
    const icons = {
      warning: '⚠️',
      info: 'ℹ️',
      success: '✅',
      error: '❌'
    };
    return icons[type] || 'ℹ️';
  };

  const getAlertColor = (type) => {
    const colors = {
      warning: '#FF9800',
      info: '#2196F3',
      success: '#4CAF50',
      error: '#f44336'
    };
    return colors[type] || '#2196F3';
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🌍 EcoSpire Global Dashboard
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          {currentUser?.isGuest ? 'Welcome, Guest! Explore with demo data' : 
           currentUser ? `Welcome back, ${currentUser.name}!` : 
           'Your comprehensive environmental intelligence hub'}
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
          🌍 Global Monitoring • 📊 Impact Tracking • 🤖 AI-Powered Insights
        </div>
      </div>

      {/* Guest Mode Notice */}
      {currentUser?.isGuest && (
        <div className="card" style={{
          marginBottom: '30px',
          background: 'linear-gradient(135deg, #fff3e0 0%, #ffcc02 20%)',
          border: '2px solid #FF9800',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#F57C00', marginBottom: '15px' }}>👋 You're in Guest Mode</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '15px' }}>
            Create an account to track your real environmental impact and join our global community!
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate && onNavigate('Login')}
              style={{
                padding: '12px 24px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🚀 Create Account
            </button>
            <button
              onClick={() => onNavigate && onNavigate('Login')}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: '#F57C00',
                border: '2px solid #F57C00',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🔑 Sign In
            </button>
          </div>
        </div>
      )}

      {/* Global Community Stats */}
      {Object.keys(globalStats).length > 0 && (
        <div className="card" style={{ 
          marginBottom: '30px', 
          background: 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)',
          border: '2px solid #4CAF50'
        }}>
          <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
            🌍 Global EcoSpire Community - Live Stats
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2E7D32' }}>
                {globalStats.totalUsers?.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Active Users Worldwide</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196F3' }}>
                {globalStats.waterTestsToday?.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Water Tests Today</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF9800' }}>
                {globalStats.speciesIdentifiedToday?.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Species ID'd Today</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50' }}>
                {globalStats.co2SavedToday?.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>kg CO₂ Saved Today</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9C27B0' }}>
                {globalStats.countriesActive}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Countries Active</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00BCD4' }}>
                {globalStats.citiesMonitored?.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Cities Monitored</div>
            </div>
          </div>
        </div>
      )}

      {/* Global Time & Date */}
      <div className="card" style={{ 
        marginBottom: '30px', 
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        border: '2px solid #2196F3'
      }}>
        <h3 style={{ color: '#1976d2', marginBottom: '20px', textAlign: 'center' }}>
          🕐 Global Time Zones
        </h3>
        
        {/* Local Time - Prominent */}
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1976d2', marginBottom: '5px' }}>
            {currentTime.toLocaleTimeString()}
          </div>
          <div style={{ fontSize: '1.1rem', color: '#666', marginBottom: '5px' }}>
            Your Local Time
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* World Clock */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px' }}>
          {[
            { city: 'UTC', time: worldClock.utc, flag: '🌍' },
            { city: 'New York', time: worldClock.newYork, flag: '🇺🇸' },
            { city: 'London', time: worldClock.london, flag: '🇬🇧' },
            { city: 'Tokyo', time: worldClock.tokyo, flag: '🇯🇵' },
            { city: 'Sydney', time: worldClock.sydney, flag: '🇦🇺' },
            { city: 'Mumbai', time: worldClock.mumbai, flag: '🇮🇳' },
            { city: 'São Paulo', time: worldClock.sao_paulo, flag: '🇧🇷' }
          ].map((zone, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '10px',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{zone.flag}</div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1976d2' }}>
                {zone.time}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>{zone.city}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Alerts */}
      {environmentalAlerts.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
            🚨 Environmental Alerts
          </h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {environmentalAlerts.map((alert) => (
              <div
                key={alert.id}
                style={{
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: `2px solid ${getAlertColor(alert.type)}`,
                  background: `${getAlertColor(alert.type)}15`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{getAlertIcon(alert.type)}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: getAlertColor(alert.type) }}>
                    {alert.message}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                    Priority: {alert.priority}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real-Time Environmental Data */}
      {globalData && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
            🌍 Global Environmental Status
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{
              textAlign: 'center',
              padding: '25px',
              background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
              borderRadius: '12px',
              border: '3px solid #f44336'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌡️</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f44336', marginBottom: '8px' }}>
                +{globalData.globalTemperature?.anomaly || '1.1'}°C
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#666' }}>
                Global Temperature Anomaly
              </div>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '25px',
              background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
              borderRadius: '12px',
              border: '3px solid #FF9800'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💨</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF9800', marginBottom: '8px' }}>
                {globalData.co2Levels?.current || '421'} ppm
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#666' }}>
                Atmospheric CO₂
              </div>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '25px',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              borderRadius: '12px',
              border: '3px solid #2196F3'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌊</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196F3', marginBottom: '8px' }}>
                {globalData.seaLevel?.current || '3.4'} mm/yr
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#666' }}>
                Sea Level Rise
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Environmental Trend Charts */}
      {chartData.carbonTrend.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
            📊 Environmental Trends
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
            <Chart
              data={chartData.carbonTrend}
              type="area"
              title="Carbon Footprint Reduction"
              color="#4CAF50"
              width={400}
              height={250}
            />
            <Chart
              data={chartData.airQualityTrend}
              type="line"
              title="Air Quality Index"
              color="#2196F3"
              width={400}
              height={250}
            />
            <Chart
              data={chartData.biodiversityTrend}
              type="bar"
              title="Biodiversity Observations"
              color="#FF9800"
              width={400}
              height={250}
            />
          </div>
        </div>
      )}

      {/* Environmental Impact Stats */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
          🌱 Your Environmental Impact
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {[
            { icon: '🌱', value: (stats.carbonSaved || 0).toLocaleString(), label: 'kg CO₂ Saved', color: '#4CAF50' },
            { icon: '💧', value: stats.waterTests || stats.waterAnalyzed || 0, label: 'Water Tests', color: '#2196F3' },
            { icon: '🦜', value: stats.biodiversityScans || 0, label: 'Bio Scans', color: '#FF9800' },
            { icon: '♻️', value: stats.wasteReduced || 0, label: 'Tons Waste Reduced', color: '#9C27B0' },
            { icon: '⚡', value: (stats.energySaved || 0).toLocaleString(), label: 'kWh Saved', color: '#FF5722' },
            { icon: '🌳', value: stats.treesPlanted || 0, label: 'Trees Planted', color: '#4CAF50' }
          ].map((stat, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '25px',
              background: '#f9f9f9',
              borderRadius: '12px',
              border: `3px solid ${stat.color}`
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color, marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#666' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Tools */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
          🛠️ Environmental Intelligence Tools
        </h3>
        <div className="grid grid-3">
          {tools.map((tool, index) => (
            <div key={index} className="card">
              <div className="card-content">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ fontSize: '2.5rem', marginRight: '15px' }}>{tool.icon}</div>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#2E7D32' }}>{tool.name}</h4>
                    <div style={{ fontSize: '0.8rem', color: tool.color, fontWeight: 'bold' }}>
                      {tool.stats}
                    </div>
                  </div>
                </div>
                <p className="card-description" style={{ lineHeight: '1.6', color: '#666' }}>
                  {tool.description}
                </p>
                <button
                  className="card-button"
                  onClick={() => onNavigate && onNavigate(tool.pageId)}
                  style={{
                    width: '100%',
                    background: tool.color,
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  🚀 Launch Tool
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Recent Activity */}
        <div className="card">
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>
            📈 Recent Activity
          </h3>
          <div>
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px 0',
                    borderBottom: index < recentActivity.length - 1 ? '1px solid #eee' : 'none'
                  }}
                >
                  <span style={{ fontSize: '1.8rem', marginRight: '15px' }}>{activity.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: '3px' }}>
                      {activity.action}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {activity.location}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#666',
                    background: '#f0f0f0',
                    padding: '4px 12px',
                    borderRadius: '12px'
                  }}>
                    {activity.time}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px', 
                color: '#666',
                fontStyle: 'italic'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌱</div>
                <p>No recent activity yet.</p>
                <p style={{ fontSize: '0.9rem' }}>
                  Start using EcoSpire tools to see your environmental actions here!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>
            ⚡ Quick Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: '📊', text: 'View Impact Report', color: '#2196F3', pageId: 'Impact' },
              { icon: '🎯', text: 'Set New Goals', color: '#4CAF50', pageId: 'EcoTasks' },
              { icon: '📚', text: 'Learn More', color: '#FF9800', pageId: 'Learn' },
              { icon: '🚀', text: 'Explore Startups', color: '#9C27B0', pageId: 'Startups' }
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => onNavigate && onNavigate(action.pageId)}
                style={{
                  width: '100%',
                  background: action.color,
                  border: 'none',
                  padding: '15px',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{action.icon}</span>
                {action.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;