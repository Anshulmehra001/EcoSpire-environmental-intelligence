/**
 * Egyptian Species Database
 * Comprehensive database of Egyptian flora and fauna with acoustic signatures
 */

export const egyptianSpeciesDatabase = {
  birds: {
    'Hooded Crow': {
      scientificName: 'Corvus cornix',
      arabicName: 'غراب رمادي',
      habitat: ['Urban', 'Agricultural', 'Desert edge'],
      frequency: [800, 1800],
      callPattern: 'Harsh cawing, 2-4 syllables',
      seasonality: 'Year-round resident',
      abundance: 'Very common',
      conservationStatus: 'Least Concern',
      description: 'Large, intelligent corvid with gray body and black head. Extremely adaptable to urban environments.',
      audioFeatures: {
        dominantFreq: [1000, 1400],
        harmonicity: 0.3,
        roughness: 0.8,
        duration: [0.5, 2.0]
      }
    },
    'House Sparrow': {
      scientificName: 'Passer domesticus',
      arabicName: 'عصفور المنازل',
      habitat: ['Urban', 'Suburban', 'Agricultural'],
      frequency: [2000, 4000],
      callPattern: 'Chirping, chattering in groups',
      seasonality: 'Year-round resident',
      abundance: 'Very common',
      conservationStatus: 'Least Concern',
      description: 'Small brown and gray songbird, highly social and closely associated with human habitation.',
      audioFeatures: {
        dominantFreq: [2500, 3500],
        harmonicity: 0.7,
        roughness: 0.4,
        duration: [0.2, 1.0]
      }
    },
    'Laughing Dove': {
      scientificName: 'Spilopelia senegalensis',
      arabicName: 'يمامة ضاحكة',
      habitat: ['Urban', 'Oasis', 'Agricultural'],
      frequency: [1000, 2500],
      callPattern: 'Rhythmic cooing, 5-6 notes',
      seasonality: 'Year-round resident',
      abundance: 'Common',
      conservationStatus: 'Least Concern',
      description: 'Small dove with distinctive spotted neck pattern. Common in gardens and urban areas.',
      audioFeatures: {
        dominantFreq: [1200, 2000],
        harmonicity: 0.6,
        roughness: 0.3,
        duration: [1.0, 3.0]
      }
    },
    'Common Bulbul': {
      scientificName: 'Pycnonotus barbatus',
      arabicName: 'بلبل شائع',
      habitat: ['Gardens', 'Urban parks', 'Oasis'],
      frequency: [1500, 4000],
      callPattern: 'Melodious warbling, varied phrases',
      seasonality: 'Year-round resident',
      abundance: 'Common',
      conservationStatus: 'Least Concern',
      description: 'Medium-sized songbird with distinctive black head and yellow undertail coverts.',
      audioFeatures: {
        dominantFreq: [2000, 3000],
        harmonicity: 0.8,
        roughness: 0.2,
        duration: [0.5, 2.5]
      }
    },
    'White Wagtail': {
      scientificName: 'Motacilla alba',
      arabicName: 'ذعرة بيضاء',
      habitat: ['Wetlands', 'Urban', 'Agricultural'],
      frequency: [3000, 6000],
      callPattern: 'Sharp chips and trills',
      seasonality: 'Winter visitor, some residents',
      abundance: 'Common',
      conservationStatus: 'Least Concern',
      description: 'Slender black and white bird with long tail, often seen near water.',
      audioFeatures: {
        dominantFreq: [4000, 5000],
        harmonicity: 0.5,
        roughness: 0.6,
        duration: [0.1, 0.5]
      }
    },
    'Little Egret': {
      scientificName: 'Egretta garzetta',
      arabicName: 'بلشون صغير',
      habitat: ['Wetlands', 'Nile', 'Coastal'],
      frequency: [1000, 3000],
      callPattern: 'Harsh croaks, usually silent',
      seasonality: 'Year-round resident',
      abundance: 'Common',
      conservationStatus: 'Least Concern',
      description: 'Medium-sized white heron with black bill and legs, yellow feet.',
      audioFeatures: {
        dominantFreq: [1500, 2500],
        harmonicity: 0.2,
        roughness: 0.9,
        duration: [0.3, 1.0]
      }
    },
    'Cattle Egret': {
      scientificName: 'Bubulcus ibis',
      arabicName: 'بلشون الماشية',
      habitat: ['Agricultural', 'Wetlands', 'Urban'],
      frequency: [800, 2000],
      callPattern: 'Low croaks and grunts',
      seasonality: 'Year-round resident',
      abundance: 'Very common',
      conservationStatus: 'Least Concern',
      description: 'Small white heron often seen with livestock, feeding on insects.',
      audioFeatures: {
        dominantFreq: [1000, 1800],
        harmonicity: 0.3,
        roughness: 0.7,
        duration: [0.2, 0.8]
      }
    },
    'Pied Kingfisher': {
      scientificName: 'Ceryle rudis',
      arabicName: 'رفراف أبقع',
      habitat: ['Nile', 'Wetlands', 'Coastal'],
      frequency: [2000, 5000],
      callPattern: 'Rattling trill, mechanical sound',
      seasonality: 'Year-round resident',
      abundance: 'Common',
      conservationStatus: 'Least Concern',
      description: 'Black and white kingfisher, excellent fisher, hovers over water.',
      audioFeatures: {
        dominantFreq: [3000, 4000],
        harmonicity: 0.4,
        roughness: 0.8,
        duration: [0.5, 2.0]
      }
    },
    'Common Kestrel': {
      scientificName: 'Falco tinnunculus',
      arabicName: 'عوسق شائع',
      habitat: ['Urban', 'Desert', 'Agricultural'],
      frequency: [2000, 4000],
      callPattern: 'Shrill klee-klee-klee calls',
      seasonality: 'Year-round resident',
      abundance: 'Fairly common',
      conservationStatus: 'Least Concern',
      description: 'Small falcon, often hovers while hunting, reddish-brown plumage.',
      audioFeatures: {
        dominantFreq: [2500, 3500],
        harmonicity: 0.6,
        roughness: 0.5,
        duration: [0.3, 1.5]
      }
    }
  },

  plants: {
    'Phoenix dactylifera': {
      commonName: 'Date Palm',
      arabicName: 'نخلة التمر',
      family: 'Arecaceae',
      habitat: ['Oasis', 'Cultivated', 'Urban'],
      nativeStatus: 'Native',
      conservationStatus: 'Least Concern',
      uses: ['Food', 'Construction', 'Ornamental'],
      description: 'Iconic palm tree of Egypt, source of dates and various materials.',
      identificationFeatures: {
        leaves: 'Pinnate, blue-green, 3-5m long',
        trunk: 'Tall, fibrous, single stem',
        fruit: 'Dates in large clusters',
        height: '15-25 meters'
      },
      ecologicalRole: 'Provides shade, prevents desertification',
      culturalSignificance: 'Sacred tree in ancient Egypt, symbol of life'
    },
    'Ficus sycomorus': {
      commonName: 'Sycamore Fig',
      arabicName: 'جميز',
      family: 'Moraceae',
      habitat: ['Riverine', 'Urban', 'Cultivated'],
      nativeStatus: 'Native',
      conservationStatus: 'Least Concern',
      uses: ['Shade', 'Timber', 'Food'],
      description: 'Large deciduous tree, sacred to ancient Egyptians.',
      identificationFeatures: {
        leaves: 'Heart-shaped, rough texture, 10-20cm',
        trunk: 'Massive, smooth bark when young',
        fruit: 'Small figs directly on trunk',
        height: '15-20 meters'
      },
      ecologicalRole: 'Important shade tree, supports wildlife',
      culturalSignificance: 'Sacred to goddess Hathor, mummification wood'
    },
    'Acacia nilotica': {
      commonName: 'Gum Arabic Tree',
      arabicName: 'سنط نيلي',
      family: 'Fabaceae',
      habitat: ['Savanna', 'Desert edge', 'Riverine'],
      nativeStatus: 'Native',
      conservationStatus: 'Least Concern',
      uses: ['Gum arabic', 'Timber', 'Medicine'],
      description: 'Thorny acacia tree, source of gum arabic.',
      identificationFeatures: {
        leaves: 'Bipinnate, small leaflets',
        trunk: 'Dark bark, thorny branches',
        flowers: 'Yellow spherical clusters',
        height: '5-20 meters'
      },
      ecologicalRole: 'Nitrogen fixation, drought resistant',
      culturalSignificance: 'Traditional medicine, ancient perfumes'
    },
    'Bougainvillea spectabilis': {
      commonName: 'Bougainvillea',
      arabicName: 'جهنمية',
      family: 'Nyctaginaceae',
      habitat: ['Urban', 'Gardens', 'Cultivated'],
      nativeStatus: 'Introduced',
      conservationStatus: 'Not evaluated',
      uses: ['Ornamental', 'Hedge', 'Landscaping'],
      description: 'Colorful climbing shrub, popular in Egyptian gardens.',
      identificationFeatures: {
        leaves: 'Ovate, alternate, 4-13cm',
        flowers: 'Colorful bracts (pink, purple, red)',
        thorns: 'Sharp curved thorns',
        height: '1-12 meters (climbing)'
      },
      ecologicalRole: 'Attracts pollinators, provides cover',
      culturalSignificance: 'Modern ornamental, symbol of beauty'
    },
    'Nerium oleander': {
      commonName: 'Oleander',
      arabicName: 'دفلة',
      family: 'Apocynaceae',
      habitat: ['Urban', 'Mediterranean', 'Cultivated'],
      nativeStatus: 'Introduced',
      conservationStatus: 'Least Concern',
      uses: ['Ornamental', 'Hedge'],
      description: 'Evergreen shrub with beautiful but toxic flowers.',
      identificationFeatures: {
        leaves: 'Lanceolate, leathery, 5-21cm',
        flowers: 'Pink or white, 5-petaled',
        fruit: 'Long narrow pods',
        height: '2-6 meters'
      },
      ecologicalRole: 'Drought tolerant, erosion control',
      culturalSignificance: 'Symbol of beauty and danger',
      warning: 'Highly toxic - all parts poisonous'
    },
    'Tamarix nilotica': {
      commonName: 'Tamarisk',
      arabicName: 'طرفة نيلية',
      family: 'Tamaricaceae',
      habitat: ['Saline', 'Desert', 'Coastal'],
      nativeStatus: 'Native',
      conservationStatus: 'Least Concern',
      uses: ['Windbreak', 'Erosion control', 'Fuel'],
      description: 'Salt-tolerant shrub, important for desert reclamation.',
      identificationFeatures: {
        leaves: 'Scale-like, blue-green',
        flowers: 'Pink spikes in spring',
        bark: 'Reddish-brown, furrowed',
        height: '1-8 meters'
      },
      ecologicalRole: 'Salt tolerance, soil stabilization',
      culturalSignificance: 'Desert survival, traditional uses'
    },
    'Ziziphus spina-christi': {
      commonName: "Christ's Thorn",
      arabicName: 'سدر',
      family: 'Rhamnaceae',
      habitat: ['Desert', 'Wadis', 'Oasis'],
      nativeStatus: 'Native',
      conservationStatus: 'Least Concern',
      uses: ['Medicine', 'Food', 'Shade'],
      description: 'Sacred thorny tree, extremely drought resistant.',
      identificationFeatures: {
        leaves: 'Oval, 3-veined, 2-7cm',
        thorns: 'Paired, one straight, one curved',
        fruit: 'Small drupes, edible',
        height: '2-17 meters'
      },
      ecologicalRole: 'Desert adaptation, wildlife food',
      culturalSignificance: 'Sacred tree, mentioned in religious texts'
    },
    'Balanites aegyptiaca': {
      commonName: 'Desert Date',
      arabicName: 'هجليج',
      family: 'Zygophyllaceae',
      habitat: ['Desert', 'Savanna', 'Arid regions'],
      nativeStatus: 'Native',
      conservationStatus: 'Least Concern',
      uses: ['Food', 'Medicine', 'Oil'],
      description: 'Multi-purpose desert tree, all parts useful.',
      identificationFeatures: {
        leaves: 'Compound, 2 leaflets',
        thorns: 'Long, sharp spines',
        fruit: 'Date-like drupes',
        height: '5-10 meters'
      },
      ecologicalRole: 'Desert ecosystem keystone species',
      culturalSignificance: 'Traditional medicine, desert survival'
    }
  },

  ecosystems: {
    'Nile Valley': {
      description: 'Fertile agricultural region along the Nile River',
      dominantSpecies: ['Cattle Egret', 'Little Egret', 'House Sparrow', 'Ficus sycomorus'],
      threats: ['Pollution', 'Urbanization', 'Agricultural intensification'],
      conservation: 'Protected wetlands, sustainable agriculture'
    },
    'Eastern Desert': {
      description: 'Arid mountainous region between Nile and Red Sea',
      dominantSpecies: ['Common Kestrel', 'Hooded Crow', 'Acacia nilotica', 'Balanites aegyptiaca'],
      threats: ['Mining', 'Overgrazing', 'Climate change'],
      conservation: 'Protected areas, sustainable tourism'
    },
    'Western Desert': {
      description: 'Vast arid region with scattered oases',
      dominantSpecies: ['Phoenix dactylifera', 'Ziziphus spina-christi', 'Tamarix nilotica'],
      threats: ['Desertification', 'Water scarcity', 'Development'],
      conservation: 'Oasis protection, water management'
    },
    'Mediterranean Coast': {
      description: 'Coastal region with Mediterranean climate',
      dominantSpecies: ['White Wagtail', 'Nerium oleander', 'Tamarix nilotica'],
      threats: ['Coastal development', 'Pollution', 'Sea level rise'],
      conservation: 'Marine protected areas, coastal management'
    },
    'Urban Cairo': {
      description: 'Highly urbanized environment with adapted species',
      dominantSpecies: ['Hooded Crow', 'House Sparrow', 'Bougainvillea spectabilis'],
      threats: ['Air pollution', 'Habitat loss', 'Urban heat island'],
      conservation: 'Green spaces, urban planning, pollution control'
    }
  },

  seasonalPatterns: {
    winter: {
      months: ['December', 'January', 'February'],
      birdActivity: 'High - many winter visitors',
      plantActivity: 'Moderate - some flowering',
      bestRecordingTimes: ['7:00-9:00 AM', '4:00-6:00 PM']
    },
    spring: {
      months: ['March', 'April', 'May'],
      birdActivity: 'Very High - breeding season',
      plantActivity: 'High - flowering and growth',
      bestRecordingTimes: ['5:30-8:00 AM', '5:00-7:00 PM']
    },
    summer: {
      months: ['June', 'July', 'August'],
      birdActivity: 'Moderate - heat stress',
      plantActivity: 'Low - drought dormancy',
      bestRecordingTimes: ['5:00-7:00 AM', '6:00-8:00 PM']
    },
    autumn: {
      months: ['September', 'October', 'November'],
      birdActivity: 'High - migration period',
      plantActivity: 'Moderate - post-summer recovery',
      bestRecordingTimes: ['6:00-8:00 AM', '4:30-6:30 PM']
    }
  },

  conservationPriorities: {
    'Wetland Protection': {
      importance: 'Critical',
      species: ['Little Egret', 'Pied Kingfisher', 'White Wagtail'],
      actions: ['Pollution control', 'Habitat restoration', 'Water management']
    },
    'Urban Biodiversity': {
      importance: 'High',
      species: ['House Sparrow', 'Common Bulbul', 'Bougainvillea'],
      actions: ['Green corridors', 'Native plantings', 'Pollution reduction']
    },
    'Desert Conservation': {
      importance: 'High',
      species: ['Acacia nilotica', 'Balanites aegyptiaca', 'Ziziphus spina-christi'],
      actions: ['Sustainable grazing', 'Water conservation', 'Protected areas']
    },
    'Cultural Heritage': {
      importance: 'High',
      species: ['Phoenix dactylifera', 'Ficus sycomorus'],
      actions: ['Traditional knowledge preservation', 'Sustainable use', 'Genetic conservation']
    }
  }
};

