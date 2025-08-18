import React, { useState, useEffect } from 'react';
import { BookOpen, Video, Users, Award, Search, Filter, Clock, Star, TrendingUp, Globe, Lightbulb, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { environmentalKnowledgeBase, environmentalIndicators } from '../utils/environmentalKnowledgeBase';
import realTimeEnvironmentalData from '../utils/realTimeEnvironmentalData';
import { educationalContent } from '../utils/educationalContent';

const Learn = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [realTimeData, setRealTimeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        const [climateData, carbonData] = await Promise.all([
          realTimeEnvironmentalData.getClimateData(40.7128, -74.0060), // NYC coordinates
          realTimeEnvironmentalData.getCarbonEmissionsData('US')
        ]);
        setRealTimeData({ climate: climateData, carbon: carbonData });
      } catch (error) {
        console.error('Failed to fetch real-time data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealTimeData();
  }, []);

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'climate', name: 'Climate Change', icon: '🌡️' },
    { id: 'biodiversity', name: 'Biodiversity', icon: '🦋' },
    { id: 'renewable', name: 'Renewable Energy', icon: '⚡' },
    { id: 'pollution', name: 'Pollution & Waste', icon: '🏭' },
    { id: 'conservation', name: 'Conservation', icon: '🌳' },
    { id: 'technology', name: 'Green Technology', icon: '🔬' },
    { id: 'policy', name: 'Environmental Policy', icon: '📋' },
  ];

  // Generate comprehensive learning topics from our knowledge base
  const learningTopics = [
    // Climate Change Topics
    ...environmentalKnowledgeBase.climateChange.keyFacts.map((fact, index) => ({
      id: `climate-${index}`,
      title: fact.title,
      category: 'climate',
      icon: '🌡️',
      description: fact.fact,
      level: fact.urgency === 'Critical' ? 'Advanced' : 'Intermediate',
      duration: '15 min read',
      urgency: fact.urgency,
      source: fact.source,
      impact: fact.impact,
      content: `
        <h3>${fact.title}</h3>
        <div class="fact-highlight">
          <strong>Key Fact:</strong> ${fact.fact}
        </div>
        <div class="impact-section">
          <strong>Impact:</strong> ${fact.impact}
        </div>
        <div class="source-section">
          <strong>Source:</strong> ${fact.source}
        </div>
        <div class="urgency-${fact.urgency.toLowerCase()}">
          <strong>Urgency Level:</strong> ${fact.urgency}
        </div>
      `,
      realTimeData: realTimeData?.climate,
      solutions: environmentalKnowledgeBase.climateChange.solutions
    })),

    // Biodiversity Topics
    ...environmentalKnowledgeBase.biodiversity.keyFacts.map((fact, index) => ({
      id: `biodiversity-${index}`,
      title: fact.title,
      category: 'biodiversity',
      icon: '🦋',
      description: fact.fact,
      level: fact.urgency === 'Critical' ? 'Advanced' : 'Intermediate',
      duration: '12 min read',
      urgency: fact.urgency,
      source: fact.source,
      impact: fact.impact,
      content: `
        <h3>${fact.title}</h3>
        <div class="fact-highlight">
          <strong>Key Fact:</strong> ${fact.fact}
        </div>
        <div class="impact-section">
          <strong>Impact:</strong> ${fact.impact}
        </div>
        <div class="source-section">
          <strong>Source:</strong> ${fact.source}
        </div>
        <div class="urgency-${fact.urgency.toLowerCase()}">
          <strong>Urgency Level:</strong> ${fact.urgency}
        </div>
      `,
      solutions: environmentalKnowledgeBase.biodiversity.solutions
    })),

    // Pollution Topics
    ...environmentalKnowledgeBase.pollution.keyFacts.map((fact, index) => ({
      id: `pollution-${index}`,
      title: fact.title,
      category: 'pollution',
      icon: '🏭',
      description: fact.fact,
      level: fact.urgency === 'Critical' ? 'Advanced' : 'Intermediate',
      duration: '10 min read',
      urgency: fact.urgency,
      source: fact.source,
      impact: fact.impact,
      content: `
        <h3>${fact.title}</h3>
        <div class="fact-highlight">
          <strong>Key Fact:</strong> ${fact.fact}
        </div>
        <div class="impact-section">
          <strong>Impact:</strong> ${fact.impact}
        </div>
        <div class="source-section">
          <strong>Source:</strong> ${fact.source}
        </div>
        <div class="urgency-${fact.urgency.toLowerCase()}">
          <strong>Urgency Level:</strong> ${fact.urgency}
        </div>
      `,
      solutions: environmentalKnowledgeBase.pollution.solutions
    })),

    // Technology Topics
    ...environmentalKnowledgeBase.technologies.renewable.map((tech, index) => ({
      id: `tech-renewable-${index}`,
      title: tech.name,
      category: 'technology',
      icon: '⚡',
      description: tech.description,
      level: 'Intermediate',
      duration: '18 min read',
      efficiency: tech.efficiency,
      cost: tech.cost,
      growth: tech.growth,
      potential: tech.potential,
      challenges: tech.challenges,
      content: `
        <h3>${tech.name}</h3>
        <div class="tech-description">
          ${tech.description}
        </div>
        <div class="tech-stats">
          <div><strong>Efficiency:</strong> ${tech.efficiency}</div>
          <div><strong>Cost:</strong> ${tech.cost}</div>
          <div><strong>Growth:</strong> ${tech.growth}</div>
        </div>
        <div class="potential-section">
          <strong>Potential:</strong> ${tech.potential}
        </div>
        <div class="challenges-section">
          <strong>Challenges:</strong>
          <ul>
            ${tech.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
          </ul>
        </div>
      `
    })),

    // Policy Topics
    ...environmentalKnowledgeBase.policies.international.map((policy, index) => ({
      id: `policy-${index}`,
      title: policy.name,
      category: 'policy',
      icon: '📋',
      description: `${policy.goal} - ${policy.participants}`,
      level: 'Advanced',
      duration: '20 min read',
      year: policy.year,
      participants: policy.participants,
      goal: policy.goal,
      status: policy.status,
      progress: policy.progress,
      nextSteps: policy.nextSteps,
      content: `
        <h3>${policy.name} (${policy.year})</h3>
        <div class="policy-overview">
          <div><strong>Participants:</strong> ${policy.participants}</div>
          <div><strong>Goal:</strong> ${policy.goal}</div>
          <div><strong>Status:</strong> ${policy.status}</div>
        </div>
        <div class="progress-section">
          <strong>Current Progress:</strong> ${policy.progress}
        </div>
        <div class="next-steps">
          <strong>Next Steps:</strong>
          <ul>
            ${policy.nextSteps.map(step => `<li>${step}</li>`).join('')}
          </ul>
        </div>
      `
    })),

    // Success Stories
    ...environmentalKnowledgeBase.successStories.map((story, index) => ({
      id: `success-${index}`,
      title: story.title,
      category: 'conservation',
      icon: '🌳',
      description: story.description,
      level: 'Beginner',
      duration: '8 min read',
      location: story.location,
      results: story.results,
      lessons: story.lessons,
      content: `
        <h3>${story.title}</h3>
        <div class="location-badge">📍 ${story.location}</div>
        <div class="story-description">
          ${story.description}
        </div>
        <div class="results-section">
          <strong>Results Achieved:</strong>
          <ul>
            ${Object.entries(story.results).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
          </ul>
        </div>
        <div class="lessons-section">
          <strong>Key Lessons:</strong>
          <ul>
            ${story.lessons.map(lesson => `<li>${lesson}</li>`).join('')}
          </ul>
        </div>
      `
    }))
  ];

  const filteredTopics = learningTopics.filter(topic => {
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#f44336';
      default: return '#666';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical': return '#f44336';
      case 'High': return '#FF9800';
      case 'Medium': return '#FFC107';
      default: return '#4CAF50';
    }
  };

  if (selectedTopic) {
    return (
      <div className="container">
        <button 
          onClick={() => setSelectedTopic(null)} 
          className="btn btn-secondary" 
          style={{ marginBottom: '20px' }}
        >
          ← Back to Learning Hub
        </button>
        
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '15px' }}>{selectedTopic.icon}</div>
            <h2 style={{ color: '#2E7D32', marginBottom: '10px' }}>{selectedTopic.title}</h2>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                background: getLevelColor(selectedTopic.level),
                color: 'white',
                fontSize: '0.9rem'
              }}>
                {selectedTopic.level}
              </span>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>
                <Clock size={16} style={{ marginRight: '5px' }} />
                {selectedTopic.duration}
              </span>
              {selectedTopic.urgency && (
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  background: getUrgencyColor(selectedTopic.urgency),
                  color: 'white',
                  fontSize: '0.9rem'
                }}>
                  <AlertTriangle size={14} style={{ marginRight: '5px' }} />
                  {selectedTopic.urgency} Priority
                </span>
              )}
            </div>
          </div>

          {/* Real-time Data Integration */}
          {selectedTopic.realTimeData && (
            <div style={{ 
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', 
              padding: '20px', 
              borderRadius: '10px', 
              marginBottom: '30px' 
            }}>
              <h4 style={{ color: '#1976d2', marginBottom: '15px' }}>
                📡 Real-Time Environmental Data
              </h4>
              <div className="grid grid-3">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1976d2' }}>
                    {selectedTopic.realTimeData.current?.temperature}°C
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Current Temperature</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1976d2' }}>
                    {selectedTopic.realTimeData.current?.humidity}%
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Humidity</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1976d2' }}>
                    {selectedTopic.realTimeData.climateIndicators?.temperatureTrend}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Temperature Trend</div>
                </div>
              </div>
            </div>
          )}

          {/* Topic Content */}
          <div 
            style={{ 
              lineHeight: '1.8', 
              fontSize: '1.1rem',
              marginBottom: '30px'
            }}
            dangerouslySetInnerHTML={{ __html: selectedTopic.content }}
          />

          {/* Solutions Section */}
          {selectedTopic.solutions && (
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>
                💡 Solutions & Actions
              </h3>
              <div className="grid grid-1">
                {selectedTopic.solutions.map((solution, index) => (
                  <div key={index} className="card" style={{ background: '#f8f9fa' }}>
                    <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>
                      {solution.solution}
                    </h4>
                    <p style={{ marginBottom: '15px' }}>{solution.description}</p>
                    <div className="grid grid-2">
                      <div>
                        <strong>Potential:</strong> {solution.potential}
                      </div>
                      <div>
                        <strong>Timeline:</strong> {solution.timeline}
                      </div>
                      <div>
                        <strong>Investment:</strong> {solution.cost}
                      </div>
                      <div>
                        <strong>Benefits:</strong> {solution.benefits?.join(', ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {selectedTopic.source && (
            <div style={{ 
              marginTop: '30px', 
              padding: '20px', 
              background: '#e8f5e8', 
              borderRadius: '10px',
              borderLeft: '4px solid #2E7D32'
            }}>
              <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>📚 Source & Further Reading</h4>
              <p><strong>Primary Source:</strong> {selectedTopic.source}</p>
              {selectedTopic.impact && <p><strong>Global Impact:</strong> {selectedTopic.impact}</p>}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          📚 EcoSpire Learning Hub
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          Master environmental science with real-time data and expert insights
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
          🎓 Science-Based • 📡 Real-Time Data • 🌍 Global Impact
        </div>
      </div>

      {/* Real-Time Environmental Indicators */}
      {!loading && realTimeData && (
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 100%)', 
          color: 'white', 
          marginBottom: '30px' 
        }}>
          <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
            📡 Live Environmental Indicators
          </h3>
          <div className="grid grid-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {environmentalIndicators.climate.globalTemperature.current}°C
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                Global Temperature Rise
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                {environmentalIndicators.climate.globalTemperature.trend}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {environmentalIndicators.climate.co2Concentration.current}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                CO₂ Concentration (ppm)
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                {environmentalIndicators.climate.co2Concentration.trend}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {realTimeData.carbon?.carbonIntensity || 'N/A'}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                Carbon Intensity
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                gCO₂/kWh
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {realTimeData.carbon?.renewablePercentage || 'N/A'}%
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                Renewable Energy
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                Current Mix
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
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
              placeholder="Search environmental topics..."
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
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '25px',
                border: 'none',
                background: selectedCategory === category.id ? '#2E7D32' : '#f0f0f0',
                color: selectedCategory === category.id ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: selectedCategory === category.id ? 'bold' : 'normal',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-2">
        {filteredTopics.map(topic => (
          <div 
            key={topic.id} 
            className="card" 
            style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }} 
            onClick={() => setSelectedTopic(topic)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div style={{ fontSize: '3rem', marginRight: '15px' }}>{topic.icon}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#2E7D32', fontSize: '1.3rem' }}>
                  {topic.title}
                </h3>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.8rem',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    background: getLevelColor(topic.level),
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {topic.level}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#666', display: 'flex', alignItems: 'center' }}>
                    <Clock size={14} style={{ marginRight: '4px' }} />
                    {topic.duration}
                  </span>
                  {topic.urgency && (
                    <span style={{
                      fontSize: '0.8rem',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      background: getUrgencyColor(topic.urgency),
                      color: 'white',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <AlertTriangle size={12} style={{ marginRight: '4px' }} />
                      {topic.urgency}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <p style={{ color: '#666', marginBottom: '15px', lineHeight: '1.6' }}>
              {topic.description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn btn-primary" style={{ flex: 1 }}>
                📖 Start Learning
              </button>
              {topic.source && (
                <div style={{ fontSize: '0.8rem', color: '#999', marginLeft: '10px' }}>
                  📚 {topic.source.split(' ')[0]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Learning Progress Stats */}
      <div style={{ marginTop: '50px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)' }}>
          <h3 style={{ color: '#2E7D32', marginBottom: '20px', textAlign: 'center' }}>
            📊 Global Environmental Learning Impact
          </h3>
          <div className="grid grid-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2E7D32' }}>
                {filteredTopics.length}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Available Topics</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2E7D32' }}>2.8M+</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Global Learners</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2E7D32' }}>180+</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Countries Reached</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2E7D32' }}>97%</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Accuracy Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Success Stories */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: '#2E7D32', textAlign: 'center', marginBottom: '30px' }}>
          🌟 Environmental Success Stories
        </h3>
        <div className="grid grid-3">
          {environmentalKnowledgeBase.successStories.slice(0, 3).map((story, index) => (
            <div key={index} className="card" style={{ background: '#f8f9fa' }}>
              <div style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '15px' }}>🏆</div>
              <h4 style={{ color: '#2E7D32', marginBottom: '10px', textAlign: 'center' }}>
                {story.title}
              </h4>
              <div style={{ 
                background: '#2E7D32', 
                color: 'white', 
                padding: '5px 10px', 
                borderRadius: '15px', 
                fontSize: '0.8rem', 
                textAlign: 'center',
                marginBottom: '15px'
              }}>
                📍 {story.location}
              </div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px', lineHeight: '1.5' }}>
                {story.description}
              </p>
              <div style={{ fontSize: '0.8rem', color: '#2E7D32' }}>
                <strong>Key Achievement:</strong> {Object.values(story.results)[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;