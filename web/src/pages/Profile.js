import React, { useState } from 'react';

const Profile = ({ userStats = { co2Saved: 0, waterTests: 0, bioScans: 0 } }) => {
  const [user] = useState({
    name: 'Environmental Champion',
    email: 'eco.champion@example.com',
    joinDate: '2024-01-15',
    location: 'Global Community',
    avatar: '🌱'
  });

  const [achievements] = useState([
    { id: 1, title: 'Water Guardian', description: 'Completed 10 water quality tests', icon: '💧', unlocked: userStats.waterTests >= 10 },
    { id: 2, title: 'Bio Explorer', description: 'Performed 5 biodiversity scans', icon: '🦜', unlocked: userStats.bioScans >= 5 },
    { id: 3, title: 'Carbon Saver', description: 'Saved 50kg of CO₂', icon: '🌿', unlocked: userStats.co2Saved >= 50 },
    { id: 4, title: 'Eco Warrior', description: 'Used 5 different EcoSpire tools', icon: '⚔️', unlocked: true },
    { id: 5, title: 'Community Leader', description: 'Shared 10 environmental insights', icon: '👑', unlocked: false },
    { id: 6, title: 'Planet Protector', description: 'Saved 100kg of CO₂', icon: '🛡️', unlocked: userStats.co2Saved >= 100 }
  ]);

  const [activities] = useState([
    { date: '2024-02-15', action: 'Water Quality Test', location: 'Local River', impact: '+2kg CO₂ saved' },
    { date: '2024-02-14', action: 'Biodiversity Scan', location: 'City Park', impact: '+1kg CO₂ saved' },
    { date: '2024-02-13', action: 'Plant Identification', location: 'Garden', impact: '+0.5kg CO₂ saved' },
    { date: '2024-02-12', action: 'Air Quality Check', location: 'Downtown', impact: '+1.5kg CO₂ saved' },
    { date: '2024-02-11', action: 'E-Waste Analysis', location: 'Home', impact: '+3kg CO₂ saved' }
  ]);

  return (
    <div className="profile-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Profile Header */}
      <div style={{
        background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
        borderRadius: '12px',
        padding: '30px',
        color: 'white',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>
            {user.avatar}
          </div>
          <div>
            <h1 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{user.name}</h1>
            <p style={{ margin: '0 0 5px 0', opacity: 0.9 }}>{user.email}</p>
            <p style={{ margin: 0, opacity: 0.8 }}>
              📍 {user.location} • 📅 Joined {new Date(user.joinDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Environmental Impact Stats */}
        <div>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>🌍 Environmental Impact</h2>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{ fontSize: '2rem' }}>🌿</div>
              <div>
                <h3 style={{ margin: '0 0 5px 0', color: '#27ae60' }}>{userStats.co2Saved} kg</h3>
                <p style={{ margin: 0, color: '#7f8c8d' }}>CO₂ Emissions Saved</p>
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{ fontSize: '2rem' }}>💧</div>
              <div>
                <h3 style={{ margin: '0 0 5px 0', color: '#3498db' }}>{userStats.waterTests}</h3>
                <p style={{ margin: 0, color: '#7f8c8d' }}>Water Quality Tests</p>
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{ fontSize: '2rem' }}>🦜</div>
              <div>
                <h3 style={{ margin: '0 0 5px 0', color: '#e67e22' }}>{userStats.bioScans}</h3>
                <p style={{ margin: 0, color: '#7f8c8d' }}>Biodiversity Scans</p>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#2c3e50' }}>📊 Recent Activities</h3>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            {activities.map((activity, index) => (
              <div key={index} style={{
                padding: '15px 20px',
                borderBottom: index < activities.length - 1 ? '1px solid #ecf0f1' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <p style={{ margin: '0 0 5px 0', fontWeight: '500', color: '#2c3e50' }}>
                    {activity.action}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d' }}>
                    📍 {activity.location} • 📅 {activity.date}
                  </p>
                </div>
                <div style={{
                  background: '#e8f5e8',
                  color: '#27ae60',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {activity.impact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>🏆 Achievements</h2>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            {achievements.map(achievement => (
              <div key={achievement.id} style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                opacity: achievement.unlocked ? 1 : 0.5,
                border: achievement.unlocked ? '2px solid #f39c12' : '2px solid #ecf0f1'
              }}>
                <div style={{ 
                  fontSize: '2rem',
                  filter: achievement.unlocked ? 'none' : 'grayscale(100%)'
                }}>
                  {achievement.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    margin: '0 0 5px 0', 
                    color: achievement.unlocked ? '#f39c12' : '#95a5a6' 
                  }}>
                    {achievement.title}
                  </h4>
                  <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked && (
                  <div style={{
                    background: '#f39c12',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    ✓ Unlocked
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Profile Settings */}
          <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#2c3e50' }}>⚙️ Settings</h3>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <button style={{
              width: '100%',
              padding: '12px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '10px'
            }}>
              Edit Profile
            </button>
            <button style={{
              width: '100%',
              padding: '12px',
              background: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '10px'
            }}>
              Privacy Settings
            </button>
            <button style={{
              width: '100%',
              padding: '12px',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '12px',
        textAlign: 'center',
        border: '2px dashed #dee2e6'
      }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#6c757d' }}>
          🌍 <strong>Demo Profile</strong>
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
          This is a prototype profile showing potential user achievements and environmental impact tracking.
        </p>
      </div>
    </div>
  );
};

export default Profile;