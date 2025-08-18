// Comprehensive Environmental Knowledge Database - Expanded 2024 Edition
export const environmentalKnowledgeBase = {
  // Climate Change Facts and Data
  climateChange: {
    keyFacts: [
      {
        title: "Global Temperature Rise",
        fact: "Global average temperature has risen by 1.1°C since pre-industrial times",
        source: "IPCC Sixth Assessment Report 2023",
        impact: "Causing more frequent extreme weather events, sea level rise, and ecosystem disruption",
        urgency: "Critical"
      },
      {
        title: "Carbon Dioxide Levels",
        fact: "Atmospheric CO₂ levels reached 421 ppm in 2023, highest in 3 million years",
        source: "NOAA Global Monitoring Laboratory",
        impact: "Accelerating greenhouse effect and ocean acidification",
        urgency: "Critical"
      },
      {
        title: "Sea Level Rise",
        fact: "Global sea levels are rising at 3.4 mm per year, accelerating",
        source: "NASA Sea Level Change Portal 2023",
        impact: "Threatening 630 million people in coastal areas worldwide",
        urgency: "High"
      },
      {
        title: "Arctic Ice Loss",
        fact: "Arctic sea ice is declining at 13% per decade",
        source: "National Snow and Ice Data Center 2023",
        impact: "Accelerating global warming through reduced albedo effect",
        urgency: "Critical"
      },
      {
        title: "Extreme Weather Events",
        fact: "Climate-related disasters increased 5x over 50 years, causing 2 million deaths",
        source: "WMO Atlas of Mortality 2023",
        impact: "Increasing economic losses and human displacement",
        urgency: "High"
      }
    ],
    solutions: [
      {
        solution: "Renewable Energy Transition",
        description: "Shift to solar, wind, and other renewable energy sources",
        potential: "Can reduce global emissions by 65% by 2030",
        timeline: "2024-2030",
        cost: "$131 trillion investment needed globally",
        benefits: ["Job creation", "Energy independence", "Reduced air pollution", "Economic growth"]
      },
      {
        solution: "Carbon Capture and Storage",
        description: "Technology to capture CO₂ from atmosphere and store underground",
        potential: "Could remove 1-10 Gt CO₂ annually by 2050",
        timeline: "2025-2050",
        cost: "$100-600 per ton CO₂",
        benefits: ["Direct emission reduction", "Industrial decarbonization", "Negative emissions"]
      },
      {
        solution: "Nature-Based Solutions",
        description: "Protect and restore forests, wetlands, and other ecosystems",
        potential: "Can provide 37% of climate mitigation needed",
        timeline: "Immediate-2030",
        cost: "$44 billion annually",
        benefits: ["Biodiversity protection", "Water security", "Livelihood support", "Climate resilience"]
      }
    ]
  },

  // Biodiversity Crisis Information
  biodiversity: {
    keyFacts: [
      {
        title: "Species Extinction Rate",
        fact: "Current extinction rate is 1,000-10,000 times higher than natural background rate",
        source: "IPBES Global Assessment 2023",
        impact: "Ecosystem collapse and loss of essential services",
        urgency: "Critical"
      },
      {
        title: "Habitat Loss",
        fact: "75% of terrestrial environment severely altered by human activities",
        source: "IPBES Global Assessment 2023",
        impact: "Species displacement and ecosystem fragmentation",
        urgency: "Critical"
      },
      {
        title: "Ocean Biodiversity",
        fact: "66% of marine environment significantly altered, 33% of fish stocks overfished",
        source: "FAO State of World Fisheries 2023",
        impact: "Marine ecosystem collapse and food security threats",
        urgency: "High"
      },
      {
        title: "Pollinator Decline",
        fact: "40% of invertebrate pollinators face extinction, especially bees and butterflies",
        source: "IPBES Pollinator Assessment 2023",
        impact: "Threatens 75% of food crops and $235 billion in annual production",
        urgency: "Critical"
      }
    ],
    solutions: [
      {
        solution: "Protected Area Expansion",
        description: "Establish and effectively manage 30% of land and ocean by 2030",
        potential: "Could prevent 60% of predicted extinctions",
        timeline: "2024-2030",
        cost: "$140 billion annually",
        benefits: ["Species protection", "Ecosystem services", "Climate regulation", "Cultural values"]
      },
      {
        solution: "Sustainable Agriculture",
        description: "Adopt regenerative farming practices that support biodiversity",
        potential: "Can increase biodiversity by 30% on farmland",
        timeline: "2024-2035",
        cost: "$350 billion transition investment",
        benefits: ["Soil health", "Pollinator support", "Water quality", "Carbon sequestration"]
      }
    ]
  },

  // Pollution and Waste Data
  pollution: {
    keyFacts: [
      {
        title: "Air Pollution Deaths",
        fact: "7 million premature deaths annually from air pollution",
        source: "WHO Global Air Quality Guidelines 2023",
        impact: "Reduced life expectancy and increased healthcare costs",
        urgency: "Critical"
      },
      {
        title: "Plastic Pollution",
        fact: "11 million tons of plastic enter oceans annually, projected to triple by 2040",
        source: "Pew Charitable Trusts 2023",
        impact: "Marine life death, microplastics in food chain",
        urgency: "High"
      },
      {
        title: "E-Waste Crisis",
        fact: "54 million tons of e-waste generated in 2023, only 20% properly recycled",
        source: "Global E-waste Monitor 2023",
        impact: "Toxic contamination and resource waste",
        urgency: "High"
      },
      {
        title: "Water Pollution",
        fact: "2 billion people lack access to safely managed drinking water",
        source: "WHO/UNICEF JMP Report 2023",
        impact: "Disease, death, and economic losses",
        urgency: "Critical"
      }
    ],
    solutions: [
      {
        solution: "Circular Economy",
        description: "Design out waste through reuse, repair, and recycling",
        potential: "Could reduce waste by 80% and create 6 million jobs",
        timeline: "2024-2040",
        cost: "$4.5 trillion investment opportunity",
        benefits: ["Resource efficiency", "Job creation", "Reduced pollution", "Economic growth"]
      },
      {
        solution: "Clean Technology",
        description: "Deploy advanced pollution control and clean production technologies",
        potential: "Can reduce industrial pollution by 90%",
        timeline: "2024-2035",
        cost: "$2.8 trillion globally",
        benefits: ["Health improvement", "Environmental restoration", "Innovation", "Competitiveness"]
      }
    ]
  },

  // Environmental Technologies
  technologies: {
    renewable: [
      {
        name: "Solar Photovoltaic",
        description: "Convert sunlight directly into electricity using semiconductor cells",
        efficiency: "22-26% for commercial panels",
        cost: "$0.048/kWh (2023 global average)",
        growth: "191 GW added globally in 2022",
        potential: "Could provide 25% of global electricity by 2050",
        challenges: ["Intermittency", "Storage needs", "Grid integration", "Material supply"]
      },
      {
        name: "Wind Power",
        description: "Generate electricity using wind turbines",
        efficiency: "35-45% capacity factor for modern turbines",
        cost: "$0.033/kWh (2023 global average)",
        growth: "77 GW added globally in 2022",
        potential: "Could provide 35% of global electricity by 2050",
        challenges: ["Visual impact", "Noise", "Bird mortality", "Grid stability"]
      },
      {
        name: "Green Hydrogen",
        description: "Produce hydrogen using renewable electricity and electrolysis",
        efficiency: "60-80% electrolysis efficiency",
        cost: "$3-8/kg (target: $1-2/kg by 2030)",
        growth: "200+ projects announced globally",
        potential: "Could decarbonize steel, chemicals, and transport",
        challenges: ["High costs", "Infrastructure", "Storage", "Transport"]
      }
    ]
  },

  // Environmental Policies and Regulations
  policies: {
    international: [
      {
        name: "Paris Climate Agreement",
        year: 2015,
        participants: "196 countries",
        goal: "Limit global warming to 1.5°C above pre-industrial levels",
        status: "In force since 2016",
        progress: "Current pledges lead to 2.4°C warming - insufficient",
        nextSteps: ["Enhanced NDCs", "Climate finance", "Technology transfer", "Adaptation support"]
      },
      {
        name: "Kunming-Montreal Global Biodiversity Framework",
        year: 2022,
        participants: "196 countries",
        goal: "Halt and reverse biodiversity loss by 2030",
        targets: "30% land and ocean protection, $200B annual funding",
        status: "Recently adopted",
        progress: "Implementation just beginning",
        nextSteps: ["National strategies", "Funding mobilization", "Monitoring systems", "Indigenous rights"]
      }
    ]
  },

  // Water Resources and Management
  waterResources: {
    globalStats: {
      freshwaterAvailability: "2.5% of Earth's water is freshwater",
      accessibleFreshwater: "Only 0.007% is accessible for human use",
      waterStress: "2 billion people live in water-stressed countries",
      waterScarcity: "4 billion people face severe water scarcity at least 1 month per year",
      groundwaterDepletion: "21 of 37 major aquifers depleting faster than recharge",
      source: "UN World Water Development Report 2023"
    },
    pollutionSources: [
      {
        source: "Agricultural Runoff",
        contribution: "70% of water pollution globally",
        pollutants: ["Nitrogen", "Phosphorus", "Pesticides", "Sediments"],
        impact: "Eutrophication, dead zones, groundwater contamination",
        solutions: ["Precision agriculture", "Buffer strips", "Integrated pest management"]
      },
      {
        source: "Industrial Discharge",
        contribution: "20% of water pollution globally",
        pollutants: ["Heavy metals", "Chemicals", "Thermal pollution", "Microplastics"],
        impact: "Ecosystem toxicity, bioaccumulation, habitat destruction",
        solutions: ["Zero liquid discharge", "Advanced treatment", "Circular processes"]
      },
      {
        source: "Urban Stormwater",
        contribution: "10% of water pollution globally",
        pollutants: ["Oil", "Debris", "Bacteria", "Road salt"],
        impact: "Urban stream syndrome, habitat degradation",
        solutions: ["Green infrastructure", "Permeable surfaces", "Rain gardens"]
      }
    ],
    technologies: [
      {
        name: "Membrane Bioreactors (MBR)",
        description: "Combines biological treatment with membrane filtration",
        efficiency: "99.9% pathogen removal, 95% BOD removal",
        cost: "$0.50-2.00 per m³",
        applications: ["Municipal wastewater", "Industrial treatment", "Water reuse"],
        advantages: ["High quality effluent", "Small footprint", "Automated operation"]
      },
      {
        name: "Reverse Osmosis Desalination",
        description: "Remove salt from seawater using high-pressure membranes",
        efficiency: "99.7% salt removal",
        cost: "$0.45-1.00 per m³",
        capacity: "100 million m³/day global capacity",
        challenges: ["Energy intensive", "Brine disposal", "Membrane fouling"]
      },
      {
        name: "Atmospheric Water Generation",
        description: "Extract water from air humidity using condensation",
        efficiency: "2-10 liters per kWh depending on humidity",
        cost: "$0.02-0.10 per liter",
        applications: ["Remote areas", "Emergency response", "Decentralized supply"],
        limitations: ["Humidity dependent", "Energy requirements", "Scale limitations"]
      }
    ]
  },

  // Soil Health and Agriculture
  soilHealth: {
    globalStatus: {
      degradedLand: "33% of global land is degraded",
      soilLoss: "24 billion tons of fertile soil lost annually",
      economicImpact: "$400 billion annual economic losses",
      foodSecurity: "95% of food depends on soil",
      carbonStorage: "Soils store 3x more carbon than atmosphere",
      source: "FAO State of World's Soil Resources 2023"
    },
    degradationCauses: [
      {
        cause: "Erosion",
        contribution: "28% of soil degradation",
        drivers: ["Deforestation", "Overgrazing", "Poor farming practices"],
        regions: ["Sub-Saharan Africa", "South Asia", "Latin America"],
        solutions: ["Contour farming", "Cover crops", "Agroforestry"]
      },
      {
        cause: "Chemical Degradation",
        contribution: "19% of soil degradation",
        drivers: ["Excessive fertilizers", "Pesticides", "Industrial pollution"],
        impacts: ["Acidification", "Salinization", "Contamination"],
        solutions: ["Precision agriculture", "Organic farming", "Bioremediation"]
      },
      {
        cause: "Physical Degradation",
        contribution: "4% of soil degradation",
        drivers: ["Compaction", "Sealing", "Waterlogging"],
        impacts: ["Reduced infiltration", "Root restriction", "Anaerobic conditions"],
        solutions: ["Controlled traffic", "Drainage systems", "Organic matter addition"]
      }
    ],
    regenerativePractices: [
      {
        practice: "Cover Cropping",
        description: "Plant crops specifically to cover and protect soil",
        benefits: ["Erosion control", "Nitrogen fixation", "Organic matter", "Pest control"],
        adoption: "15% of US farmland (growing 50% since 2012)",
        economics: "$50-150/hectare cost, $200-400/hectare benefits",
        species: ["Legumes", "Grasses", "Brassicas", "Radishes"]
      },
      {
        practice: "No-Till Farming",
        description: "Plant crops without disturbing soil through tillage",
        benefits: ["Soil structure", "Water retention", "Carbon sequestration", "Fuel savings"],
        adoption: "35% of global cropland",
        carbonBenefit: "0.3-0.8 tons CO₂/hectare/year sequestration",
        challenges: ["Weed management", "Equipment costs", "Learning curve"]
      },
      {
        practice: "Agroforestry",
        description: "Integrate trees and shrubs into agricultural systems",
        benefits: ["Biodiversity", "Carbon storage", "Erosion control", "Microclimate"],
        potential: "630 million hectares suitable globally",
        carbonBenefit: "1.5-3.5 tons CO₂/hectare/year",
        systems: ["Alley cropping", "Silvopasture", "Forest farming", "Windbreaks"]
      }
    ]
  },

  // Ocean and Marine Ecosystems
  marineEcosystems: {
    oceanHealth: {
      acidification: "30% increase in acidity since industrial revolution",
      warming: "Ocean temperatures risen 0.6°C since 1969",
      oxygenLoss: "2% decline in oxygen levels since 1960",
      plasticPollution: "150 million tons of plastic in oceans",
      overfishing: "34% of fish stocks overfished",
      source: "IPCC Ocean and Cryosphere Report 2023"
    },
    marineProtectedAreas: [
      {
        name: "Great Barrier Reef Marine Park",
        location: "Australia",
        size: "344,400 km²",
        established: 1975,
        protection: "Multiple-use zones with strict no-take areas",
        biodiversity: "1,500 fish species, 400 coral species",
        threats: ["Coral bleaching", "Water quality", "Coastal development"],
        management: ["Zoning", "Water quality improvement", "Climate adaptation"]
      },
      {
        name: "Papahānaumokuākea",
        location: "Hawaii, USA",
        size: "1,508,870 km²",
        established: 2006,
        protection: "No-take marine national monument",
        biodiversity: "7,000 species, 25% endemic",
        significance: "World's largest protected area",
        management: ["Research", "Cultural preservation", "Restoration"]
      },
      {
        name: "Ross Sea Marine Protected Area",
        location: "Antarctica",
        size: "1,550,000 km²",
        established: 2017,
        protection: "35-year protection period",
        biodiversity: "Pristine Antarctic ecosystem",
        importance: "Climate change reference site",
        management: ["International cooperation", "Scientific research", "Monitoring"]
      }
    ],
    blueCarbonEcosystems: [
      {
        ecosystem: "Mangrove Forests",
        globalArea: "147,000 km²",
        carbonStorage: "1,023 tons CO₂/hectare",
        sequestrationRate: "1.4-4.2 tons CO₂/hectare/year",
        services: ["Coastal protection", "Fisheries", "Tourism", "Water filtration"],
        threats: ["Aquaculture", "Urban development", "Sea level rise"],
        restoration: "$1,000-10,000/hectare cost"
      },
      {
        ecosystem: "Seagrass Meadows",
        globalArea: "300,000 km²",
        carbonStorage: "194 tons CO₂/hectare",
        sequestrationRate: "0.5-2.0 tons CO₂/hectare/year",
        services: ["Nursery habitat", "Sediment stabilization", "Oxygen production"],
        threats: ["Water pollution", "Coastal development", "Boat damage"],
        restoration: "$500-5,000/hectare cost"
      },
      {
        ecosystem: "Salt Marshes",
        globalArea: "54,000 km²",
        carbonStorage: "334 tons CO₂/hectare",
        sequestrationRate: "1.8-4.8 tons CO₂/hectare/year",
        services: ["Storm protection", "Water purification", "Wildlife habitat"],
        threats: ["Sea level rise", "Development", "Invasive species"],
        restoration: "$2,000-15,000/hectare cost"
      }
    ]
  },

  // Urban Sustainability and Smart Cities
  urbanSustainability: {
    urbanization: {
      currentUrban: "56% of global population (4.4 billion people)",
      projectedUrban: "68% by 2050 (6.7 billion people)",
      energyConsumption: "Cities consume 78% of global energy",
      emissions: "Cities produce 70% of global CO₂ emissions",
      landUse: "Cities occupy 3% of land but house 56% of population",
      source: "UN World Urbanization Prospects 2022"
    },
    smartCityTechnologies: [
      {
        technology: "Smart Grid Systems",
        description: "Intelligent electricity distribution with two-way communication",
        benefits: ["30% energy savings", "Renewable integration", "Outage reduction"],
        deployment: "200+ cities globally",
        investment: "$13.8 billion market in 2023",
        challenges: ["Cybersecurity", "Infrastructure costs", "Data privacy"]
      },
      {
        technology: "Intelligent Transportation Systems",
        description: "Connected traffic management and mobility solutions",
        benefits: ["25% congestion reduction", "20% emission reduction", "Safety improvement"],
        components: ["Traffic optimization", "Public transit", "Shared mobility"],
        examples: ["Singapore ERP", "Barcelona smart traffic", "Amsterdam mobility hubs"],
        roi: "3:1 benefit-cost ratio average"
      },
      {
        technology: "Smart Water Management",
        description: "IoT sensors and AI for water distribution optimization",
        benefits: ["20% water loss reduction", "Leak detection", "Quality monitoring"],
        technologies: ["Smart meters", "Pressure sensors", "Quality sensors"],
        savings: "$12.8 billion potential annual savings globally",
        adoption: "15% of water utilities using smart systems"
      }
    ],
    greenBuilding: [
      {
        standard: "LEED (Leadership in Energy and Environmental Design)",
        certifiedBuildings: "100,000+ buildings in 180+ countries",
        energySavings: "25-30% compared to conventional buildings",
        waterSavings: "11% on average",
        categories: ["Energy efficiency", "Water efficiency", "Materials", "Indoor quality"],
        levels: ["Certified", "Silver", "Gold", "Platinum"]
      },
      {
        standard: "BREEAM (Building Research Establishment Environmental Assessment)",
        certifiedBuildings: "2.3 million buildings globally",
        energySavings: "Up to 50% energy reduction",
        scope: ["New construction", "Refurbishment", "In-use assessment"],
        categories: ["Energy", "Health", "Innovation", "Land use", "Materials"],
        regions: ["UK", "Europe", "International"]
      },
      {
        standard: "Passive House",
        certifiedBuildings: "60,000+ buildings worldwide",
        energySavings: "90% heating energy reduction",
        principles: ["Super insulation", "Airtightness", "Heat recovery", "Thermal bridge-free"],
        performance: "15 kWh/m²/year heating demand maximum",
        growth: "20% annual increase in certifications"
      }
    ]
  },

  // Success Stories and Case Studies (Expanded)
  successStories: [
    {
      title: "Costa Rica's Payment for Ecosystem Services",
      location: "Costa Rica",
      description: "National program paying landowners for forest conservation",
      timeline: "1997-present",
      investment: "$500 million total investment",
      results: {
        forestCover: "Increased from 24% to 54% since 1985",
        biodiversity: "25% of territory under protection",
        economy: "$4 billion ecotourism industry",
        carbon: "Became carbon neutral in 2021",
        watersheds: "Improved water quality and flow regulation"
      },
      mechanisms: ["Direct payments", "Tax incentives", "Carbon credits", "Ecotourism revenue"],
      lessons: ["Economic incentives work", "Long-term commitment essential", "Multiple benefits possible"]
    },
    {
      title: "Denmark's Wind Energy Transition",
      location: "Denmark",
      description: "World leader in wind energy development",
      timeline: "1970s-present",
      investment: "$15 billion in wind infrastructure",
      results: {
        windPower: "50% of electricity from wind (80% on windy days)",
        exports: "World's largest wind turbine exporter",
        jobs: "33,000 jobs in wind industry",
        emissions: "50% reduction since 1990",
        energy: "Net electricity exporter"
      },
      policies: ["Feed-in tariffs", "R&D support", "Grid investment", "Planning support"],
      lessons: ["Early investment pays off", "Policy consistency crucial", "Innovation drives competitiveness"]
    },
    {
      title: "Singapore's Water Independence",
      location: "Singapore",
      description: "Achieved water security through technology and policy",
      timeline: "1960s-present",
      investment: "$20 billion in water infrastructure",
      results: {
        recycling: "40% of water from recycling and desalination",
        efficiency: "World's lowest water consumption per capita",
        technology: "Global leader in water technology",
        resilience: "Water security despite no natural freshwater",
        exports: "$1.8 billion water technology exports"
      },
      fourTaps: ["Local catchment", "Imported water", "NEWater recycling", "Desalination"],
      lessons: ["Technology can overcome constraints", "Pricing drives efficiency", "Innovation creates opportunities"]
    },
    {
      title: "Rwanda's Forest Restoration",
      location: "Rwanda",
      description: "Massive reforestation after deforestation crisis",
      timeline: "2000-present",
      investment: "$300 million in forest programs",
      results: {
        forestCover: "Increased from 10% to 30%",
        species: "Restored native species populations",
        economy: "$200 million annual forest economy",
        carbon: "5 million tons CO₂ sequestered",
        livelihoods: "300,000 jobs created"
      },
      strategies: ["Community involvement", "Agroforestry", "Bamboo cultivation", "Ecotourism"],
      lessons: ["Community ownership essential", "Multiple species approach", "Economic incentives crucial"]
    },
    {
      title: "Netherlands Delta Works",
      location: "Netherlands",
      description: "World's largest flood protection system",
      timeline: "1950-2010",
      investment: "$13 billion total cost",
      results: {
        protection: "Protects 26% of country below sea level",
        safety: "1 in 10,000 year flood protection",
        innovation: "World leader in water management technology",
        exports: "$7 billion annual water technology exports",
        adaptation: "Model for climate adaptation globally"
      },
      components: ["Storm surge barriers", "Dikes", "Pumping stations", "Water storage"],
      lessons: ["Long-term planning essential", "Innovation through necessity", "International cooperation valuable"]
    },
    {
      title: "Bhutan's Carbon Negative Achievement",
      location: "Bhutan",
      description: "World's only carbon negative country",
      timeline: "Constitutional mandate since 2008",
      results: {
        forestCover: "71% forest cover (60% constitutionally mandated)",
        carbon: "Absorbs 6 million tons CO₂, emits 2.3 million tons",
        renewable: "100% renewable electricity",
        biodiversity: "5,000+ species in area size of Switzerland",
        development: "Gross National Happiness over GDP"
      },
      policies: ["Forest protection", "Hydropower development", "Sustainable tourism", "Organic agriculture"],
      lessons: ["Constitutional protection works", "Small scale enables innovation", "Holistic development possible"]
    },
    {
      title: "China's Sponge City Initiative",
      location: "China",
      description: "Urban flood management through natural infrastructure",
      timeline: "2015-present",
      investment: "$12 billion in 30 pilot cities",
      results: {
        waterManagement: "70% rainwater absorption target",
        flooding: "Reduced urban flooding incidents",
        quality: "Improved water quality through natural filtration",
        biodiversity: "Enhanced urban biodiversity",
        economy: "New green infrastructure industry"
      },
      technologies: ["Permeable surfaces", "Green roofs", "Wetlands", "Bioswales"],
      lessons: ["Nature-based solutions effective", "Scale enables impact", "Integration with urban planning crucial"]
    }
  ],

  // Environmental Economics and Finance
  environmentalEconomics: {
    greenFinance: {
      marketSize: "$540 billion green bond issuances in 2022",
      growth: "20% annual growth rate",
      sectors: ["Renewable energy", "Energy efficiency", "Sustainable transport", "Water management"],
      standards: ["Green Bond Principles", "Climate Bonds Standard", "EU Taxonomy"],
      challenges: ["Greenwashing", "Standardization", "Impact measurement"]
    },
    carbonPricing: [
      {
        mechanism: "Carbon Tax",
        coverage: "46 jurisdictions globally",
        price: "$1-137 per ton CO₂",
        revenue: "$104 billion raised in 2021",
        examples: ["British Columbia", "Sweden", "France", "South Africa"],
        effectiveness: "5-21% emission reductions"
      },
      {
        mechanism: "Emissions Trading System",
        coverage: "27 systems globally",
        price: "$7-90 per ton CO₂",
        coverage: "17% of global emissions",
        examples: ["EU ETS", "California", "RGGI", "China national ETS"],
        effectiveness: "10-15% emission reductions"
      }
    ],
    naturalCapitalAccounting: {
      definition: "Economic valuation of ecosystem services",
      globalValue: "$125 trillion annual ecosystem service value",
      adoption: "89 countries implementing natural capital accounting",
      applications: ["Policy making", "Investment decisions", "Risk assessment"],
      challenges: ["Valuation methods", "Data availability", "Integration with GDP"]
    }
  }
};

