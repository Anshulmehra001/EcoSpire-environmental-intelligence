import React, { useState, useEffect } from 'react';
import './App.css';
import { systemInitializer } from './utils/systemInitializer.js';

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
// New hackathon-winning features
import DigitalQuarry from './pages/DigitalQuarry';
import MycoRemediation from './pages/MycoRemediation';
import BioStreamAI from './pages/BioStreamAI';
import EWasteProspector from './pages/EWasteProspector';
import GeneticResilience from './pages/GeneticResilience';

function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [userStats, setUserStats] = useState({
    co2Saved: 0,
    waterTests: 0,
    bioScans: 0
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [systemReady, setSystemReady] = useState(false);
  const [systemStatus, setSystemStatus] = useState(null);

  // Initialize advanced systems on app start
  useEffect(() => {
    const initializeSystems = async () => {
      console.log('🚀 EcoSpire: Initializing Advanced Environmental Systems...');
      
      try {
        const status = await systemInitializer.initialize();
        setSystemStatus(status);
        setSystemReady(status.overallReady);
        
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
  }, []);

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
    // New hackathon-winning features
    { 
      id: 'DigitalQuarry', 
      name: 'Digital Quarry', 
      icon: '🏗️', 
      component: DigitalQuarry,
      description: 'Construction Waste Marketplace'
    },
    { 
      id: 'MycoRemediation', 
      name: 'Myco-Remediation', 
      icon: '🍄', 
      component: MycoRemediation,
      description: 'AI Fungal Cleanup Network'
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

  const updateUserStats = (activity) => {
    setUserStats(prev => {
      const newStats = { ...prev };
      
      switch (activity.type) {
        case 'water_test':
          newStats.waterTests += 1;
          newStats.co2Saved += 0.5; // Small CO2 impact from water testing
          break;
        case 'bio_scan':
          newStats.bioScans += 1;
          newStats.co2Saved += 0.2; // Small CO2 impact from biodiversity monitoring
          break;
        case 'carbon_action':
          newStats.co2Saved += activity.amount || 1;
          break;
        case 'eco_task':
          newStats.co2Saved += activity.co2Impact || 0.1;
          break;
        default:
          break;
      }
      
      return newStats;
    });
  };

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
            <div className="header-stats">
              <div className="header-stat">
                <span>🌿</span>
                <div>
                  <div>{userStats.co2Saved}</div>
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
                  <div>{userStats.bioScans}</div>
                  <div>Bio Scans</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginLeft: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Refresh current page"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="terra-content">
          <CurrentComponent 
            onNavigate={handlePageChange} 
            onActivityComplete={updateUserStats}
            userStats={userStats}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </div>
  );
}

export default App;