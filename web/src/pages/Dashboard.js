import React, { useState, useEffect } from 'react';
import Chart from '../components/ui/Chart';
import { apiManager } from '../utils/apiIntegration';

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

function Dashboard({ onNavigate }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    carbonSaved: 0,
    waterTests: 0,
    biodiversityScans: 0,
    wasteReduced: 0,
    energySaved: 0,
    treesPlanted: 0
  });
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [globalData, setGlobalData] = useState(null);
  const [localData, setLocalData] = useState(null);
  const [chartData, setChartData] = useState({
    carbonTrend: [],
    biodiversityTrend: [],
    airQualityTrend: []
  });
  const [environmentalAlerts, setEnvironmentalAlerts] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Load user data with a small delay to ensure auth manager is initialized
    const loadUserData = async () => {
      try {
        // Demo user data
        const currentUser = { name: 'Environmental Champion', email: 'demo@ecospire.com' };
        const guestMode = false;
        const userStats = { co2Saved: 45, waterTests: 12, bioScans: 8 };
        
        setUser(currentUser);
        setIsGuest(guestMode);
        setStats(userStats || {
          carbonSaved: 0,
          waterTests: 0,
          biodiversityScans: 0,
          wasteReduced: 0,
          energySaved: 0,
          treesPlanted: 0
        });

        // Load real activity data
        await loadRecentActivity(guestMode);
        
        // Load real-time environmental data
        await loadEnvironmentalData();
      } catch (error) {
        console.error('Error loading user data:', error);
        // Set default stats on error
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

    // Load recent activity based on user actions
    const loadRecentActivity = async (guestMode) => {
      if (guestMode) {
        // Show demo activity for guest mode
        setRecentActivity([
          { 
            icon: '👋', 
            action: 'Started exploring EcoSpire', 
            location: 'Guest Mode', 
            time: 'Just now',
            status: 'info'
          },
          { 
            icon: '🌱', 
            action: 'Viewing demo environmental data', 
            location: 'Dashboard', 
            time: 'Just now',
            status: 'info'
          }
        ]);
        return;
      }

      try {
        // Get real user activity from different data sources
        const activities = [];

        // Get water test data (demo)
        const waterTests = [
          { timestamp: Date.now() - 86400000, location: 'Local River', ph: 7.2, quality: 'Good' },
          { timestamp: Date.now() - 172800000, location: 'City Park Pond', ph: 6.8, quality: 'Fair' }
        ];
        waterTests.forEach(test => {
          activities.push({
            icon: '💧',
            action: `Water quality test completed - ${test.overallQuality || 'Quality assessed'}`,
            location: test.waterSource || 'Unknown location',
            time: formatTimeAgo(test.timestamp),
            status: test.safetyLevel === 'Safe' ? 'success' : 'warning'
          });
        });

        // Get biodiversity scan data (demo)
        const bioScans = [
          { timestamp: Date.now() - 43200000, detectedSpecies: ['Robin', 'Sparrow', 'Blue Jay'], location: 'Backyard' },
          { timestamp: Date.now() - 129600000, detectedSpecies: ['Cardinal', 'Crow'], location: 'Park' }
        ];
        bioScans.forEach(scan => {
          const speciesCount = scan.detectedSpecies?.length || 0;
          activities.push({
            icon: '🦜',
            action: `Biodiversity scan completed - ${speciesCount} species detected`,
            location: scan.habitat || 'Unknown habitat',
            time: formatTimeAgo(scan.timestamp),
            status: 'success'
          });
        });

        // Get carbon tracking data (demo)
        const carbonData = [
          { timestamp: Date.now() - 21600000, amount: 2.5, activity: 'Bike to work' },
          { timestamp: Date.now() - 108000000, amount: 1.8, activity: 'Recycling' }
        ];
        carbonData.forEach(data => {
          activities.push({
            icon: '🌱',
            action: `Carbon footprint reduced by ${data.amount || 0} kg CO₂`,
            location: 'Carbon Optimizer',
            time: formatTimeAgo(data.timestamp),
            status: 'success'
          });
        });

        // Sort by timestamp and take most recent 5
        activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setRecentActivity(activities.slice(0, 5));

        // If no real activity, show welcome message
        if (activities.length === 0) {
          setRecentActivity([
            { 
              icon: '🌟', 
              action: 'Welcome to EcoSpire!', 
              location: 'Get started by using our environmental tools', 
              time: 'Just now',
              status: 'info'
            }
          ]);
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

    // Load immediately and also after a short delay
    loadUserData();
    setTimeout(loadUserData, 100);
    
    return () => clearInterval(timer);
  }, []);

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
      icon: '🦜',
      description: 'Audio-based ecosystem monitoring and species identification',
      stats: 'Begin ecosystem monitoring',
      color: '#4CAF50'
    },
    {
      name: 'Carbon Optimizer',
      pageId: 'CarbonOptimizer',
      icon: '🌱',
      description: 'Personal carbon footprint tracking and optimization recommendations',
      stats: 'Track your CO₂ savings',
      color: '#2E7D32'
    },
    {
      name: 'Smart Farming',
      pageId: 'SmartFarming',
      icon: '🌾',
      description: 'AI-powered agricultural insights and crop optimization',
      stats: '45 farms optimized',
      color: '#FF9800'
    },
    {
      name: 'Air Quality Monitor',
      pageId: 'AirQuality',
      icon: '🌬️',
      description: 'Real-time air quality monitoring and health alerts',
      stats: '12 cities tracked',
      color: '#00BCD4'
    },
    {
      name: 'FloraShield',
      pageId: 'FloraShield',
      icon: '🛡️',
      description: 'Plant disease detection and prevention system',
      stats: '234 plants protected',
      color: '#8BC34A'
    }
  ];

  const [recentActivity, setRecentActivity] = useState([]);

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
          🏠 EcoSpire Dashboard
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          {isGuest ? 'Welcome, Guest! Explore with demo data' : 
           user ? `Welcome back, ${user.fullName || user.username}!` : 
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
          🌍 Real-Time Monitoring • 📊 Impact Tracking • 🤖 AI-Powered Insights
        </div>
      </div>

      {/* Guest Mode Notice */}
      {isGuest && (
        <div className="card" style={{
          marginBottom: '30px',
          background: 'linear-gradient(135deg, #fff3e0 0%, #ffcc02 20%)',
          border: '2px solid #FF9800',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#F57C00', marginBottom: '15px' }}>👋 You're in Guest Mode</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '15px' }}>
            The data shown below is demo data. Create an account to track your real environmental impact!
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

      {/* Current Time */}
      <div className="card" style={{ 
        marginBottom: '30px', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        border: '2px solid #2196F3'
      }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1976d2', marginBottom: '10px' }}>
          {currentTime.toLocaleTimeString()}
        </div>
        <div style={{ fontSize: '1.1rem', color: '#666' }}>
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
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
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ fontSize: '2.5rem', marginRight: '15px' }}>{tool.icon}</div>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#2E7D32' }}>{tool.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: tool.color, fontWeight: 'bold' }}>
                    {tool.stats}
                  </div>
                </div>
              </div>
              <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#666' }}>
                {tool.description}
              </p>
              <button
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