import React, { useState, useEffect } from 'react';
import { authManager } from '../utils/auth';

const Login = ({ onNavigate, onAuthChange }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if already authenticated
  useEffect(() => {
    if (authManager.isAuthenticated()) {
      onNavigate && onNavigate('Dashboard');
    }
  }, [onNavigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      let result;
      if (isLogin) {
        result = await authManager.login(formData);
      } else {
        if (!formData.name.trim()) {
          throw new Error('Name is required for registration');
        }
        result = await authManager.register(formData);
      }

      if (result.success) {
        setSuccess(`${isLogin ? 'Login' : 'Registration'} successful! Welcome to EcoSpire!`);
        
        // Log the authentication activity
        await authManager.logActivity(
          isLogin ? 'User logged in' : 'New user registered',
          { type: 'auth', action: isLogin ? 'login' : 'register', points: isLogin ? 5 : 50 }
        );

        // Notify parent component of auth change
        onAuthChange && onAuthChange(result.user);

        // Redirect to dashboard after short delay
        setTimeout(() => {
          onNavigate && onNavigate('Dashboard');
        }, 1500);
      }
    } catch (err) {
      setError(err.message || `${isLogin ? 'Login' : 'Registration'} failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleGuestMode = () => {
    authManager.setGuestMode();
    onAuthChange && onAuthChange(authManager.getCurrentUser());
    onNavigate && onNavigate('Dashboard');
  };

  return (
    <div className="login-page" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🌿</div>
          <h2 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
            {isLogin ? 'Welcome Back' : 'Join EcoSpire'}
          </h2>
          <p style={{ color: '#7f8c8d', margin: 0 }}>
            {isLogin ? 'Sign in to track your environmental impact' : 'Start your environmental journey today'}
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div style={{
            background: '#d4edda',
            color: '#155724',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #c3e6cb',
            textAlign: 'center'
          }}>
            ✅ {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #f5c6cb',
            textAlign: 'center'
          }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: error && !formData.name ? '2px solid #dc3545' : '2px solid #e1e8ed',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e8ed',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e8ed',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
              required
              disabled={isLoading}
              minLength="6"
            />
            {!isLogin && (
              <small style={{ color: '#7f8c8d', fontSize: '12px' }}>
                Password must be at least 6 characters long
              </small>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: isLoading ? '#95a5a6' : 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isLoading && <span>⏳</span>}
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
              setFormData({ email: '', password: '', name: '' });
            }}
            disabled={isLoading}
            style={{
              background: 'none',
              border: 'none',
              color: '#3498db',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        {/* Guest Mode Option */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={handleGuestMode}
            disabled={isLoading}
            style={{
              background: 'none',
              border: '2px solid #3498db',
              color: '#3498db',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            🚀 Continue as Guest
          </button>
        </div>

        {/* Demo Notice */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#e8f4fd',
          borderRadius: '8px',
          textAlign: 'center',
          border: '1px solid #bee5eb'
        }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#0c5460', fontWeight: '600' }}>
            🌍 Enhanced Demo Authentication
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: '#0c5460', lineHeight: '1.4' }}>
            Full user management with local storage. Your data persists between sessions. 
            Try creating an account or use guest mode to explore!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;