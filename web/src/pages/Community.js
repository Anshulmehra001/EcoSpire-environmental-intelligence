import React, { useState, useEffect } from 'react';
import { authManager } from '../utils/auth';

const Community = ({ onNavigate }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('feed');
  const [leaderboard, setLeaderboard] = useState([]);
  const [communityStats, setCommunityStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCommunityData();
    const user = authManager.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const loadCommunityData = () => {
    // Load community posts from localStorage or generate demo data
    const savedPosts = localStorage.getItem('ecospire_community_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      generateInitialPosts();
    }

    // Load leaderboard
    setLeaderboard(authManager.getLeaderboard());

    // Generate community stats
    setCommunityStats({
      totalMembers: 12847 + Math.floor(Math.random() * 100),
      waterTests: 45231 + Math.floor(Math.random() * 50),
      speciesIdentified: 28956 + Math.floor(Math.random() * 20),
      co2Saved: 156789 + Math.floor(Math.random() * 100),
      activeToday: 1247 + Math.floor(Math.random() * 50),
      postsToday: 89 + Math.floor(Math.random() * 10)
    });
  };

  const generateInitialPosts = () => {
    const initialPosts = [
      {
        id: 1,
        author: 'EcoExplorer',
        avatar: '🌱',
        timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
        content: 'Just completed my first water quality test using AquaLens! The results were fascinating - found some concerning nitrate levels in our local stream. Time to take action! 💧',
        likes: 12,
        comments: [
          { author: 'WaterGuardian', content: 'Great work! Have you contacted local authorities about the nitrate levels?', timestamp: Date.now() - 1 * 60 * 60 * 1000 },
          { author: 'EcoNewbie', content: 'How accurate is AquaLens? Thinking of trying it myself!', timestamp: Date.now() - 30 * 60 * 1000 }
        ],
        type: 'water_test',
        location: 'Local Stream',
        data: { ph: 7.2, nitrates: 15 }
      },
      {
        id: 2,
        author: 'BirdWatcher92',
        avatar: '🦜',
        timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
        content: 'BiodiversityEar identified 15 different bird species in my morning recording! Including a rare warbler that hasn\'t been spotted in our area for years. Nature is amazing! 🎵',
        likes: 24,
        comments: [
          { author: 'NatureExpert', content: 'Which warbler species? That\'s incredible!', timestamp: Date.now() - 2 * 60 * 60 * 1000 },
          { author: 'BioStudent', content: 'Can you share the recording? Would love to hear it!', timestamp: Date.now() - 1 * 60 * 60 * 1000 }
        ],
        type: 'biodiversity_scan',
        location: 'City Park',
        data: { speciesCount: 15, rareSpecies: ['Yellow Warbler'] }
      },
      {
        id: 3,
        author: 'GreenThumb',
        avatar: '🌿',
        timestamp: Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
        content: 'FloraShield helped me identify an invasive plant species in my garden before it could spread. Early detection is key to protecting our local ecosystem! 🛡️',
        likes: 18,
        comments: [
          { author: 'GardenExpert', content: 'Which species was it? Always good to share for others to watch out for!', timestamp: Date.now() - 20 * 60 * 60 * 1000 }
        ],
        type: 'plant_identification',
        location: 'Home Garden',
        data: { species: 'Japanese Knotweed', threatLevel: 'High' }
      },
      {
        id: 4,
        author: 'CarbonCrusher',
        avatar: '🌳',
        timestamp: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
        content: 'Completed my monthly carbon footprint analysis. Managed to reduce my emissions by 23% this month through better transport choices and energy efficiency! 🚲⚡',
        likes: 31,
        comments: [
          { author: 'EcoCommuter', content: 'Amazing! What transport changes did you make?', timestamp: Date.now() - 3 * 60 * 60 * 1000 }
        ],
        type: 'carbon_reduction',
        data: { reduction: 23, co2Saved: 45 }
      }
    ];

    setPosts(initialPosts);
    localStorage.setItem('ecospire_community_posts', JSON.stringify(initialPosts));
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    if (!currentUser || currentUser.isGuest) {
      alert('Please create an account to post in the community!');
      onNavigate && onNavigate('Login');
      return;
    }

    setIsLoading(true);

    const post = {
      id: Date.now(),
      author: currentUser.name,
      avatar: currentUser.avatar,
      timestamp: Date.now(),
      content: newPost,
      likes: 0,
      comments: [],
      type: 'general',
      data: {}
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('ecospire_community_posts', JSON.stringify(updatedPosts));

    // Log activity
    await authManager.logActivity('Posted in community', {
      type: 'community_post',
      content: newPost.substring(0, 50) + '...',
      points: 15
    });

    setNewPost('');
    setIsLoading(false);
  };

  const handleLike = async (postId) => {
    if (!currentUser || currentUser.isGuest) {
      alert('Please create an account to interact with posts!');
      return;
    }

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('ecospire_community_posts', JSON.stringify(updatedPosts));

    // Log activity
    await authManager.logActivity('Liked community post', {
      type: 'community_interaction',
      action: 'like',
      points: 2
    });
  };

  const handleComment = async (postId, comment) => {
    if (!currentUser || currentUser.isGuest) {
      alert('Please create an account to comment!');
      return;
    }

    if (!comment.trim()) return;

    const newComment = {
      author: currentUser.name,
      content: comment,
      timestamp: Date.now()
    };

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('ecospire_community_posts', JSON.stringify(updatedPosts));

    // Log activity
    await authManager.logActivity('Commented on post', {
      type: 'community_interaction',
      action: 'comment',
      points: 5
    });
  };

  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const getPostTypeIcon = (type) => {
    const icons = {
      water_test: '💧',
      biodiversity_scan: '🦜',
      plant_identification: '🌿',
      carbon_reduction: '🌳',
      general: '💬'
    };
    return icons[type] || '💬';
  };

  return (
    <div className="community-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
        borderRadius: '12px',
        padding: '30px',
        color: 'white',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>👥 EcoSpire Community</h1>
        <p style={{ margin: '0 0 20px 0', fontSize: '1.1rem', opacity: 0.9 }}>
          Connect with environmental champions worldwide
        </p>
        
        {/* User Status */}
        {currentUser && (
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '15px',
            display: 'inline-block'
          }}>
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>{currentUser.avatar}</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              Welcome, {currentUser.name}!
            </span>
            {currentUser.isGuest && (
              <span style={{ fontSize: '0.9rem', opacity: 0.8, marginLeft: '10px' }}>
                (Guest Mode - <button 
                  onClick={() => onNavigate && onNavigate('Login')}
                  style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Create Account
                </button>)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        justifyContent: 'center'
      }}>
        {[
          { id: 'feed', name: 'Community Feed', icon: '📱' },
          { id: 'leaderboard', name: 'Leaderboard', icon: '🏆' },
          { id: 'stats', name: 'Community Stats', icon: '📊' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '25px',
              border: 'none',
              background: activeTab === tab.id ? '#3498db' : '#ecf0f1',
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

      {/* Community Feed Tab */}
      {activeTab === 'feed' && (
        <>
          {/* Create Post */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>Share Your Environmental Impact</h3>
            <form onSubmit={handlePostSubmit}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder={currentUser && !currentUser.isGuest 
                  ? "Share your latest environmental discovery, test results, or eco-friendly action..."
                  : "Create an account to share your environmental discoveries with the community!"
                }
                disabled={!currentUser || currentUser.isGuest}
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '15px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '8px',
                  fontSize: '16px',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  background: (!currentUser || currentUser.isGuest) ? '#f8f9fa' : 'white'
                }}
              />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '15px'
              }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" disabled={!currentUser || currentUser.isGuest} style={{
                    padding: '8px 15px',
                    background: '#ecf0f1',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: (!currentUser || currentUser.isGuest) ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    opacity: (!currentUser || currentUser.isGuest) ? 0.5 : 1
                  }}>
                    📸 Add Photo
                  </button>
                  <button type="button" disabled={!currentUser || currentUser.isGuest} style={{
                    padding: '8px 15px',
                    background: '#ecf0f1',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: (!currentUser || currentUser.isGuest) ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    opacity: (!currentUser || currentUser.isGuest) ? 0.5 : 1
                  }}>
                    📍 Add Location
                  </button>
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading || !currentUser || currentUser.isGuest}
                  style={{
                    padding: '10px 20px',
                    background: (isLoading || !currentUser || currentUser.isGuest) ? '#95a5a6' : '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: (isLoading || !currentUser || currentUser.isGuest) ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  {isLoading ? '⏳ Posting...' : 'Share Post'}
                </button>
              </div>
            </form>
          </div>

          {/* Community Posts */}
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>📱 Recent Community Activity</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {posts.map(post => (
              <CommunityPost 
                key={post.id} 
                post={post} 
                currentUser={currentUser}
                onLike={handleLike}
                onComment={handleComment}
                formatTimeAgo={formatTimeAgo}
                getPostTypeIcon={getPostTypeIcon}
              />
            ))}
            
            {posts.length === 0 && (
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '40px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌱</div>
                <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>No posts yet!</h3>
                <p style={{ color: '#7f8c8d' }}>Be the first to share your environmental discoveries with the community.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 25px 0', color: '#2c3e50', textAlign: 'center' }}>🏆 Community Leaderboard</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {leaderboard.map((user, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                background: user.isCurrentUser ? '#e8f4fd' : '#f8f9fa',
                borderRadius: '12px',
                border: user.isCurrentUser ? '2px solid #3498db' : '1px solid #e1e8ed'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: index < 3 ? '#f39c12' : '#95a5a6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  marginRight: '15px'
                }}>
                  {index + 1}
                </div>
                
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginRight: '15px'
                }}>
                  {user.avatar}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>
                    {user.name} {user.isCurrentUser && '(You)'}
                  </h4>
                  <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>
                    Level {user.level} • {user.points.toLocaleString()} points
                  </p>
                </div>
                
                {index < 3 && (
                  <div style={{ fontSize: '1.5rem' }}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Stats Tab */}
      {activeTab === 'stats' && (
        <div>
          <h2 style={{ marginBottom: '25px', color: '#2c3e50', textAlign: 'center' }}>📊 Community Statistics</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🌍</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#27ae60', fontSize: '2rem' }}>
                {communityStats.totalMembers?.toLocaleString()}
              </h3>
              <p style={{ margin: 0, color: '#7f8c8d', fontWeight: '600' }}>Total Members</p>
              <p style={{ margin: '5px 0 0 0', color: '#27ae60', fontSize: '0.9rem' }}>
                +{communityStats.activeToday} active today
              </p>
            </div>
            
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>💧</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#3498db', fontSize: '2rem' }}>
                {communityStats.waterTests?.toLocaleString()}
              </h3>
              <p style={{ margin: 0, color: '#7f8c8d', fontWeight: '600' }}>Water Tests Shared</p>
              <p style={{ margin: '5px 0 0 0', color: '#3498db', fontSize: '0.9rem' }}>
                Protecting water quality worldwide
              </p>
            </div>
            
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🦜</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#e67e22', fontSize: '2rem' }}>
                {communityStats.speciesIdentified?.toLocaleString()}
              </h3>
              <p style={{ margin: 0, color: '#7f8c8d', fontWeight: '600' }}>Species Identified</p>
              <p style={{ margin: '5px 0 0 0', color: '#e67e22', fontSize: '0.9rem' }}>
                Biodiversity monitoring network
              </p>
            </div>
            
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🌿</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#27ae60', fontSize: '2rem' }}>
                {communityStats.co2Saved?.toLocaleString()}
              </h3>
              <p style={{ margin: 0, color: '#7f8c8d', fontWeight: '600' }}>kg CO₂ Saved</p>
              <p style={{ margin: '5px 0 0 0', color: '#27ae60', fontSize: '0.9rem' }}>
                Collective climate action
              </p>
            </div>
          </div>

          {/* Additional Stats */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>📈 Today's Activity</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', color: '#3498db', fontWeight: 'bold' }}>
                  {communityStats.postsToday}
                </div>
                <div style={{ color: '#7f8c8d' }}>New Posts</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', color: '#27ae60', fontWeight: 'bold' }}>
                  {communityStats.activeToday}
                </div>
                <div style={{ color: '#7f8c8d' }}>Active Users</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', color: '#e67e22', fontWeight: 'bold' }}>
                  {Math.floor(communityStats.waterTests / 30)}
                </div>
                <div style={{ color: '#7f8c8d' }}>Tests Today</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Community Post Component
const CommunityPost = ({ post, currentUser, onLike, onComment, formatTimeAgo, getPostTypeIcon }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(post.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      {/* Post Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <div style={{
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          background: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          marginRight: '12px'
        }}>
          {post.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h4 style={{ margin: '0', color: '#2c3e50' }}>{post.author}</h4>
            <span style={{ fontSize: '1rem' }}>{getPostTypeIcon(post.type)}</span>
          </div>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.9rem', color: '#7f8c8d' }}>
            {formatTimeAgo(post.timestamp)}
            {post.location && <span> • 📍 {post.location}</span>}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p style={{ 
        margin: '0 0 15px 0', 
        lineHeight: '1.6',
        color: '#2c3e50',
        fontSize: '1rem'
      }}>
        {post.content}
      </p>

      {/* Post Data (if available) */}
      {post.data && Object.keys(post.data).length > 0 && (
        <div style={{
          background: '#f8f9fa',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '15px',
          fontSize: '0.9rem'
        }}>
          {post.type === 'water_test' && post.data.ph && (
            <div>💧 <strong>Water Test Results:</strong> pH {post.data.ph}, Nitrates {post.data.nitrates}ppm</div>
          )}
          {post.type === 'biodiversity_scan' && post.data.speciesCount && (
            <div>🦜 <strong>Biodiversity Scan:</strong> {post.data.speciesCount} species identified</div>
          )}
          {post.type === 'carbon_reduction' && post.data.co2Saved && (
            <div>🌳 <strong>Carbon Impact:</strong> {post.data.co2Saved}kg CO₂ saved</div>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        paddingTop: '15px',
        borderTop: '1px solid #ecf0f1'
      }}>
        <button 
          onClick={() => onLike(post.id)}
          disabled={!currentUser || currentUser.isGuest}
          style={{
            background: 'none',
            border: 'none',
            cursor: (!currentUser || currentUser.isGuest) ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#7f8c8d',
            fontSize: '14px',
            opacity: (!currentUser || currentUser.isGuest) ? 0.5 : 1
          }}
        >
          ❤️ {post.likes} Likes
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#7f8c8d',
            fontSize: '14px'
          }}
        >
          💬 {post.comments.length} Comments
        </button>
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: '#7f8c8d',
          fontSize: '14px'
        }}>
          🔄 Share
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div style={{
          marginTop: '15px',
          paddingTop: '15px',
          borderTop: '1px solid #ecf0f1'
        }}>
          {/* Existing Comments */}
          {post.comments.map((comment, index) => (
            <div key={index} style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '12px',
              padding: '10px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: '#e9ecef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
              }}>
                👤
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '2px' }}>
                  {comment.author}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#2c3e50' }}>
                  {comment.content}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#7f8c8d', marginTop: '2px' }}>
                  {formatTimeAgo(comment.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {/* Add Comment Form */}
          {currentUser && !currentUser.isGuest ? (
            <form onSubmit={handleCommentSubmit} style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #e1e8ed',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  style={{
                    padding: '8px 16px',
                    background: newComment.trim() ? '#3498db' : '#95a5a6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                    fontSize: '14px'
                  }}
                >
                  Post
                </button>
              </div>
            </form>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '10px',
              color: '#7f8c8d',
              fontSize: '0.9rem'
            }}>
              <a href="#" onClick={(e) => { e.preventDefault(); /* Navigate to login */ }} style={{ color: '#3498db' }}>
                Create an account
              </a> to join the conversation
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Community;