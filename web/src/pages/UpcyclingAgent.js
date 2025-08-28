// FILE: src/pages/UpcyclingAgent.js

import React, { useState, useMemo } from 'react';
// Make sure this path is correct for your project structure
import { upcyclingDatabase } from '../utils/upcyclingData';

const UpcyclingAgent = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const findUpcyclingIdeas = () => {
    if (!selectedItem) return;
    const results = upcyclingDatabase[selectedItem]?.projects || [];
    setProjects(results);
    setSelectedProject(null);
    setDifficultyFilter('All');
  };
  
  const filteredProjects = useMemo(() => {
    if (difficultyFilter === 'All') {
      return projects;
    }
    return projects.filter(p => p.difficulty === difficultyFilter);
  }, [projects, difficultyFilter]);

  const itemOptions = Object.keys(upcyclingDatabase);
  const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard'];

  return (
    <div className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#2E7D32', marginBottom: '10px' }}>🔄 Upcycling Agent</h2>
        <p style={{ fontSize: '1.3rem', color: '#666' }}>Turn your trash into treasure with AI-powered creative ideas.</p>
      </div>
      <div className="card" style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)', border: '2px solid #f44336' }}>
        <h3 style={{ color: '#d32f2f' }}>🚨 The Throwaway Culture Crisis</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>We often discard items that seem "broken" or "old" because we lack the vision and guidance to see their hidden potential. This contributes to overflowing landfills and wastes valuable resources.</p>
      </div>
      <div className="card" style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)', border: '2px solid #4CAF50' }}>
        <h3 style={{ color: '#2E7D32' }}>💡 From Waste to Wonder</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Our Upcycling Agent is a creative wizard that provides personalized, step-by-step guides to transform your unwanted items into valuable new creations. Simply tell it what you have, and discover its potential.</p>
      </div>

      {/* Input Card */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>What item do you want to upcycle?</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} style={{ width: '100%', padding: '12px', fontSize: '1.1rem', borderRadius: '8px', border: '1px solid #ccc' }}>
            <option value="">Select an item...</option>
            {itemOptions.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
          <button onClick={findUpcyclingIdeas} disabled={!selectedItem} style={{ fontSize: '1rem', padding: '12px 24px', background: !selectedItem ? '#ccc' : 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: !selectedItem ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}>
            💡 Find Ideas
          </button>
        </div>
      </div>
      
      {/* Project Showcase & Workshop Area */}
      {projects.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', animation: 'fadeIn 0.5s' }}>
          
          <div className="card">
            <h3 style={{ color: '#2E7D32', marginBottom: '10px' }}>Project Ideas</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {difficultyOptions.map(level => (
                    <button key={level} onClick={() => setDifficultyFilter(level)} style={{
                        padding: '5px 15px', borderRadius: '15px', border: '2px solid',
                        borderColor: difficultyFilter === level ? '#4CAF50' : '#ddd',
                        background: difficultyFilter === level ? '#e8f5e9' : 'white',
                        fontWeight: 'bold', color: difficultyFilter === level ? '#2E7D32' : '#555'
                    }}>
                        {level}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '600px', overflowY: 'auto', paddingRight: '10px' }}>
              {filteredProjects.map(project => (
                <div key={project.id} onClick={async () => {
                  setSelectedProject(project);
                  
                  // Log activity when user views an upcycling project
                  try {
                    const { authManager } = await import('../utils/auth');
                    await authManager.logActivity('Upcycling project viewed', {
                      type: 'waste_reduction',
                      projectTitle: project.title,
                      itemType: selectedItem,
                      difficulty: project.difficulty,
                      co2Saved: project.environmentalImpact?.co2SavedKg || 0,
                      points: 10,
                      amount: project.environmentalImpact?.landfillDivertedKg || 1
                    });
                    console.log('✅ Upcycling project activity logged successfully');
                  } catch (error) {
                    console.warn('Failed to log upcycling activity:', error);
                  }
                }} style={{ padding: '15px', borderRadius: '12px', cursor: 'pointer', border: `2px solid ${selectedProject?.id === project.id ? '#4CAF50' : '#ddd'}`, background: selectedProject?.id === project.id ? '#e8f5e9' : 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{project.title}</h4>
                    <span style={{ padding: '4px 8px', fontSize: '0.8rem', borderRadius: '12px', background: project.difficulty === 'Easy' ? '#e8f5e9' : project.difficulty === 'Medium' ? '#fff3e0' : '#ffebee', color: project.difficulty === 'Easy' ? '#2E7D32' : project.difficulty === 'Medium' ? '#F57C00' : '#c62828' }}>
                      {project.difficulty}
                    </span>
                  </div>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '8px 0 0' }}>{project.description}</p>
                </div>
              ))}
              {filteredProjects.length === 0 && <p style={{color: '#666', textAlign: 'center'}}>No projects match this difficulty.</p>}
            </div>
          </div>

          <div className="card">
            {selectedProject ? (
              <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                <h3 style={{ color: '#2E7D32', marginBottom: '20px', fontSize: '1.5rem' }}>Guide: {selectedProject.title}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                  <div>
                    <h4 style={{ marginBottom: '10px' }}>📝 Materials</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                      {selectedProject.materials?.map((item, i) => <li key={i} style={{ padding: '8px', background: '#f5f5f5', borderRadius: '6px' }}>{item}</li>)}
                      {selectedProject.materials?.length === 0 && <li>None required</li>}
                    </ul>
                    <h4 style={{ marginBottom: '10px' }}>🔧 Tools</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedProject.tools?.map((tool, i) => <li key={i} style={{ padding: '8px', background: '#f5f5f5', borderRadius: '6px' }}>{tool}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '10px' }}>📋 Step-by-Step Instructions</h4>
                    <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {selectedProject.steps?.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                  </div>
                </div>
                <div style={{ marginTop: '30px', background: '#e8f5e9', padding: '20px', borderRadius: '12px' }}>
                    <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>🌎 Positive Environmental Impact</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1B5E20' }}>{selectedProject.environmentalImpact?.landfillDivertedKg} kg</div>
                            <p style={{color: '#388E3C'}}>Diverted from Landfill</p>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1B5E20' }}>{selectedProject.environmentalImpact?.co2SavedKg} kg</div>
                            <p style={{color: '#388E3C'}}>CO₂ Emissions Saved</p>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1B5E20' }}>{selectedProject.environmentalImpact?.waterSavedLiters} L</div>
                            <p style={{color: '#388E3C'}}>Water Saved</p>
                        </div>
                    </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>
                  ← Select a project on the left to see the full guide.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default UpcyclingAgent;