/**
 * Get species information by name
 */
export function getSpeciesInfo(speciesName, category = 'birds') {
  return egyptianSpeciesDatabase[category][speciesName] || null;
}

/**
 * Search species by habitat
 */
export function getSpeciesByHabitat(habitat) {
  const results = { birds: [], plants: [] };
  
  for (const [name, data] of Object.entries(egyptianSpeciesDatabase.birds)) {
    if (data.habitat.includes(habitat)) {
      results.birds.push({ name, ...data });
    }
  }
  
  for (const [name, data] of Object.entries(egyptianSpeciesDatabase.plants)) {
    if (data.habitat.includes(habitat)) {
      results.plants.push({ name, ...data });
    }
  }
  
  return results;
}

/**
 * Get seasonal information
 */
export function getSeasonalInfo(month) {
  const monthNum = new Date(Date.parse(month + " 1, 2024")).getMonth();
  
  if (monthNum >= 11 || monthNum <= 1) return egyptianSpeciesDatabase.seasonalPatterns.winter;
  if (monthNum >= 2 && monthNum <= 4) return egyptianSpeciesDatabase.seasonalPatterns.spring;
  if (monthNum >= 5 && monthNum <= 7) return egyptianSpeciesDatabase.seasonalPatterns.summer;
  return egyptianSpeciesDatabase.seasonalPatterns.autumn;
}

/**
 * Get conservation priorities
 */
export function getConservationPriorities() {
  return egyptianSpeciesDatabase.conservationPriorities;
}

export default egyptianSpeciesDatabase;