import React, { useState, useEffect, useRef } from 'react';
import { authManager } from '../utils/auth';
import { imageHandler } from '../utils/imageHandler';

const Community = ({ onNavigate }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('feed');
  const [leaderboard, setLeaderboard] = useState([]);
  const [communityStats, setCommunityStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [postType, setPostType] = useState('general');
  const fileInputRef = useRef(null);

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
        location: 'Riverside Park Stream',
        image: {
          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzg3Q0VFQiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5KnIFdhdGVyIFRlc3QgU3RyaXA8L3RleHQ+PC9zdmc+',
          name: 'water_test_strip.jpg',
          size: 245760
        },
        data: { ph: 7.2, nitrates: 15, chlorine: 2.1 }
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
        location: 'Central City Park',
        image: {
          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNreSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4N0NFRUIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM5OERCOEMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNza3kpIi8+PGNpcmNsZSBjeD0iMzIwIiBjeT0iNjAiIHI9IjMwIiBmaWxsPSIjRkZENzAwIi8+PHJlY3QgeD0iMCIgeT0iMjAwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzIyOEIyMiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn6acIEJpcmQgV2F0Y2hpbmcgU3BvdDwvdGV4dD48L3N2Zz4=',
          name: 'bird_watching_spot.jpg',
          size: 189440
        },
        data: { speciesCount: 15, rareSpecies: 'Yellow Warbler' }
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
        image: {
          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzIyOEIyMiIvPjxwYXRoIGQ9Ik0xMDAsMjUwIEwxNTAsMTUwIEwyMDAsMjAwIEwyNTAsMTAwIEwzMDAsMTgwIiBzdHJva2U9IiM5OERCOEMiIHN0cm9rZS13aWR0aD0iOCIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iMTUiIGZpbGw9IiNGRkQ3MDAiLz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIxMDAiIHI9IjEyIiBmaWxsPSIjRkY2MzQ3Ii8+PHRleHQgeD0iMjAwIiB5PSIyODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjL8gSW52YXNpdmUgUGxhbnQgRGV0ZWN0ZWQ8L3RleHQ+PC9zdmc+',
          name: 'invasive_plant.jpg',
          size: 156780
        },
        data: { species: 'Japanese Knotweed', confidence: 92 }
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

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const processedImage = await imageHandler.processImage(file, {
        compress: true,
        maxWidth: 800,
        quality: 0.8
      });

      setSelectedImage({
        file: file,
        preview: processedImage.preview,
        name: processedImage.original.name,
        size: processedImage.processed.size,
        processedData: processedImage
      });
    } catch (error) {
      alert(`Image processing failed: ${error.message}`);
      console.error('Image processing error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Simulate reverse geocoding
          const locations = [
            'Central Park, New York',
            'Golden Gate Park, San Francisco',
            'Hyde Park, London',
            'Vondelpark, Amsterdam',
            'Retiro Park, Madrid'
          ];
          const randomLocation = locations[Math.floor(Math.random() * locations.length)];
          setSelectedLocation(randomLocation);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setSelectedLocation('Location unavailable');
        }
      );
    } else {
      setSelectedLocation('Geolocation not supported');
    }
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

    // Process and store image
    let imageData = null;
    if (selectedImage) {
      const imageId = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Store image using imageHandler
      const stored = imageHandler.storeImage(selectedImage.processedData, imageId);
      
      if (stored) {
        imageData = {
          id: imageId,
          url: selectedImage.preview,
          name: selectedImage.name,
          size: selectedImage.size,
          type: selectedImage.file.type
        };
      } else {
        // Fallback to direct preview if storage fails
        imageData = {
          url: selectedImage.preview,
          name: selectedImage.name,
          size: selectedImage.size,
          type: selectedImage.file.type
        };
      }
    }

    const post = {
      id: Date.now(),
      author: currentUser.name,
      avatar: currentUser.avatar,
      timestamp: Date.now(),
      content: newPost,
      likes: 0,
      comments: [],
      type: postType,
      location: selectedLocation || null,
      image: imageData,
      data: generatePostData(postType)
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('ecospire_community_posts', JSON.stringify(updatedPosts));

    // Log activity with enhanced points for media posts
    const points = selectedImage ? 25 : 15;
    await authManager.logActivity('Posted in community', {
      type: 'community_post',
      content: newPost.substring(0, 50) + '...',
      hasImage: !!selectedImage,
      postType: postType,
      points: points
    });

    // Reset form
    setNewPost('');
    setSelectedImage(null);
    setSelectedLocation('');
    setPostType('general');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setIsLoading(false);
  };

  const generatePostData = (type) => {
    switch (type) {
      case 'water_test':
        return {
          ph: (6.5 + Math.random() * 2).toFixed(1),
          nitrates: Math.floor(Math.random() * 20),
          chlorine: (Math.random() * 3).toFixed(1)
        };
      case 'biodiversity_scan':
        return {
          speciesCount: Math.floor(Math.random() * 20) + 5,
          rareSpecies: ['Rare Warbler', 'Endangered Butterfly'][Math.floor(Math.random() * 2)]
        };
      case 'carbon_reduction':
        return {
          co2Saved: Math.floor(Math.random() * 50) + 10,
          reduction: Math.floor(Math.random() * 30) + 10
        };
      case 'plant_identification':
        return {
          species: 'Unknown Plant Species',
          confidence: Math.floor(Math.random() * 30) + 70
        };
      default:
        return {};
    }
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
            
            {/* Post Type Selector */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#2c3e50' }}>
                Post Type:
              </label>
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                disabled={!currentUser || currentUser.isGuest}
                style={{
                  padding: '8px 12px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: (!currentUser || currentUser.isGuest) ? '#f8f9fa' : 'white',
                  cursor: (!currentUser || currentUser.isGuest) ? 'not-allowed' : 'pointer'
                }}
              >
                <option value="general">💬 General Discussion</option>
                <option value="water_test">💧 Water Quality Test</option>
                <option value="biodiversity_scan">🦜 Biodiversity Discovery</option>
                <option value="plant_identification">🌿 Plant Identification</option>
                <option value="carbon_reduction">🌳 Carbon Reduction</option>
              </select>
            </div>

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

              {/* Image Preview */}
              {selectedImage && (
                <div style={{
                  marginTop: '15px',
                  padding: '15px',
                  border: '2px dashed #3498db',
                  borderRadius: '8px',
                  background: '#f8f9fa'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img
                      src={selectedImage.preview}
                      alt="Preview"
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '2px solid #3498db'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', color: '#2c3e50', marginBottom: '4px' }}>
                        {selectedImage.name}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#7f8c8d', marginBottom: '4px' }}>
                        Original: {imageHandler.formatFileSize(selectedImage.file.size)}
                        {selectedImage.size !== selectedImage.file.size && (
                          <span style={{ color: '#27ae60', marginLeft: '8px' }}>
                            → Compressed: {imageHandler.formatFileSize(selectedImage.size)}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#3498db' }}>
                        ✅ Ready to upload
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      style={{
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {/* Location Display */}
              {selectedLocation && (
                <div style={{
                  marginTop: '10px',
                  padding: '10px',
                  background: '#e8f4fd',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>📍</span>
                  <span style={{ color: '#2c3e50' }}>{selectedLocation}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedLocation('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#7f8c8d',
                      cursor: 'pointer',
                      marginLeft: 'auto'
                    }}
                  >
                    ×
                  </button>
                </div>
              )}

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '15px'
              }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!currentUser || currentUser.isGuest}
                    style={{
                      padding: '8px 15px',
                      background: selectedImage ? '#27ae60' : '#ecf0f1',
                      color: selectedImage ? 'white' : '#2c3e50',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: (!currentUser || currentUser.isGuest) ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      opacity: (!currentUser || currentUser.isGuest) ? 0.5 : 1,
                      fontWeight: selectedImage ? '500' : 'normal'
                    }}
                  >
                    📸 {selectedImage ? 'Image Added' : 'Add Photo'}
                  </button>
                  <button 
                    type="button" 
                    onClick={getCurrentLocation}
                    disabled={!currentUser || currentUser.isGuest}
                    style={{
                      padding: '8px 15px',
                      background: selectedLocation ? '#27ae60' : '#ecf0f1',
                      color: selectedLocation ? 'white' : '#2c3e50',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: (!currentUser || currentUser.isGuest) ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      opacity: (!currentUser || currentUser.isGuest) ? 0.5 : 1,
                      fontWeight: selectedLocation ? '500' : 'normal'
                    }}
                  >
                    📍 {selectedLocation ? 'Location Added' : 'Add Location'}
                  </button>
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading || !currentUser || currentUser.isGuest || !newPost.trim()}
                  style={{
                    padding: '10px 20px',
                    background: (isLoading || !currentUser || currentUser.isGuest || !newPost.trim()) ? '#95a5a6' : '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: (isLoading || !currentUser || currentUser.isGuest || !newPost.trim()) ? 'not-allowed' : 'pointer',
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
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>📈 Today's Activity</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '15px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', color: '#3498db', fontWeight: 'bold' }}>
                    {communityStats.postsToday}
                  </div>
                  <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>New Posts</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', color: '#27ae60', fontWeight: 'bold' }}>
                    {communityStats.activeToday}
                  </div>
                  <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Active Users</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', color: '#e67e22', fontWeight: 'bold' }}>
                    {Math.floor(communityStats.waterTests / 30)}
                  </div>
                  <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Tests Today</div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>💾 Community Storage</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '15px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', color: '#9b59b6', fontWeight: 'bold' }}>
                    {imageHandler.getStorageInfo().imageCount}
                  </div>
                  <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Images Stored</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', color: '#34495e', fontWeight: 'bold' }}>
                    {imageHandler.getStorageInfo().formattedStorageUsed}
                  </div>
                  <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Storage Used</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      const cleaned = imageHandler.cleanupOldImages();
                      alert(`Cleaned up ${cleaned} old images`);
                      // Refresh stats
                      setCommunityStats({...communityStats});
                    }}
                    style={{
                      background: '#95a5a6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    🧹 Cleanup
                  </button>
                </div>
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

      {/* Post Image */}
      {post.image && (
        <div style={{
          marginBottom: '15px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #e1e8ed'
        }}>
          <img
            src={post.image.url}
            alt="Post content"
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>
      )}

      {/* Post Data (if available) */}
      {post.data && Object.keys(post.data).length > 0 && (
        <div style={{
          background: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '15px',
          fontSize: '0.9rem',
          border: '1px solid #e1e8ed'
        }}>
          {post.type === 'water_test' && post.data.ph && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontWeight: 'bold', color: '#3498db', marginBottom: '5px' }}>
                💧 Water Test Results
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
                <div style={{ background: 'white', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>pH Level</div>
                  <div style={{ color: '#3498db', fontSize: '1.1rem' }}>{post.data.ph}</div>
                </div>
                <div style={{ background: 'white', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>Nitrates</div>
                  <div style={{ color: '#e67e22', fontSize: '1.1rem' }}>{post.data.nitrates}ppm</div>
                </div>
                {post.data.chlorine && (
                  <div style={{ background: 'white', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>Chlorine</div>
                    <div style={{ color: '#27ae60', fontSize: '1.1rem' }}>{post.data.chlorine}ppm</div>
                  </div>
                )}
              </div>
            </div>
          )}
          {post.type === 'biodiversity_scan' && post.data.speciesCount && (
            <div>
              <div style={{ fontWeight: 'bold', color: '#e67e22', marginBottom: '8px' }}>
                🦜 Biodiversity Scan Results
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ background: 'white', padding: '8px 12px', borderRadius: '6px' }}>
                  <strong>{post.data.speciesCount}</strong> species identified
                </div>
                {post.data.rareSpecies && (
                  <div style={{ background: '#fff3cd', padding: '8px 12px', borderRadius: '6px', color: '#856404' }}>
                    ⭐ Rare: {post.data.rareSpecies}
                  </div>
                )}
              </div>
            </div>
          )}
          {post.type === 'carbon_reduction' && post.data.co2Saved && (
            <div>
              <div style={{ fontWeight: 'bold', color: '#27ae60', marginBottom: '8px' }}>
                🌳 Carbon Impact Results
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ background: 'white', padding: '8px 12px', borderRadius: '6px' }}>
                  <strong>{post.data.co2Saved}kg</strong> CO₂ saved
                </div>
                <div style={{ background: 'white', padding: '8px 12px', borderRadius: '6px' }}>
                  <strong>{post.data.reduction}%</strong> reduction
                </div>
              </div>
            </div>
          )}
          {post.type === 'plant_identification' && post.data.species && (
            <div>
              <div style={{ fontWeight: 'bold', color: '#27ae60', marginBottom: '8px' }}>
                🌿 Plant Identification
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ background: 'white', padding: '8px 12px', borderRadius: '6px' }}>
                  Species: <strong>{post.data.species}</strong>
                </div>
                {post.data.confidence && (
                  <div style={{ background: 'white', padding: '8px 12px', borderRadius: '6px' }}>
                    Confidence: <strong>{post.data.confidence}%</strong>
                  </div>
                )}
              </div>
            </div>
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