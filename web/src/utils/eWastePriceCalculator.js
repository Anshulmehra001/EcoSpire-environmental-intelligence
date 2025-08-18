/**
 * E-WASTE PRICE CALCULATOR
 * Simple, accurate pricing based on device specifications
 */

export const deviceDatabase = {
  smartphones: {
    brands: {
      'Apple': {
        models: {
          'iPhone 15 Pro Max': { basePrice: 800, releaseYear: 2023 },
          'iPhone 15 Pro': { basePrice: 700, releaseYear: 2023 },
          'iPhone 15': { basePrice: 500, releaseYear: 2023 },
          'iPhone 14 Pro Max': { basePrice: 650, releaseYear: 2022 },
          'iPhone 14 Pro': { basePrice: 550, releaseYear: 2022 },
          'iPhone 14': { basePrice: 400, releaseYear: 2022 },
          'iPhone 13 Pro Max': { basePrice: 500, releaseYear: 2021 },
          'iPhone 13 Pro': { basePrice: 450, releaseYear: 2021 },
          'iPhone 13': { basePrice: 350, releaseYear: 2021 },
          'iPhone 12 Pro Max': { basePrice: 400, releaseYear: 2020 },
          'iPhone 12 Pro': { basePrice: 350, releaseYear: 2020 },
          'iPhone 12': { basePrice: 280, releaseYear: 2020 },
          'iPhone 11 Pro Max': { basePrice: 300, releaseYear: 2019 },
          'iPhone 11 Pro': { basePrice: 250, releaseYear: 2019 },
          'iPhone 11': { basePrice: 200, releaseYear: 2019 },
          'iPhone XS Max': { basePrice: 200, releaseYear: 2018 },
          'iPhone XS': { basePrice: 180, releaseYear: 2018 },
          'iPhone XR': { basePrice: 150, releaseYear: 2018 },
          'iPhone X': { basePrice: 120, releaseYear: 2017 },
          'iPhone 8 Plus': { basePrice: 100, releaseYear: 2017 },
          'iPhone 8': { basePrice: 80, releaseYear: 2017 },
          'iPhone 7 Plus': { basePrice: 70, releaseYear: 2016 },
          'iPhone 7': { basePrice: 50, releaseYear: 2016 }
        }
      },
      'Samsung': {
        models: {
          'Galaxy S24 Ultra': { basePrice: 600, releaseYear: 2024 },
          'Galaxy S24+': { basePrice: 500, releaseYear: 2024 },
          'Galaxy S24': { basePrice: 400, releaseYear: 2024 },
          'Galaxy S23 Ultra': { basePrice: 500, releaseYear: 2023 },
          'Galaxy S23+': { basePrice: 400, releaseYear: 2023 },
          'Galaxy S23': { basePrice: 320, releaseYear: 2023 },
          'Galaxy S22 Ultra': { basePrice: 400, releaseYear: 2022 },
          'Galaxy S22+': { basePrice: 320, releaseYear: 2022 },
          'Galaxy S22': { basePrice: 250, releaseYear: 2022 },
          'Galaxy S21 Ultra': { basePrice: 350, releaseYear: 2021 },
          'Galaxy S21+': { basePrice: 280, releaseYear: 2021 },
          'Galaxy S21': { basePrice: 220, releaseYear: 2021 },
          'Galaxy Note 20 Ultra': { basePrice: 300, releaseYear: 2020 },
          'Galaxy Note 20': { basePrice: 250, releaseYear: 2020 },
          'Galaxy S20 Ultra': { basePrice: 280, releaseYear: 2020 },
          'Galaxy S20+': { basePrice: 220, releaseYear: 2020 },
          'Galaxy S20': { basePrice: 180, releaseYear: 2020 },
          'Galaxy Note 10+': { basePrice: 200, releaseYear: 2019 },
          'Galaxy Note 10': { basePrice: 170, releaseYear: 2019 },
          'Galaxy S10+': { basePrice: 150, releaseYear: 2019 },
          'Galaxy S10': { basePrice: 120, releaseYear: 2019 }
        }
      },
      'Google': {
        models: {
          'Pixel 8 Pro': { basePrice: 450, releaseYear: 2023 },
          'Pixel 8': { basePrice: 350, releaseYear: 2023 },
          'Pixel 7 Pro': { basePrice: 350, releaseYear: 2022 },
          'Pixel 7': { basePrice: 280, releaseYear: 2022 },
          'Pixel 6 Pro': { basePrice: 280, releaseYear: 2021 },
          'Pixel 6': { basePrice: 220, releaseYear: 2021 },
          'Pixel 5': { basePrice: 150, releaseYear: 2020 },
          'Pixel 4 XL': { basePrice: 120, releaseYear: 2019 },
          'Pixel 4': { basePrice: 100, releaseYear: 2019 }
        }
      },
      'OnePlus': {
        models: {
          'OnePlus 12': { basePrice: 400, releaseYear: 2024 },
          'OnePlus 11': { basePrice: 320, releaseYear: 2023 },
          'OnePlus 10 Pro': { basePrice: 280, releaseYear: 2022 },
          'OnePlus 9 Pro': { basePrice: 220, releaseYear: 2021 },
          'OnePlus 9': { basePrice: 180, releaseYear: 2021 },
          'OnePlus 8 Pro': { basePrice: 150, releaseYear: 2020 },
          'OnePlus 8': { basePrice: 120, releaseYear: 2020 }
        }
      }
    }
  },
  laptops: {
    brands: {
      'Apple': {
        models: {
          'MacBook Pro 16" M3': { basePrice: 1800, releaseYear: 2023 },
          'MacBook Pro 14" M3': { basePrice: 1400, releaseYear: 2023 },
          'MacBook Air M3': { basePrice: 900, releaseYear: 2024 },
          'MacBook Pro 16" M2': { basePrice: 1500, releaseYear: 2022 },
          'MacBook Pro 14" M2': { basePrice: 1200, releaseYear: 2022 },
          'MacBook Air M2': { basePrice: 800, releaseYear: 2022 },
          'MacBook Pro 16" M1': { basePrice: 1200, releaseYear: 2021 },
          'MacBook Pro 14" M1': { basePrice: 1000, releaseYear: 2021 },
          'MacBook Air M1': { basePrice: 650, releaseYear: 2020 },
          'MacBook Pro 16" Intel': { basePrice: 800, releaseYear: 2019 },
          'MacBook Pro 13" Intel': { basePrice: 600, releaseYear: 2020 },
          'MacBook Air Intel': { basePrice: 400, releaseYear: 2020 }
        }
      },
      'Dell': {
        models: {
          'XPS 15 (2024)': { basePrice: 1000, releaseYear: 2024 },
          'XPS 13 (2024)': { basePrice: 800, releaseYear: 2024 },
          'XPS 15 (2023)': { basePrice: 900, releaseYear: 2023 },
          'XPS 13 (2023)': { basePrice: 700, releaseYear: 2023 },
          'XPS 15 (2022)': { basePrice: 800, releaseYear: 2022 },
          'XPS 13 (2022)': { basePrice: 600, releaseYear: 2022 },
          'Inspiron 15 7000': { basePrice: 400, releaseYear: 2023 },
          'Inspiron 14 5000': { basePrice: 300, releaseYear: 2023 },
          'Latitude 7420': { basePrice: 500, releaseYear: 2021 },
          'Latitude 5520': { basePrice: 350, releaseYear: 2021 }
        }
      },
      'HP': {
        models: {
          'Spectre x360 16': { basePrice: 900, releaseYear: 2023 },
          'Spectre x360 14': { basePrice: 700, releaseYear: 2023 },
          'EliteBook 850 G9': { basePrice: 600, releaseYear: 2022 },
          'Pavilion 15': { basePrice: 350, releaseYear: 2023 },
          'Envy 13': { basePrice: 450, releaseYear: 2022 },
          'ProBook 450 G9': { basePrice: 400, releaseYear: 2022 }
        }
      },
      'Lenovo': {
        models: {
          'ThinkPad X1 Carbon Gen 11': { basePrice: 1000, releaseYear: 2023 },
          'ThinkPad X1 Carbon Gen 10': { basePrice: 850, releaseYear: 2022 },
          'ThinkPad T14 Gen 4': { basePrice: 600, releaseYear: 2023 },
          'ThinkPad T14 Gen 3': { basePrice: 500, releaseYear: 2022 },
          'IdeaPad 5 Pro': { basePrice: 400, releaseYear: 2023 },
          'Legion 5 Pro': { basePrice: 800, releaseYear: 2023 },
          'Yoga 9i': { basePrice: 700, releaseYear: 2023 }
        }
      },
      'ASUS': {
        models: {
          'ZenBook Pro 16X': { basePrice: 1200, releaseYear: 2023 },
          'ZenBook 14': { basePrice: 600, releaseYear: 2023 },
          'ROG Zephyrus G15': { basePrice: 900, releaseYear: 2023 },
          'VivoBook S15': { basePrice: 400, releaseYear: 2023 },
          'TUF Gaming A15': { basePrice: 500, releaseYear: 2023 }
        }
      }
    }
  },
  tablets: {
    brands: {
      'Apple': {
        models: {
          'iPad Pro 12.9" M4': { basePrice: 800, releaseYear: 2024 },
          'iPad Pro 11" M4': { basePrice: 650, releaseYear: 2024 },
          'iPad Air M2': { basePrice: 450, releaseYear: 2024 },
          'iPad Pro 12.9" M2': { basePrice: 700, releaseYear: 2022 },
          'iPad Pro 11" M2': { basePrice: 550, releaseYear: 2022 },
          'iPad Air M1': { basePrice: 400, releaseYear: 2022 },
          'iPad 10th Gen': { basePrice: 250, releaseYear: 2022 },
          'iPad 9th Gen': { basePrice: 200, releaseYear: 2021 },
          'iPad mini 6': { basePrice: 350, releaseYear: 2021 }
        }
      },
      'Samsung': {
        models: {
          'Galaxy Tab S9 Ultra': { basePrice: 700, releaseYear: 2023 },
          'Galaxy Tab S9+': { basePrice: 550, releaseYear: 2023 },
          'Galaxy Tab S9': { basePrice: 450, releaseYear: 2023 },
          'Galaxy Tab S8 Ultra': { basePrice: 600, releaseYear: 2022 },
          'Galaxy Tab S8+': { basePrice: 450, releaseYear: 2022 },
          'Galaxy Tab S8': { basePrice: 350, releaseYear: 2022 },
          'Galaxy Tab A8': { basePrice: 150, releaseYear: 2022 }
        }
      },
      'Microsoft': {
        models: {
          'Surface Pro 10': { basePrice: 800, releaseYear: 2024 },
          'Surface Pro 9': { basePrice: 650, releaseYear: 2022 },
          'Surface Pro 8': { basePrice: 550, releaseYear: 2021 },
          'Surface Go 4': { basePrice: 300, releaseYear: 2023 },
          'Surface Go 3': { basePrice: 250, releaseYear: 2021 }
        }
      }
    }
  }
};

