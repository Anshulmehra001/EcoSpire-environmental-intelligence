// Comprehensive Environmental Startups and Innovation Database
export const environmentalStartupsDatabase = {
  // Climate Tech Startups
  climateTech: [
    {
      name: "Climeworks",
      founded: 2009,
      location: "Zurich, Switzerland",
      category: "Direct Air Capture",
      description: "World's largest direct air capture company removing CO₂ from atmosphere",
      funding: "$650M Series E (2022)",
      valuation: "$1.65B",
      technology: "Solid sorbent DAC technology with permanent storage",
      impact: "4,000 tons CO₂ removed annually, scaling to Mt scale",
      customers: ["Microsoft", "Shopify", "Swiss Re", "Audi"],
      milestones: [
        "2022: Opened world's largest DAC plant (Orca)",
        "2021: $10M from Stripe for carbon removal",
        "2020: First commercial DAC plant operational"
      ],
      challenges: ["High costs ($600-1000/ton)", "Energy requirements", "Scale-up complexity"],
      opportunities: ["Growing carbon credit market", "Corporate net-zero commitments", "Government support"]
    },
    {
      name: "Commonwealth Fusion Systems",
      founded: 2018,
      location: "Cambridge, MA, USA",
      category: "Fusion Energy",
      description: "Developing commercial fusion power using high-temperature superconductors",
      funding: "$1.8B Series B (2021)",
      valuation: "$1.8B",
      technology: "SPARC tokamak reactor with REBCO superconducting magnets",
      impact: "Could provide unlimited clean energy by 2030s",
      customers: ["Utility companies", "Industrial energy users"],
      milestones: [
        "2021: Demonstrated world-record magnetic field",
        "2020: Raised largest private fusion funding round",
        "2025: SPARC demonstration planned"
      ],
      challenges: ["Technical complexity", "Regulatory approval", "Competition from renewables"],
      opportunities: ["Baseload clean energy", "Industrial heat applications", "Grid stability"]
    },
    {
      name: "Northvolt",
      founded: 2016,
      location: "Stockholm, Sweden",
      category: "Battery Technology",
      description: "European battery manufacturer focused on sustainable production",
      funding: "$2.75B Series E (2021)",
      valuation: "$12B",
      technology: "Lithium-ion batteries with 50% recycled materials",
      impact: "150 GWh annual capacity by 2030, 50% lower carbon footprint",
      customers: ["BMW", "Volvo", "Polestar", "Fluence"],
      milestones: [
        "2021: First battery cell produced in Europe",
        "2020: $14B in customer orders secured",
        "2022: Opened recycling facility"
      ],
      challenges: ["Asian competition", "Raw material supply", "Manufacturing scale-up"],
      opportunities: ["EU battery regulations", "EV market growth", "Energy storage demand"]
    }
  ],

  // Clean Energy Startups
  cleanEnergy: [
    {
      name: "Form Energy",
      founded: 2017,
      location: "Somerville, MA, USA",
      category: "Energy Storage",
      description: "Iron-air batteries for 100-hour grid-scale energy storage",
      funding: "$240M Series D (2021)",
      valuation: "$2.6B",
      technology: "Iron-air battery technology for multi-day storage",
      impact: "$20/kWh storage cost, enabling 100% renewable grids",
      customers: ["Great River Energy", "Georgia Power", "Xcel Energy"],
      milestones: [
        "2021: First commercial project announced (Minnesota)",
        "2020: Demonstrated 150-hour discharge",
        "2022: Manufacturing facility groundbreaking"
      ],
      challenges: ["Manufacturing scale-up", "Technology validation", "Market competition"],
      opportunities: ["Grid modernization", "Renewable integration", "Utility partnerships"]
    },
    {
      name: "Helion Energy",
      founded: 2013,
      location: "Everett, WA, USA",
      category: "Fusion Energy",
      description: "Developing fusion power using pulsed non-ignition approach",
      funding: "$500M Series A (2021)",
      valuation: "$3B",
      technology: "Polaris fusion generator with helium-3 fuel cycle",
      impact: "50MW power plant by 2028, electricity at $0.01/kWh",
      customers: ["Microsoft (2028 power purchase agreement)"],
      milestones: [
        "2021: Microsoft partnership announced",
        "2020: 7th generation prototype completed",
        "2024: Polaris demonstration planned"
      ],
      challenges: ["Technical milestones", "Regulatory approval", "Fuel supply"],
      opportunities: ["Corporate clean energy demand", "Grid decarbonization", "Industrial applications"]
    }
  ],

  // Circular Economy Startups
  circularEconomy: [
    {
      name: "Redwood Materials",
      founded: 2017,
      location: "Carson City, NV, USA",
      category: "Battery Recycling",
      description: "Battery recycling and materials production for circular supply chains",
      funding: "$792M Series C (2022)",
      valuation: "$3.7B",
      technology: "Hydrometallurgical recycling producing battery-grade materials",
      impact: "95% material recovery, 1 TWh recycling capacity by 2030",
      customers: ["Tesla", "Panasonic", "Ford", "Volvo"],
      milestones: [
        "2022: Announced $3.5B Nevada expansion",
        "2021: Started commercial cathode production",
        "2020: Processed 6 GWh of batteries"
      ],
      challenges: ["Battery collection logistics", "Technology scaling", "Market volatility"],
      opportunities: ["EV battery waste growth", "Supply chain security", "Regulatory support"]
    },
    {
      name: "Samsara Eco",
      founded: 2021,
      location: "Canberra, Australia",
      category: "Plastic Recycling",
      description: "Infinite plastic recycling using enzymatic depolymerization",
      funding: "$54M Series A (2022)",
      valuation: "$200M",
      technology: "Proprietary enzymes breaking down PET to virgin-quality materials",
      impact: "100% recyclable plastics, 70% lower emissions vs virgin production",
      customers: ["Lululemon", "Woolworths", "Pact Group"],
      milestones: [
        "2022: Commercial demonstration plant opened",
        "2021: Lululemon partnership announced",
        "2023: First commercial facility planned"
      ],
      challenges: ["Enzyme production scaling", "Feedstock collection", "Cost competitiveness"],
      opportunities: ["Plastic waste regulations", "Brand sustainability commitments", "Circular economy policies"]
    }
  ],

  // AgTech and Food Startups
  agTech: [
    {
      name: "Impossible Foods",
      founded: 2011,
      location: "Redwood City, CA, USA",
      category: "Alternative Protein",
      description: "Plant-based meat using heme protein for authentic taste and texture",
      funding: "$500M Series F (2020)",
      valuation: "$7B",
      technology: "Genetically engineered heme protein in plant-based meat",
      impact: "87% less water, 96% less land, 89% fewer emissions vs beef",
      customers: ["Burger King", "Starbucks", "Disney", "White Castle"],
      milestones: [
        "2019: Impossible Whopper nationwide launch",
        "2020: Retail launch in grocery stores",
        "2021: Expanded to Asia-Pacific markets"
      ],
      challenges: ["Consumer acceptance", "Price parity", "Regulatory approvals"],
      opportunities: ["Growing flexitarian market", "Climate concerns", "Health consciousness"]
    },
    {
      name: "Plenty",
      founded: 2014,
      location: "South San Francisco, CA, USA",
      category: "Vertical Farming",
      description: "Indoor vertical farms using AI and robotics for sustainable agriculture",
      funding: "$400M Series E (2021)",
      valuation: "$2.8B",
      technology: "LED lighting, AI optimization, robotic harvesting",
      impact: "95% less water, 99% less land, 365-day growing season",
      customers: ["Albertsons", "Whole Foods", "Good Eggs"],
      milestones: [
        "2021: Compton farm opened (world's most advanced)",
        "2020: $200M SoftBank investment",
        "2022: Virginia farm construction started"
      ],
      challenges: ["High capital costs", "Energy consumption", "Crop variety limitations"],
      opportunities: ["Food security concerns", "Climate resilience", "Urban agriculture demand"]
    }
  ],

  // Water Technology Startups
  waterTech: [
    {
      name: "Zero Mass Water (SOURCE)",
      founded: 2014,
      location: "Scottsdale, AZ, USA",
      category: "Atmospheric Water Generation",
      description: "Solar-powered devices that extract drinking water from air",
      funding: "$150M Series C (2018)",
      valuation: "$1B",
      technology: "Solar-powered atmospheric water generation with mineralization",
      impact: "Perfect water quality, zero waste, renewable energy powered",
      customers: ["Governments", "Resorts", "Schools", "Hospitals"],
      milestones: [
        "2018: Deployed in 45 countries",
        "2019: Partnership with Duke Energy",
        "2020: COVID-19 response installations"
      ],
      challenges: ["High upfront costs", "Humidity requirements", "Maintenance needs"],
      opportunities: ["Water scarcity crisis", "Climate resilience", "Off-grid applications"]
    },
    {
      name: "Gradiant",
      founded: 2013,
      location: "Boston, MA, USA",
      category: "Water Treatment",
      description: "Advanced water treatment for industrial and municipal applications",
      funding: "$228M Series D (2021)",
      valuation: "$1B",
      technology: "Carrier gas extraction and other advanced treatment technologies",
      impact: "90% water recovery, 50% energy reduction vs conventional methods",
      customers: ["Coca-Cola", "BMW", "Aramco", "Unilever"],
      milestones: [
        "2021: Unicorn valuation achieved",
        "2020: 100+ installations globally",
        "2019: Warburg Pincus investment"
      ],
      challenges: ["Technology complexity", "Market education", "Competition"],
      opportunities: ["Water stress increase", "Regulatory tightening", "Industrial growth"]
    }
  ],

  // Carbon Management Startups
  carbonManagement: [
    {
      name: "Charm Industrial",
      founded: 2018,
      location: "San Francisco, CA, USA",
      category: "Carbon Removal",
      description: "Biomass to bio-oil carbon removal and storage",
      funding: "$50M Series A (2022)",
      valuation: "$300M",
      technology: "Fast pyrolysis converting biomass to stable bio-oil for injection",
      impact: "$600/ton carbon removal, permanent storage for 1000+ years",
      customers: ["Stripe", "Shopify", "Microsoft", "Alphabet"],
      milestones: [
        "2021: First commercial carbon removal deliveries",
        "2020: Stripe Climate first purchase",
        "2022: Kansas facility operational"
      ],
      challenges: ["Biomass supply chains", "Injection site permitting", "Cost reduction"],
      opportunities: ["Carbon credit market growth", "Corporate commitments", "Policy support"]
    },
    {
      name: "Running Tide",
      founded: 2017,
      location: "Portland, ME, USA",
      category: "Ocean Carbon Removal",
      description: "Ocean-based carbon removal using kelp and alkalinity enhancement",
      funding: "$8M Seed (2021)",
      valuation: "$50M",
      technology: "Kelp cultivation and ocean alkalinity enhancement",
      impact: "Gigatons of CO₂ removal potential, ocean ecosystem benefits",
      customers: ["Stripe", "Shopify", "Frontier Fund"],
      milestones: [
        "2021: First ocean deployments",
        "2020: Stripe Climate partnership",
        "2022: Large-scale trials initiated"
      ],
      challenges: ["Environmental impact assessment", "Measurement verification", "Regulatory approval"],
      opportunities: ["Ocean-based solutions scaling", "Blue economy growth", "Climate urgency"]
    }
  ],

  // Biodiversity and Conservation Tech
  biodiversityTech: [
    {
      name: "Pachama",
      founded: 2018,
      location: "San Francisco, CA, USA",
      category: "Forest Monitoring",
      description: "AI and satellite monitoring for forest carbon projects",
      funding: "$55M Series B (2021)",
      valuation: "$400M",
      technology: "Machine learning analysis of satellite imagery for forest monitoring",
      impact: "Verified 50+ million tons CO₂ in forest projects",
      customers: ["Nori", "Verra", "Gold Standard", "Forest project developers"],
      milestones: [
        "2021: Series B led by Lowercarbon Capital",
        "2020: Partnership with Verra registry",
        "2022: Expanded to 20+ countries"
      ],
      challenges: ["Satellite data accuracy", "Ground truth validation", "Market standardization"],
      opportunities: ["Carbon credit market growth", "REDD+ programs", "Corporate forest investments"]
    },
    {
      name: "Wildlife.ai",
      founded: 2019,
      location: "London, UK",
      category: "Wildlife Conservation",
      description: "AI-powered wildlife monitoring and anti-poaching technology",
      funding: "$3M Seed (2021)",
      valuation: "$15M",
      technology: "Computer vision and edge AI for real-time wildlife detection",
      impact: "90% reduction in poaching incidents, 24/7 monitoring coverage",
      customers: ["WWF", "African Parks", "Government agencies"],
      milestones: [
        "2021: Deployed in 10 African reserves",
        "2020: First anti-poaching success",
        "2022: Expanded to marine conservation"
      ],
      challenges: ["Harsh environment deployment", "Connectivity issues", "Funding constraints"],
      opportunities: ["Conservation funding increase", "Technology cost reduction", "Global expansion"]
    }
  ],

  // Emerging Technologies
  emergingTech: [
    {
      name: "LanzaTech",
      founded: 2005,
      location: "Skokie, IL, USA",
      category: "Gas Fermentation",
      description: "Converting waste gases into sustainable fuels and chemicals",
      funding: "$200M+ total funding",
      valuation: "$2.2B (public via SPAC 2022)",
      technology: "Proprietary microbes converting CO and CO₂ to ethanol and chemicals",
      impact: "70% emission reduction vs conventional production",
      customers: ["ArcelorMittal", "INEOS", "Shell", "Virgin Atlantic"],
      milestones: [
        "2022: Public listing via SPAC",
        "2021: First commercial plant in China",
        "2020: Virgin Atlantic sustainable jet fuel"
      ],
      challenges: ["Technology scaling", "Feedstock availability", "Market competition"],
      opportunities: ["Industrial decarbonization", "Sustainable aviation fuel demand", "Circular economy"]
    },
    {
      name: "Twelve",
      founded: 2015,
      location: "Berkeley, CA, USA",
      category: "CO₂ Utilization",
      description: "Converting CO₂ into chemicals and fuels using electrochemistry",
      funding: "$57M Series B (2021)",
      valuation: "$300M",
      technology: "Electrochemical CO₂ reduction to produce sustainable chemicals",
      impact: "Carbon-negative chemicals, 90% emission reduction potential",
      customers: ["Mercedes-Benz", "Alaska Airlines", "P&G"],
      milestones: [
        "2021: Mercedes partnership for sustainable materials",
        "2020: Demonstration plant operational",
        "2022: Alaska Airlines sustainable jet fuel agreement"
      ],
      challenges: ["Energy requirements", "Cost competitiveness", "Scale-up complexity"],
      opportunities: ["Chemical industry decarbonization", "Sustainable aviation fuel", "Carbon utilization policies"]
    }
  ]
};

