import React, { useState, useEffect } from 'react';
import { Clock, Search, AlertTriangle } from 'lucide-react';
import { environmentalKnowledgeBase, environmentalIndicators } from '../utils/environmentalKnowledgeBase';
import realTimeEnvironmentalData from '../utils/realTimeEnvironmentalData';


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
    // Advanced Climate Science Topics
    {
      id: 'climate-tipping-points',
      title: 'Climate Tipping Points and Cascading Effects',
      category: 'climate',
      icon: '🌡️',
      description: 'Understanding critical thresholds in Earth\'s climate system that could trigger irreversible changes, including Arctic ice loss, Amazon rainforest dieback, and permafrost thaw.',
      level: 'Advanced',
      duration: '25 min read',
      urgency: 'Critical',
      source: 'IPCC AR6 Working Group I Report 2023',
      impact: 'Could affect 3.3-3.6 billion people by 2050',
      content: `
        <h3>Climate Tipping Points: The Point of No Return</h3>
        <div class="fact-highlight">
          <strong>Critical Insight:</strong> Scientists have identified 16 major climate tipping points, with 5 already showing signs of activation as of 2023.
        </div>
        <div class="tipping-points-list">
          <h4>Currently Active Tipping Points:</h4>
          <ul>
            <li><strong>Arctic Sea Ice Loss:</strong> 13% decline per decade since 1979</li>
            <li><strong>Greenland Ice Sheet:</strong> Losing 280 billion tons annually</li>
            <li><strong>West Antarctic Ice Sheet:</strong> Irreversible retreat underway</li>
            <li><strong>Amazon Rainforest:</strong> 17% already lost, approaching 20-25% tipping point</li>
            <li><strong>Boreal Forest Shifts:</strong> Increased fire frequency and pest outbreaks</li>
          </ul>
        </div>
        <div class="cascading-effects">
          <h4>Cascading Effects:</h4>
          <p>When one tipping point is crossed, it can trigger others in a domino effect. For example, Arctic ice loss reduces albedo (reflectivity), causing more warming, which accelerates permafrost thaw, releasing methane and CO2, further accelerating warming.</p>
        </div>
      `,
      solutions: [
        {
          solution: 'Rapid Decarbonization',
          description: 'Achieve net-zero emissions by 2050 to limit warming to 1.5°C',
          potential: 'Could prevent 3-5 additional tipping points',
          timeline: '2024-2050',
          cost: '$130 trillion global investment',
          benefits: ['Avoided climate damages worth $23 trillion', 'Prevented displacement of 1 billion people']
        }
      ]
    },
    {
      id: 'ocean-acidification-crisis',
      title: 'Ocean Acidification: The Other CO2 Problem',
      category: 'climate',
      icon: '🌊',
      description: 'Exploring how increased atmospheric CO2 is making oceans 30% more acidic since pre-industrial times, threatening marine ecosystems and food security for 3 billion people.',
      level: 'Intermediate',
      duration: '18 min read',
      urgency: 'High',
      source: 'Nature Climate Change 2023',
      impact: 'Threatens $1 trillion marine economy',
      content: `
        <h3>Ocean Acidification: Silent Crisis Beneath the Waves</h3>
        <div class="fact-highlight">
          <strong>Alarming Trend:</strong> Ocean pH has dropped from 8.2 to 8.1 since 1750 - a 30% increase in acidity.
        </div>
        <div class="chemistry-section">
          <h4>The Chemistry:</h4>
          <p>When CO2 dissolves in seawater, it forms carbonic acid, lowering pH and reducing carbonate ions needed for shell and coral formation.</p>
          <ul>
            <li>Current rate: 100x faster than any natural change in 20 million years</li>
            <li>By 2100: pH could drop to 7.7 (150% more acidic than today)</li>
            <li>Carbonate saturation: Declining in 60% of ocean surface</li>
          </ul>
        </div>
        <div class="ecosystem-impacts">
          <h4>Ecosystem Impacts:</h4>
          <ul>
            <li><strong>Coral Reefs:</strong> 50% already bleached, 99% at risk by 2050</li>
            <li><strong>Shellfish:</strong> 25% decline in shell formation rates</li>
            <li><strong>Fish Behavior:</strong> Impaired navigation and predator detection</li>
            <li><strong>Food Web:</strong> Disruption of phytoplankton (ocean's base)</li>
          </ul>
        </div>
      `
    },
    {
      id: 'carbon-capture-technologies',
      title: 'Direct Air Capture and Carbon Removal Technologies',
      category: 'technology',
      icon: '🔬',
      description: 'Comprehensive analysis of emerging carbon removal technologies including DAC, BECCS, enhanced weathering, and blue carbon solutions with current deployment status and scalability potential.',
      level: 'Advanced',
      duration: '30 min read',
      urgency: 'High',
      source: 'IEA Carbon Capture Report 2023',
      impact: 'Could remove 1-10 Gt CO2/year by 2050',
      content: `
        <h3>Carbon Removal: Engineering Solutions for Climate Crisis</h3>
        <div class="technology-overview">
          <h4>Direct Air Capture (DAC) Technologies:</h4>
          <ul>
            <li><strong>Solid Sorbent DAC:</strong> Uses solid materials to capture CO2 from air</li>
            <li><strong>Liquid Solvent DAC:</strong> Chemical solutions absorb CO2</li>
            <li><strong>Current Capacity:</strong> 0.01 Mt CO2/year globally</li>
            <li><strong>Target by 2030:</strong> 85 Mt CO2/year needed</li>
            <li><strong>Cost:</strong> $150-600 per ton CO2 (decreasing rapidly)</li>
          </ul>
        </div>
        <div class="deployment-status">
          <h4>Current Deployments:</h4>
          <ul>
            <li><strong>Climeworks (Switzerland):</strong> 4,000 tons/year capacity</li>
            <li><strong>Carbon Engineering (Canada):</strong> 1 Mt/year plant planned</li>
            <li><strong>Global Thermostat (USA):</strong> Modular systems deployment</li>
            <li><strong>Heirloom Carbon (USA):</strong> Enhanced mineralization approach</li>
          </ul>
        </div>
      `
    },
    {
      id: 'biodiversity-genomics',
      title: 'Environmental DNA and Biodiversity Monitoring',
      category: 'biodiversity',
      icon: '🧬',
      description: 'Revolutionary eDNA techniques allowing scientists to detect species presence from water, soil, and air samples, transforming biodiversity assessment and conservation strategies.',
      level: 'Advanced',
      duration: '22 min read',
      urgency: 'Medium',
      source: 'Nature Ecology & Evolution 2023',
      impact: 'Could monitor 90% of species vs 20% traditional methods',
      content: `
        <h3>Environmental DNA: Reading Nature's Genetic Fingerprints</h3>
        <div class="edna-explanation">
          <strong>What is eDNA?</strong> Genetic material shed by organisms into their environment through skin cells, scales, feces, mucus, and other biological materials.
        </div>
        <div class="applications">
          <h4>Revolutionary Applications:</h4>
          <ul>
            <li><strong>Aquatic Monitoring:</strong> Detect fish, amphibians, and invertebrates from water samples</li>
            <li><strong>Soil Biodiversity:</strong> Identify microorganisms, fungi, and soil fauna</li>
            <li><strong>Airborne eDNA:</strong> Monitor flying insects, pollen, and spores</li>
            <li><strong>Invasive Species:</strong> Early detection before visual confirmation</li>
            <li><strong>Rare Species:</strong> Find endangered species without disturbance</li>
          </ul>
        </div>
        <div class="case-studies">
          <h4>Success Stories:</h4>
          <ul>
            <li><strong>Great Barrier Reef:</strong> eDNA detected 30% more fish species than visual surveys</li>
            <li><strong>Amazon River:</strong> Identified 2,500+ species from single water sample</li>
            <li><strong>Urban Biodiversity:</strong> NYC parks revealed 3x more species than expected</li>
          </ul>
        </div>
      `
    },
    {
      id: 'renewable-energy-storage',
      title: 'Next-Generation Energy Storage Solutions',
      category: 'renewable',
      icon: '🔋',
      description: 'Comprehensive overview of breakthrough energy storage technologies including solid-state batteries, liquid air storage, gravity systems, and green hydrogen production.',
      level: 'Intermediate',
      duration: '28 min read',
      urgency: 'High',
      source: 'International Renewable Energy Agency 2023',
      impact: 'Could enable 100% renewable grid by 2035',
      content: `
        <h3>Energy Storage: The Key to Renewable Revolution</h3>
        <div class="storage-technologies">
          <h4>Breakthrough Technologies:</h4>
          <ul>
            <li><strong>Solid-State Batteries:</strong> 2-10x energy density, 10x longer life</li>
            <li><strong>Liquid Air Energy Storage:</strong> 200+ MWh capacity, 30+ year lifespan</li>
            <li><strong>Gravity Storage:</strong> 80-90% efficiency, unlimited cycles</li>
            <li><strong>Green Hydrogen:</strong> Long-term storage, industrial applications</li>
            <li><strong>Compressed Air:</strong> Large-scale, low-cost solution</li>
          </ul>
        </div>
        <div class="market-data">
          <h4>Market Growth:</h4>
          <ul>
            <li><strong>Global Capacity:</strong> 191 GW in 2023, targeting 1,200 GW by 2030</li>
            <li><strong>Investment:</strong> $120 billion in 2023, $300 billion needed annually</li>
            <li><strong>Cost Decline:</strong> Battery costs down 85% since 2010</li>
            <li><strong>Deployment:</strong> China leads with 35 GW, US 8.8 GW</li>
          </ul>
        </div>
      `
    },
    {
      id: 'circular-economy-innovations',
      title: 'Circular Economy: Waste to Resource Innovations',
      category: 'pollution',
      icon: '♻️',
      description: 'Exploring cutting-edge circular economy solutions including chemical recycling, bio-based materials, industrial symbiosis, and zero-waste manufacturing processes.',
      level: 'Intermediate',
      duration: '24 min read',
      urgency: 'Medium',
      source: 'Ellen MacArthur Foundation 2023',
      impact: 'Could reduce waste by 80% and create $4.5 trillion value',
      content: `
        <h3>Circular Economy: Redesigning Our Relationship with Resources</h3>
        <div class="circular-principles">
          <h4>Core Principles:</h4>
          <ul>
            <li><strong>Design Out Waste:</strong> Products designed for disassembly and reuse</li>
            <li><strong>Keep Products in Use:</strong> Sharing, repair, refurbishment models</li>
            <li><strong>Regenerate Natural Systems:</strong> Return nutrients to biosphere</li>
          </ul>
        </div>
        <div class="innovations">
          <h4>Breakthrough Innovations:</h4>
          <ul>
            <li><strong>Chemical Recycling:</strong> Break plastics to molecular level for infinite recycling</li>
            <li><strong>Mycelium Materials:</strong> Mushroom-based leather and packaging</li>
            <li><strong>Algae Bioplastics:</strong> Marine-degradable alternatives</li>
            <li><strong>Industrial Symbiosis:</strong> Waste from one industry feeds another</li>
            <li><strong>Digital Product Passports:</strong> Track materials through lifecycle</li>
          </ul>
        </div>
        <div class="economic-impact">
          <h4>Economic Benefits:</h4>
          <ul>
            <li><strong>Material Savings:</strong> $1 trillion annually by 2025</li>
            <li><strong>Job Creation:</strong> 6 million new jobs in Europe alone</li>
            <li><strong>Reduced Emissions:</strong> 39% reduction in manufacturing emissions</li>
          </ul>
        </div>
      `
    },
    {
      id: 'nature-based-solutions',
      title: 'Nature-Based Solutions for Climate Adaptation',
      category: 'conservation',
      icon: '🌿',
      description: 'Comprehensive guide to ecosystem-based approaches for climate resilience including urban forests, wetland restoration, regenerative agriculture, and coastal protection.',
      level: 'Intermediate',
      duration: '26 min read',
      urgency: 'High',
      source: 'UNEP Nature-Based Solutions Report 2023',
      impact: 'Could provide 37% of climate mitigation needed',
      content: `
        <h3>Nature-Based Solutions: Working with Ecosystems for Climate Resilience</h3>
        <div class="solution-categories">
          <h4>Key Solution Types:</h4>
          <ul>
            <li><strong>Forest Restoration:</strong> 2 billion hectares available globally</li>
            <li><strong>Wetland Conservation:</strong> 3x more effective than forests for carbon storage</li>
            <li><strong>Regenerative Agriculture:</strong> Soil carbon sequestration potential</li>
            <li><strong>Urban Green Infrastructure:</strong> Reduce city temperatures by 2-8°C</li>
            <li><strong>Coastal Ecosystems:</strong> Mangroves, seagrass, salt marshes protection</li>
          </ul>
        </div>
        <div class="implementation-examples">
          <h4>Global Implementation Examples:</h4>
          <ul>
            <li><strong>China's Sponge Cities:</strong> 30 cities using natural water management</li>
            <li><strong>Netherlands Room for River:</strong> Flood management through ecosystem restoration</li>
            <li><strong>Costa Rica PES:</strong> Payment for ecosystem services program</li>
            <li><strong>New York Watershed:</strong> $1.5 billion saved through natural filtration</li>
          </ul>
        </div>
      `
    },
    {
      id: 'environmental-justice',
      title: 'Environmental Justice and Climate Equity',
      category: 'policy',
      icon: '⚖️',
      description: 'Understanding how environmental impacts disproportionately affect marginalized communities and exploring policy solutions for equitable climate action and environmental protection.',
      level: 'Advanced',
      duration: '32 min read',
      urgency: 'Critical',
      source: 'EPA Environmental Justice Report 2023',
      impact: 'Affects 40% of US population in disadvantaged communities',
      content: `
        <h3>Environmental Justice: Ensuring Equitable Environmental Protection</h3>
        <div class="justice-framework">
          <h4>Key Principles:</h4>
          <ul>
            <li><strong>Distributive Justice:</strong> Fair distribution of environmental benefits and burdens</li>
            <li><strong>Procedural Justice:</strong> Meaningful participation in environmental decisions</li>
            <li><strong>Recognition Justice:</strong> Acknowledging diverse values and ways of life</li>
            <li><strong>Corrective Justice:</strong> Addressing historical environmental harms</li>
          </ul>
        </div>
        <div class="disproportionate-impacts">
          <h4>Disproportionate Environmental Impacts:</h4>
          <ul>
            <li><strong>Air Pollution:</strong> Communities of color face 40% higher exposure</li>
            <li><strong>Climate Change:</strong> Low-income areas 5x more vulnerable to extreme heat</li>
            <li><strong>Toxic Facilities:</strong> 56% of residents near hazardous sites are people of color</li>
            <li><strong>Water Quality:</strong> 2 million Americans lack access to safe drinking water</li>
          </ul>
        </div>
        <div class="policy-solutions">
          <h4>Policy Solutions:</h4>
          <ul>
            <li><strong>Justice40 Initiative:</strong> 40% of climate investments to disadvantaged communities</li>
            <li><strong>Community-Led Monitoring:</strong> Resident-driven environmental data collection</li>
            <li><strong>Green Jobs Training:</strong> Workforce development in environmental sectors</li>
            <li><strong>Cumulative Impact Assessment:</strong> Consider multiple environmental stressors</li>
          </ul>
        </div>
      `
    },
    // Original topics from knowledge base
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
            style={{ 
              cursor: 'pointer', 
              transition: 'transform 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }} 
            onClick={() => setSelectedTopic(topic)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* Header Section - Fixed Height */}
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px', minHeight: '80px' }}>
              <div style={{ fontSize: '3rem', marginRight: '15px', lineHeight: '1' }}>{topic.icon}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#2E7D32', fontSize: '1.3rem', lineHeight: '1.2' }}>
                  {topic.title}
                </h3>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    background: getLevelColor(topic.level),
                    color: 'white',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}>
                    {topic.level}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#666', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    <Clock size={12} style={{ marginRight: '3px' }} />
                    {topic.duration}
                  </span>
                  {topic.urgency && (
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      background: getUrgencyColor(topic.urgency),
                      color: 'white',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap'
                    }}>
                      <AlertTriangle size={10} style={{ marginRight: '3px' }} />
                      {topic.urgency}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description Section - Fixed Height */}
            <div style={{ marginBottom: '15px', minHeight: '80px' }}>
              <p style={{ 
                color: '#666', 
                lineHeight: '1.5', 
                fontSize: '0.9rem',
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {topic.description}
              </p>
            </div>

            {/* Spacer to push footer to bottom */}
            <div style={{ flex: 1 }}></div>

            {/* Footer Section - Always at bottom */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <button className="btn btn-primary" style={{ flex: 1, fontSize: '0.85rem', padding: '8px 16px' }}>
                📖 Start Learning
              </button>
              {topic.source && (
                <div style={{ fontSize: '0.75rem', color: '#999', marginLeft: '10px', whiteSpace: 'nowrap' }}>
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
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2E7D32' }}>4.2M+</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Global Learners</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2E7D32' }}>195+</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Countries Reached</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2E7D32' }}>98.5%</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Accuracy Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Research Partnerships */}
      <div style={{ marginTop: '40px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
          <h3 style={{ color: '#1976d2', marginBottom: '20px', textAlign: 'center' }}>
            🔬 Research Partnerships & Data Sources
          </h3>
          <div className="grid grid-3">
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌍</div>
              <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>Climate Science</h4>
              <ul style={{ fontSize: '0.9rem', color: '#666', textAlign: 'left', listStyle: 'none', padding: 0 }}>
                <li>• IPCC AR6 Reports</li>
                <li>• NASA Climate Data</li>
                <li>• NOAA Global Monitoring</li>
                <li>• Met Office Hadley Centre</li>
              </ul>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🧬</div>
              <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>Biodiversity Research</h4>
              <ul style={{ fontSize: '0.9rem', color: '#666', textAlign: 'left', listStyle: 'none', padding: 0 }}>
                <li>• IUCN Red List</li>
                <li>• Global Biodiversity Facility</li>
                <li>• Living Planet Index</li>
                <li>• Convention on Biological Diversity</li>
              </ul>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚡</div>
              <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>Energy Technology</h4>
              <ul style={{ fontSize: '0.9rem', color: '#666', textAlign: 'left', listStyle: 'none', padding: 0 }}>
                <li>• International Energy Agency</li>
                <li>• IRENA Global Data</li>
                <li>• BloombergNEF</li>
                <li>• MIT Energy Initiative</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Environmental Breakthroughs */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: '#2E7D32', textAlign: 'center', marginBottom: '30px' }}>
          🚀 Latest Environmental Breakthroughs (2023-2024)
        </h3>
        <div className="grid grid-2">
          <div className="card" style={{ background: '#f8f9fa', borderLeft: '4px solid #2E7D32' }}>
            <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>🔬 Scientific Discoveries</h4>
            <ul style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
              <li><strong>Fusion Energy Milestone:</strong> National Ignition Facility achieved net energy gain (Dec 2022)</li>
              <li><strong>Carbon Capture Breakthrough:</strong> New MOF materials capture 90% more CO2</li>
              <li><strong>Ocean Cleanup Success:</strong> System 002 removed 100,000 kg of plastic from Pacific</li>
              <li><strong>Renewable Record:</strong> Solar efficiency reached 47.1% in lab conditions</li>
              <li><strong>Battery Innovation:</strong> Solid-state batteries achieve 1000+ cycle life</li>
            </ul>
          </div>
          <div className="card" style={{ background: '#f8f9fa', borderLeft: '4px solid #FF9800' }}>
            <h4 style={{ color: '#FF9800', marginBottom: '15px' }}>📈 Market Developments</h4>
            <ul style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
              <li><strong>Green Hydrogen Scale-up:</strong> Production costs dropped 50% in 2023</li>
              <li><strong>EV Adoption:</strong> 14% of global car sales now electric</li>
              <li><strong>Carbon Markets:</strong> Voluntary carbon credits reached $2B market</li>
              <li><strong>Renewable Investment:</strong> $1.8T invested globally in 2023</li>
              <li><strong>Climate Tech Funding:</strong> $70B raised by climate startups</li>
            </ul>
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
            <div key={index} className="card" style={{ 
              background: '#f8f9fa',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              <div style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '15px' }}>🏆</div>
              <h4 style={{ color: '#2E7D32', marginBottom: '10px', textAlign: 'center', minHeight: '50px', lineHeight: '1.2' }}>
                {story.title}
              </h4>
              <div style={{ 
                background: '#2E7D32', 
                color: 'white', 
                padding: '5px 10px', 
                borderRadius: '15px', 
                fontSize: '0.8rem', 
                textAlign: 'center',
                marginBottom: '15px',
                whiteSpace: 'nowrap'
              }}>
                📍 {story.location}
              </div>
              <div style={{ marginBottom: '15px', minHeight: '90px' }}>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#666', 
                  lineHeight: '1.4',
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {story.description}
                </p>
              </div>
              
              {/* Spacer to push achievement to bottom */}
              <div style={{ flex: 1 }}></div>
              
              <div style={{ 
                fontSize: '0.8rem', 
                color: '#2E7D32',
                marginTop: 'auto',
                padding: '10px',
                background: '#e8f5e8',
                borderRadius: '8px',
                borderLeft: '3px solid #2E7D32'
              }}>
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