// Comprehensive Species Database - Global Biodiversity Reference
export const speciesDatabase = {
  // Birds - Major Species by Region
  birds: {
    northAmerica: [
      {
        id: 'AMRO',
        commonName: 'American Robin',
        scientificName: 'Turdus migratorius',
        family: 'Turdidae',
        habitat: ['Forests', 'Parks', 'Gardens', 'Suburban areas'],
        diet: 'Omnivore - earthworms, insects, fruits',
        conservationStatus: 'Least Concern',
        population: '370 million',
        wingspan: '31-40 cm',
        weight: '77 grams average',
        lifespan: '13 years maximum',
        breeding: 'March-July, 2-3 broods per year',
        migration: 'Partial migrant - northern populations migrate south',
        callDescription: 'Cheerful warbling song, "cheerily-cheer-up-cheerio"',
        threats: ['Window strikes', 'Pesticides', 'Climate change'],
        funFacts: [
          'State bird of Connecticut, Michigan, and Wisconsin',
          'Can see magnetic fields to navigate during migration',
          'Males arrive at breeding grounds before females'
        ]
      },
      {
        id: 'NOCA',
        commonName: 'Northern Cardinal',
        scientificName: 'Cardinalis cardinalis',
        family: 'Cardinalidae',
        habitat: ['Woodlands', 'Gardens', 'Shrublands', 'Swamps'],
        diet: 'Omnivore - seeds, grains, fruits, insects',
        conservationStatus: 'Least Concern',
        population: '120 million',
        wingspan: '25-31 cm',
        weight: '45 grams average',
        lifespan: '15 years maximum',
        breeding: 'March-September, 2-3 broods per year',
        migration: 'Non-migratory resident',
        callDescription: 'Clear whistles: "birdy-birdy-birdy" or "cheer-cheer-cheer"',
        threats: ['Habitat loss', 'Window strikes', 'Domestic cats'],
        funFacts: [
          'State bird of 7 US states',
          'Males are bright red, females are brown with red tinges',
          'Both sexes sing year-round'
        ]
      }
    ],
    europe: [
      {
        id: 'EURU',
        commonName: 'European Robin',
        scientificName: 'Erithacus rubecula',
        family: 'Muscicapidae',
        habitat: ['Forests', 'Parks', 'Gardens', 'Hedgerows'],
        diet: 'Omnivore - insects, worms, seeds, fruits',
        conservationStatus: 'Least Concern',
        population: '200 million',
        wingspan: '20-22 cm',
        weight: '16-22 grams',
        lifespan: '13 years maximum',
        breeding: 'March-July, 2-3 broods per year',
        migration: 'Partial migrant - northern populations migrate',
        callDescription: 'Melodic warbling song, sharp "tic" alarm call',
        threats: ['Habitat fragmentation', 'Climate change', 'Predation'],
        funFacts: [
          'National bird of the United Kingdom',
          'Highly territorial, will fight their own reflection',
          'Associated with Christmas in British culture'
        ]
      }
    ]
  },

  // Mammals - Global Species
  mammals: {
    africa: [
      {
        id: 'AFELE',
        commonName: 'African Elephant',
        scientificName: 'Loxodonta africana',
        family: 'Elephantidae',
        habitat: ['Savannas', 'Forests', 'Deserts', 'Marshes'],
        diet: 'Herbivore - grasses, fruits, bark, roots',
        conservationStatus: 'Endangered',
        population: '415,000 individuals',
        weight: '4,000-7,000 kg',
        height: '3-4 meters',
        lifespan: '60-70 years',
        breeding: '22-month gestation, single calf',
        socialStructure: 'Matriarchal herds of 8-12 individuals',
        threats: ['Poaching for ivory', 'Habitat loss', 'Human-wildlife conflict'],
        keyFeatures: ['Largest land mammal', 'Complex social behavior', 'Keystone species'],
        funFacts: [
          'Can consume 150-300 kg of vegetation daily',
          'Communicate through infrasonic calls',
          'Show empathy and mourn their dead'
        ]
      },
      {
        id: 'LION',
        commonName: 'African Lion',
        scientificName: 'Panthera leo',
        family: 'Felidae',
        habitat: ['Savannas', 'Grasslands', 'Semi-deserts'],
        diet: 'Carnivore - large ungulates, buffalo, zebra',
        conservationStatus: 'Vulnerable',
        population: '23,000-39,000 individuals',
        weight: '120-250 kg (males), 110-180 kg (females)',
        length: '1.4-2.5 meters',
        lifespan: '10-14 years in wild',
        breeding: '110-day gestation, 1-4 cubs',
        socialStructure: 'Prides of 10-15 individuals',
        threats: ['Habitat loss', 'Human-wildlife conflict', 'Prey depletion'],
        keyFeatures: ['Apex predator', 'Social hunting', 'Male manes'],
        funFacts: [
          'Only truly social cat species',
          'Males can eat 40 kg of meat in one feeding',
          'Roar can be heard 8 km away'
        ]
      }
    ],
    northAmerica: [
      {
        id: 'GRBE',
        commonName: 'Grizzly Bear',
        scientificName: 'Ursus arctos horribilis',
        family: 'Ursidae',
        habitat: ['Forests', 'Alpine meadows', 'Tundra'],
        diet: 'Omnivore - fish, berries, roots, small mammals',
        conservationStatus: 'Least Concern (globally), Threatened (US)',
        population: '55,000 in North America',
        weight: '200-300 kg (males), 130-180 kg (females)',
        length: '2-3 meters',
        lifespan: '20-25 years',
        breeding: '6-8 month gestation, 1-3 cubs',
        hibernation: '5-7 months in winter dens',
        threats: ['Habitat fragmentation', 'Human encounters', 'Climate change'],
        keyFeatures: ['Powerful build', 'Excellent sense of smell', 'Seasonal hibernation'],
        funFacts: [
          'Can run up to 55 km/h',
          'Sense of smell 7 times better than bloodhound',
          'Can live 30+ years in captivity'
        ]
      }
    ]
  },

  // Marine Life
  marineLife: {
    whales: [
      {
        id: 'BLWH',
        commonName: 'Blue Whale',
        scientificName: 'Balaenoptera musculus',
        family: 'Balaenopteridae',
        habitat: ['Open oceans', 'Deep waters'],
        diet: 'Filter feeder - primarily krill',
        conservationStatus: 'Endangered',
        population: '10,000-25,000 individuals',
        weight: '100-200 tonnes',
        length: '24-30 meters',
        lifespan: '80-90 years',
        breeding: '10-12 month gestation, single calf',
        migration: 'Long-distance seasonal migrations',
        threats: ['Ship strikes', 'Entanglement', 'Ocean noise', 'Climate change'],
        keyFeatures: ['Largest animal ever known', 'Heart size of small car', 'Loud vocalizations'],
        funFacts: [
          'Tongue can weigh as much as an elephant',
          'Can consume 4 tons of krill per day',
          'Calls can travel hundreds of kilometers underwater'
        ]
      },
      {
        id: 'HUWH',
        commonName: 'Humpback Whale',
        scientificName: 'Megaptera novaeangliae',
        family: 'Balaenopteridae',
        habitat: ['Oceans worldwide', 'Coastal waters'],
        diet: 'Filter feeder - krill, small schooling fish',
        conservationStatus: 'Least Concern',
        population: '80,000 individuals',
        weight: '25-40 tonnes',
        length: '12-16 meters',
        lifespan: '45-100 years',
        breeding: '11-month gestation, single calf',
        migration: 'Up to 25,000 km annually - longest of any mammal',
        threats: ['Entanglement', 'Ship strikes', 'Ocean noise'],
        keyFeatures: ['Complex songs', 'Acrobatic breaching', 'Long pectoral fins'],
        funFacts: [
          'Songs can last 30 minutes and repeat for hours',
          'Males sing complex songs during breeding season',
          'Can breach completely out of water despite massive size'
        ]
      }
    ],
    sharks: [
      {
        id: 'GWSH',
        commonName: 'Great White Shark',
        scientificName: 'Carcharodon carcharias',
        family: 'Lamnidae',
        habitat: ['Coastal waters', 'Continental shelves'],
        diet: 'Carnivore - seals, sea lions, fish, rays',
        conservationStatus: 'Vulnerable',
        population: '3,000-5,000 individuals',
        weight: '680-1,100 kg',
        length: '4-6 meters',
        lifespan: '70+ years',
        breeding: '11-month gestation, 2-10 pups',
        behavior: 'Solitary, highly migratory',
        threats: ['Overfishing', 'Bycatch', 'Habitat degradation'],
        keyFeatures: ['Apex predator', 'Powerful bite force', 'Excellent senses'],
        funFacts: [
          'Can detect blood from 5 km away',
          'Bite force of 1.8 tonnes per square inch',
          'Can breach 3 meters out of water when hunting'
        ]
      }
    ]
  },

  // Insects and Pollinators
  insects: {
    bees: [
      {
        id: 'HOBE',
        commonName: 'Honey Bee',
        scientificName: 'Apis mellifera',
        family: 'Apidae',
        habitat: ['Diverse - forests, meadows, gardens, agricultural areas'],
        diet: 'Nectar and pollen from flowers',
        conservationStatus: 'Managed species - wild populations declining',
        population: 'Billions in managed hives worldwide',
        weight: '0.1 grams',
        length: '12-15 mm',
        lifespan: '6 weeks (workers), 2-5 years (queen)',
        breeding: 'Eusocial - queen lays up to 2,000 eggs daily',
        socialStructure: 'Colonies of 20,000-80,000 individuals',
        threats: ['Varroa mites', 'Pesticides', 'Habitat loss', 'Climate change'],
        keyFeatures: ['Waggle dance communication', 'Wax production', 'Pollination services'],
        economicValue: '$15 billion annual pollination value in US',
        funFacts: [
          'Visit 2 million flowers to make 1 pound of honey',
          'Flap wings 230 times per second',
          'Can see ultraviolet patterns on flowers'
        ]
      },
      {
        id: 'BUMB',
        commonName: 'Bumblebee',
        scientificName: 'Bombus species',
        family: 'Apidae',
        habitat: ['Temperate regions - meadows, gardens, forests'],
        diet: 'Nectar and pollen',
        conservationStatus: 'Various - some species endangered',
        population: '250+ species worldwide',
        weight: '0.1-1.0 grams',
        length: '15-25 mm',
        lifespan: '28 days (workers), 1 year (queen)',
        breeding: 'Annual colonies of 50-400 individuals',
        specialization: 'Buzz pollination for tomatoes, blueberries',
        threats: ['Habitat loss', 'Pesticides', 'Climate change', 'Disease'],
        keyFeatures: ['Fuzzy bodies', 'Cold tolerance', 'Buzz pollination'],
        funFacts: [
          'Can fly in temperatures as low as 0°C',
          'Generate heat by vibrating flight muscles',
          'Some species are cuckoo parasites'
        ]
      }
    ],
    butterflies: [
      {
        id: 'MONA',
        commonName: 'Monarch Butterfly',
        scientificName: 'Danaus plexippus',
        family: 'Nymphalidae',
        habitat: ['Milkweed habitats', 'Gardens', 'Fields', 'Roadsides'],
        diet: 'Larvae: milkweed plants; Adults: nectar from various flowers',
        conservationStatus: 'Endangered (IUCN 2022)',
        population: '35 million (80% decline since 1980s)',
        wingspan: '8.9-10.2 cm',
        weight: '0.27-0.75 grams',
        lifespan: '6-8 weeks (most generations), 6-8 months (overwintering)',
        breeding: '4 generations per year in North America',
        migration: 'Up to 4,800 km from Canada to Mexico',
        threats: ['Habitat loss', 'Pesticides', 'Climate change', 'Deforestation'],
        keyFeatures: ['Multi-generational migration', 'Toxic to predators', 'Navigation abilities'],
        funFacts: [
          'No individual completes full migration cycle',
          'Use magnetic fields and sun position to navigate',
          'Overwintering population clusters in Mexican forests'
        ]
      }
    ]
  }
};

