import React, { useState, useEffect } from 'react';
import { authManager } from '../utils/auth';

const Profile = ({ onNavigate, currentUser }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadUserData();
  }, [currentUser]);

  const loadUserData = () => {
    const userData = authManager.getCurrentUser();
    const userStats = authManager.getUserStats();
    const userActivities = authManager.getActivities(20);

    setUser(userData);
    setStats(userStats);
    setActivities(userActivities);
    setEditForm({
      name: userData?.name || '',
      location: userData?.location || '',
      preferences: userData?.preferences || {}
    });

    // Load achievements
    const allAchievements = [
      { id: 'first_test', name: 'First Test', description: 'Complete your first water test', icon: '💧', unlocked: userStats.waterTests >= 1 },
      { id: 'bio_explorer', name: 'Bio Explorer', description: 'Complete 5 biodiversity scans', icon: '🦜', unlocked: userStats.biodiversityScans >= 5 },
      { id: 'carbon_saver', name: 'Carbon Saver', description: 'Save 10kg of CO₂', icon: '🌱', unlocked: userStats.carbonSaved >= 10 },
      { id: 'streak_week', name: 'Weekly Streak', description: 'Maintain a 7-day activity streak', icon: '🔥', unlocked: userStats.streakDays >= 7 },
      { id: 'level_up', name: 'Level Up', description: 'Reach level 5', icon: '⭐', unlocked: userStats.level >= 5 },
      { id: 'eco_champion', name: 'Eco Champion', description: 'Complete 50 activities', icon: '🏆', unlocked: userStats.totalActivities >= 50 }
    ];
    setAchievements(allAchievements);
  };

  const handleSaveProfile = async () => {
    const updatedUser = authManager.updateUserProfile(editForm);
    setUser(updatedUser);
    setIsEditing(false);
    
    await authManager.logActivity('Updated profile', {
      type: 'profile_update',
      points: 5
    });
  };

  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Please log in to view your profile</h2>
        <button
          onClick={() => onNavigate && onNavigate('Login')}
          style={{
            padding: '12px 24px',
            background: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
        borderRadius: '12px',
        padding: '30px',
        color: 'white',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '15px' }}>{user.avatar}</div>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>{user.name}</h1>
        <p style={{ margin: '0 0 15px 0', fontSize: '1.1rem', opacity: 0.9 }}>
          {user.email}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px' }}>
            Level {stats.level} • {stats.points?.toLocaleString()} points
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px' }}>
            🔥 {stats.streakDays} day streak
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px' }}>
            Member since {new Date(user.joinDate).toLocaleDateString()}
          </div>
        </div>
        
        {user.isGuest && (
          <div style={{
            marginTop: '15px',
            padding: '10px 20px',
            background: 'rgba(255,152,0,0.9)',
            borderRadius: '20px',
            display: 'inline-block'
          }}>
            🚀 <strong>Guest Mode</strong> - <button 
              onClick={() => onNavigate && onNavigate('Login')}
              style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer' }}
            >
              Create Account to Save Progress
            </button>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'overview', name: 'Overview', icon: '📊' },
          { id: 'achievements', name: 'Achievements', icon: '🏆' },
          { id: 'activity', name: 'Activity', icon: '📱' },
          { id: 'settings', name: 'Settings', icon: '⚙️' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '25px',
              border: 'none',
              background: activeTab === tab.id ? '#27ae60' : '#ecf0f1',
              color: activeTab === tab.id ? 'white' : '#2c3e50',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🌿</div>
              <h3 style={{ margin: '0 0 5px 0', color: '#27ae60' }}>{Math.round(stats.carbonSaved || 0)} kg</h3>
              <p style={{ margin: 0, color: '#7f8c8d' }}>CO₂ Saved</p>
            </div>
            
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💧</div>
              <h3 style={{ margin: '0 0 5px 0', color: '#3498db' }}>{stats.waterTests || 0}</h3>
              <p style={{ margin: 0, color: '#7f8c8d' }}>Water Tests</p>
            </div>
            
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🦜</div>
              <h3 style={{ margin: '0 0 5px 0', color: '#e67e22' }}>{stats.biodiversityScans || 0}</h3>
              <p style={{ margin: 0, color: '#7f8c8d' }}>Bio Scans</p>
            </div>
            
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📊</div>
              <h3 style={{ margin: '0 0 5px 0', color: '#9b59b6' }}>{stats.totalActivities || 0}</h3>
              <p style={{ margin: 0, color: '#7f8c8d' }}>Total Activities</p>
            </div>
          </div>

          {/* Progress to Next Level */}
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>Progress to Level {stats.level + 1}</h3>
            <div style={{
              background: '#ecf0f1',
              borderRadius: '10px',
              height: '20px',
              overflow: 'hidden',
              marginBottom: '10px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                height: '100%',
                width: `${((stats.points || 0) % 1000) / 10}%`,
                transition: 'width 0.3s ease'
              }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#7f8c8d' }}>
              <span>{(stats.points || 0) % 1000} / 1000 points</span>
              <span>{1000 - ((stats.points || 0) % 1000)} points to next level</span>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {achievements.map(achievement => (
            <div key={achievement.id} style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              opacity: achievement.unlocked ? 1 : 0.5,
              border: achievement.unlocked ? '2px solid #27ae60' : '2px solid #ecf0f1'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ fontSize: '2rem', marginRight: '15px' }}>{achievement.icon}</div>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{achievement.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d' }}>{achievement.description}</p>
                </div>
              </div>
              <div style={{
                background: achievement.unlocked ? '#d4edda' : '#f8f9fa',
                color: achievement.unlocked ? '#155724' : '#6c757d',
                padding: '8px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                {achievement.unlocked ? '✅ Unlocked' : '🔒 Locked'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {activities.length > 0 ? activities.map(activity => (
              <div key={activity.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#27ae60',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  marginRight: '15px',
                  fontSize: '1.2rem'
                }}>
                  {activity.type === 'water_test' ? '💧' : 
                   activity.type === 'biodiversity_scan' ? '🦜' : 
                   activity.type === 'carbon_reduction' ? '🌱' : '📊'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: '2px' }}>
                    {activity.description}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                    {formatTimeAgo(activity.timestamp)} • +{activity.points} points
                  </div>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌱</div>
                <p>No activities yet. Start using EcoSpire tools to see your activity here!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#2c3e50' }}>Profile Settings</h3>
            {!user.isGuest && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  padding: '8px 16px',
                  background: isEditing ? '#95a5a6' : '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            )}
          </div>

          {user.isGuest ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              background: '#fff3cd',
              borderRadius: '8px',
              border: '1px solid #ffeaa7'
            }}>
              <h4 style={{ color: '#856404', marginBottom: '15px' }}>Guest Mode Limitations</h4>
              <p style={{ color: '#856404', marginBottom: '20px' }}>
                Create an account to save your settings and progress permanently.
              </p>
              <button
                onClick={() => onNavigate && onNavigate('Login')}
                style={{
                  padding: '12px 24px',
                  background: '#f39c12',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                🚀 Create Account
              </button>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #e1e8ed',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                ) : (
                  <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '8px' }}>
                    {user.name}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '8px', color: '#7f8c8d' }}>
                  {user.email} (cannot be changed)
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Location:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.location || ''}
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                    placeholder="Enter your location (optional)"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #e1e8ed',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                ) : (
                  <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '8px' }}>
                    {user.location || 'Not specified'}
                  </div>
                )}
              </div>

              {isEditing && (
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                  <button
                    onClick={handleSaveProfile}
                    style={{
                      padding: '12px 24px',
                      background: '#27ae60',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    💾 Save Changes
                  </button>
                </div>
              )}

              {/* Account Actions */}
              <div style={{
                marginTop: '40px',
                paddingTop: '30px',
                borderTop: '2px solid #ecf0f1'
              }}>
                <h4 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>Account Actions</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to logout? Your progress will be saved.')) {
                        authManager.logout().then(() => {
                          onNavigate && onNavigate('Dashboard');
                          window.location.reload(); // Refresh to update auth state
                        });
                      }
                    }}
                    style={{
                      padding: '12px 20px',
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      maxWidth: '200px'
                    }}
                  >
                    🚪 Logout
                  </button>
                  
                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: '#7f8c8d', 
                    margin: '0',
                    maxWidth: '400px'
                  }}>
                    Logging out will return you to guest mode. Your progress and data will be saved and restored when you log back in.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;