export const conditionMultipliers = {
  'Like New': 0.9,
  'Excellent': 0.8,
  'Good': 0.65,
  'Fair': 0.45,
  'Poor': 0.25,
  'For Parts': 0.15
};

export const storageMultipliers = {
  '16GB': 0.7,
  '32GB': 0.8,
  '64GB': 0.9,
  '128GB': 1.0,
  '256GB': 1.15,
  '512GB': 1.3,
  '1TB': 1.5,
  '2TB': 1.8
};

export const calculatePrice = (deviceType, brand, model, condition, storage = '128GB', accessories = []) => {
  try {
    const device = deviceDatabase[deviceType]?.brands[brand]?.models[model];
    if (!device) {
      return { error: 'Device not found in database' };
    }

    let basePrice = device.basePrice;
    const currentYear = new Date().getFullYear();
    const deviceAge = currentYear - device.releaseYear;
    
    // Age depreciation (10% per year for first 3 years, then 5% per year)
    let ageMultiplier = 1;
    if (deviceAge <= 3) {
      ageMultiplier = Math.max(0.4, 1 - (deviceAge * 0.1));
    } else {
      ageMultiplier = Math.max(0.2, 0.7 - ((deviceAge - 3) * 0.05));
    }

    // Apply condition multiplier
    const conditionMultiplier = conditionMultipliers[condition] || 0.5;
    
    // Apply storage multiplier (mainly for phones and tablets)
    const storageMultiplier = storageMultipliers[storage] || 1.0;
    
    // Calculate base value
    let estimatedValue = basePrice * ageMultiplier * conditionMultiplier * storageMultiplier;
    
    // Accessories bonus
    let accessoryBonus = 0;
    accessories.forEach(accessory => {
      switch (accessory) {
        case 'Original Box': accessoryBonus += estimatedValue * 0.05; break;
        case 'Charger': accessoryBonus += estimatedValue * 0.03; break;
        case 'Cables': accessoryBonus += estimatedValue * 0.02; break;
        case 'Manual': accessoryBonus += estimatedValue * 0.01; break;
        case 'Case/Cover': accessoryBonus += estimatedValue * 0.02; break;
        default: break;
      }
    });
    
    estimatedValue += accessoryBonus;
    
    // Create price range (±15%)
    const minPrice = Math.round(estimatedValue * 0.85);
    const maxPrice = Math.round(estimatedValue * 1.15);
    
    return {
      minPrice,
      maxPrice,
      estimatedValue: Math.round(estimatedValue),
      breakdown: {
        basePrice,
        ageMultiplier: Math.round(ageMultiplier * 100) / 100,
        conditionMultiplier,
        storageMultiplier,
        accessoryBonus: Math.round(accessoryBonus),
        deviceAge
      }
    };
  } catch (error) {
    return { error: 'Error calculating price: ' + error.message };
  }
};