// Conservation Status Definitions
export const conservationStatuses = {
  'Extinct': {
    code: 'EX',
    description: 'No known individuals remaining',
    color: '#000000',
    urgency: 'Too late'
  },
  'Extinct in the Wild': {
    code: 'EW',
    description: 'Only survives in captivity',
    color: '#542344',
    urgency: 'Critical'
  },
  'Critically Endangered': {
    code: 'CR',
    description: 'Extremely high risk of extinction',
    color: '#D81E05',
    urgency: 'Critical'
  },
  'Endangered': {
    code: 'EN',
    description: 'High risk of extinction',
    color: '#FC7F3F',
    urgency: 'High'
  },
  'Vulnerable': {
    code: 'VU',
    description: 'High risk of endangerment',
    color: '#F9E71E',
    urgency: 'Medium'
  },
  'Near Threatened': {
    code: 'NT',
    description: 'Likely to become threatened soon',
    color: '#CCE226',
    urgency: 'Low'
  },
  'Least Concern': {
    code: 'LC',
    description: 'Lowest risk category',
    color: '#60C659',
    urgency: 'Stable'
  },
  'Data Deficient': {
    code: 'DD',
    description: 'Insufficient data for assessment',
    color: '#D1D1C6',
    urgency: 'Unknown'
  }
};

