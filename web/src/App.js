import React, { useState, useEffect } from 'react';
import './App.css';
import { systemInitializer } from './utils/systemInitializer.js';
import { authManager } from './utils/auth.js';
import LoadingScreen from './components/LoadingScreen';

// Import all your pages
import Dashboard from './pages/Dashboard';
import AquaLens from './pages/AquaLens';
import BiodiversityEar from './pages/BiodiversityEar';
import CarbonOptimizer from './pages/CarbonOptimizer';
import SmartFarming from './pages/SmartFarming';
import EWasteRecycling from './pages/EWasteRecycling';
import AirQuality from './pages/AirQuality';
import FloraShield from './pages/FloraShield';
import FoodWasteReduction from './pages/FoodWasteReduction';
import EnvironmentalJustice from './pages/EnvironmentalJustice';
import EcoSonification from './pages/EcoSonification';
import PhantomFootprint from './pages/PhantomFootprint';
import UpcyclingAgent from './pages/UpcyclingAgent';
import PackagingDesigner from './pages/PackagingDesigner';
import Impact from './pages/Impact';
import EcoTasks from './pages/EcoTasks';
import Learn from './pages/Learn';
import Startups from './pages/Startups';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Login from './pages/Login';
import DigitalQuarry from './pages/DigitalQuarry';
import BioStreamAI from './pages/BioStreamAI';
import EWasteProspector from './pages/EWasteProspector';
import GeneticResilience from './pages/GeneticResilience';