// Investment and Market Data
export const environmentalMarketData = {
  globalInvestment: {
    2023: {
      total: "$1.8 trillion",
      sectors: {
        renewableEnergy: "$1.3 trillion",
        energyStorage: "$120 billion",
        electricVehicles: "$170 billion",
        hydrogenTech: "$11 billion",
        carbonCapture: "$6.4 billion",
        climateTech: "$70 billion"
      },
      regions: {
        china: "$546 billion",
        usa: "$303 billion",
        europe: "$180 billion",
        other: "$771 billion"
      }
    },
    trends: {
      growth: "+17% year-over-year",
      drivers: ["Policy support", "Corporate commitments", "Technology maturation", "Cost competitiveness"],
      challenges: ["Supply chain constraints", "Regulatory uncertainty", "Grid integration", "Financing gaps"]
    }
  },
  
  marketSize: {
    cleanTech: {
      current: "$3.6 trillion (2023)",
      projected: "$16.2 trillion (2030)",
      cagr: "20.1%",
      keySegments: ["Solar", "Wind", "Energy storage", "Electric vehicles", "Green hydrogen"]
    },
    carbonMarkets: {
      voluntary: "$2 billion (2022)",
      compliance: "$909 billion (2022)",
      projected: "$100 billion voluntary by 2030",
      growth: "Exponential demand from corporate net-zero commitments"
    },
    circularEconomy: {
      current: "$4.5 trillion (2023)",
      projected: "$25 trillion (2030)",
      opportunity: "$4.5 trillion annual benefits by 2030",
      jobCreation: "6 million new jobs potential"
    }
  },

  exitActivity: {
    2023: {
      ipos: [
        {"company": "Nextracker", "value": "$2.8B", "sector": "Solar tracking"},
        {"company": "Solventum", "value": "$1.2B", "sector": "Water treatment"},
        {"company": "Kodiak Gas Services", "value": "$1.1B", "sector": "Natural gas compression"}
      ],
      acquisitions: [
        {"acquirer": "Shell", "target": "Renewable Energy Group", "value": "$2.1B", "sector": "Biofuels"},
        {"acquirer": "BP", "target": "Archaea Energy", "value": "$4.1B", "sector": "Renewable natural gas"},
        {"acquirer": "Microsoft", "target": "Nuance Communications", "value": "$19.7B", "sector": "AI for sustainability"}
      ]
    }
  }
};

