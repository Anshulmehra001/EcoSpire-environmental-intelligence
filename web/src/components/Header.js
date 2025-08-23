import React, { useState } from 'react';
import { authManager } from '../utils/auth';

const Header = ({ currentUser, onNavigate, onAuthChange }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authManager.logout();
      const guestUser = authManager.getCurrentUser();
      onAuthChange && onAuthChange(guestUser);
      setShowUserMenu(false);
      onNavigate && onNavigate('Dashboard');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header style={{
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      color: 'white',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Logo */}
      <div 
        onClick={() => onNavigate && onNavigate('Dashboard')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}
      >
        <span style={{ fontSize: '2rem' }}>🌿</span>
        EcoSpire
      </div>

      {/* User Section */}
      <div style={{ position: 'relative' }}>
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* User Stats */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px',
              fontSize: '0.9rem',
              opacity: 0.9
            }}>
              <span>⭐ Level {authManager.getUserStats().level}</span>
              <span>🏆 {authManager.getUserStats().points} pts</span>
            </div>

            {/* User Menu */}
            <div 
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.1)',
                transition: 'background 0.2s'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{currentUser.avatar}</span>
              <span style={{ fontWeight: '500' }}>{currentUser.name}</span>
              <span style={{ fontSize: '0.8rem' }}>▼</span>
            </div>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '10px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                minWidth: '200px',
                overflow: 'hidden',
                zIndex: 1001
              }}>
                <div style={{
                  padding: '15px',
                  borderBottom: '1px solid #ecf0f1',
                  background: '#f8f9fa'
                }}>
                  <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {currentUser.name}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                    {currentUser.email}
                  </div>
                  {currentUser.isGuest && (
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#e67e22',
                      marginTop: '5px',
                      fontWeight: '500'
                    }}>
                      🚀 Guest Mode
                    </div>
                  )}
                </div>

                <div style={{ padding: '10px 0' }}>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate && onNavigate('Profile');
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#2c3e50',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.background = 'none'}
                  >
                    👤 View Profile
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate && onNavigate('Community');
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#2c3e50',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.background = 'none'}
                  >
                    👥 Community
                  </button>

                  {currentUser.isGuest ? (
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate && onNavigate('Login');
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color: '#27ae60',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.background = 'none'}
                    >
                      🚀 Create Account
                    </button>
                  ) : (
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: isLoggingOut ? 'not-allowed' : 'pointer',
                        color: '#e74c3c',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '14px',
                        opacity: isLoggingOut ? 0.6 : 1
                      }}
                      onMouseEnter={(e) => !isLoggingOut && (e.target.style.background = '#f8f9fa')}
                      onMouseLeave={(e) => e.target.style.background = 'none'}
                    >
                      {isLoggingOut ? '⏳ Logging out...' : '🚪 Logout'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => onNavigate && onNavigate('Login')}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px'
            }}
          >
            🚀 Sign In
          </button>
        )}
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          onClick={() => setShowUserMenu(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
        />
      )}
    </header>
  );
};

export default Header;