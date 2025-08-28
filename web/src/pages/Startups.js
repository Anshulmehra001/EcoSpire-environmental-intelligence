import React, { useState, useEffect } from 'react';
import { TrendingUp, MapPin, Calendar, DollarSign, Users, Award, Target, Lightbulb, Globe, Zap, Search, Filter } from 'lucide-react';
import { environmentalStartupsDatabase, environmentalMarketData, innovationEcosystem } from '../utils/environmentalStartupsDatabase';

function Startups() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('valuation');

  // Combine all startups from different categories
  const allStartups = [
    ...environmentalStartupsDatabase.climateTech.map(startup => ({ ...startup, category: 'Climate Tech' })),
    ...environmentalStartupsDatabase.cleanEnergy.map(startup => ({ ...startup, category: 'Clean Energy' })),
    ...environmentalStartupsDatabase.circularEconomy.map(startup => ({ ...startup, category: 'Circular Economy' })),
    ...environmentalStartupsDatabase.agTech.map(startup => ({ ...startup, category: 'AgTech' })),
    ...environmentalStartupsDatabase.waterTech.map(startup => ({ ...startup, category: 'Water Tech' })),
    ...environmentalStartupsDatabase.carbonManagement.map(startup => ({ ...startup, category: 'Carbon Management' })),
    ...environmentalStartupsDatabase.biodiversityTech.map(startup => ({ ...startup, category: 'Biodiversity Tech' })),
    ...environmentalStartupsDatabase.emergingTech.map(startup => ({ ...startup, category: 'Emerging Tech' }))
  ];

  const categories = ['All', 'Climate Tech', 'Clean Energy', 'Circular Economy', 'AgTech', 'Water Tech', 'Carbon Management', 'Biodiversity Tech', 'Emerging Tech'];

  const filteredStartups = allStartups.filter(startup => {
    const matchesCategory = selectedCategory === 'All' || startup.category === selectedCategory;
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.technology.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedStartups = [...filteredStartups].sort((a, b) => {
    switch (sortBy) {
      case 'valuation':
        const aVal = parseFloat(a.valuation.replace(/[^0-9.]/g, ''));
        const bVal = parseFloat(b.valuation.replace(/[^0-9.]/g, ''));
        return bVal - aVal;
      case 'founded':
        return b.founded - a.founded;
      case 'funding':
        const aFund = parseFloat(a.funding.replace(/[^0-9.]/g, ''));
        const bFund = parseFloat(b.funding.replace(/[^0-9.]/g, ''));
        return bFund - aFund;
      default:
        return 0;
    }
  });

  const parseValuation = (valuation) => {
    const num = parseFloat(valuation.replace(/[^0-9.]/g, ''));
    if (valuation.includes('B')) return num;
    if (valuation.includes('M')) return num / 1000;
    return num;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Climate Tech': '🌡️',
      'Clean Energy': '⚡',
      'Circular Economy': '♻️',
      'AgTech': '🌾',
      'Water Tech': '💧',
      'Carbon Management': '🌪️',
      'Biodiversity Tech': '🦋',
      'Emerging Tech': '🔬'
    };
    return icons[category] || '🚀';
  };

  if (selectedStartup) {
    return (
      <div className="container">
        <button 
          onClick={() => setSelectedStartup(null)} 
          className="btn btn-secondary" 
          style={{ marginBottom: '20px' }}
        >
          ← Back to Startups
        </button>
        
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '4rem', marginRight: '20px' }}>
              {getCategoryIcon(selectedStartup.category)}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ color: '#2E7D32', marginBottom: '10px' }}>{selectedStartup.name}</h2>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '5px 15px',
                  background: '#2E7D32',
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {selectedStartup.category}
                </span>
                <span style={{ color: '#666', display: 'flex', alignItems: 'center' }}>
                  <MapPin size={16} style={{ marginRight: '5px' }} />
                  {selectedStartup.location}
                </span>
                <span style={{ color: '#666', display: 'flex', alignItems: 'center' }}>
                  <Calendar size={16} style={{ marginRight: '5px' }} />
                  Founded {selectedStartup.founded}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ color: '#2E7D32', fontWeight: 'bold' }}>
                  <DollarSign size={16} style={{ marginRight: '5px', display: 'inline' }} />
                  Valuation: {selectedStartup.valuation}
                </div>
                <div style={{ color: '#FF9800', fontWeight: 'bold' }}>
                  Funding: {selectedStartup.funding}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '15px' }}>Company Overview</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '20px' }}>
              {selectedStartup.description}
            </p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '15px' }}>🔬 Technology & Innovation</h3>
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
              <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>{selectedStartup.technology}</p>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '15px' }}>🌍 Environmental Impact</h3>
            <div style={{ background: '#e8f5e8', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #2E7D32' }}>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', fontWeight: '500' }}>{selectedStartup.impact}</p>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '15px' }}>🏆 Key Milestones</h3>
            <div className="grid grid-1">
              {selectedStartup.milestones.map((milestone, index) => (
                <div key={index} style={{ 
                  background: '#fff3e0', 
                  padding: '15px', 
                  borderRadius: '8px',
                  borderLeft: '3px solid #FF9800'
                }}>
                  {milestone}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '15px' }}>🤝 Key Customers & Partners</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {selectedStartup.customers.map((customer, index) => (
                <span key={index} style={{
                  padding: '8px 16px',
                  background: '#e3f2fd',
                  color: '#1976d2',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {customer}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-2">
            <div>
              <h4 style={{ color: '#f44336', marginBottom: '15px' }}>⚠️ Challenges</h4>
              <ul style={{ paddingLeft: '20px' }}>
                {selectedStartup.challenges.map((challenge, index) => (
                  <li key={index} style={{ marginBottom: '8px', color: '#666' }}>{challenge}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#4CAF50', marginBottom: '15px' }}>🚀 Opportunities</h4>
              <ul style={{ paddingLeft: '20px' }}>
                {selectedStartup.opportunities.map((opportunity, index) => (
                  <li key={index} style={{ marginBottom: '8px', color: '#666' }}>{opportunity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🚀 Environmental Startup Ecosystem
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          Discover the companies revolutionizing sustainability and climate technology
        </p>
        <div style={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '25px',
          display: 'inline-block',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}>
          💰 {environmentalMarketData.globalInvestment[2023].total} Global Investment • 🌱 2,500+ Startups • 📈 20% CAGR
        </div>
      </div>

      {/* Market Overview */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 100%)', 
        color: 'white', 
        marginBottom: '30px' 
      }}>
        <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
          📊 2023 Global Environmental Investment Overview
        </h3>
        <div className="grid grid-4">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {environmentalMarketData.globalInvestment[2023].sectors.renewableEnergy}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Renewable Energy</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {environmentalMarketData.globalInvestment[2023].sectors.electricVehicles}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Electric Vehicles</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {environmentalMarketData.globalInvestment[2023].sectors.energyStorage}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Energy Storage</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {environmentalMarketData.globalInvestment[2023].sectors.climateTech}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Climate Tech</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={20} style={{ 
              position: 'absolute', 
              left: '15px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#666' 
            }} />
            <input
              type="text"
              placeholder="Search startups, technologies, or impacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 45px',
                border: '2px solid #e0e0e0',
                borderRadius: '25px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2E7D32'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '12px 15px',
              border: '2px solid #e0e0e0',
              borderRadius: '25px',
              fontSize: '1rem',
              outline: 'none',
              background: 'white'
            }}
          >
            <option value="valuation">Sort by Valuation</option>
            <option value="funding">Sort by Funding</option>
            <option value="founded">Sort by Founded Year</option>
          </select>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '10px 20px',
                borderRadius: '25px',
                border: 'none',
                background: selectedCategory === category ? '#2E7D32' : '#f0f0f0',
                color: selectedCategory === category ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: selectedCategory === category ? 'bold' : 'normal',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{getCategoryIcon(category)}</span>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Startups Grid */}
      <div className="grid grid-2">
        {sortedStartups.map((startup, index) => (
          <div 
            key={index} 
            className="card" 
            style={{ 
              cursor: 'pointer', 
              transition: 'transform 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}
            onClick={() => setSelectedStartup(startup)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* Header Section - Fixed Height */}
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px', minHeight: '80px' }}>
              <div style={{ fontSize: '3rem', marginRight: '15px', lineHeight: '1' }}>
                {getCategoryIcon(startup.category)}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#2E7D32', fontSize: '1.4rem', lineHeight: '1.2' }}>
                  {startup.name}
                </h3>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    background: '#2E7D32',
                    color: 'white',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}>
                    {startup.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#666', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    <MapPin size={12} style={{ marginRight: '3px' }} />
                    {startup.location}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#666', whiteSpace: 'nowrap' }}>
                    Founded {startup.founded}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '0.85rem', color: '#2E7D32', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                    💰 {startup.valuation}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#FF9800', whiteSpace: 'nowrap' }}>
                    {startup.funding}
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section - Fixed Height */}
            <div style={{ marginBottom: '15px', minHeight: '60px' }}>
              <p style={{ 
                color: '#666', 
                lineHeight: '1.5', 
                fontSize: '0.9rem',
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {startup.description}
              </p>
            </div>

            {/* Environmental Impact Section - Fixed Height */}
            <div style={{ 
              background: '#e8f5e8', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '15px',
              borderLeft: '3px solid #2E7D32',
              minHeight: '70px'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#2E7D32', fontWeight: 'bold', marginBottom: '5px' }}>
                🌍 Environmental Impact
              </div>
              <div style={{ 
                fontSize: '0.85rem', 
                color: '#555',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: '1.3'
              }}>
                {startup.impact}
              </div>
            </div>

            {/* Technology Section - Fixed Height */}
            <div style={{ marginBottom: '15px', minHeight: '60px' }}>
              <div style={{ fontSize: '0.75rem', color: '#1976d2', fontWeight: 'bold', marginBottom: '6px' }}>
                🔬 Technology Focus
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                color: '#666', 
                lineHeight: '1.3',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {startup.technology}
              </div>
            </div>

            {/* Spacer to push footer to bottom */}
            <div style={{ flex: 1 }}></div>

            {/* Footer Section - Always at bottom */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <button className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
                📊 View Details
              </button>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '150px' }}>
                {startup.customers.slice(0, 3).map((customer, idx) => (
                  <span key={idx} style={{
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    background: '#e3f2fd',
                    color: '#1976d2',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap'
                  }}>
                    {customer}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Innovation Ecosystem */}
      <div style={{ marginTop: '50px' }}>
        <h3 style={{ color: '#2E7D32', textAlign: 'center', marginBottom: '30px' }}>
          🏢 Innovation Ecosystem
        </h3>
        <div className="grid grid-2">
          <div className="card" style={{ background: '#f8f9fa' }}>
            <h4 style={{ color: '#2E7D32', marginBottom: '20px' }}>🚀 Top Accelerators</h4>
            {innovationEcosystem.accelerators.map((accelerator, index) => (
              <div key={index} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
                <div style={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: '5px' }}>
                  {accelerator.name}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                  📍 {accelerator.location}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#555' }}>
                  {accelerator.focus} • {accelerator.portfolio}
                </div>
              </div>
            ))}
          </div>
          
          <div className="card" style={{ background: '#f8f9fa' }}>
            <h4 style={{ color: '#2E7D32', marginBottom: '20px' }}>💰 Corporate Venture Funds</h4>
            {innovationEcosystem.corporateVentures.map((fund, index) => (
              <div key={index} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
                <div style={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: '5px' }}>
                  {fund.name}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                  💰 {fund.fund} • {fund.parent}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#555' }}>
                  {fund.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Trends */}
      <div style={{ marginTop: '40px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)' }}>
          <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
            📈 Market Trends & Projections
          </h3>
          <div className="grid grid-3">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2E7D32' }}>
                {environmentalMarketData.marketSize.cleanTech.projected}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Clean Tech Market by 2030</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2E7D32' }}>
                {environmentalMarketData.marketSize.cleanTech.cagr}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Annual Growth Rate</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2E7D32' }}>
                {environmentalMarketData.marketSize.circularEconomy.jobCreation}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>New Jobs Potential</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Startups;