function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [userStats, setUserStats] = useState({
    carbonSaved: 0,
    waterTests: 0,
    biodiversityScans: 0,
    treesPlanted: 0,
    wasteReduced: 0,
    energySaved: 0
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [systemReady, setSystemReady] = useState(false);
  const [systemStatus, setSystemStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize advanced systems and authentication on app start
  useEffect(() => {
    const initializeSystems = async () => {
      console.log('🚀 EcoSpire: Initializing Advanced Environmental Systems...');
      
      try {
        const status = await systemInitializer.initialize();
        setSystemStatus(status);
        setSystemReady(status.overallReady);
        
        // Initialize authentication
        const user = authManager.getCurrentUser();
        setCurrentUser(user);
        
        if (status.overallReady) {
          console.log('✅ EcoSpire: All systems operational!');
        } else {
          console.warn('⚠️ EcoSpire: Running with limited functionality');
        }
      } catch (error) {
        console.error('❌ EcoSpire: System initialization failed:', error);
        setSystemReady(false);
      }
    };

    initializeSystems();
    
    // Show loading screen for 2.5 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Handle authentication changes
  const handleAuthChange = (user) => {
    setCurrentUser(user);
    updateUserStats();
  };

  // Update user stats from auth manager
  const updateUserStats = () => {
    const stats = authManager.getUserStats();
    
    // Only show demo stats for actual guest users, not logged-in users
    const isGuest = currentUser?.isGuest === true;
    const isNewGuest = isGuest && !stats.carbonSaved && !stats.waterTests && !stats.biodiversityScans;
    
    console.log('🔄 App.js updateUserStats called');
    console.log('📊 Raw stats from authManager:', stats);
    console.log('👤 Current user:', currentUser);
    console.log('🆕 Is new guest:', isNewGuest);
    
    const newStats = {
      carbonSaved: stats.carbonSaved || (isNewGuest ? 12 : 0),
      waterTests: stats.waterTests || (isNewGuest ? 3 : 0),
      biodiversityScans: stats.biodiversityScans || (isNewGuest ? 2 : 0),
      treesPlanted: stats.treesPlanted || 0,
      wasteReduced: stats.wasteReduced || 0,
      energySaved: stats.energySaved || 0
    };
    
    console.log('📈 Setting userStats to:', newStats);
    setUserStats(newStats);
  };

  // Set up periodic stats refresh
  useEffect(() => {
    // Initial stats load
    updateUserStats();
    
    // Refresh stats every 10 seconds (less frequent to reduce flickering)
    const statsInterval = setInterval(updateUserStats, 10000);
    
    return () => clearInterval(statsInterval);
  }, [currentUser]);

  const pages = [
    { 
      id: 'Dashboard', 
      name: 'Dashboard', 
      icon: '🏠', 
      component: Dashboard,
      description: 'Overview & Analytics'
    },
    { 
      id: 'AquaLens', 
      name: 'AquaLens', 
      icon: '💧', 
      component: AquaLens,
      description: 'Water Quality Analysis'
    },
    { 
      id: 'BiodiversityEar', 
      name: 'BiodiversityEar', 
      icon: '🦜', 
      component: BiodiversityEar,
      description: 'Ecosystem Monitoring'
    },
    { 
      id: 'CarbonOptimizer', 
      name: 'Carbon Optimizer', 
      icon: '🌱', 
      component: CarbonOptimizer,
      description: 'Carbon Footprint Tracking'
    },
    { 
      id: 'SmartFarming', 
      name: 'Smart Farming', 
      icon: '🌾', 
      component: SmartFarming,
      description: 'Agricultural Intelligence'
    },
    { 
      id: 'EWasteRecycling', 
      name: 'E-Waste Recycling', 
      icon: '♻️', 
      component: EWasteRecycling,
      description: 'Electronic Waste Management'
    },
    { 
      id: 'AirQuality', 
      name: 'Air Quality', 
      icon: '🌬️', 
      component: AirQuality,
      description: 'Air Pollution Monitoring'
    },
    { 
      id: 'FloraShield', 
      name: 'FloraShield', 
      icon: '🛡️', 
      component: FloraShield,
      description: 'Plant Disease Detection'
    },
    { 
      id: 'FoodWasteReduction', 
      name: 'Food Waste Reduction', 
      icon: '🍎', 
      component: FoodWasteReduction,
      description: 'Food Rescue Network'
    },
    { 
      id: 'EnvironmentalJustice', 
      name: 'Environmental Justice', 
      icon: '⚖️', 
      component: EnvironmentalJustice,
      description: 'Equity & Justice'
    },
    { 
      id: 'EcoSonification', 
      name: 'EcoSonification', 
      icon: '🎵', 
      component: EcoSonification,
      description: 'Environmental Sound Art'
    },
    { 
      id: 'PhantomFootprint', 
      name: 'Phantom Footprint', 
      icon: '👻', 
      component: PhantomFootprint,
      description: 'Hidden Impact Tracker'
    },
    { 
      id: 'UpcyclingAgent', 
      name: 'Upcycling Agent', 
      icon: '🔄', 
      component: UpcyclingAgent,
      description: 'Creative Reuse Assistant'
    },
    { 
      id: 'PackagingDesigner', 
      name: 'Packaging Designer', 
      icon: '📦', 
      component: PackagingDesigner,
      description: 'Sustainable Packaging'
    },
    { 
      id: 'DigitalQuarry', 
      name: 'Digital Quarry', 
      icon: '🏗️', 
      component: DigitalQuarry,
      description: 'Construction Waste Marketplace'
    },
    { 
      id: 'BioStreamAI', 
      name: 'Bio-Stream AI', 
      icon: '🧬', 
      component: BioStreamAI,
      description: 'Environmental DNA Analysis'
    },
    { 
      id: 'EWasteProspector', 
      name: 'E-Waste Prospector', 
      icon: '⚡', 
      component: EWasteProspector,
      description: 'Critical Mineral Recovery'
    },
    { 
      id: 'GeneticResilience', 
      name: 'Genetic Resilience', 
      icon: '🌾', 
      component: GeneticResilience,
      description: 'Climate Crop Analysis'
    },
    { 
      id: 'Impact', 
      name: 'Global Impact', 
      icon: '🌍', 
      component: Impact,
      description: 'Environmental Impact Data'
    },
    { 
      id: 'EcoTasks', 
      name: 'Eco Tasks', 
      icon: '✅', 
      component: EcoTasks,
      description: 'Daily Green Actions'
    },
    { 
      id: 'Learn', 
      name: 'Learn', 
      icon: '📚', 
      component: Learn,
      description: 'Environmental Education'
    },
    { 
      id: 'Startups', 
      name: 'Green Startups', 
      icon: '🚀', 
      component: Startups,
      description: 'Sustainable Innovation'
    },
    { 
      id: 'Community', 
      name: 'Community', 
      icon: '👥', 
      component: Community,
      description: 'Connect with eco champions'
    },
    { 
      id: 'Profile', 
      name: 'My Profile', 
      icon: '👤', 
      component: Profile,
      description: 'View your environmental impact'
    },
    { 
      id: 'Login', 
      name: 'Login', 
      icon: '🔑', 
      component: Login,
      description: 'Sign in or create account'
    }
  ];

  // Initialize page from URL on app load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageFromUrl = urlParams.get('page');
    
    if (pageFromUrl && pages.some(page => page.id === pageFromUrl)) {
      setActivePage(pageFromUrl);
    } else {
      // If no valid page in URL, set default and update URL
      const defaultPage = 'Dashboard';
      setActivePage(defaultPage);
      updateURL(defaultPage);
    }
  }, []);

  // Function to update URL without page reload
  const updateURL = (pageId) => {
    const newUrl = `${window.location.pathname}?page=${pageId}`;
    window.history.pushState({ page: pageId }, '', newUrl);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      const urlParams = new URLSearchParams(window.location.search);
      const pageFromUrl = urlParams.get('page') || 'Dashboard';
      
      if (pages.some(page => page.id === pageFromUrl)) {
        setActivePage(pageFromUrl);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const currentPage = pages.find(page => page.id === activePage);
  const CurrentComponent = currentPage?.component || Dashboard;

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    updateURL(pageId);
  };

  // Handle activity completion to update stats immediately
  const handleActivityComplete = async (activity) => {
    console.log('🎯 App.js handleActivityComplete called with:', activity);
    
    // Log activity through auth manager if activity data is provided
    if (activity && activity.type) {
      console.log('📝 Logging activity through authManager...');
      await authManager.logActivity(activity.description || 'Environmental action', {
        type: activity.type,
        amount: activity.amount,
        points: activity.points || 10
      });
      console.log('✅ Activity logged successfully');
    }
    
    // Update stats display
    console.log('🔄 Calling updateUserStats after activity completion...');
    updateUserStats();
  };

  // Show loading screen first
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="terra-app">
      {/* Sidebar */}
      <div className="terra-sidebar open">
        {/* Logo */}
        <div className="terra-logo">
          <div className="logo-container">
            <div className="logo-icon">🌿</div>
            <div className="logo-text">
              <h1>EcoSpire</h1>
              <p>Environmental Intelligence Hub</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="terra-nav">
          {pages.map(page => (
            <div
              key={page.id}
              className={`nav-item ${activePage === page.id ? 'active' : ''}`}
              onClick={() => handlePageChange(page.id)}
            >
              <span className="nav-icon">{page.icon}</span>
              <div className="nav-content">
                <span className="nav-name">{page.name}</span>
                <span className="nav-desc">{page.description}</span>
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* Main Content */}
      <div className="terra-main">
        {/* Header */}
        <div className="terra-header">
          <div className="header-left">
            <h1 className="page-title">
              <span className="title-icon">{currentPage?.icon}</span>
              {currentPage?.name}
            </h1>
            <p className="page-subtitle">{currentPage?.description}</p>
          </div>
          <div className="header-right">
            {/* User Info */}
            {currentUser && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginRight: '20px'
              }}>
                <div 
                  onClick={() => handlePageChange('Profile')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    padding: '8px 15px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                  title="Click to view profile"
                >
                  <span style={{ fontSize: '1.2rem' }}>{currentUser.avatar}</span>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>
                    {currentUser.name}
                  </span>
                  {currentUser.isGuest && (
                    <span style={{ 
                      background: '#FF9800', 
                      color: 'white', 
                      padding: '2px 8px', 
                      borderRadius: '10px', 
                      fontSize: '0.7rem' 
                    }}>
                      GUEST
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="header-stats">
              <div className="header-stat">
                <span>🌿</span>
                <div>
                  <div>{Math.round(userStats.carbonSaved)}</div>
                  <div>CO₂ Saved (kg)</div>
                </div>
              </div>
              <div className="header-stat">
                <span>💧</span>
                <div>
                  <div>{userStats.waterTests}</div>
                  <div>Water Tests</div>
                </div>
              </div>
              <div className="header-stat">
                <span>🦜</span>
                <div>
                  <div>{userStats.biodiversityScans}</div>
                  <div>Bio Scans</div>
                </div>
              </div>
              <div className="header-stat">
                <span>🌳</span>
                <div>
                  <div>{userStats.treesPlanted}</div>
                  <div>Trees Planted</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Content */}
        <div className="terra-content">
          <CurrentComponent 
            onNavigate={handlePageChange} 
            onActivityComplete={handleActivityComplete}
            onAuthChange={handleAuthChange}
            userStats={userStats}
            currentUser={currentUser}
            isAuthenticated={currentUser && !currentUser.isGuest}
          />
        </div>
      </div>
    </div>
  );
}

export default App;