// Habitat Types and Characteristics
export const habitatTypes = {
  'Tropical Rainforest': {
    description: 'Dense, warm, wet forests near equator',
    biodiversity: 'Highest terrestrial biodiversity',
    threats: ['Deforestation', 'Agriculture', 'Mining'],
    keySpecies: ['Jaguars', 'Toucans', 'Poison dart frogs'],
    area: '6% of Earth\'s surface',
    carbonStorage: '25% of terrestrial carbon'
  },
  'Temperate Forest': {
    description: 'Deciduous and mixed forests in moderate climates',
    biodiversity: 'High diversity of trees and mammals',
    threats: ['Logging', 'Urban development', 'Fragmentation'],
    keySpecies: ['Bears', 'Deer', 'Woodpeckers'],
    area: '7% of Earth\'s surface',
    carbonStorage: '20% of terrestrial carbon'
  },
  'Grasslands': {
    description: 'Open areas dominated by grasses',
    biodiversity: 'High diversity of grazing animals',
    threats: ['Agriculture', 'Overgrazing', 'Development'],
    keySpecies: ['Bison', 'Prairie dogs', 'Grassland birds'],
    area: '40% of Earth\'s land surface',
    carbonStorage: 'Significant soil carbon storage'
  },
  'Wetlands': {
    description: 'Areas where water covers soil seasonally or permanently',
    biodiversity: 'Extremely high productivity and diversity',
    threats: ['Drainage', 'Pollution', 'Development'],
    keySpecies: ['Waterfowl', 'Amphibians', 'Fish'],
    area: '6% of Earth\'s surface',
    services: 'Water filtration, flood control, carbon storage'
  },
  'Coral Reefs': {
    description: 'Marine ecosystems built by coral polyps',
    biodiversity: '25% of marine species in <1% of ocean area',
    threats: ['Bleaching', 'Acidification', 'Pollution'],
    keySpecies: ['Reef fish', 'Sea turtles', 'Sharks'],
    area: '284,300 km² globally',
    services: 'Coastal protection, fisheries, tourism'
  }
};

export default speciesDatabase;