// Innovation Hubs and Accelerators
export const innovationEcosystem = {
  accelerators: [
    {
      name: "Techstars Sustainability",
      location: "Global",
      focus: "Climate tech and sustainability startups",
      portfolio: "100+ companies",
      notableExits: ["Sealed", "Aquaai", "Opus 12"]
    },
    {
      name: "Plug and Play Sustainability",
      location: "Silicon Valley, Global",
      focus: "Corporate partnerships for sustainability innovation",
      partners: ["Shell", "Schneider Electric", "RWE"],
      portfolio: "200+ startups"
    },
    {
      name: "Climate-KIC",
      location: "Europe",
      focus: "Climate innovation and entrepreneurship",
      funding: "€2.3 billion since 2010",
      portfolio: "1,500+ startups and innovations"
    }
  ],
  
  corporateVentures: [
    {
      name: "Breakthrough Energy Ventures",
      founder: "Bill Gates",
      fund: "$2 billion",
      focus: "Breakthrough climate technologies",
      portfolio: ["Commonwealth Fusion", "Form Energy", "Pivot Bio"]
    },
    {
      name: "Amazon Climate Pledge Fund",
      parent: "Amazon",
      fund: "$10 billion",
      focus: "Net-zero carbon technologies",
      portfolio: ["Rivian", "CarbonCure", "Turntide Technologies"]
    },
    {
      name: "Microsoft Climate Innovation Fund",
      parent: "Microsoft",
      fund: "$1 billion",
      focus: "Carbon reduction and removal technologies",
      portfolio: ["Climeworks", "Carbon Engineering", "LanzaTech"]
    }
  ]
};

export default environmentalStartupsDatabase;