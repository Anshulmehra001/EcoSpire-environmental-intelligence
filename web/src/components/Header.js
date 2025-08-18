import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🌍</span>
            <h1>EcoSpire</h1>
          </div>
          <div className="header-subtitle">
            🌱 Complete Environmental Intelligence Platform • 🤖 AI-Powered Solutions • 🌿 Building a Sustainable Future
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;