export const getRecyclingOptions = (location = 'general') => {
  return {
    sellOnline: [
      {
        name: 'Gazelle',
        url: 'https://gazelle.com',
        description: 'Instant quotes for phones, tablets, and laptops',
        rating: 4.2,
        paymentTime: '1-2 days',
        shippingFree: true
      },
      {
        name: 'Swappa',
        url: 'https://swappa.com',
        description: 'Marketplace for used devices with buyer protection',
        rating: 4.5,
        paymentTime: 'Varies',
        shippingFree: false
      },
      {
        name: 'Amazon Trade-In',
        url: 'https://amazon.com/tradein',
        description: 'Trade devices for Amazon gift cards',
        rating: 4.0,
        paymentTime: '2-3 days',
        shippingFree: true
      },
      {
        name: 'eBay',
        url: 'https://ebay.com',
        description: 'Auction or fixed-price selling platform',
        rating: 4.1,
        paymentTime: 'Varies',
        shippingFree: false
      }
    ],
    tradeIn: [
      {
        name: 'Apple Trade In',
        url: 'https://apple.com/trade-in',
        description: 'Official Apple trade-in program',
        rating: 4.3,
        devices: ['iPhone', 'iPad', 'MacBook', 'Apple Watch'],
        paymentMethod: 'Credit or Gift Card'
      },
      {
        name: 'Samsung Trade-In',
        url: 'https://samsung.com/us/trade-in',
        description: 'Samsung official trade-in program',
        rating: 4.1,
        devices: ['Galaxy phones', 'Galaxy tablets', 'Galaxy watches'],
        paymentMethod: 'Credit towards new device'
      },
      {
        name: 'Best Buy Trade-In',
        url: 'https://bestbuy.com/site/electronics-recycling/trade-in/pcmcat149900050011.c',
        description: 'Trade in any brand for Best Buy gift cards',
        rating: 4.0,
        devices: ['All electronics'],
        paymentMethod: 'Gift Card'
      }
    ],
    recycling: [
      {
        name: 'Best Buy Recycling',
        url: 'https://bestbuy.com/site/services/recycling/pcmcat149900050025.c',
        description: 'Free recycling for most electronics',
        rating: 4.4,
        cost: 'Free',
        pickup: false
      },
      {
        name: 'Staples Recycling',
        url: 'https://staples.com/sbd/cre/marketing/sustainability-center/recycling-services',
        description: 'Free recycling for small electronics',
        rating: 4.2,
        cost: 'Free for small items',
        pickup: false
      },
      {
        name: 'Call2Recycle',
        url: 'https://call2recycle.org',
        description: 'Battery and cell phone recycling program',
        rating: 4.5,
        cost: 'Free',
        pickup: false
      },
      {
        name: 'Earth911',
        url: 'https://earth911.com',
        description: 'Find local recycling centers',
        rating: 4.3,
        cost: 'Varies',
        pickup: 'Some locations'
      }
    ],
    donation: [
      {
        name: 'Goodwill',
        url: 'https://goodwill.org',
        description: 'Donate working electronics for tax deduction',
        rating: 4.1,
        taxDeductible: true,
        pickup: 'Some locations'
      },
      {
        name: 'World Computer Exchange',
        url: 'https://worldcomputerexchange.org',
        description: 'Donate computers to developing countries',
        rating: 4.6,
        taxDeductible: true,
        pickup: false
      },
      {
        name: 'National Cristina Foundation',
        url: 'https://cristina.org',
        description: 'Donate technology to people with disabilities',
        rating: 4.5,
        taxDeductible: true,
        pickup: false
      }
    ]
  };
};