// Environmental Indicators and Metrics
export const environmentalIndicators = {
  climate: {
    globalTemperature: {
      current: 1.1,
      unit: "°C above pre-industrial",
      trend: "Rising",
      target: 1.5,
      source: "IPCC AR6"
    },
    co2Concentration: {
      current: 421,
      unit: "ppm",
      trend: "Rising",
      target: 350,
      source: "NOAA"
    },
    seaLevelRise: {
      current: 3.4,
      unit: "mm/year",
      trend: "Accelerating",
      projection: "0.43-2.84m by 2100",
      source: "NASA"
    }
  },
  biodiversity: {
    livingPlanetIndex: {
      current: -69,
      unit: "% change since 1970",
      trend: "Declining",
      target: "Reverse decline",
      source: "WWF LPI 2022"
    },
    redListIndex: {
      current: 0.73,
      unit: "Index (1 = no extinctions)",
      trend: "Declining",
      target: "Maintain at 1",
      source: "IUCN"
    }
  },
  pollution: {
    airQuality: {
      current: 90,
      unit: "% population exposed to unsafe levels",
      trend: "Improving slowly",
      target: 0,
      source: "WHO"
    },
    plasticPollution: {
      current: 11,
      unit: "million tons entering oceans annually",
      trend: "Increasing",
      target: "Near zero",
      source: "Pew Trusts"
    }
  }
};

export default environmentalKnowledgeBase;