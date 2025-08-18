import React, { useState } from 'react';

function Challenges() {
  const [completedChallenges, setCompletedChallenges] = useState([]);

  const challenges = [
    {
      id: 1,
      title: "🚲 Bike Week Challenge",
      description: "Use bike or walk for transportation for 7 days",
      difficulty: "Medium",
      points: 150,
      co2Savings: 14.7
    },
    {
      id: 2,
      title: "🌱 Plant-Based Week",
      description: "Eat only plant-based meals for 7 consecutive days",
      difficulty: "Hard",
      points: 200,
      co2Savings: 23.1
    },
    {
      id: 3,
      title: "💡 Energy Saver Challenge",
      description: "Reduce home energy consumption by 25% for one month",
      difficulty: "Medium",
      points: 300,
      co2Savings: 45.2
    }
  ];

  const startChallenge = (challengeId) => {
    alert(`Challenge ${challengeId} started! Track your progress in the app.`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3rem', color: '#2E7D32', marginBottom: '10px' }}>
          🏆 Environmental Challenges
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Take on challenges to reduce your environmental impact and earn points!
        </p>
      </div>

      <div className="grid grid-3" style={{ marginBottom: '30px' }}>
        <div className="card" style={{ 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)', 
          color: 'white' 
        }}>
          <h3 style={{ color: 'white' }}>🏅 Points Earned</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0' }}>
            {completedChallenges.reduce((sum, c) => sum + c.points, 0)}
          </div>
          <p style={{ opacity: 0.9 }}>Total challenge points</p>
        </div>
        
        <div className="card" style={{ 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #2196F3 0%, #03DAC6 100%)', 
          color: 'white' 
        }}>
          <h3 style={{ color: 'white' }}>🌍 CO₂ Saved</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0' }}>
            {completedChallenges.reduce((sum, c) => sum + c.co2Savings, 0).toFixed(1)}
          </div>
          <p style={{ opacity: 0.9 }}>kg CO₂ prevented</p>
        </div>
        
        <div className="card" style={{ 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #FF9800 0%, #FFC107 100%)', 
          color: 'white' 
        }}>
          <h3 style={{ color: 'white' }}>✅ Completed</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0' }}>
            {completedChallenges.length}
          </div>
          <p style={{ opacity: 0.9 }}>challenges finished</p>
        </div>
      </div>

      <div className="card">
        <h3>🚀 Available Challenges</h3>
        <div className="grid grid-2" style={{ marginTop: '20px' }}>
          {challenges.map(challenge => (
            <div key={challenge.id} className="card" style={{ border: '1px solid #ddd' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                marginBottom: '15px' 
              }}>
                <h4 style={{ margin: 0, color: '#2E7D32' }}>{challenge.title}</h4>
                <div style={{ 
                  background: getDifficultyColor(challenge.difficulty), 
                  color: 'white', 
                  padding: '4px 8px', 
                  borderRadius: '12px', 
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}>
                  {challenge.difficulty}
                </div>
              </div>
              
              <p style={{ marginBottom: '15px', color: '#666' }}>{challenge.description}</p>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '15px', 
                fontSize: '0.9rem' 
              }}>
                <span>🏅 {challenge.points} points</span>
                <span>🌍 {challenge.co2Savings}kg CO₂</span>
              </div>
              
              <button 
                onClick={() => startChallenge(challenge.id)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Start Challenge
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Challenges;