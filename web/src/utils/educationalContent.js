// Comprehensive Environmental Education Content Database
export const educationalContent = {
  // Climate Science Fundamentals
  climateScience: {
    basics: [
      {
        id: 'greenhouse-effect',
        title: 'The Greenhouse Effect Explained',
        level: 'Beginner',
        duration: '10 minutes',
        content: {
          overview: 'Understanding how greenhouse gases trap heat in Earth\'s atmosphere',
          keyPoints: [
            'Solar radiation enters Earth\'s atmosphere as short-wave energy',
            'Earth\'s surface absorbs energy and re-emits it as long-wave infrared radiation',
            'Greenhouse gases (CO₂, CH₄, N₂O, H₂O) absorb and re-emit infrared radiation',
            'This process keeps Earth 33°C warmer than it would be without an atmosphere',
            'Human activities increase greenhouse gas concentrations, enhancing the effect'
          ],
          visualAids: [
            'Interactive diagram showing energy flow through atmosphere',
            'Animation of molecular vibrations absorbing infrared radiation',
            'Graph showing atmospheric CO₂ concentrations over time'
          ],
          realWorldExamples: [
            'Venus extreme greenhouse effect (462°C surface temperature)',
            'Mars thin atmosphere (average -80°C)',
            'Earth\'s ice ages and warm periods in geological history'
          ],
          quiz: [
            {
              question: 'What percentage of incoming solar radiation is absorbed by Earth\'s surface?',
              options: ['30%', '50%', '70%', '90%'],
              correct: 2,
              explanation: 'About 70% of incoming solar radiation is absorbed by Earth\'s surface and atmosphere.'
            }
          ]
        }
      },
      {
        id: 'carbon-cycle',
        title: 'The Global Carbon Cycle',
        level: 'Intermediate',
        duration: '15 minutes',
        content: {
          overview: 'How carbon moves between atmosphere, oceans, land, and living organisms',
          keyPoints: [
            'Carbon exists in atmosphere (CO₂), oceans (dissolved CO₂, carbonates), land (soil, vegetation)',
            'Natural carbon fluxes: photosynthesis, respiration, ocean-atmosphere exchange',
            'Carbon reservoirs: atmosphere (850 GtC), oceans (38,000 GtC), land (2,300 GtC)',
            'Human perturbation: 10 GtC/year from fossil fuels, 1.5 GtC/year from land use',
            'Carbon sinks: oceans absorb 2.6 GtC/year, land absorbs 3.2 GtC/year'
          ],
          processes: [
            {
              name: 'Photosynthesis',
              description: '6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂',
              annualFlux: '120 GtC/year from atmosphere to vegetation'
            },
            {
              name: 'Respiration',
              description: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy',
              annualFlux: '115 GtC/year from vegetation to atmosphere'
            },
            {
              name: 'Ocean uptake',
              description: 'CO₂ dissolves in seawater, forms carbonic acid',
              annualFlux: '80 GtC/year ocean-atmosphere exchange'
            }
          ]
        }
      }
    ],
    advanced: [
      {
        id: 'climate-feedbacks',
        title: 'Climate Feedback Mechanisms',
        level: 'Advanced',
        duration: '20 minutes',
        content: {
          overview: 'How climate system components interact to amplify or dampen warming',
          positiveFeedbacks: [
            {
              name: 'Ice-albedo feedback',
              mechanism: 'Melting ice reduces surface reflectivity, increases absorption',
              magnitude: '0.4-0.8°C additional warming by 2100',
              timeScale: 'Decades to centuries'
            },
            {
              name: 'Water vapor feedback',
              mechanism: 'Warmer air holds more moisture, water vapor is greenhouse gas',
              magnitude: 'Doubles CO₂ warming effect',
              timeScale: 'Days to weeks'
            },
            {
              name: 'Permafrost carbon feedback',
              mechanism: 'Thawing permafrost releases stored CO₂ and CH₄',
              magnitude: '50-100 GtC release by 2100',
              timeScale: 'Decades to millennia'
            }
          ],
          negativeFeedbacks: [
            {
              name: 'Cloud feedback',
              mechanism: 'Increased clouds can reflect more sunlight (uncertain)',
              magnitude: 'Highly uncertain, -1 to +1°C',
              timeScale: 'Hours to days'
            },
            {
              name: 'CO₂ fertilization',
              mechanism: 'Higher CO₂ enhances plant growth, carbon uptake',
              magnitude: 'Diminishing returns, nutrient limitations',
              timeScale: 'Years to decades'
            }
          ]
        }
      }
    ]
  },

  // Biodiversity and Ecosystems
  biodiversity: {
    fundamentals: [
      {
        id: 'biodiversity-levels',
        title: 'Three Levels of Biodiversity',
        level: 'Beginner',
        duration: '12 minutes',
        content: {
          overview: 'Understanding genetic, species, and ecosystem diversity',
          levels: [
            {
              type: 'Genetic Diversity',
              definition: 'Variation in genes within species populations',
              importance: 'Enables adaptation to environmental changes',
              examples: [
                'Different wheat varieties with drought resistance',
                'Genetic variation in wild salmon populations',
                'Dog breeds showing artificial selection effects'
              ],
              threats: ['Inbreeding', 'Population bottlenecks', 'Habitat fragmentation'],
              measurement: 'Heterozygosity, allelic richness, genetic distance'
            },
            {
              type: 'Species Diversity',
              definition: 'Number and abundance of different species',
              importance: 'Ecosystem stability and resilience',
              examples: [
                'Amazon rainforest: 10% of known species in 1% of land',
                'Coral reefs: 25% of marine species in <1% of ocean',
                'Madagascar: 90% endemic species due to isolation'
              ],
              threats: ['Habitat loss', 'Overexploitation', 'Invasive species'],
              measurement: 'Species richness, Shannon index, Simpson index'
            },
            {
              type: 'Ecosystem Diversity',
              definition: 'Variety of habitats and ecological processes',
              importance: 'Provides different environmental conditions',
              examples: [
                'Biome diversity: tropical forests to arctic tundra',
                'Aquatic ecosystems: freshwater, marine, estuarine',
                'Microhabitats: forest floor, canopy, understory'
              ],
              threats: ['Land conversion', 'Climate change', 'Pollution'],
              measurement: 'Habitat heterogeneity, landscape metrics'
            }
          ]
        }
      }
    ],
    conservation: [
      {
        id: 'conservation-strategies',
        title: 'Modern Conservation Approaches',
        level: 'Intermediate',
        duration: '18 minutes',
        content: {
          approaches: [
            {
              name: 'Protected Areas',
              description: 'Legally designated areas for biodiversity conservation',
              coverage: '18% of land, 8% of oceans globally',
              types: ['National parks', 'Wildlife reserves', 'Marine protected areas'],
              effectiveness: 'Reduces habitat loss by 40-50% within boundaries',
              challenges: ['Insufficient funding', 'Human-wildlife conflict', 'Climate change'],
              examples: [
                'Yellowstone National Park: First national park (1872)',
                'Great Barrier Reef Marine Park: Zoning system',
                'Kruger National Park: Community-based conservation'
              ]
            },
            {
              name: 'Corridor Conservation',
              description: 'Connecting fragmented habitats with wildlife corridors',
              purpose: 'Enable species movement and gene flow',
              types: ['Land bridges', 'Riparian corridors', 'Stepping stones'],
              benefits: ['Reduced edge effects', 'Increased population viability'],
              examples: [
                'Banff wildlife overpasses in Canada',
                'Mesoamerican Biological Corridor',
                'European green belt along former Iron Curtain'
              ]
            }
          ]
        }
      }
    ]
  },

  // Renewable Energy Technologies
  renewableEnergy: {
    solar: [
      {
        id: 'photovoltaic-basics',
        title: 'How Solar Panels Work',
        level: 'Beginner',
        duration: '15 minutes',
        content: {
          overview: 'Converting sunlight directly into electricity using photovoltaic effect',
          process: [
            'Photons from sunlight hit semiconductor material (usually silicon)',
            'Energy knocks electrons loose from atoms, creating electron-hole pairs',
            'Electric field in solar cell separates positive and negative charges',
            'Electrons flow through external circuit, creating direct current (DC)',
            'Inverter converts DC to alternating current (AC) for grid use'
          ],
          types: [
            {
              name: 'Monocrystalline Silicon',
              efficiency: '20-22%',
              cost: 'Higher',
              appearance: 'Dark blue/black, uniform',
              lifespan: '25-30 years',
              advantages: ['Highest efficiency', 'Space efficient', 'Long lifespan'],
              disadvantages: ['Most expensive', 'Performance drops in heat']
            },
            {
              name: 'Polycrystalline Silicon',
              efficiency: '15-17%',
              cost: 'Medium',
              appearance: 'Blue, speckled',
              lifespan: '25-30 years',
              advantages: ['Lower cost', 'Good performance', 'Widely available'],
              disadvantages: ['Lower efficiency', 'Temperature sensitive']
            },
            {
              name: 'Thin Film',
              efficiency: '10-12%',
              cost: 'Lower',
              appearance: 'Various colors, flexible',
              lifespan: '20-25 years',
              advantages: ['Flexible', 'Works in low light', 'Cheaper'],
              disadvantages: ['Lowest efficiency', 'Shorter lifespan']
            }
          ],
          economics: {
            globalCapacity: '1,177 GW installed (2022)',
            costDecline: '90% cost reduction since 2010',
            lcoe: '$0.048/kWh global average (2022)',
            jobsCreated: '4.9 million jobs globally',
            projections: '5,000 GW capacity possible by 2030'
          }
        }
      }
    ],
    wind: [
      {
        id: 'wind-energy-fundamentals',
        title: 'Wind Energy: From Breeze to Electricity',
        level: 'Beginner',
        duration: '12 minutes',
        content: {
          overview: 'Harnessing kinetic energy of moving air to generate electricity',
          physics: [
            'Wind power proportional to cube of wind speed (P ∝ v³)',
            'Doubling wind speed increases power by 8 times',
            'Betz limit: Maximum 59.3% of wind energy can be captured',
            'Modern turbines achieve 35-45% efficiency'
          ],
          components: [
            {
              name: 'Rotor Blades',
              function: 'Capture wind energy, convert to rotational motion',
              design: 'Aerodynamic shape creates lift force',
              materials: 'Fiberglass, carbon fiber composites',
              size: '50-120 meters length for utility scale'
            },
            {
              name: 'Nacelle',
              function: 'Houses gearbox, generator, control systems',
              weight: '50-100 tons for large turbines',
              components: 'Gearbox increases rotation speed 50-100x'
            },
            {
              name: 'Tower',
              function: 'Elevates turbine to capture stronger winds',
              height: '80-120 meters for onshore, up to 200m offshore',
              materials: 'Steel or concrete, designed for 20-25 year life'
            }
          ],
          windResources: {
            global: '1,021 GW installed capacity (2022)',
            potential: '900,000 TWh/year technical potential',
            capacity: '35-45% capacity factor for modern turbines',
            growth: '77 GW added globally in 2022'
          }
        }
      }
    ]
  },

  // Pollution and Environmental Health
  pollution: {
    airPollution: [
      {
        id: 'air-pollutants-health',
        title: 'Air Pollutants and Human Health',
        level: 'Intermediate',
        duration: '16 minutes',
        content: {
          overview: 'Understanding how air pollution affects human health and well-being',
          majorPollutants: [
            {
              name: 'Particulate Matter (PM2.5)',
              size: '2.5 micrometers or smaller',
              sources: ['Vehicle exhaust', 'Power plants', 'Wildfires', 'Industrial processes'],
              healthEffects: [
                'Penetrates deep into lungs and bloodstream',
                'Cardiovascular disease (heart attacks, strokes)',
                'Respiratory disease (asthma, COPD)',
                'Lung cancer, premature death'
              ],
              whoGuideline: '15 μg/m³ annual average',
              globalExposure: '90% of people breathe unsafe levels',
              economicCost: '$2.9 trillion annually in health costs'
            },
            {
              name: 'Nitrogen Dioxide (NO₂)',
              sources: ['Vehicle emissions', 'Power plants', 'Industrial combustion'],
              healthEffects: [
                'Respiratory inflammation',
                'Reduced lung function',
                'Increased asthma attacks',
                'Premature death'
              ],
              whoGuideline: '25 μg/m³ annual average',
              trends: 'Declining in developed countries, rising in developing'
            },
            {
              name: 'Ground-level Ozone (O₃)',
              formation: 'Secondary pollutant from NOx + VOCs + sunlight',
              healthEffects: [
                'Respiratory irritation',
                'Reduced lung function',
                'Aggravated asthma',
                'Premature death'
              ],
              whoGuideline: '100 μg/m³ 8-hour average',
              seasonality: 'Higher in summer due to photochemical reactions'
            }
          ],
          vulnerablePopulations: [
            'Children (developing respiratory systems)',
            'Elderly (weakened immune systems)',
            'People with pre-existing conditions',
            'Outdoor workers',
            'Low-income communities (environmental justice)'
          ],
          solutions: [
            {
              category: 'Transportation',
              actions: ['Electric vehicles', 'Public transit', 'Active transportation', 'Cleaner fuels']
            },
            {
              category: 'Energy',
              actions: ['Renewable energy', 'Energy efficiency', 'Cleaner power plants']
            },
            {
              category: 'Industry',
              actions: ['Emission controls', 'Cleaner technologies', 'Circular economy']
            }
          ]
        }
      }
    ],
    waterPollution: [
      {
        id: 'water-contamination-sources',
        title: 'Sources and Types of Water Contamination',
        level: 'Intermediate',
        duration: '14 minutes',
        content: {
          overview: 'Understanding how human activities contaminate water resources',
          contaminationSources: [
            {
              type: 'Point Sources',
              definition: 'Discrete, identifiable sources of pollution',
              examples: [
                'Industrial discharge pipes',
                'Sewage treatment plant outfalls',
                'Oil spills from tankers',
                'Mining operations'
              ],
              regulation: 'Easier to regulate and monitor',
              solutions: ['End-of-pipe treatment', 'Cleaner production', 'Zero discharge']
            },
            {
              type: 'Non-point Sources',
              definition: 'Diffuse pollution from widespread activities',
              examples: [
                'Agricultural runoff (fertilizers, pesticides)',
                'Urban stormwater runoff',
                'Atmospheric deposition',
                'Septic system leachate'
              ],
              regulation: 'Difficult to regulate and control',
              solutions: ['Best management practices', 'Land use planning', 'Green infrastructure']
            }
          ],
          majorContaminants: [
            {
              category: 'Nutrients',
              compounds: ['Nitrogen (N)', 'Phosphorus (P)'],
              sources: 'Agriculture (70%), wastewater (20%), urban runoff (10%)',
              effects: 'Eutrophication, algal blooms, dead zones',
              globalImpact: '245,000 km² of dead zones in oceans',
              solutions: ['Precision agriculture', 'Wetland restoration', 'Nutrient trading']
            },
            {
              category: 'Pathogens',
              types: ['Bacteria', 'Viruses', 'Parasites', 'Protozoa'],
              sources: 'Sewage, animal waste, stormwater',
              effects: 'Waterborne diseases (cholera, typhoid, hepatitis)',
              globalImpact: '2 billion people lack safely managed sanitation',
              solutions: ['Wastewater treatment', 'Sanitation infrastructure', 'Water disinfection']
            },
            {
              category: 'Toxic Chemicals',
              types: ['Heavy metals', 'Pesticides', 'Industrial chemicals', 'Pharmaceuticals'],
              sources: 'Industry, agriculture, households',
              effects: 'Cancer, neurological damage, endocrine disruption',
              persistence: 'Many are persistent and bioaccumulative',
              solutions: ['Chemical substitution', 'Advanced treatment', 'Source reduction']
            }
          ]
        }
      }
    ]
  },

  // Sustainable Agriculture and Food Systems
  sustainableAgriculture: {
    principles: [
      {
        id: 'regenerative-agriculture',
        title: 'Regenerative Agriculture Principles',
        level: 'Intermediate',
        duration: '18 minutes',
        content: {
          overview: 'Farming practices that restore soil health and ecosystem function',
          coreprinciples: [
            {
              principle: 'Minimize Soil Disturbance',
              practices: ['No-till farming', 'Reduced tillage', 'Direct seeding'],
              benefits: [
                'Preserves soil structure and aggregation',
                'Maintains fungal networks and soil biology',
                'Reduces erosion by 90% compared to conventional tillage',
                'Increases water infiltration and retention'
              ],
              adoption: '35% of global cropland uses conservation tillage',
              challenges: ['Weed management', 'Equipment costs', 'Learning curve']
            },
            {
              principle: 'Maximize Crop Diversity',
              practices: ['Crop rotations', 'Polycultures', 'Agroforestry', 'Cover crops'],
              benefits: [
                'Breaks pest and disease cycles',
                'Improves soil nutrient cycling',
                'Enhances beneficial insect habitat',
                'Increases farm resilience to weather'
              ],
              examples: [
                'Corn-soybean-wheat rotation in Midwest US',
                'Rice-fish-duck systems in Asia',
                'Silvopasture combining trees, grass, livestock'
              ]
            },
            {
              principle: 'Keep Living Roots in Soil',
              practices: ['Cover crops', 'Perennial grains', 'Extended rotations'],
              benefits: [
                'Continuous carbon input to soil',
                'Maintains soil microbial communities',
                'Prevents nutrient leaching',
                'Provides year-round soil protection'
              ],
              carbonBenefit: '0.3-0.8 tons CO₂/hectare/year sequestration',
              adoption: '15% of US farmland uses cover crops (growing rapidly)'
            }
          ],
          outcomes: {
            soilHealth: [
              'Increased organic matter (2-4% typical increase)',
              'Improved water holding capacity (25-50% increase)',
              'Enhanced nutrient cycling and availability',
              'Greater soil biodiversity and biological activity'
            ],
            productivity: [
              'Yields comparable to conventional after transition',
              'Reduced input costs (fertilizer, pesticide)',
              'Improved drought resilience',
              'Premium prices for sustainable products'
            ],
            environment: [
              'Reduced greenhouse gas emissions',
              'Improved water quality',
              'Enhanced biodiversity',
              'Carbon sequestration in soils'
            ]
          }
        }
      }
    ],
    foodSystems: [
      {
        id: 'food-system-sustainability',
        title: 'Building Sustainable Food Systems',
        level: 'Advanced',
        duration: '22 minutes',
        content: {
          overview: 'Transforming food production, distribution, and consumption for sustainability',
          currentChallenges: [
            {
              challenge: 'Environmental Impact',
              statistics: [
                'Agriculture uses 70% of global freshwater',
                'Food systems produce 24% of greenhouse gas emissions',
                'Agriculture is leading cause of deforestation',
                '33% of soils are degraded from intensive farming'
              ],
              drivers: ['Industrial monocultures', 'Excessive inputs', 'Land conversion']
            },
            {
              challenge: 'Food Security',
              statistics: [
                '828 million people undernourished (2021)',
                '3.1 billion cannot afford healthy diet',
                '40% of population affected by water scarcity',
                'Need 70% more food by 2050 for growing population'
              ],
              drivers: ['Poverty', 'Conflict', 'Climate change', 'Inequality']
            }
          ],
          solutions: [
            {
              approach: 'Agroecology',
              definition: 'Ecological principles applied to agricultural systems',
              practices: [
                'Biological pest control using beneficial insects',
                'Nitrogen fixation through legume integration',
                'Soil fertility through composting and organic matter',
                'Water conservation through mulching and efficient irrigation'
              ],
              benefits: [
                '20-25% yield increase in developing countries',
                '50% reduction in pesticide use',
                'Improved farmer livelihoods and food security',
                'Enhanced ecosystem services and biodiversity'
              ],
              examples: [
                'Push-pull system in East Africa (maize-legume intercropping)',
                'System of Rice Intensification (SRI) in Asia',
                'Integrated pest management in California'
              ]
            },
            {
              approach: 'Alternative Proteins',
              types: [
                'Plant-based proteins (soy, pea, wheat)',
                'Cultivated meat (lab-grown from animal cells)',
                'Fermentation-derived proteins (mycoprotein)',
                'Insect protein (crickets, mealworms)'
              ],
              environmental: [
                '96% less land use than conventional beef',
                '87% less water use',
                '89% fewer greenhouse gas emissions',
                'No antibiotics or growth hormones needed'
              ],
              marketGrowth: [
                '$29.4 billion alternative protein market (2020)',
                'Projected $290 billion by 2035',
                '200+ companies developing cultivated meat',
                'Cost parity expected by 2030'
              ]
            }
          ]
        }
      }
    ]
  },

  // Circular Economy and Waste Management
  circularEconomy: {
    principles: [
      {
        id: 'circular-design-principles',
        title: 'Designing for Circularity',
        level: 'Intermediate',
        duration: '16 minutes',
        content: {
          overview: 'Design strategies that eliminate waste and keep materials in use',
          designStrategies: [
            {
              strategy: 'Design for Durability',
              goal: 'Extend product lifespan through robust construction',
              approaches: [
                'High-quality materials and components',
                'Modular design for easy repair and upgrade',
                'Standardized interfaces and connections',
                'Protective features against wear and damage'
              ],
              examples: [
                'Patagonia lifetime repair guarantee',
                'Fairphone modular smartphone design',
                'Herman Miller office furniture 12-year warranty'
              ],
              benefits: [
                'Reduced material consumption per unit of service',
                'Lower total cost of ownership for users',
                'Decreased waste generation',
                'Enhanced brand reputation and customer loyalty'
              ]
            },
            {
              strategy: 'Design for Disassembly',
              goal: 'Enable easy separation of materials at end-of-life',
              approaches: [
                'Snap-fit connections instead of adhesives',
                'Material identification and marking',
                'Minimize material mixing and composites',
                'Accessible fasteners and joints'
              ],
              examples: [
                'BMW i3 electric car (95% recyclable)',
                'Interface carpet tiles (cradle-to-cradle certified)',
                'Dell OptiPlex computers (tool-free disassembly)'
              ],
              benefits: [
                'Higher material recovery rates (80-95% vs 20-30%)',
                'Lower recycling costs',
                'Preserved material quality',
                'Reduced contamination in recycling streams'
              ]
            }
          ],
          businessModels: [
            {
              model: 'Product-as-a-Service',
              description: 'Customers pay for service/performance, not ownership',
              examples: [
                'Philips lighting-as-a-service (pay per lux)',
                'Michelin tire-as-a-service (pay per kilometer)',
                'Rolls-Royce power-by-the-hour (jet engine service)'
              ],
              benefits: [
                'Incentivizes durability and efficiency',
                'Reduces customer capital expenditure',
                'Predictable revenue streams for providers',
                'Optimized resource utilization'
              ]
            },
            {
              model: 'Sharing Platforms',
              description: 'Maximize utilization of underused assets',
              examples: [
                'Car sharing (Zipcar, Car2Go)',
                'Tool libraries and maker spaces',
                'Clothing rental (Rent the Runway)',
                'Equipment sharing (construction, agriculture)'
              ],
              impact: [
                'One shared car replaces 9-13 private cars',
                '40% reduction in vehicle ownership in sharing cities',
                'Increased access to goods for lower-income users',
                'Reduced manufacturing demand'
              ]
            }
          ]
        }
      }
    ]
  },

  // Interactive Learning Tools
  interactiveTools: [
    {
      id: 'carbon-footprint-calculator',
      title: 'Personal Carbon Footprint Calculator',
      type: 'Calculator',
      description: 'Calculate your annual carbon emissions across different categories',
      categories: [
        {
          name: 'Transportation',
          factors: [
            { item: 'Car (gasoline)', unit: 'miles/year', factor: 0.404, unit_emission: 'kg CO₂/mile' },
            { item: 'Car (electric)', unit: 'miles/year', factor: 0.200, unit_emission: 'kg CO₂/mile' },
            { item: 'Public transit', unit: 'miles/year', factor: 0.089, unit_emission: 'kg CO₂/mile' },
            { item: 'Flights (domestic)', unit: 'flights/year', factor: 1100, unit_emission: 'kg CO₂/flight' },
            { item: 'Flights (international)', unit: 'flights/year', factor: 3300, unit_emission: 'kg CO₂/flight' }
          ]
        },
        {
          name: 'Home Energy',
          factors: [
            { item: 'Electricity', unit: 'kWh/month', factor: 0.4, unit_emission: 'kg CO₂/kWh' },
            { item: 'Natural gas', unit: 'therms/month', factor: 5.3, unit_emission: 'kg CO₂/therm' },
            { item: 'Heating oil', unit: 'gallons/month', factor: 10.2, unit_emission: 'kg CO₂/gallon' }
          ]
        },
        {
          name: 'Diet',
          factors: [
            { item: 'Beef', unit: 'servings/week', factor: 330, unit_emission: 'kg CO₂/year per serving/week' },
            { item: 'Pork', unit: 'servings/week', factor: 140, unit_emission: 'kg CO₂/year per serving/week' },
            { item: 'Chicken', unit: 'servings/week', factor: 52, unit_emission: 'kg CO₂/year per serving/week' },
            { item: 'Fish', unit: 'servings/week', factor: 78, unit_emission: 'kg CO₂/year per serving/week' }
          ]
        }
      ],
      benchmarks: {
        global_average: 4800,
        us_average: 16000,
        eu_average: 8500,
        target_2030: 2300,
        target_2050: 700
      }
    },
    {
      id: 'biodiversity-quiz',
      title: 'Global Biodiversity Challenge',
      type: 'Quiz',
      description: 'Test your knowledge of biodiversity hotspots, endangered species, and conservation',
      questions: [
        {
          question: 'Which biome has the highest biodiversity per unit area?',
          options: ['Tropical rainforest', 'Coral reefs', 'Temperate grasslands', 'Boreal forest'],
          correct: 1,
          explanation: 'Coral reefs support about 25% of all marine species despite covering less than 1% of the ocean floor.',
          difficulty: 'Medium'
        },
        {
          question: 'What percentage of known species are insects?',
          options: ['40%', '60%', '80%', '90%'],
          correct: 2,
          explanation: 'Insects represent about 80% of all known animal species, with over 1 million described species.',
          difficulty: 'Hard'
        }
      ]
    }
  ],

  // Case Studies and Success Stories
  caseStudies: [
    {
      id: 'costa-rica-payments-ecosystem-services',
      title: 'Costa Rica\'s Payment for Ecosystem Services Program',
      category: 'Policy Innovation',
      duration: '20 minutes',
      overview: 'How Costa Rica reversed deforestation through economic incentives',
      background: {
        problem: 'Costa Rica lost 50% of forest cover between 1940-1987',
        causes: ['Cattle ranching expansion', 'Agricultural conversion', 'Logging'],
        turningPoint: '1997 - Payments for Ecosystem Services (PES) program launched'
      },
      solution: {
        mechanism: 'Direct payments to landowners for forest conservation',
        services: ['Carbon sequestration', 'Watershed protection', 'Biodiversity conservation', 'Scenic beauty'],
        funding: ['Fuel tax (3.5%)', 'Water fees', 'International donors', 'Carbon credits'],
        payments: '$640/hectare for forest conservation, $980/hectare for reforestation'
      },
      results: {
        forestCover: 'Increased from 24% (1985) to 54% (2019)',
        carbonStorage: '10 million tons CO₂ sequestered',
        biodiversity: '25% of territory under protection',
        economy: '$4 billion ecotourism industry',
        recognition: 'Became carbon neutral in 2021'
      },
      lessons: [
        'Economic incentives can align conservation with landowner interests',
        'Diversified funding sources ensure program sustainability',
        'Clear measurement and monitoring builds credibility',
        'Political continuity across administrations is crucial',
        'Multiple ecosystem services provide multiple revenue streams'
      ],
      replication: [
        'Mexico: Similar PES program covering 2.6 million hectares',
        'Ecuador: Socio Bosque program protecting 1.6 million hectares',
        'China: World\'s largest PES program covering 32 million hectares'
      ]
    }
  ]
};

