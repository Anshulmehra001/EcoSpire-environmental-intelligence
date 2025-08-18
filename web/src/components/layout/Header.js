import React, { useState } from 'react';
import './Header.css';
import ProfileDropdown from '../ui/ProfileDropdown';

const Header = ({ 
  currentPage, 
  sidebarOpen, 
  onSidebarToggle,
  userStats = {},
  notifications = [],
  isGuest = false,
  user = null,
  onLogin,
  onLogout,
  onProfile
}) => {
  const [showRefresh, setShowRefresh] = useState(false);
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toString() || '0';
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="terra-header">
      <div className="terra-header__left">
        {/* Mobile menu button */}
        <button 
          className="terra-header__menu-btn"
          onClick={onSidebarToggle}
          aria-label="Toggle navigation menu"
        >
          <span className={`terra-header__menu-icon ${sidebarOpen ? 'terra-header__menu-icon--open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Page info */}
        <div className="terra-header__page-info">
          <h1 className="terra-header__page-title">
            <span className="terra-header__page-icon">{currentPage?.icon}</span>
            <span className="terra-header__page-name">{currentPage?.name}</span>
          </h1>
          <p className="terra-header__page-subtitle">{currentPage?.description}</p>
        </div>
      </div>

      <div className="terra-header__right">
        {/* Environmental Stats */}
        <div className="terra-header__stats">
          <div className="terra-header__stat" title="CO₂ Saved">
            <span className="terra-header__stat-icon">🌿</span>
            <div className="terra-header__stat-content">
              <div className="terra-header__stat-value">
                {formatNumber(userStats.co2Saved || (isGuest ? 0 : 0))}
              </div>
              <div className="terra-header__stat-label">CO₂ Saved (kg)</div>
            </div>
          </div>
          
          <div className="terra-header__stat" title="Water Tests Completed">
            <span className="terra-header__stat-icon">💧</span>
            <div className="terra-header__stat-content">
              <div className="terra-header__stat-value">
                {formatNumber(userStats.waterTests || (isGuest ? 0 : 0))}
              </div>
              <div className="terra-header__stat-label">Water Tests</div>
            </div>
          </div>
          
          <div className="terra-header__stat" title="Biodiversity Scans">
            <span className="terra-header__stat-icon">🦜</span>
            <div className="terra-header__stat-content">
              <div className="terra-header__stat-value">
                {formatNumber(userStats.bioScans || (isGuest ? 0 : 0))}
              </div>
              <div className="terra-header__stat-label">Bio Scans</div>
            </div>
          </div>
        </div>

        {/* User Actions */}
        <div className="terra-header__actions">
          {/* Notifications */}
          <div className="terra-header__notifications">
            <button 
              className="terra-header__notification-btn"
              aria-label="View notifications"
            >
              <span className="terra-header__notification-icon">🔔</span>
              {notifications.length > 0 && (
                <span className="terra-header__notification-badge">
                  {notifications.length > 9 ? '9+' : notifications.length}
                </span>
              )}
            </button>
          </div>

          {/* Refresh Button (when needed) */}
          {showRefresh && (
            <button 
              className="terra-header__refresh-btn"
              onClick={() => window.location.reload()}
              title="Refresh page"
            >
              🔄
            </button>
          )}

          {/* Profile Dropdown */}
          <ProfileDropdown
            user={user}
            onLogin={onLogin}
            onLogout={onLogout}
            onProfile={onProfile}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;