import React from 'react';

const LoadingScreen = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #4CAF50 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      {/* EcoSpire Logo */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <div style={{
          fontSize: '6rem',
          marginBottom: '20px',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          🌱
        </div>
        <h1 style={{
          fontSize: '4rem',
          color: 'white',
          margin: 0,
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          animation: 'fadeInUp 1s ease-out'
        }}>
          EcoSpire
        </h1>
        <p style={{
          fontSize: '1.5rem',
          color: '#E8F5E9',
          margin: '10px 0 0 0',
          fontWeight: '300',
          animation: 'fadeInUp 1s ease-out 0.3s both'
        }}>
          AI-Powered Environmental Intelligence
        </p>
      </div>

      {/* Loading Animation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '20px'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'white',
          animation: 'bounce 1.4s ease-in-out infinite both',
          animationDelay: '0s'
        }}></div>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'white',
          animation: 'bounce 1.4s ease-in-out infinite both',
          animationDelay: '0.16s'
        }}></div>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'white',
          animation: 'bounce 1.4s ease-in-out infinite both',
          animationDelay: '0.32s'
        }}></div>
      </div>

      {/* Loading Text */}
      <p style={{
        color: 'white',
        fontSize: '1.1rem',
        marginTop: '30px',
        opacity: 0.9,
        animation: 'fadeIn 2s ease-in-out'
      }}>
        Initializing Environmental Tools...
      </p>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;