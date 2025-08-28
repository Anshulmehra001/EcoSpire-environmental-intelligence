import React, { useState, useEffect } from 'react';

function EcoTasks({ onActivityComplete }) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userLevel, setUserLevel] = useState(1);

  const taskCategories = ['All', 'Energy', 'Transport', 'Waste', 'Nature', 'Water', 'Food', 'Community'];



 const ecoTasks = [
  // --- Energy ---
  { id: 1, title: "Switch to LED Bulbs", category: "Energy", description: "Replace 5 incandescent bulbs with LED bulbs.", points: 50, difficulty: "Easy", impact: "Save ~75% on lighting energy.", icon: "💡", instructions: ["Identify incandescent bulbs.", "Purchase correct LED replacements.", "Replace bulbs safely when cool."], verification: "Photo of LED bulb package and installed bulbs." },
  { id: 2, title: "Unplug Energy Vampires", category: "Energy", description: "Unplug 10 devices on standby power when not in use.", points: 30, difficulty: "Easy", impact: "Reduce phantom load energy consumption.", icon: "🔌", instructions: ["Identify devices with standby lights.", "Unplug chargers, TVs, computers when not in use.", "Consider smart power strips."], verification: "List of 10 unplugged devices." },
  { id: 3, title: "Install Smart Thermostat", category: "Energy", description: "Install a programmable or smart thermostat.", points: 100, difficulty: "Medium", impact: "Save 10-15% on heating/cooling costs.", timeRequired: "2 hours", icon: "🌡️", instructions: ["Turn off power to HVAC.", "Remove old thermostat.", "Install new one following instructions.", "Program energy-saving schedules."], verification: "Photo of installed smart thermostat." },
  { id: 23, title: "Air-Dry Your Laundry", category: "Energy", description: "Skip the dryer and air-dry two full loads of laundry.", points: 45, difficulty: "Medium", impact: "Significantly reduce household energy use.", timeRequired: "Varies", icon: "☀️", instructions: ["Use a clothesline or indoor drying rack.", "Hang clothes with space between them for airflow."], verification: "Photo of your laundry air-drying." },
  { id: 27, title: "Conduct a Home Energy Audit", category: "Energy", description: "Perform a DIY energy audit to find and seal air leaks.", points: 95, difficulty: "Medium", impact: "Improve home energy efficiency by 5-10%.", timeRequired: "3 hours", icon: "🔍", instructions: ["Check for drafts around windows and doors.", "Use weatherstripping or caulk to seal leaks."], verification: "Photo of a sealed window or door draft." },
  { id: 31, title: "Switch to a Renewable Energy Provider", category: "Energy", description: "Change your home's electricity plan to one that sources from 100% renewable energy.", points: 160, difficulty: "Hard", impact: "Power your home with a zero-carbon energy source.", timeRequired: "1 hour research", icon: "☀️", instructions: ["Research renewable energy providers in your area.", "Contact your utility to switch your plan."], verification: "Screenshot of your new energy plan confirmation." },
  { id: 36, title: "Go Solar", category: "Energy", description: "Install solar panels on your home or subscribe to a community solar project.", points: 500, difficulty: "Hard", impact: "Generate your own clean energy.", timeRequired: "Varies", icon: "☀️", instructions: ["Get quotes from solar installers.", "Or, find and subscribe to a local community solar farm."], verification: "Photo of solar panels or community solar contract." },
  { id: 43, title: "Home Energy Retrofit", category: "Energy", description: "Perform a major energy retrofit on your home, like adding insulation.", points: 600, difficulty: "Hard", impact: "Reduce home energy consumption by 20-40%.", timeRequired: "Varies", icon: "🏡", instructions: ["Consult with a professional energy auditor.", "Add insulation to your attic or walls."], verification: "Photo of the completed retrofit project." },

  // --- Transport ---
  { id: 4, title: "Car-Free Week Challenge", category: "Transport", description: "Go one week without using a personal vehicle.", points: 150, difficulty: "Hard", impact: "Save 20 lbs CO2, improve air quality.", timeRequired: "1 week", icon: "🚲", instructions: ["Plan alternative transport methods.", "Use public transit, bike, walk, or carpool.", "Track your daily choices."], verification: "Daily log of transportation methods used." },
  { id: 5, title: "Optimize Driving Habits", category: "Transport", description: "Implement eco-driving techniques for one month.", points: 75, difficulty: "Medium", impact: "Improve fuel efficiency by 15-20%.", timeRequired: "1 month", icon: "🚗", instructions: ["Maintain steady speeds.", "Keep tires properly inflated.", "Remove excess weight from vehicle."], verification: "Before/after fuel efficiency comparison." },
  { id: 19, title: "Walk or Bike a Short Trip", category: "Transport", description: "Replace one short car trip (under 2 miles) with walking or biking.", points: 25, difficulty: "Easy", impact: "Reduce carbon emissions and improve health.", timeRequired: "Varies", icon: "🚶‍♀️", instructions: ["Identify a regular short trip you take by car.", "Plan your route for walking or biking.", "Complete the trip!"], verification: "Photo from your walk/bike destination." },
  { id: 28, title: "Use Public Transit for a Week", category: "Transport", description: "Commute using only public transportation for 5 consecutive days.", points: 130, difficulty: "Hard", impact: "Dramatically lower your weekly carbon footprint.", timeRequired: "1 week", icon: "🚌", instructions: ["Map out your commute using bus/train routes.", "Purchase a weekly pass.", "Log your trips."], verification: "Photo of your weekly transit pass." },
  { id: 38, title: "Long-Distance Trip by Train", category: "Transport", description: "Choose a train instead of flying for a trip over 500 miles.", points: 220, difficulty: "Hard", impact: "Reduce travel emissions by up to 90% vs flying.", timeRequired: "Varies", icon: "🚆", instructions: ["Book a train ticket for your next long-distance journey.", "Enjoy the scenic route!"], verification: "Photo of your train ticket." },
  { id: 44, title: "Adopt an Electric Vehicle", category: "Transport", description: "Make your next vehicle purchase an all-electric one.", points: 700, difficulty: "Hard", impact: "Eliminate tailpipe emissions entirely.", timeRequired: "Varies", icon: "⚡️", instructions: ["Research EV models that fit your needs.", "Test drive and make the switch."], verification: "Photo of you with your new EV." },

  // --- Waste ---
  { id: 6, title: "Zero Waste Week", category: "Waste", description: "Produce no landfill waste for one week.", points: 200, difficulty: "Hard", impact: "Divert 10+ lbs from landfill.", timeRequired: "1 week", icon: "♻️", instructions: ["Audit your waste.", "Set up composting.", "Bring reusable containers for shopping."], verification: "Photo of your empty trash bin at week's end." },
  { id: 7, title: "Start Composting", category: "Waste", description: "Set up a home composting system.", points: 80, difficulty: "Medium", impact: "Divert 30% of household waste from landfill.", timeRequired: "2 hours setup", icon: "🌱", instructions: ["Choose a composting method (bin, tumbler).", "Set up the system.", "Start collecting organic waste."], verification: "Photo of your composting setup." },
  { id: 17, title: "Reusable Water Bottle Week", category: "Waste", description: "Use only a reusable water bottle for an entire week.", points: 40, difficulty: "Easy", impact: "Prevent ~7 plastic bottles from waste streams.", timeRequired: "1 week", icon: "💧", instructions: ["Get a reusable bottle.", "Carry it with you everywhere.", "Refill from taps or fountains."], verification: "A photo of you using your bottle each day." },
  { id: 24, title: "DIY Household Cleaner", category: "Waste", description: "Make and use an all-purpose cleaner from vinegar and water.", points: 40, difficulty: "Medium", impact: "Reduce plastic waste and toxic chemicals.", timeRequired: "20 minutes", icon: "🧼", instructions: ["Mix equal parts white vinegar and water in a spray bottle.", "Add essential oils for scent if desired."], verification: "Photo of your DIY cleaner." },
  { id: 29, title: "Upcycle an Item", category: "Waste", description: "Use the Upcycling Agent to complete a project.", points: 70, difficulty: "Medium", impact: "Prevent waste and create something new.", timeRequired: "Varies", icon: "🔄", instructions: ["Select an item in the Upcycling Agent.", "Follow the guide to create a new product."], verification: "Before and after photos of your upcycled item." },
  { id: 33, title: "Reduce Your Plastic Waste by 50%", category: "Waste", description: "Track your plastic waste for a week, then reduce it by half the next week.", points: 170, difficulty: "Hard", impact: "Drastically cut your contribution to plastic pollution.", timeRequired: "2 weeks", icon: "🛍️", instructions: ["Collect and weigh all plastic waste for one week.", "Analyze sources and plan reductions.", "Implement your plan for the second week."], verification: "Photos comparing your waste from week 1 and week 2." },
  { id: 37, title: "Create a Large-Scale Compost System", category: "Waste", description: "Build a three-bin compost system for your community.", points: 300, difficulty: "Hard", impact: "Divert hundreds of pounds of organic waste.", icon: "🌱", instructions: ["Find plans online for a three-bin system.", "Source materials (pallets work great).", "Build the system in a community space."], verification: "Photo of the completed three-bin system." },
  { id: 46, title: "Become a Master Composter", category: "Waste", description: "Complete a certified Master Composter program.", points: 550, difficulty: "Hard", impact: "Become an expert and community leader.", timeRequired: "Varies", icon: "🎓", instructions: ["Find a local Master Composter program.", "Attend classes and complete volunteer hours."], verification: "Photo of your completion certificate." },
  { id: 48, title: "Zero-Waste Lifestyle for 3 Months", category: "Waste", description: "Fit all your landfill trash for 3 months into a single mason jar.", points: 900, difficulty: "Hard", impact: "Achieve an elite level of sustainable living.", timeRequired: "3 months", icon: "🌟", instructions: ["Adopt all zero-waste principles.", "Refuse, Reduce, Reuse, Recycle, Rot.", "Track your progress diligently."], verification: "Photo of your mason jar with 3 months of trash." },

  // --- Nature ---
  { id: 8, title: "Plant Native Trees", category: "Nature", description: "Plant 3 native tree saplings in your area.", points: 120, difficulty: "Medium", impact: "Sequester 50 lbs CO2/year per tree.", timeRequired: "4 hours", icon: "🌳", instructions: ["Research native trees for your region.", "Obtain saplings.", "Plant in appropriate locations and water regularly."], verification: "Photos of planted trees." },
  { id: 9, title: "Create Pollinator Garden", category: "Nature", description: "Plant a 4x4 ft garden with native pollinator plants.", points: 100, difficulty: "Medium", impact: "Support local bee and butterfly populations.", timeRequired: "6 hours", icon: "🦋", instructions: ["Research native pollinator plants.", "Prepare soil and garden bed.", "Plant diverse flowering species."], verification: "Before/after photos of pollinator garden." },
  { id: 10, title: "Remove Invasive Species", category: "Nature", description: "Remove invasive plants from 100 sq ft area.", points: 60, difficulty: "Medium", impact: "Restore native ecosystem balance.", timeRequired: "3 hours", icon: "🌿", instructions: ["Identify invasive species.", "Learn proper removal techniques.", "Remove plants by roots and dispose of them correctly."], verification: "Before/after photos of cleared area." },
  { id: 20, title: "Learn to Identify One Native Plant", category: "Nature", description: "Use a guide to identify one plant native to your region.", points: 20, difficulty: "Easy", impact: "Increase awareness of local biodiversity.", timeRequired: "30 minutes", icon: "🌸", instructions: ["Use a field guide or app like iNaturalist.", "Find a plant in your yard or a local park.", "Confirm its identity."], verification: "Screenshot from the app or a photo of the plant with its name." },
  { id: 25, title: "Build a Bee Hotel", category: "Nature", description: "Construct a simple shelter for native, solitary bees.", points: 85, difficulty: "Medium", impact: "Support crucial local pollinator populations.", timeRequired: "2 hours", icon: "🐝", instructions: ["Build a small wooden frame.", "Fill it with hollow reeds, bamboo, or drilled blocks of wood.", "Place it in a sunny, sheltered spot."], verification: "Photo of your completed bee hotel." },
  { id: 34, title: "Build a Rain Garden", category: "Nature", description: "Create a small rain garden to manage stormwater runoff.", points: 140, difficulty: "Hard", impact: "Prevent runoff pollution and recharge groundwater.", timeRequired: "1 weekend", icon: "🏞️", instructions: ["Choose a low-lying area in your yard.", "Dig a shallow basin.", "Fill with a mix of sand, compost, and soil.", "Plant with water-loving native plants."], verification: "Photo of your completed rain garden." },
  { id: 39, title: "Certify Your Yard as a Wildlife Habitat", category: "Nature", description: "Certify your yard with a local or national wildlife federation.", points: 280, difficulty: "Hard", impact: "Create a permanent, protected space for wildlife.", timeRequired: "Varies", icon: "🏅", instructions: ["Provide food, water, cover, and places for wildlife to raise young.", "Apply for certification through an organization like the National Wildlife Federation."], verification: "Photo of your certification plaque or certificate." },
  { id: 47, title: "Restore a Local Waterway", category: "Nature", description: "Lead a project to restore a 100-foot section of a local stream.", points: 750, difficulty: "Hard", impact: "Visibly improve the health of a local ecosystem.", timeRequired: "Varies", icon: "🏞️", instructions: ["Partner with a local conservation group.", "Organize volunteers to remove trash and invasive species.", "Plant native riparian vegetation."], verification: "Before and after photos of the restored stream bank." },
  
  // --- Water ---
  { id: 11, title: "Install Rain Barrel", category: "Water", description: "Set up a rainwater collection system.", points: 90, difficulty: "Medium", impact: "Save 1,300 gallons water/year.", timeRequired: "3 hours", icon: "🌧️", instructions: ["Purchase or build rain barrel.", "Position under downspout.", "Install spigot and overflow system."], verification: "Photo of installed rain barrel." },
  { id: 12, title: "Fix Water Leaks", category: "Water", description: "Identify and fix all water leaks in your home.", points: 70, difficulty: "Medium", impact: "Save 10,000+ gallons/year.", timeRequired: "2 hours", icon: "🔧", instructions: ["Check all faucets, toilets, and pipes.", "Use food coloring to test toilet leaks.", "Replace worn washers and seals."], verification: "List of leaks found and fixed." },
  { id: 18, title: "Shorter Showers", category: "Water", description: "Keep your showers under 5 minutes for a full week.", points: 35, difficulty: "Easy", impact: "Save 10-25 gallons of water per shower.", timeRequired: "1 week", icon: "🚿", instructions: ["Use a timer.", "Turn off water while lathering.", "Track your success daily."], verification: "Screenshot of your timer or daily log." },
  { id: 32, title: "Install Low-Flow Fixtures", category: "Water", description: "Replace your shower head and two faucets with low-flow models.", points: 110, difficulty: "Medium", impact: "Reduce water consumption by 30% or more.", timeRequired: "2 hours", icon: "💧", instructions: ["Purchase WaterSense-certified fixtures.", "Follow installation instructions for each fixture."], verification: "Photos of the new fixtures installed." },
  { id: 41, title: "Install a Greywater System", category: "Water", description: "Install a system to recycle water from your laundry to your garden.", points: 350, difficulty: "Hard", impact: "Reuse thousands of gallons of water each year.", timeRequired: "1 weekend", icon: "🔄", instructions: ["Research local regulations for greywater systems.", "Choose a system (simple or complex).", "Install according to instructions."], verification: "Photo of the installed greywater diversion system." },
  { id: 50, title: "Create a Water Conservation Plan for Your Community", category: "Water", description: "Research and present a water-saving plan to your local council.", points: 1000, difficulty: "Hard", impact: "Potentially save millions of gallons of water.", timeRequired: "Varies", icon: "🌊", instructions: ["Analyze local water usage.", "Research conservation strategies (e.g., xeriscaping).", "Prepare and present a formal proposal."], verification: "Copy of your presentation or proposal." },

  // --- Food ---
  { id: 13, title: "Meatless Month", category: "Food", description: "Eat no meat for 30 days.", points: 180, difficulty: "Hard", impact: "Save 1,800 lbs CO2, 33,000 gallons water.", timeRequired: "30 days", icon: "🥗", instructions: ["Plan plant-based meals.", "Learn new vegetarian recipes.", "Find plant-based protein sources."], verification: "Weekly meal photos and reflection journal." },
  { id: 14, title: "Start Food Garden", category: "Food", description: "Grow 5 different vegetables or herbs.", points: 110, difficulty: "Medium", impact: "Reduce food miles, improve nutrition.", timeRequired: "Season-long", icon: "🥕", instructions: ["Choose appropriate vegetables for your climate.", "Prepare soil and planting area.", "Plant and maintain garden."], verification: "Photos of garden progress and harvest." },
  { id: 21, title: "Eat Leftovers for a Meal", category: "Food", description: "Eat leftovers to prevent food waste.", points: 20, difficulty: "Easy", impact: "Reduce methane from food in landfills.", timeRequired: "1 meal", icon: "🍲", instructions: ["Check your fridge for leftovers before cooking.", "Creatively combine leftovers into a new meal."], verification: "Photo of your leftover meal." },
  { id: 26, title: "Cook a Zero-Waste Meal", category: "Food", description: "Cook a meal where no part of the ingredients is thrown away.", points: 65, difficulty: "Medium", impact: "Maximize food use and reduce waste.", timeRequired: "1 meal", icon: "🥕", instructions: ["Choose vegetables where you can use all parts (e.g., beet greens, broccoli stems).", "Use scraps to make a broth.", "Compost any remaining organic material."], verification: "Photo of your meal and the lack of food waste." },
  { id: 40, title: "One Year of Local Eating", category: "Food", description: "Source 50% of your food from local farms for a year.", points: 450, difficulty: "Hard", impact: "Support local agriculture and reduce food miles.", timeRequired: "1 year", icon: "🧑‍🌾", instructions: ["Join a CSA (Community Supported Agriculture).", "Shop regularly at farmers' markets.", "Track your food sources."], verification: "Photos from your local farm or market trips throughout the year." },

  // --- Community ---
  { id: 15, title: "Organize Neighborhood Cleanup", category: "Community", description: "Lead a cleanup event with 10+ participants.", points: 250, difficulty: "Hard", impact: "Remove 100+ lbs litter, inspire others.", timeRequired: "8 hours planning + event", icon: "🧹", instructions: ["Choose a location and get permits.", "Recruit volunteers.", "Provide supplies.", "Document the impact."], verification: "Photos of event and waste collected." },
  { id: 16, title: "Teach Environmental Workshop", category: "Community", description: "Teach others about sustainability (min 5 people).", points: 200, difficulty: "Hard", impact: "Multiply your environmental impact.", timeRequired: "4 hours prep + 2 hours teaching", icon: "👨‍🏫", instructions: ["Choose a topic.", "Prepare materials.", "Find a venue and recruit participants.", "Deliver an engaging workshop."], verification: "Photos of workshop and participant feedback." },
  { id: 22, "title": "Share an Eco-Tip", "category": "Community", "description": "Share a useful sustainability tip with a friend or online.", points: 15, "difficulty": "Easy", "impact": "Spread awareness and inspire others.", "timeRequired": "5 minutes", "icon": "📢", "instructions": ["Think of a cool eco-fact or tip.", "Share it in a conversation or post it online."], "verification": "Screenshot of your post or a note about your conversation." },
  { id: 30, title: "Volunteer for a Conservation Org", category: "Community", description: "Volunteer for at least 4 hours with a local conservation group.", points: 140, difficulty: "Hard", impact: "Directly contribute to local conservation efforts.", timeRequired: "4 hours", icon: "🤝", instructions: ["Find a local group (e.g., parks department, watershed council).", "Sign up and attend a volunteer event."], verification: "Photo of you at the volunteer event." },
  { id: 35, title: "Advocate for a Local Green Initiative", category: "Community", description: "Write a letter or attend a council meeting to support an environmental policy.", points: 190, difficulty: "Hard", impact: "Use your voice to create large-scale change.", timeRequired: "3 hours", icon: "🏛️", instructions: ["Research local environmental issues.", "Write a formal letter to a representative.", "Or, prepare a short speech for a public meeting."], verification: "Copy of the letter you sent or a photo from the meeting." },
  { id: 42, title: "Mentor an Eco-Newbie", category: "Community", description: "Mentor a friend for one month, helping them complete 5 easy tasks.", points: 260, difficulty: "Hard", impact: "Create a lasting legacy of environmental action.", timeRequired: "1 month", icon: "🧑‍🤝‍🧑", instructions: ["Choose a willing friend or family member.", "Guide them through 5 easy-level tasks.", "Be a source of encouragement and information."], verification: "A short journal of your mentorship experience." },
  { id: 45, title: "Start a Community Garden", category: "Community", description: "Organize and start a new community garden.", points: 800, difficulty: "Hard", impact: "Provide local food and build community.", timeRequired: "Varies", icon: "🥕", instructions: ["Find a suitable plot of land.", "Get permission and organize a group of interested people.", "Prepare the soil and plots together."], verification: "Photos of the community garden's creation and first planting." },
  { id: 49, title: "Host a Documentary Screening", category: "Community", description: "Host a screening of an environmental documentary for your community.", points: 320, difficulty: "Hard", impact: "Educate and engage a wide audience.", timeRequired: "4 hours", icon: "🎬", instructions: ["Choose a powerful documentary.", "Find a venue (library, community center).", "Promote the event and host a post-film discussion."], verification: "Photos from the screening event." }
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

  const completeTask = async (taskId) => {
    if (!completedTasks.includes(taskId)) {
      const newCompleted = [...completedTasks, taskId];
      setCompletedTasks(newCompleted);
      localStorage.setItem('eco-tasks-completed', JSON.stringify(newCompleted));
      
      const task = ecoTasks.find(t => t.id === taskId);
      setUserPoints(prev => prev + task.points);

      // Log activity for environmental impact tracking
      try {
        const { authManager } = await import('../utils/auth');
        
        // Determine activity type based on task category and impact
        let activityType = 'general';
        let amount = 1;
        
        // Check for tree planting specifically
        if (task.title.toLowerCase().includes('tree') || task.title.toLowerCase().includes('plant')) {
          activityType = 'tree_planted';
          // Extract number of trees from title or default to number in task
          const treeMatch = task.title.match(/(\d+)/);
          amount = treeMatch ? parseInt(treeMatch[1]) : (task.title.includes('Plant Native Trees') ? 3 : 1);
          console.log('🌳 Tree planting task detected:', task.title, 'Amount:', amount, 'Type:', activityType);
        } else if (task.category === 'Energy' || task.impact.includes('CO2') || task.impact.includes('carbon')) {
          activityType = 'carbon_reduction';
          // Extract CO2 savings from impact text if available
          const co2Match = task.impact.match(/(\d+(?:,\d+)*)\s*(?:lbs?|kg)\s*CO2/i);
          amount = co2Match ? parseInt(co2Match[1].replace(',', '')) / 2.2 : 5; // Convert lbs to kg, default 5kg
        } else if (task.category === 'Water' || task.impact.includes('water') || task.impact.includes('gallons')) {
          activityType = 'water_test'; // Use water_test for water-related activities
          const waterMatch = task.impact.match(/(\d+(?:,\d+)*)\s*gallons/i);
          amount = waterMatch ? Math.ceil(parseInt(waterMatch[1].replace(',', '')) / 1000) : 1; // Convert to water tests equivalent
        } else if (task.category === 'Waste' || task.impact.includes('waste') || task.impact.includes('recycle')) {
          activityType = 'waste_reduction';
          const wasteMatch = task.impact.match(/(\d+(?:,\d+)*)\s*(?:lbs?|kg)/i);
          amount = wasteMatch ? parseInt(wasteMatch[1].replace(',', '')) / 2.2 : 2; // Convert lbs to kg, default 2kg
        } else if (task.category === 'Nature' || task.impact.includes('species') || task.impact.includes('biodiversity')) {
          activityType = 'biodiversity_scan';
          amount = 1; // Each nature task counts as one biodiversity scan
        }

        await authManager.logActivity(`EcoTask completed: ${task.title}`, {
          type: activityType,
          taskCategory: task.category,
          taskDifficulty: task.difficulty,
          taskTitle: task.title,
          points: task.points,
          amount: amount
        });
        
        console.log('✅ EcoTask completion logged successfully:', task.title);
        console.log('📊 Activity details:', { type: activityType, amount, points: task.points });
        
        // Notify parent component to refresh stats
        if (onActivityComplete) {
          console.log('🔄 Calling onActivityComplete callback...');
          onActivityComplete({
            type: activityType,
            amount: amount,
            points: task.points,
            description: `EcoTask completed: ${task.title}`
          });
        } else {
          console.warn('⚠️ onActivityComplete callback not provided');
        }
      } catch (error) {
        console.warn('Failed to log EcoTask completion:', error);
      }
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

// Add this new function inside your EcoTasks component

const checkAchievementUnlocked = (achievement) => {
  const energyTasks = ecoTasks.filter(t => t.category === 'Energy');
  const natureTasks = ecoTasks.filter(t => t.category === 'Nature');
  const communityTasks = ecoTasks.filter(t => t.category === 'Community');

  switch (achievement.name) {
    case "Eco Warrior":
      return completedTasks.length >= 10;
    case "Energy Saver":
      return energyTasks.every(task => completedTasks.includes(task.id));
    case "Nature Protector":
      return natureTasks.every(task => completedTasks.includes(task.id));
    case "Community Leader":
      return communityTasks.every(task => completedTasks.includes(task.id));
    case "Zero Waste Hero":
      // Assuming task ID 6 is "Zero Waste Week"
      return completedTasks.includes(6);
    default:
      return false;
  }
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
      <div className="grid grid-3" style={{ 
        marginBottom: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        alignItems: 'stretch'
      }}>
        {filteredTasks.map(task => {
          const isCompleted = completedTasks.includes(task.id);
          return (
            <div key={task.id} className="card" style={{ 
              opacity: isCompleted ? 0.7 : 1,
              border: isCompleted ? '2px solid #4CAF50' : '1px solid #ddd',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
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

              <div style={{ flex: 1 }}></div>

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
            const isUnlocked = checkAchievementUnlocked(achievement);
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