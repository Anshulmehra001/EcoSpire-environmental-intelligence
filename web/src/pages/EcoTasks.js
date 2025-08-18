import React, { useState, useEffect } from 'react';

function EcoTasks() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userLevel, setUserLevel] = useState(1);

  const taskCategories = ['All', 'Energy', 'Transport', 'Waste', 'Nature', 'Water', 'Food', 'Community'];

  const ecoTasks = [
    // Energy Tasks
    {
      id: 1,
      title: "Switch to LED Bulbs",
      category: "Energy",
      description: "Replace 5 incandescent bulbs with LED bulbs in your home",
      points: 50,
      difficulty: "Easy",
      impact: "Save 75% energy, reduce 1,000 lbs CO2/year",
      timeRequired: "30 minutes",
      icon: "💡",
      instructions: [
        "Identify incandescent bulbs in your home",
        "Purchase LED replacements (check wattage)",
        "Replace bulbs safely when cool",
        "Dispose of old bulbs properly"
      ],
      verification: "Photo of LED bulb package and installed bulbs"
    },
    {
      id: 2,
      title: "Unplug Energy Vampires",
      category: "Energy",
      description: "Identify and unplug 10 devices that consume standby power",
      points: 30,
      difficulty: "Easy",
      impact: "Save $100/year, reduce phantom load by 10%",
      timeRequired: "15 minutes",
      icon: "🔌",
      instructions: [
        "Walk through your home with a checklist",
        "Identify devices with standby lights",
        "Unplug chargers, TVs, computers when not in use",
        "Consider smart power strips"
      ],
      verification: "List of 10 unplugged devices"
    },
    {
      id: 3,
      title: "Install Smart Thermostat",
      category: "Energy",
      description: "Install a programmable or smart thermostat",
      points: 100,
      difficulty: "Medium",
      impact: "Save 10-15% on heating/cooling costs",
      timeRequired: "2 hours",
      icon: "🌡️",
      instructions: [
        "Turn off power to HVAC system",
        "Remove old thermostat",
        "Install new thermostat following instructions",
        "Program energy-saving schedules"
      ],
      verification: "Photo of installed smart thermostat with settings"
    },

    // Transport Tasks
    {
      id: 4,
      title: "Car-Free Week Challenge",
      category: "Transport",
      description: "Go one week without using a personal vehicle",
      points: 150,
      difficulty: "Hard",
      impact: "Save 20 lbs CO2, improve air quality",
      timeRequired: "1 week",
      icon: "🚲",
      instructions: [
        "Plan alternative transportation methods",
        "Use public transit, bike, walk, or carpool",
        "Track your daily transportation choices",
        "Document your experience"
      ],
      verification: "Daily log of transportation methods used"
    },
    {
      id: 5,
      title: "Optimize Driving Habits",
      category: "Transport",
      description: "Implement eco-driving techniques for one month",
      points: 75,
      difficulty: "Medium",
      impact: "Improve fuel efficiency by 15-20%",
      timeRequired: "1 month",
      icon: "🚗",
      instructions: [
        "Maintain steady speeds (avoid rapid acceleration)",
        "Keep tires properly inflated",
        "Remove excess weight from vehicle",
        "Combine errands into single trips"
      ],
      verification: "Before/after fuel efficiency comparison"
    },

    // Waste Tasks
    {
      id: 6,
      title: "Zero Waste Week",
      category: "Waste",
      description: "Produce no landfill waste for one week",
      points: 200,
      difficulty: "Hard",
      impact: "Divert 10+ lbs from landfill",
      timeRequired: "1 week",
      icon: "♻️",
      instructions: [
        "Audit current waste streams",
        "Set up composting system",
        "Bring reusable containers for shopping",
        "Repair instead of discarding items"
      ],
      verification: "Photo of empty trash bin at week's end"
    },
    {
      id: 7,
      title: "Start Composting",
      category: "Waste",
      description: "Set up a home composting system",
      points: 80,
      difficulty: "Medium",
      impact: "Divert 30% of household waste from landfill",
      timeRequired: "2 hours setup",
      icon: "🌱",
      instructions: [
        "Choose composting method (bin, tumbler, worm)",
        "Set up composting system",
        "Learn what can/cannot be composted",
        "Start collecting organic waste"
      ],
      verification: "Photo of composting setup with first materials"
    },

    // Nature Tasks
    {
      id: 8,
      title: "Plant Native Trees",
      category: "Nature",
      description: "Plant 3 native tree saplings in your area",
      points: 120,
      difficulty: "Medium",
      impact: "Sequester 50 lbs CO2/year per tree",
      timeRequired: "4 hours",
      icon: "🌳",
      instructions: [
        "Research native tree species for your region",
        "Obtain saplings from local nursery",
        "Choose appropriate planting locations",
        "Plant and establish watering schedule"
      ],
      verification: "Photos of planted trees with location tags"
    },
    {
      id: 9,
      title: "Create Pollinator Garden",
      category: "Nature",
      description: "Plant a 4x4 ft garden with native pollinator plants",
      points: 100,
      difficulty: "Medium",
      impact: "Support local bee and butterfly populations",
      timeRequired: "6 hours",
      icon: "🦋",
      instructions: [
        "Research native pollinator plants",
        "Prepare soil and garden bed",
        "Plant diverse flowering species",
        "Create water source for pollinators"
      ],
      verification: "Before/after photos of pollinator garden"
    },
    {
      id: 10,
      title: "Remove Invasive Species",
      category: "Nature",
      description: "Remove invasive plants from 100 sq ft area",
      points: 60,
      difficulty: "Medium",
      impact: "Restore native ecosystem balance",
      timeRequired: "3 hours",
      icon: "🌿",
      instructions: [
        "Identify invasive species in your area",
        "Learn proper removal techniques",
        "Remove invasive plants by roots",
        "Replant with native alternatives"
      ],
      verification: "Before/after photos of cleared area"
    },

    // Water Tasks
    {
      id: 11,
      title: "Install Rain Barrel",
      category: "Water",
      description: "Set up rainwater collection system",
      points: 90,
      difficulty: "Medium",
      impact: "Save 1,300 gallons water/year",
      timeRequired: "3 hours",
      icon: "🌧️",
      instructions: [
        "Purchase or build rain barrel",
        "Position under downspout",
        "Install spigot and overflow system",
        "Use collected water for garden"
      ],
      verification: "Photo of installed rain barrel system"
    },
    {
      id: 12,
      title: "Fix Water Leaks",
      category: "Water",
      description: "Identify and fix all water leaks in your home",
      points: 70,
      difficulty: "Medium",
      impact: "Save 10,000+ gallons/year",
      timeRequired: "2 hours",
      icon: "🔧",
      instructions: [
        "Check all faucets, toilets, and pipes",
        "Use food coloring to test toilet leaks",
        "Replace worn washers and seals",
        "Call plumber for major leaks"
      ],
      verification: "List of leaks found and fixed"
    },

    // Food Tasks
    {
      id: 13,
      title: "Meatless Month",
      category: "Food",
      description: "Eat no meat for 30 days",
      points: 180,
      difficulty: "Hard",
      impact: "Save 1,800 lbs CO2, 33,000 gallons water",
      timeRequired: "30 days",
      icon: "🥗",
      instructions: [
        "Plan plant-based meals and snacks",
        "Learn new vegetarian recipes",
        "Find plant-based protein sources",
        "Track your meals and energy levels"
      ],
      verification: "Weekly meal photos and reflection journal"
    },
    {
      id: 14,
      title: "Start Food Garden",
      category: "Food",
      description: "Grow 5 different vegetables or herbs",
      points: 110,
      difficulty: "Medium",
      impact: "Reduce food miles, improve nutrition",
      timeRequired: "Season-long",
      icon: "🥕",
      instructions: [
        "Choose appropriate vegetables for your climate",
        "Prepare soil and planting area",
        "Plant seeds or seedlings",
        "Maintain garden throughout growing season"
      ],
      verification: "Photos of garden progress and harvest"
    },

    // Community Tasks
    {
      id: 15,
      title: "Organize Neighborhood Cleanup",
      category: "Community",
      description: "Lead a community cleanup event with 10+ participants",
      points: 250,
      difficulty: "Hard",
      impact: "Remove 100+ lbs litter, inspire others",
      timeRequired: "8 hours planning + event",
      icon: "🧹",
      instructions: [
        "Choose cleanup location and get permits",
        "Recruit volunteers through social media",
        "Provide supplies (gloves, bags, grabbers)",
        "Document impact and celebrate success"
      ],
      verification: "Photos of event and waste collected"
    },
    {
      id: 16,
      title: "Teach Environmental Workshop",
      category: "Community",
      description: "Teach others about sustainability (min 5 people)",
      points: 200,
      difficulty: "Hard",
      impact: "Multiply your environmental impact",
      timeRequired: "4 hours prep + 2 hours teaching",
      icon: "👨‍🏫",
      instructions: [
        "Choose environmental topic you're passionate about",
        "Prepare presentation materials",
        "Find venue and recruit participants",
        "Deliver engaging and informative workshop"
      ],
      verification: "Photos of workshop and participant feedback"
    }
  ];

  const achievements = [
    { name: "Eco Warrior", requirement: "Complete 10 tasks", icon: "🏆", points: 500 },
    { name: "Energy Saver", requirement: "Complete all energy tasks", icon: "⚡", points: 300 },
    { name: "Nature Protector", requirement: "Complete all nature tasks", icon: "🌳", points: 400 },
    { name: "Community Leader", requirement: "Complete community tasks", icon: "👥", points: 600 },
    { name: "Zero Waste Hero", requirement: "Complete zero waste week", icon: "♻️", points: 200 }
  ];

  useEffect(() => {
    // Load completed tasks from localStorage
    const saved = localStorage.getItem('eco-tasks-completed');
    if (saved) {
      const completed = JSON.parse(saved);
      setCompletedTasks(completed);
      setUserPoints(completed.reduce((sum, taskId) => {
        const task = ecoTasks.find(t => t.id === taskId);
        return sum + (task ? task.points : 0);
      }, 0));
    }

    // Calculate user level based on points
    const level = Math.floor(userPoints / 500) + 1;
    setUserLevel(level);
  }, [userPoints]);

  const completeTask = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      const newCompleted = [...completedTasks, taskId];
      setCompletedTasks(newCompleted);
      localStorage.setItem('eco-tasks-completed', JSON.stringify(newCompleted));
      
      const task = ecoTasks.find(t => t.id === taskId);
      setUserPoints(prev => prev + task.points);
    }
  };

  const filteredTasks = selectedCategory === 'All' 
    ? ecoTasks 
    : ecoTasks.filter(task => task.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#f44336';
      default: return '#666';
    }
  };

  const getProgressToNextLevel = () => {
    const currentLevelPoints = (userLevel - 1) * 500;
    const nextLevelPoints = userLevel * 500;
    const progress = ((userPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>
          🌍 EcoSpire Tasks
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '15px' }}>
          Take action for the planet and earn points for your environmental impact
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
          🏆 Level {userLevel} • 🌟 {userPoints} Points • 🎯 {completedTasks.length} Tasks Completed
        </div>
      </div>

      {/* User Progress */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📊 Your Environmental Impact</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: '#e8f5e8', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2E7D32' }}>Level {userLevel}</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Eco Champion</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#fff3e0', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#F57C00' }}>{userPoints}</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Points</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#e3f2fd', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1976d2' }}>{completedTasks.length}</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Tasks Completed</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#f3e5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7B1FA2' }}>
              {Math.round(completedTasks.length * 2.5)}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>CO2 Tons Saved</div>
          </div>
        </div>

        {/* Progress to Next Level */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Progress to Level {userLevel + 1}</span>
            <span style={{ fontSize: '0.9rem' }}>{userPoints}/{userLevel * 500} points</span>
          </div>
          <div style={{ background: '#e0e0e0', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
            <div style={{
              background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
              height: '100%',
              width: `${getProgressToNextLevel()}%`,
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {taskCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: selectedCategory === category ? '#2E7D32' : '#f0f0f0',
                color: selectedCategory === category ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-2" style={{ marginBottom: '40px' }}>
        {filteredTasks.map(task => {
          const isCompleted = completedTasks.includes(task.id);
          return (
            <div key={task.id} className="card" style={{ 
              opacity: isCompleted ? 0.7 : 1,
              border: isCompleted ? '2px solid #4CAF50' : '1px solid #ddd'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ fontSize: '2.5rem', marginRight: '15px' }}>{task.icon}</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#2E7D32' }}>
                    {task.title}
                    {isCompleted && <span style={{ color: '#4CAF50', marginLeft: '10px' }}>✅</span>}
                  </h4>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.8rem',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: getDifficultyColor(task.difficulty),
                      color: 'white'
                    }}>
                      {task.difficulty}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#FF9800', fontWeight: 'bold' }}>
                      {task.points} points
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>
                      {task.timeRequired}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
                {task.description}
              </p>

              <div style={{ marginBottom: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '8px' }}>
                <strong style={{ color: '#2E7D32', fontSize: '0.9rem' }}>Environmental Impact:</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#555' }}>{task.impact}</p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#2E7D32', fontSize: '0.9rem' }}>How to Complete:</strong>
                <ol style={{ margin: '5px 0 0 0', paddingLeft: '20px', fontSize: '0.8rem' }}>
                  {task.instructions.map((instruction, index) => (
                    <li key={index} style={{ marginBottom: '2px' }}>{instruction}</li>
                  ))}
                </ol>
              </div>

              <div style={{ marginBottom: '15px', fontSize: '0.8rem', color: '#666' }}>
                <strong>Verification:</strong> {task.verification}
              </div>

              <button
                onClick={() => completeTask(task.id)}
                disabled={isCompleted}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: isCompleted ? '#4CAF50' : '#2E7D32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  cursor: isCompleted ? 'default' : 'pointer',
                  opacity: isCompleted ? 0.7 : 1
                }}
              >
                {isCompleted ? '✅ Completed' : '🎯 Mark as Complete'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Achievements */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #fff3e0 0%, #ffcc02 20%)' }}>
        <h3 style={{ color: '#F57C00', marginBottom: '20px', textAlign: 'center' }}>
          🏆 Achievements & Badges
        </h3>
        <div className="grid grid-5">
          {achievements.map((achievement, index) => {
            const isUnlocked = false; // Add logic to check if achievement is unlocked
            return (
              <div key={index} style={{
                textAlign: 'center',
                padding: '15px',
                background: isUnlocked ? '#4CAF50' : '#f0f0f0',
                borderRadius: '12px',
                opacity: isUnlocked ? 1 : 0.5
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{achievement.icon}</div>
                <h5 style={{ 
                  margin: '0 0 5px 0', 
                  color: isUnlocked ? 'white' : '#666',
                  fontSize: '0.9rem'
                }}>
                  {achievement.name}
                </h5>
                <div style={{ 
                  fontSize: '0.7rem', 
                  color: isUnlocked ? 'white' : '#999'
                }}>
                  {achievement.requirement}
                </div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: 'bold',
                  color: isUnlocked ? 'white' : '#F57C00',
                  marginTop: '5px'
                }}>
                  +{achievement.points} pts
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EcoTasks;