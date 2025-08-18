import React, { useState } from 'react';

const Community = () => {
  const [posts] = useState([
    {
      id: 1,
      author: 'EcoExplorer',
      avatar: '🌱',
      time: '2 hours ago',
      content: 'Just completed my first water quality test using AquaLens! The results were fascinating - found some concerning nitrate levels in our local stream. Time to take action! 💧',
      likes: 12,
      comments: 3,
      image: null
    },
    {
      id: 2,
      author: 'BirdWatcher92',
      avatar: '🦜',
      time: '4 hours ago',
      content: 'BiodiversityEar identified 15 different bird species in my morning recording! Including a rare warbler that hasn\'t been spotted in our area for years. Nature is amazing! 🎵',
      likes: 24,
      comments: 7,
      image: null
    },
    {
      id: 3,
      author: 'GreenThumb',
      avatar: '🌿',
      time: '1 day ago',
      content: 'FloraShield helped me identify an invasive plant species in my garden before it could spread. Early detection is key to protecting our local ecosystem! 🛡️',
      likes: 18,
      comments: 5,
      image: null
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      alert('Post shared! (Demo mode)');
      setNewPost('');
    }
  };

  return (
    <div className="community-page" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
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
        <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>
          Connect with environmental champions worldwide
        </p>
      </div>

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
            placeholder="Share your latest environmental discovery, test results, or eco-friendly action..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '15px',
              border: '2px solid #e1e8ed',
              borderRadius: '8px',
              fontSize: '16px',
              resize: 'vertical',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '15px'
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" style={{
                padding: '8px 15px',
                background: '#ecf0f1',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📸 Add Photo
              </button>
              <button type="button" style={{
                padding: '8px 15px',
                background: '#ecf0f1',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📍 Add Location
              </button>
            </div>
            <button type="submit" style={{
              padding: '10px 20px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Share Post
            </button>
          </div>
        </form>
      </div>

      {/* Community Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌍</div>
          <h3 style={{ margin: '0 0 5px 0', color: '#27ae60' }}>12,847</h3>
          <p style={{ margin: 0, color: '#7f8c8d' }}>Active Members</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💧</div>
          <h3 style={{ margin: '0 0 5px 0', color: '#3498db' }}>45,231</h3>
          <p style={{ margin: 0, color: '#7f8c8d' }}>Water Tests Shared</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🦜</div>
          <h3 style={{ margin: '0 0 5px 0', color: '#e67e22' }}>28,956</h3>
          <p style={{ margin: 0, color: '#7f8c8d' }}>Species Identified</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌿</div>
          <h3 style={{ margin: '0 0 5px 0', color: '#27ae60' }}>156,789</h3>
          <p style={{ margin: 0, color: '#7f8c8d' }}>kg CO₂ Saved</p>
        </div>
      </div>

      {/* Community Posts */}
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>📱 Recent Community Activity</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts.map(post => (
          <div key={post.id} style={{
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
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                marginRight: '12px'
              }}>
                {post.avatar}
              </div>
              <div>
                <h4 style={{ margin: '0 0 2px 0', color: '#2c3e50' }}>{post.author}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d' }}>{post.time}</p>
              </div>
            </div>

            {/* Post Content */}
            <p style={{ 
              margin: '0 0 15px 0', 
              lineHeight: '1.6',
              color: '#2c3e50'
            }}>
              {post.content}
            </p>

            {/* Post Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              paddingTop: '15px',
              borderTop: '1px solid #ecf0f1'
            }}>
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
                ❤️ {post.likes} Likes
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
                💬 {post.comments} Comments
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
          </div>
        ))}
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
          🌍 <strong>Demo Community</strong>
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
          This is a prototype community showcasing how environmental data and discoveries can be shared among users.
        </p>
      </div>
    </div>
  );
};

export default Community;