// Learning Pathways - Structured Learning Sequences
export const learningPathways = {
  climateBasics: {
    title: 'Climate Science Fundamentals',
    description: 'Build understanding of climate system and human impacts',
    duration: '3-4 hours',
    difficulty: 'Beginner to Intermediate',
    modules: [
      'greenhouse-effect',
      'carbon-cycle',
      'climate-feedbacks',
      'carbon-footprint-calculator'
    ],
    prerequisites: 'Basic science background helpful but not required',
    outcomes: [
      'Understand greenhouse effect and climate forcing',
      'Explain carbon cycle and human perturbation',
      'Identify climate feedback mechanisms',
      'Calculate personal carbon footprint'
    ]
  },
  
  biodiversityConservation: {
    title: 'Biodiversity and Conservation',
    description: 'Explore biodiversity crisis and conservation solutions',
    duration: '4-5 hours',
    difficulty: 'Beginner to Advanced',
    modules: [
      'biodiversity-levels',
      'conservation-strategies',
      'biodiversity-quiz',
      'costa-rica-payments-ecosystem-services'
    ],
    prerequisites: 'Basic ecology knowledge helpful',
    outcomes: [
      'Understand three levels of biodiversity',
      'Evaluate conservation strategies and effectiveness',
      'Analyze successful conservation case studies',
      'Apply conservation principles to local contexts'
    ]
  },

  sustainableTech: {
    title: 'Clean Technology Solutions',
    description: 'Learn about renewable energy and sustainable technologies',
    duration: '5-6 hours',
    difficulty: 'Intermediate to Advanced',
    modules: [
      'photovoltaic-basics',
      'wind-energy-fundamentals',
      'circular-design-principles'
    ],
    prerequisites: 'Basic physics and engineering concepts',
    outcomes: [
      'Understand renewable energy technologies',
      'Evaluate technology performance and economics',
      'Apply circular design principles',
      'Assess technology sustainability impacts'
    ]
  }
};

export default educationalContent;