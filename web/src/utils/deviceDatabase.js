// Comprehensive Electronic Device Database for E-Waste Analysis
export const deviceDatabase = {
  smartphones: {
    apple: {
      // iPhone 15 Series (2023)
      'iPhone 15 Pro Max': { value: '$800-1200', materials: 'Premium', condition: 'Excellent', recycleValue: '$80-180', weight: '221g', batteryCapacity: '4441mAh', releaseYear: 2023 },
      'iPhone 15 Pro': { value: '$700-1000', materials: 'Premium', condition: 'Excellent', recycleValue: '$70-150', weight: '187g', batteryCapacity: '3274mAh', releaseYear: 2023 },
      'iPhone 15 Plus': { value: '$600-900', materials: 'Premium', condition: 'Excellent', recycleValue: '$60-130', weight: '201g', batteryCapacity: '4383mAh', releaseYear: 2023 },
      'iPhone 15': { value: '$500-800', materials: 'Premium', condition: 'Excellent', recycleValue: '$50-120', weight: '171g', batteryCapacity: '3349mAh', releaseYear: 2023 },
      
      // iPhone 14 Series (2022)
      'iPhone 14 Pro Max': { value: '$700-1000', materials: 'Premium', condition: 'Excellent', recycleValue: '$70-160', weight: '240g', batteryCapacity: '4323mAh', releaseYear: 2022 },
      'iPhone 14 Pro': { value: '$600-900', materials: 'Premium', condition: 'Excellent', recycleValue: '$60-140', weight: '206g', batteryCapacity: '3200mAh', releaseYear: 2022 },
      'iPhone 14 Plus': { value: '$500-750', materials: 'Premium', condition: 'Good', recycleValue: '$50-110', weight: '203g', batteryCapacity: '4325mAh', releaseYear: 2022 },
      'iPhone 14': { value: '$450-700', materials: 'Premium', condition: 'Good', recycleValue: '$45-100', weight: '172g', batteryCapacity: '3279mAh', releaseYear: 2022 },
      
      // iPhone 13 Series (2021)
      'iPhone 13 Pro Max': { value: '$550-850', materials: 'Premium', condition: 'Good', recycleValue: '$55-130', weight: '240g', batteryCapacity: '4352mAh', releaseYear: 2021 },
      'iPhone 13 Pro': { value: '$500-750', materials: 'Premium', condition: 'Good', recycleValue: '$50-115', weight: '204g', batteryCapacity: '3095mAh', releaseYear: 2021 },
      'iPhone 13 Mini': { value: '$350-550', materials: 'Standard', condition: 'Good', recycleValue: '$35-80', weight: '141g', batteryCapacity: '2438mAh', releaseYear: 2021 },
      'iPhone 13': { value: '$400-650', materials: 'Premium', condition: 'Good', recycleValue: '$40-95', weight: '174g', batteryCapacity: '3240mAh', releaseYear: 2021 },
      
      // iPhone 12 Series (2020)
      'iPhone 12 Pro Max': { value: '$450-700', materials: 'Premium', condition: 'Good', recycleValue: '$45-105', weight: '228g', batteryCapacity: '3687mAh', releaseYear: 2020 },
      'iPhone 12 Pro': { value: '$400-600', materials: 'Premium', condition: 'Good', recycleValue: '$40-90', weight: '189g', batteryCapacity: '2815mAh', releaseYear: 2020 },
      'iPhone 12 Mini': { value: '$250-400', materials: 'Standard', condition: 'Fair', recycleValue: '$25-60', weight: '135g', batteryCapacity: '2227mAh', releaseYear: 2020 },
      'iPhone 12': { value: '$300-500', materials: 'Standard', condition: 'Good', recycleValue: '$30-75', weight: '164g', batteryCapacity: '2815mAh', releaseYear: 2020 },
      
      // iPhone 11 Series (2019)
      'iPhone 11 Pro Max': { value: '$350-550', materials: 'Standard', condition: 'Fair', recycleValue: '$35-85', weight: '226g', batteryCapacity: '3969mAh', releaseYear: 2019 },
      'iPhone 11 Pro': { value: '$300-500', materials: 'Standard', condition: 'Fair', recycleValue: '$30-75', weight: '188g', batteryCapacity: '3046mAh', releaseYear: 2019 },
      'iPhone 11': { value: '$250-400', materials: 'Standard', condition: 'Fair', recycleValue: '$25-60', weight: '194g', batteryCapacity: '3110mAh', releaseYear: 2019 },
      
      // iPhone XS/XR Series (2018)
      'iPhone XS Max': { value: '$200-350', materials: 'Standard', condition: 'Fair', recycleValue: '$20-55', weight: '208g', batteryCapacity: '3174mAh', releaseYear: 2018 },
      'iPhone XS': { value: '$180-300', materials: 'Standard', condition: 'Fair', recycleValue: '$18-45', weight: '177g', batteryCapacity: '2658mAh', releaseYear: 2018 },
      'iPhone XR': { value: '$150-280', materials: 'Standard', condition: 'Fair', recycleValue: '$15-40', weight: '194g', batteryCapacity: '2942mAh', releaseYear: 2018 },
      
      // iPhone X (2017)
      'iPhone X': { value: '$120-220', materials: 'Standard', condition: 'Poor', recycleValue: '$12-35', weight: '174g', batteryCapacity: '2716mAh', releaseYear: 2017 },
      
      // iPhone 8 Series (2017)
      'iPhone 8 Plus': { value: '$100-180', materials: 'Basic', condition: 'Poor', recycleValue: '$10-28', weight: '202g', batteryCapacity: '2691mAh', releaseYear: 2017 },
      'iPhone 8': { value: '$80-150', materials: 'Basic', condition: 'Poor', recycleValue: '$8-22', weight: '148g', batteryCapacity: '1821mAh', releaseYear: 2017 },
      
      // iPhone 7 Series (2016)
      'iPhone 7 Plus': { value: '$70-130', materials: 'Basic', condition: 'Poor', recycleValue: '$7-20', weight: '188g', batteryCapacity: '2900mAh', releaseYear: 2016 },
      'iPhone 7': { value: '$50-100', materials: 'Basic', condition: 'Poor', recycleValue: '$5-15', weight: '138g', batteryCapacity: '1960mAh', releaseYear: 2016 },
      
      // iPhone 6S Series (2015)
      'iPhone 6S Plus': { value: '$40-80', materials: 'Basic', condition: 'Poor', recycleValue: '$4-12', weight: '192g', batteryCapacity: '2750mAh', releaseYear: 2015 },
      'iPhone 6S': { value: '$30-60', materials: 'Basic', condition: 'Poor', recycleValue: '$3-10', weight: '143g', batteryCapacity: '1715mAh', releaseYear: 2015 }
    },
    
    samsung: {
      // Galaxy S24 Series (2024)
      'Galaxy S24 Ultra': { value: '$700-1100', materials: 'Premium', condition: 'Excellent', recycleValue: '$70-165', weight: '232g', batteryCapacity: '5000mAh', releaseYear: 2024 },
      'Galaxy S24+': { value: '$550-850', materials: 'Premium', condition: 'Excellent', recycleValue: '$55-125', weight: '196g', batteryCapacity: '4900mAh', releaseYear: 2024 },
      'Galaxy S24': { value: '$450-700', materials: 'Premium', condition: 'Excellent', recycleValue: '$45-105', weight: '167g', batteryCapacity: '4000mAh', releaseYear: 2024 },
      
      // Galaxy S23 Series (2023)
      'Galaxy S23 Ultra': { value: '$600-950', materials: 'Premium', condition: 'Excellent', recycleValue: '$60-145', weight: '234g', batteryCapacity: '5000mAh', releaseYear: 2023 },
      'Galaxy S23+': { value: '$450-700', materials: 'Premium', condition: 'Excellent', recycleValue: '$45-105', weight: '196g', batteryCapacity: '4700mAh', releaseYear: 2023 },
      'Galaxy S23': { value: '$350-600', materials: 'Premium', condition: 'Good', recycleValue: '$35-90', weight: '168g', batteryCapacity: '3900mAh', releaseYear: 2023 },
      
      // Galaxy S22 Series (2022)
      'Galaxy S22 Ultra': { value: '$500-800', materials: 'Premium', condition: 'Good', recycleValue: '$50-120', weight: '228g', batteryCapacity: '5000mAh', releaseYear: 2022 },
      'Galaxy S22+': { value: '$400-650', materials: 'Premium', condition: 'Good', recycleValue: '$40-95', weight: '195g', batteryCapacity: '4500mAh', releaseYear: 2022 },
      'Galaxy S22': { value: '$300-500', materials: 'Standard', condition: 'Good', recycleValue: '$30-75', weight: '167g', batteryCapacity: '3700mAh', releaseYear: 2022 },
      
      // Galaxy S21 Series (2021)
      'Galaxy S21 Ultra': { value: '$400-650', materials: 'Premium', condition: 'Good', recycleValue: '$40-95', weight: '227g', batteryCapacity: '5000mAh', releaseYear: 2021 },
      'Galaxy S21+': { value: '$300-500', materials: 'Standard', condition: 'Good', recycleValue: '$30-75', weight: '200g', batteryCapacity: '4800mAh', releaseYear: 2021 },
      'Galaxy S21': { value: '$250-400', materials: 'Standard', condition: 'Fair', recycleValue: '$25-60', weight: '171g', batteryCapacity: '4000mAh', releaseYear: 2021 },
      
      // Galaxy S20 Series (2020)
      'Galaxy S20 Ultra': { value: '$300-500', materials: 'Standard', condition: 'Fair', recycleValue: '$30-75', weight: '220g', batteryCapacity: '5000mAh', releaseYear: 2020 },
      'Galaxy S20+': { value: '$250-400', materials: 'Standard', condition: 'Fair', recycleValue: '$25-60', weight: '186g', batteryCapacity: '4500mAh', releaseYear: 2020 },
      'Galaxy S20': { value: '$200-350', materials: 'Standard', condition: 'Fair', recycleValue: '$20-50', weight: '163g', batteryCapacity: '4000mAh', releaseYear: 2020 },
      
      // Galaxy Note Series
      'Galaxy Note 20 Ultra': { value: '$350-550', materials: 'Premium', condition: 'Good', recycleValue: '$35-85', weight: '208g', batteryCapacity: '4500mAh', releaseYear: 2020 },
      'Galaxy Note 20': { value: '$280-450', materials: 'Standard', condition: 'Fair', recycleValue: '$28-65', weight: '192g', batteryCapacity: '4300mAh', releaseYear: 2020 },
      'Galaxy Note 10+': { value: '$250-400', materials: 'Standard', condition: 'Fair', recycleValue: '$25-60', weight: '196g', batteryCapacity: '4300mAh', releaseYear: 2019 },
      'Galaxy Note 10': { value: '$200-350', materials: 'Standard', condition: 'Fair', recycleValue: '$20-50', weight: '168g', batteryCapacity: '3500mAh', releaseYear: 2019 },
      
      // Galaxy A Series (Mid-range)
      'Galaxy A54': { value: '$200-350', materials: 'Standard', condition: 'Good', recycleValue: '$20-50', weight: '202g', batteryCapacity: '5000mAh', releaseYear: 2023 },
      'Galaxy A34': { value: '$150-280', materials: 'Standard', condition: 'Good', recycleValue: '$15-40', weight: '199g', batteryCapacity: '5000mAh', releaseYear: 2023 },
      'Galaxy A14': { value: '$100-200', materials: 'Basic', condition: 'Fair', recycleValue: '$10-30', weight: '201g', batteryCapacity: '5000mAh', releaseYear: 2023 }
    },
    
    google: {
      // Pixel 8 Series (2023)
      'Pixel 8 Pro': { value: '$500-800', materials: 'Premium', condition: 'Excellent', recycleValue: '$50-120', weight: '213g', batteryCapacity: '5050mAh', releaseYear: 2023 },
      'Pixel 8': { value: '$400-650', materials: 'Premium', condition: 'Excellent', recycleValue: '$40-95', weight: '187g', batteryCapacity: '4575mAh', releaseYear: 2023 },
      
      // Pixel 7 Series (2022)
      'Pixel 7 Pro': { value: '$400-650', materials: 'Premium', condition: 'Good', recycleValue: '$40-95', weight: '210g', batteryCapacity: '5000mAh', releaseYear: 2022 },
      'Pixel 7': { value: '$300-500', materials: 'Standard', condition: 'Good', recycleValue: '$30-75', weight: '197g', batteryCapacity: '4355mAh', releaseYear: 2022 },
      'Pixel 7a': { value: '$250-400', materials: 'Standard', condition: 'Good', recycleValue: '$25-60', weight: '193g', batteryCapacity: '4385mAh', releaseYear: 2023 },
      
      // Pixel 6 Series (2021)
      'Pixel 6 Pro': { value: '$300-500', materials: 'Standard', condition: 'Good', recycleValue: '$30-75', weight: '210g', batteryCapacity: '5003mAh', releaseYear: 2021 },
      'Pixel 6': { value: '$250-400', materials: 'Standard', condition: 'Good', recycleValue: '$25-60', weight: '207g', batteryCapacity: '4614mAh', releaseYear: 2021 },
      'Pixel 6a': { value: '$200-350', materials: 'Standard', condition: 'Fair', recycleValue: '$20-50', weight: '178g', batteryCapacity: '4410mAh', releaseYear: 2022 },
      
      // Older Pixel Models
      'Pixel 5': { value: '$150-280', materials: 'Standard', condition: 'Fair', recycleValue: '$15-40', weight: '151g', batteryCapacity: '4080mAh', releaseYear: 2020 },
      'Pixel 4 XL': { value: '$120-220', materials: 'Basic', condition: 'Poor', recycleValue: '$12-35', weight: '193g', batteryCapacity: '3700mAh', releaseYear: 2019 },
      'Pixel 4': { value: '$100-180', materials: 'Basic', condition: 'Poor', recycleValue: '$10-28', weight: '162g', batteryCapacity: '2800mAh', releaseYear: 2019 }
    },
    
    oneplus: {
      'OnePlus 12': { value: '$400-700', materials: 'Premium', condition: 'Excellent', recycleValue: '$40-105', weight: '220g', batteryCapacity: '5400mAh', releaseYear: 2024 },
      'OnePlus 11': { value: '$350-600', materials: 'Premium', condition: 'Good', recycleValue: '$35-90', weight: '205g', batteryCapacity: '5000mAh', releaseYear: 2023 },
      'OnePlus 10 Pro': { value: '$300-500', materials: 'Standard', condition: 'Good', recycleValue: '$30-75', weight: '200g', batteryCapacity: '5000mAh', releaseYear: 2022 },
      'OnePlus 9 Pro': { value: '$250-400', materials: 'Standard', condition: 'Fair', recycleValue: '$25-60', weight: '197g', batteryCapacity: '4500mAh', releaseYear: 2021 },
      'OnePlus 9': { value: '$200-350', materials: 'Standard', condition: 'Fair', recycleValue: '$20-50', weight: '192g', batteryCapacity: '4500mAh', releaseYear: 2021 }
    },
    
    xiaomi: {
      'Xiaomi 14 Ultra': { value: '$500-800', materials: 'Premium', condition: 'Excellent', recycleValue: '$50-120', weight: '229g', batteryCapacity: '5300mAh', releaseYear: 2024 },
      'Xiaomi 14': { value: '$400-650', materials: 'Premium', condition: 'Good', recycleValue: '$40-95', weight: '193g', batteryCapacity: '4610mAh', releaseYear: 2024 },
      'Xiaomi 13 Pro': { value: '$350-600', materials: 'Premium', condition: 'Good', recycleValue: '$35-90', weight: '210g', batteryCapacity: '4820mAh', releaseYear: 2023 },
      'Xiaomi 13': { value: '$300-500', materials: 'Standard', condition: 'Good', recycleValue: '$30-75', weight: '185g', batteryCapacity: '4500mAh', releaseYear: 2023 },
      'Redmi Note 13 Pro': { value: '$150-280', materials: 'Standard', condition: 'Good', recycleValue: '$15-40', weight: '187g', batteryCapacity: '5100mAh', releaseYear: 2024 }
    },
    
    generic: {
      'Flagship Smartphone (2023-2024)': { value: '$400-800', materials: 'Premium', condition: 'Excellent', recycleValue: '$40-120', weight: '180-220g', batteryCapacity: '4000-5000mAh', releaseYear: 2023 },
      'Mid-range Smartphone (2022-2023)': { value: '$200-400', materials: 'Standard', condition: 'Good', recycleValue: '$20-60', weight: '160-200g', batteryCapacity: '3500-4500mAh', releaseYear: 2022 },
      'Budget Smartphone (2021-2022)': { value: '$80-200', materials: 'Basic', condition: 'Fair', recycleValue: '$8-30', weight: '150-180g', batteryCapacity: '3000-4000mAh', releaseYear: 2021 },
      'Older Smartphone (2018-2020)': { value: '$30-100', materials: 'Basic', condition: 'Poor', recycleValue: '$3-15', weight: '140-180g', batteryCapacity: '2500-3500mAh', releaseYear: 2019 },
      'Legacy Smartphone (2015-2017)': { value: '$10-50', materials: 'Basic', condition: 'Poor', recycleValue: '$1-8', weight: '120-160g', batteryCapacity: '2000-3000mAh', releaseYear: 2016 }
    }
  },
  
  tablets: {
    apple: {
      'iPad Pro 12.9" (6th gen)': { value: '$600-1100', materials: 'Premium', condition: 'Excellent', recycleValue: '$60-165', weight: '682g', batteryCapacity: '10758mAh', releaseYear: 2022 },
      'iPad Pro 11" (4th gen)': { value: '$500-900', materials: 'Premium', condition: 'Excellent', recycleValue: '$50-135', weight: '466g', batteryCapacity: '7538mAh', releaseYear: 2022 },
      'iPad Air (5th gen)': { value: '$350-650', materials: 'Premium', condition: 'Good', recycleValue: '$35-95', weight: '461g', batteryCapacity: '7606mAh', releaseYear: 2022 },
      'iPad (10th gen)': { value: '$250-450', materials: 'Standard', condition: 'Good', recycleValue: '$25-65', weight: '477g', batteryCapacity: '7606mAh', releaseYear: 2022 },
      'iPad Mini (6th gen)': { value: '$300-500', materials: 'Standard', condition: 'Good', recycleValue: '$30-75', weight: '293g', batteryCapacity: '5124mAh', releaseYear: 2021 }
    },
    samsung: {
      'Galaxy Tab S9 Ultra': { value: '$600-1000', materials: 'Premium', condition: 'Excellent', recycleValue: '$60-150', weight: '732g', batteryCapacity: '11200mAh', releaseYear: 2023 },
      'Galaxy Tab S9+': { value: '$450-750', materials: 'Premium', condition: 'Good', recycleValue: '$45-110', weight: '581g', batteryCapacity: '10090mAh', releaseYear: 2023 },
      'Galaxy Tab S9': { value: '$350-600', materials: 'Standard', condition: 'Good', recycleValue: '$35-90', weight: '498g', batteryCapacity: '8000mAh', releaseYear: 2023 },
      'Galaxy Tab A8': { value: '$120-250', materials: 'Basic', condition: 'Fair', recycleValue: '$12-35', weight: '508g', batteryCapacity: '7040mAh', releaseYear: 2022 }
    }
  },
  
  laptops: {
    apple: {
      'MacBook Pro 16" M3': { value: '$1500-2500', materials: 'Premium', condition: 'Excellent', recycleValue: '$150-375', weight: '2.14kg', batteryCapacity: '100Wh', releaseYear: 2023 },
      'MacBook Pro 14" M3': { value: '$1200-2000', materials: 'Premium', condition: 'Excellent', recycleValue: '$120-300', weight: '1.55kg', batteryCapacity: '70Wh', releaseYear: 2023 },
      'MacBook Air M2': { value: '$800-1300', materials: 'Premium', condition: 'Good', recycleValue: '$80-195', weight: '1.24kg', batteryCapacity: '52.6Wh', releaseYear: 2022 },
      'MacBook Air M1': { value: '$600-1000', materials: 'Standard', condition: 'Good', recycleValue: '$60-150', weight: '1.29kg', batteryCapacity: '49.9Wh', releaseYear: 2020 }
    },
    dell: {
      'XPS 13 Plus': { value: '$800-1400', materials: 'Premium', condition: 'Good', recycleValue: '$80-210', weight: '1.26kg', batteryCapacity: '55Wh', releaseYear: 2022 },
      'XPS 15': { value: '$1000-1800', materials: 'Premium', condition: 'Good', recycleValue: '$100-270', weight: '1.96kg', batteryCapacity: '86Wh', releaseYear: 2023 },
      'Inspiron 15 3000': { value: '$200-400', materials: 'Basic', condition: 'Fair', recycleValue: '$20-60', weight: '1.85kg', batteryCapacity: '41Wh', releaseYear: 2022 }
    },
    hp: {
      'Spectre x360': { value: '$700-1200', materials: 'Premium', condition: 'Good', recycleValue: '$70-180', weight: '1.36kg', batteryCapacity: '66Wh', releaseYear: 2023 },
      'EliteBook 840': { value: '$600-1000', materials: 'Standard', condition: 'Good', recycleValue: '$60-150', weight: '1.36kg', batteryCapacity: '51Wh', releaseYear: 2023 },
      'Pavilion 15': { value: '$300-600', materials: 'Basic', condition: 'Fair', recycleValue: '$30-90', weight: '1.75kg', batteryCapacity: '41Wh', releaseYear: 2022 }
    },
    lenovo: {
      'ThinkPad X1 Carbon': { value: '$800-1400', materials: 'Premium', condition: 'Good', recycleValue: '$80-210', weight: '1.12kg', batteryCapacity: '57Wh', releaseYear: 2023 },
      'ThinkPad T14': { value: '$600-1000', materials: 'Standard', condition: 'Good', recycleValue: '$60-150', weight: '1.46kg', batteryCapacity: '50Wh', releaseYear: 2023 },
      'IdeaPad 3': { value: '$250-450', materials: 'Basic', condition: 'Fair', recycleValue: '$25-65', weight: '1.65kg', batteryCapacity: '45Wh', releaseYear: 2022 }
    }
  },
  
  materials: {
    smartphone: {
      premium: [
        { name: 'Gold (Au)', amount: '0.034g', value: '$2.50', description: 'Circuit boards, connectors, and wire bonding', marketPrice: '$73.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Silver (Ag)', amount: '0.35g', value: '$0.40', description: 'Circuit boards, switches, and conductive traces', marketPrice: '$1.15/g', recyclable: true, rarity: 'High' },
        { name: 'Copper (Cu)', amount: '20g', value: '$0.25', description: 'Wiring, heat sinks, and electromagnetic shielding', marketPrice: '$0.0125/g', recyclable: true, rarity: 'Medium' },
        { name: 'Palladium (Pd)', amount: '0.015g', value: '$1.00', description: 'Capacitors, circuit boards, and connectors', marketPrice: '$66.70/g', recyclable: true, rarity: 'Very High' },
        { name: 'Platinum (Pt)', amount: '0.005g', value: '$0.15', description: 'Hard drives, circuit boards, and catalysts', marketPrice: '$30.00/g', recyclable: true, rarity: 'Very High' },
        { name: 'Rhodium (Rh)', amount: '0.002g', value: '$0.25', description: 'Electrical contacts and plating', marketPrice: '$125.00/g', recyclable: true, rarity: 'Extremely High' },
        { name: 'Indium (In)', amount: '0.1g', value: '$0.08', description: 'Touchscreen ITO coating and semiconductors', marketPrice: '$0.80/g', recyclable: true, rarity: 'High' },
        { name: 'Gallium (Ga)', amount: '0.05g', value: '$0.15', description: 'LED backlights and semiconductors', marketPrice: '$3.00/g', recyclable: true, rarity: 'High' },
        { name: 'Tantalum (Ta)', amount: '0.5g', value: '$0.20', description: 'Capacitors and high-frequency circuits', marketPrice: '$0.40/g', recyclable: true, rarity: 'High' },
        { name: 'Rare Earth Elements', amount: '2g', value: '$3.00', description: 'Magnets, speakers, vibration motors, and displays', marketPrice: '$1.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Neodymium (Nd)', amount: '0.8g', value: '$1.20', description: 'Permanent magnets in speakers and motors', marketPrice: '$1.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Dysprosium (Dy)', amount: '0.1g', value: '$0.35', description: 'High-performance magnets', marketPrice: '$3.50/g', recyclable: true, rarity: 'Extremely High' },
        { name: 'Terbium (Tb)', amount: '0.05g', value: '$0.15', description: 'Green phosphors in displays', marketPrice: '$3.00/g', recyclable: true, rarity: 'Extremely High' },
        { name: 'Europium (Eu)', amount: '0.02g', value: '$0.06', description: 'Red phosphors in displays', marketPrice: '$3.00/g', recyclable: true, rarity: 'Extremely High' },
        { name: 'Yttrium (Y)', amount: '0.3g', value: '$0.09', description: 'Display phosphors and ceramics', marketPrice: '$0.30/g', recyclable: true, rarity: 'High' },
        { name: 'Lithium (Li)', amount: '3g', value: '$0.50', description: 'Battery cathode and electrolyte', marketPrice: '$0.167/g', recyclable: true, rarity: 'Medium' },
        { name: 'Cobalt (Co)', amount: '8g', value: '$0.80', description: 'Battery cathode material', marketPrice: '$0.10/g', recyclable: true, rarity: 'High' },
        { name: 'Nickel (Ni)', amount: '5g', value: '$0.08', description: 'Battery cathode and magnetic shielding', marketPrice: '$0.016/g', recyclable: true, rarity: 'Medium' },
        { name: 'Manganese (Mn)', amount: '2g', value: '$0.003', description: 'Battery cathode and steel alloys', marketPrice: '$0.0015/g', recyclable: true, rarity: 'Low' },
        { name: 'Aluminum (Al)', amount: '25g', value: '$0.15', description: 'Frame, housing, and heat dissipation', marketPrice: '$0.006/g', recyclable: true, rarity: 'Low' },
        { name: 'Titanium (Ti)', amount: '5g', value: '$0.30', description: 'Premium frame material and screws', marketPrice: '$0.06/g', recyclable: true, rarity: 'Medium' },
        { name: 'Magnesium (Mg)', amount: '3g', value: '$0.01', description: 'Lightweight structural components', marketPrice: '$0.003/g', recyclable: true, rarity: 'Low' },
        { name: 'Zinc (Zn)', amount: '1g', value: '$0.003', description: 'Die-cast components and coatings', marketPrice: '$0.003/g', recyclable: true, rarity: 'Low' },
        { name: 'Tin (Sn)', amount: '2g', value: '$0.06', description: 'Solder and plating', marketPrice: '$0.03/g', recyclable: true, rarity: 'Medium' },
        { name: 'Lead (Pb)', amount: '0.5g', value: '$0.001', description: 'Legacy solder (being phased out)', marketPrice: '$0.002/g', recyclable: true, rarity: 'Low' },
        { name: 'Silicon (Si)', amount: '15g', value: '$0.15', description: 'Semiconductors and solar cells', marketPrice: '$0.01/g', recyclable: false, rarity: 'Low' },
        { name: 'Germanium (Ge)', amount: '0.1g', value: '$0.12', description: 'Semiconductors and fiber optics', marketPrice: '$1.20/g', recyclable: true, rarity: 'High' },
        { name: 'Arsenic (As)', amount: '0.05g', value: '$0.0001', description: 'Semiconductor doping', marketPrice: '$0.002/g', recyclable: false, rarity: 'Medium' },
        { name: 'Glass (SiO2)', amount: '30g', value: '$0.01', description: 'Display screen and camera lenses', marketPrice: '$0.0003/g', recyclable: false, rarity: 'Very Low' },
        { name: 'Plastic (Various)', amount: '40g', value: '$0.04', description: 'Housing, buttons, and internal components', marketPrice: '$0.001/g', recyclable: false, rarity: 'Very Low' },
        { name: 'Carbon Fiber', amount: '2g', value: '$0.10', description: 'Premium structural reinforcement', marketPrice: '$0.05/g', recyclable: false, rarity: 'Medium' },
        { name: 'Ceramic', amount: '5g', value: '$0.02', description: 'Capacitors and insulators', marketPrice: '$0.004/g', recyclable: false, rarity: 'Low' }
      ],
      standard: [
        { name: 'Gold (Au)', amount: '0.025g', value: '$1.80', description: 'Circuit boards and connectors', marketPrice: '$73.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Silver (Ag)', amount: '0.25g', value: '$0.30', description: 'Circuit boards and switches', marketPrice: '$1.15/g', recyclable: true, rarity: 'High' },
        { name: 'Copper (Cu)', amount: '15g', value: '$0.20', description: 'Wiring and components', marketPrice: '$0.0125/g', recyclable: true, rarity: 'Medium' },
        { name: 'Palladium (Pd)', amount: '0.01g', value: '$0.67', description: 'Capacitors and circuit boards', marketPrice: '$66.70/g', recyclable: true, rarity: 'Very High' },
        { name: 'Platinum (Pt)', amount: '0.003g', value: '$0.09', description: 'Circuit boards', marketPrice: '$30.00/g', recyclable: true, rarity: 'Very High' },
        { name: 'Indium (In)', amount: '0.08g', value: '$0.06', description: 'Touchscreen coating', marketPrice: '$0.80/g', recyclable: true, rarity: 'High' },
        { name: 'Tantalum (Ta)', amount: '0.3g', value: '$0.12', description: 'Capacitors', marketPrice: '$0.40/g', recyclable: true, rarity: 'High' },
        { name: 'Rare Earth Elements', amount: '1.5g', value: '$2.00', description: 'Speakers and motors', marketPrice: '$1.33/g', recyclable: true, rarity: 'Very High' },
        { name: 'Neodymium (Nd)', amount: '0.6g', value: '$0.90', description: 'Speaker magnets', marketPrice: '$1.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Lithium (Li)', amount: '2.5g', value: '$0.40', description: 'Battery component', marketPrice: '$0.16/g', recyclable: true, rarity: 'Medium' },
        { name: 'Cobalt (Co)', amount: '6g', value: '$0.60', description: 'Battery cathode', marketPrice: '$0.10/g', recyclable: true, rarity: 'High' },
        { name: 'Nickel (Ni)', amount: '4g', value: '$0.06', description: 'Battery and shielding', marketPrice: '$0.016/g', recyclable: true, rarity: 'Medium' },
        { name: 'Aluminum (Al)', amount: '20g', value: '$0.12', description: 'Frame and housing', marketPrice: '$0.006/g', recyclable: true, rarity: 'Low' },
        { name: 'Tin (Sn)', amount: '1.5g', value: '$0.045', description: 'Solder', marketPrice: '$0.03/g', recyclable: true, rarity: 'Medium' },
        { name: 'Silicon (Si)', amount: '12g', value: '$0.12', description: 'Semiconductors', marketPrice: '$0.01/g', recyclable: false, rarity: 'Low' },
        { name: 'Glass (SiO2)', amount: '25g', value: '$0.008', description: 'Display screen', marketPrice: '$0.0003/g', recyclable: false, rarity: 'Very Low' },
        { name: 'Plastic (Various)', amount: '60g', value: '$0.06', description: 'Housing and components', marketPrice: '$0.001/g', recyclable: false, rarity: 'Very Low' }
      ],
      basic: [
        { name: 'Gold (Au)', amount: '0.015g', value: '$1.10', description: 'Basic circuit boards', marketPrice: '$73.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Silver (Ag)', amount: '0.15g', value: '$0.17', description: 'Basic circuits', marketPrice: '$1.15/g', recyclable: true, rarity: 'High' },
        { name: 'Copper (Cu)', amount: '10g', value: '$0.125', description: 'Basic wiring', marketPrice: '$0.0125/g', recyclable: true, rarity: 'Medium' },
        { name: 'Lithium (Li)', amount: '1.5g', value: '$0.25', description: 'Basic battery', marketPrice: '$0.167/g', recyclable: true, rarity: 'Medium' },
        { name: 'Cobalt (Co)', amount: '3g', value: '$0.30', description: 'Basic battery cathode', marketPrice: '$0.10/g', recyclable: true, rarity: 'High' },
        { name: 'Aluminum (Al)', amount: '15g', value: '$0.09', description: 'Basic frame', marketPrice: '$0.006/g', recyclable: true, rarity: 'Low' },
        { name: 'Tin (Sn)', amount: '1g', value: '$0.03', description: 'Basic solder', marketPrice: '$0.03/g', recyclable: true, rarity: 'Medium' },
        { name: 'Silicon (Si)', amount: '8g', value: '$0.08', description: 'Basic semiconductors', marketPrice: '$0.01/g', recyclable: false, rarity: 'Low' },
        { name: 'Plastic (Various)', amount: '80g', value: '$0.08', description: 'Housing materials', marketPrice: '$0.001/g', recyclable: false, rarity: 'Very Low' },
        { name: 'Steel (Fe)', amount: '20g', value: '$0.01', description: 'Internal structure', marketPrice: '$0.0005/g', recyclable: true, rarity: 'Very Low' }
      ]
    },
    tablet: {
      premium: [
        { name: 'Gold (Au)', amount: '0.08g', value: '$5.88', description: 'Circuit boards and connectors', marketPrice: '$73.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Silver (Ag)', amount: '0.6g', value: '$0.69', description: 'Circuit boards and conductive traces', marketPrice: '$1.15/g', recyclable: true, rarity: 'High' },
        { name: 'Copper (Cu)', amount: '45g', value: '$0.56', description: 'Wiring and electromagnetic shielding', marketPrice: '$0.0125/g', recyclable: true, rarity: 'Medium' },
        { name: 'Palladium (Pd)', amount: '0.03g', value: '$2.00', description: 'Capacitors and circuit boards', marketPrice: '$66.70/g', recyclable: true, rarity: 'Very High' },
        { name: 'Indium (In)', amount: '0.3g', value: '$0.24', description: 'Large touchscreen ITO coating', marketPrice: '$0.80/g', recyclable: true, rarity: 'High' },
        { name: 'Rare Earth Elements', amount: '4g', value: '$6.00', description: 'Magnets, speakers, and display phosphors', marketPrice: '$1.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Lithium (Li)', amount: '8g', value: '$1.33', description: 'Large battery pack', marketPrice: '$0.167/g', recyclable: true, rarity: 'Medium' },
        { name: 'Cobalt (Co)', amount: '15g', value: '$1.50', description: 'Battery cathode material', marketPrice: '$0.10/g', recyclable: true, rarity: 'High' },
        { name: 'Aluminum (Al)', amount: '150g', value: '$0.90', description: 'Frame and heat dissipation', marketPrice: '$0.006/g', recyclable: true, rarity: 'Low' },
        { name: 'Glass (SiO2)', amount: '200g', value: '$0.06', description: 'Large display screen', marketPrice: '$0.0003/g', recyclable: false, rarity: 'Very Low' }
      ],
      standard: [
        { name: 'Gold (Au)', amount: '0.05g', value: '$3.68', description: 'Circuit boards', marketPrice: '$73.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Silver (Ag)', amount: '0.4g', value: '$0.46', description: 'Circuit boards', marketPrice: '$1.15/g', recyclable: true, rarity: 'High' },
        { name: 'Copper (Cu)', amount: '30g', value: '$0.375', description: 'Wiring and components', marketPrice: '$0.0125/g', recyclable: true, rarity: 'Medium' },
        { name: 'Rare Earth Elements', amount: '2.5g', value: '$3.75', description: 'Speakers and display', marketPrice: '$1.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Lithium (Li)', amount: '6g', value: '$1.00', description: 'Battery pack', marketPrice: '$0.167/g', recyclable: true, rarity: 'Medium' },
        { name: 'Cobalt (Co)', amount: '10g', value: '$1.00', description: 'Battery cathode', marketPrice: '$0.10/g', recyclable: true, rarity: 'High' },
        { name: 'Aluminum (Al)', amount: '100g', value: '$0.60', description: 'Frame and housing', marketPrice: '$0.006/g', recyclable: true, rarity: 'Low' },
        { name: 'Plastic (Various)', amount: '120g', value: '$0.12', description: 'Housing and components', marketPrice: '$0.001/g', recyclable: false, rarity: 'Very Low' }
      ]
    },
    laptop: {
      premium: [
        { name: 'Gold (Au)', amount: '0.2g', value: '$14.70', description: 'Circuit boards, connectors, and processors', marketPrice: '$73.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Silver (Ag)', amount: '1.5g', value: '$1.73', description: 'Circuit boards and conductive elements', marketPrice: '$1.15/g', recyclable: true, rarity: 'High' },
        { name: 'Copper (Cu)', amount: '200g', value: '$2.50', description: 'Wiring, heat sinks, and cooling systems', marketPrice: '$0.0125/g', recyclable: true, rarity: 'Medium' },
        { name: 'Palladium (Pd)', amount: '0.1g', value: '$6.67', description: 'Capacitors and high-end components', marketPrice: '$66.70/g', recyclable: true, rarity: 'Very High' },
        { name: 'Platinum (Pt)', amount: '0.02g', value: '$0.60', description: 'Hard drives and premium components', marketPrice: '$30.00/g', recyclable: true, rarity: 'Very High' },
        { name: 'Rare Earth Elements', amount: '8g', value: '$12.00', description: 'Hard drive magnets, speakers, display', marketPrice: '$1.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Lithium (Li)', amount: '25g', value: '$4.17', description: 'Large battery pack', marketPrice: '$0.167/g', recyclable: true, rarity: 'Medium' },
        { name: 'Cobalt (Co)', amount: '40g', value: '$4.00', description: 'Battery cathode material', marketPrice: '$0.10/g', recyclable: true, rarity: 'High' },
        { name: 'Aluminum (Al)', amount: '800g', value: '$4.80', description: 'Chassis, heat sinks, and structural components', marketPrice: '$0.006/g', recyclable: true, rarity: 'Low' },
        { name: 'Titanium (Ti)', amount: '50g', value: '$3.00', description: 'Premium chassis material', marketPrice: '$0.06/g', recyclable: true, rarity: 'Medium' },
        { name: 'Steel (Fe)', amount: '300g', value: '$0.15', description: 'Internal structure and screws', marketPrice: '$0.0005/g', recyclable: true, rarity: 'Very Low' }
      ],
      standard: [
        { name: 'Gold (Au)', amount: '0.1g', value: '$7.35', description: 'Circuit boards and processors', marketPrice: '$73.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Silver (Ag)', amount: '0.8g', value: '$0.92', description: 'Circuit boards', marketPrice: '$1.15/g', recyclable: true, rarity: 'High' },
        { name: 'Copper (Cu)', amount: '120g', value: '$1.50', description: 'Wiring and cooling', marketPrice: '$0.0125/g', recyclable: true, rarity: 'Medium' },
        { name: 'Rare Earth Elements', amount: '5g', value: '$7.50', description: 'Hard drive and speakers', marketPrice: '$1.50/g', recyclable: true, rarity: 'Very High' },
        { name: 'Lithium (Li)', amount: '15g', value: '$2.50', description: 'Battery pack', marketPrice: '$0.167/g', recyclable: true, rarity: 'Medium' },
        { name: 'Cobalt (Co)', amount: '25g', value: '$2.50', description: 'Battery cathode', marketPrice: '$0.10/g', recyclable: true, rarity: 'High' },
        { name: 'Aluminum (Al)', amount: '500g', value: '$3.00', description: 'Chassis and components', marketPrice: '$0.006/g', recyclable: true, rarity: 'Low' },
        { name: 'Plastic (Various)', amount: '400g', value: '$0.40', description: 'Housing and keyboard', marketPrice: '$0.001/g', recyclable: false, rarity: 'Very Low' }
      ]
    }
  },

  environmentalImpact: {
    smartphone: {
      manufacturing: {
        co2: '70kg CO₂ equivalent',
        water: '18,500 liters',
        energy: '1,200 kWh',
        rawMaterials: '44kg various materials',
        landUse: '7.2 m² for mining operations',
        toxicWaste: '2.3kg hazardous materials',
        acidification: '0.8kg SO₂ equivalent',
        eutrophication: '0.15kg PO₄ equivalent',
        ozoneDepletion: '0.000012kg CFC-11 equivalent'
      },
      recycling: {
        co2Saved: '60-70kg CO₂',
        waterSaved: '15,000-18,500L',
        energySaved: '1,000-1,200 kWh',
        materialRecovery: '80-95% of metals',
        landfillDiversion: '150g device weight',
        toxicPrevention: '2.1kg hazardous materials from landfill',
        resourceConservation: '40kg raw materials saved',
        economicValue: '$8-25 material recovery value'
      },
      lifecycle: {
        miningPhase: '45% of total environmental impact',
        manufacturingPhase: '35% of total environmental impact',
        usePhase: '15% of total environmental impact',
        endOfLife: '5% of total environmental impact',
        averageLifespan: '2.5 years',
        upgradeRate: '18 months average'
      }
    },
    tablet: {
      manufacturing: {
        co2: '180kg CO₂ equivalent',
        water: '45,000 liters',
        energy: '2,800 kWh',
        rawMaterials: '120kg various materials',
        landUse: '18 m² for mining operations',
        toxicWaste: '5.8kg hazardous materials'
      },
      recycling: {
        co2Saved: '150-180kg CO₂',
        waterSaved: '38,000-45,000L',
        energySaved: '2,400-2,800 kWh',
        materialRecovery: '85-95% of metals',
        landfillDiversion: '500g device weight',
        economicValue: '$15-45 material recovery value'
      },
      lifecycle: {
        averageLifespan: '4 years',
        upgradeRate: '3.5 years average'
      }
    },
    laptop: {
      manufacturing: {
        co2: '350kg CO₂ equivalent',
        water: '120,000 liters',
        energy: '5,500 kWh',
        rawMaterials: '1,200kg various materials',
        landUse: '45 m² for mining operations',
        toxicWaste: '15kg hazardous materials'
      },
      recycling: {
        co2Saved: '300-350kg CO₂',
        waterSaved: '100,000-120,000L',
        energySaved: '4,500-5,500 kWh',
        materialRecovery: '90-98% of metals',
        landfillDiversion: '2kg device weight',
        economicValue: '$25-85 material recovery value'
      },
      lifecycle: {
        averageLifespan: '5 years',
        upgradeRate: '4 years average'
      }
    }
  },

  globalEWasteStats: {
    2023: {
      totalGenerated: '54 million tons globally',
      properlyRecycled: '20% (10.8 million tons)',
      informalRecycling: '17.4% (9.4 million tons)',
      landfilled: '62.6% (33.8 million tons)',
      economicValue: '$62 billion in raw materials',
      growthRate: '3-4% annually',
      projectedBy2030: '74.7 million tons'
    },
    byRegion: {
      asia: '24.9 million tons (46%)',
      americas: '13.1 million tons (24%)',
      europe: '12.0 million tons (22%)',
      africa: '2.9 million tons (5%)',
      oceania: '0.7 million tons (1%)'
    },
    byCategory: {
      temperatureExchange: '18.8 million tons (35%)',
      screens: '8.3 million tons (15%)',
      lamps: '1.2 million tons (2%)',
      largeEquipment: '14.3 million tons (26%)',
      smallEquipment: '11.4 million tons (21%)',
      smallIT: '4.6 million tons (9%)'
    },
    healthImpacts: {
      affectedPopulation: '18 million people work in informal e-waste sector',
      childrenAtRisk: '12.9 million women and children at risk',
      toxicExposure: 'Lead, mercury, cadmium, and flame retardants',
      respiratoryIssues: '40% higher rates in e-waste processing areas',
      neurologicalEffects: 'Documented in children near processing sites'
    }
  },

  recyclingTips: {
    smartphone: {
      dataWipe: [
        '🔐 Sign out of all accounts (Apple ID, Google, Samsung, Microsoft, social media)',
        '📱 iOS: Settings > General > Transfer or Reset iPhone > Erase All Content and Settings',
        '🤖 Android: Settings > System > Reset options > Erase all data (factory reset)',
        '🔍 Turn off Find My iPhone/Find My Device before wiping',
        '📸 Delete photos from cloud storage if synced (iCloud, Google Photos, OneDrive)',
        '💾 Remove SIM card and microSD card physically',
        '🔑 Sign out of password managers and two-factor authentication apps',
        '💳 Remove payment methods from Apple Pay/Google Pay/Samsung Pay',
        '📧 Sign out of email accounts and messaging apps',
        '🎵 Deauthorize from iTunes/Spotify/streaming services',
        '🔒 For sensitive data: Use encryption before wiping, or physical destruction'
      ],
      preparation: [
        '🔋 Remove phone case, screen protector, pop sockets, and all accessories',
        '📞 Contact carrier to deactivate service and unlock device if needed',
        '💰 Check trade-in value first - working phones worth $20-800+ depending on model',
        '🧹 Clean device thoroughly with microfiber cloth and isopropyl alcohol',
        '📋 Keep receipt for tax deduction if donating (fair market value)',
        '📦 Keep original box and accessories if available (increases value)',
        '🔌 Include original charger if possible',
        '📄 Print proof of data wiping for security compliance',
        '⚖️ Check local laws regarding data destruction requirements',
        '🏷️ Remove any corporate asset tags or identification stickers'
      ],
      recycling: [
        '♻️ Take to certified e-waste recycler (R2 or e-Stewards certified)',
        '🏪 Use manufacturer take-back programs (Apple, Samsung, Google, etc.)',
        '🛒 Drop off at retail locations (Best Buy, Staples, Verizon, AT&T, T-Mobile)',
        '🏛️ Check local municipal e-waste collection events (often free)',
        '💡 Consider repair or donation if device still works (extend lifecycle)',
        '🏥 Donate to domestic violence shelters (after data wiping)',
        '🎓 Donate to schools or educational programs',
        '🌍 Use mail-in recycling programs for remote areas',
        '🏭 Avoid informal recyclers or general trash disposal',
        '📜 Get certificate of destruction for business/sensitive devices'
      ],
      valueMaximization: [
        '💰 Compare trade-in values: Apple, Samsung, Gazelle, Swappa, Amazon',
        '🔧 Consider professional repair for cracked screens (may increase value)',
        '📱 Unlock device from carrier before selling (increases market value)',
        '📦 Include original packaging and accessories',
        '🧹 Professional cleaning can increase perceived value',
        '⏰ Sell sooner rather than later (depreciation is rapid)',
        '📊 Check market prices on eBay, Swappa for realistic expectations',
        '🛡️ Consider device protection plans for future devices'
      ]
    },
    tablet: {
      dataWipe: [
        '🔐 Sign out of all accounts and cloud services',
        '📱 iPad: Settings > General > Transfer or Reset iPad > Erase All Content',
        '🤖 Android: Settings > System > Reset > Factory data reset',
        '🔍 Turn off Find My iPad/Find My Device',
        '💾 Remove any external storage cards',
        '🔑 Sign out of all apps and services',
        '📧 Remove email accounts and corporate profiles'
      ],
      preparation: [
        '🔋 Remove cases, keyboards, styluses, and screen protectors',
        '💰 Check trade-in value - tablets worth $30-600+ depending on model',
        '🧹 Clean screen and body thoroughly',
        '📦 Include original accessories if available',
        '📄 Keep purchase receipt for warranty/tax purposes'
      ],
      recycling: [
        '♻️ Same options as smartphones - certified e-waste recyclers',
        '🏪 Manufacturer programs often accept tablets',
        '🛒 Most retail electronics stores accept tablets',
        '🎓 Educational donations are popular for tablets',
        '🏥 Healthcare facilities often need tablets for patient use'
      ]
    },
    laptop: {
      dataWipe: [
        '💾 Back up important data to external storage or cloud',
        '🔐 Sign out of all accounts (Microsoft, Apple, Google, Adobe, etc.)',
        '🗂️ Use built-in disk encryption before wiping (BitLocker, FileVault)',
        '💻 Perform secure erase: Windows Reset or macOS Disk Utility',
        '🔨 For sensitive data: Physical hard drive destruction recommended',
        '🔑 Deauthorize from software licenses (Adobe, Microsoft Office)',
        '📧 Remove from corporate domain and email systems',
        '🌐 Clear browser saved passwords and autofill data'
      ],
      preparation: [
        '🔌 Remove battery if easily accessible (some models)',
        '💾 Remove hard drive if keeping data or requiring destruction',
        '🧹 Clean keyboard, screen, and exterior thoroughly',
        '📦 Include power adapter and original packaging if available',
        '💰 Check trade-in value - laptops worth $50-1500+ depending on specs',
        '🔧 Consider RAM/storage upgrades before disposal (increases value)'
      ],
      recycling: [
        '♻️ Certified e-waste recyclers handle laptops professionally',
        '🏪 Manufacturer programs: Dell, HP, Lenovo, Apple all have programs',
        '🛒 Office supply stores often accept laptops',
        '🎓 Schools and nonprofits often need laptop donations',
        '🏢 Corporate IT asset disposition services for business laptops',
        '🔒 Ensure data destruction certificates for business compliance'
      ]
    }
  },

  recyclingNetwork: {
    manufacturers: [
      {
        name: 'Apple Trade In',
        website: 'apple.com/trade-in',
        devices: ['iPhone', 'iPad', 'Mac', 'Apple Watch'],
        process: 'Online assessment, mail-in or store drop-off',
        payment: 'Apple Store credit or cash',
        dataDestruction: 'Certified secure data wiping',
        environmental: 'Carbon neutral shipping, responsible recycling'
      },
      {
        name: 'Samsung Trade-In',
        website: 'samsung.com/us/trade-in',
        devices: ['Galaxy phones', 'tablets', 'watches', 'other brands accepted'],
        process: 'Online quote, mail-in with prepaid label',
        payment: 'Samsung credit or PayPal',
        dataDestruction: 'Secure data wiping included',
        environmental: 'Certified recycling partners'
      },
      {
        name: 'Google Trade-In',
        website: 'store.google.com/trade-in',
        devices: ['Pixel phones', 'other Android devices'],
        process: 'Online assessment, mail-in program',
        payment: 'Google Store credit',
        dataDestruction: 'Factory reset verification',
        environmental: 'Responsible recycling commitment'
      },
      {
        name: 'Dell Reconnect',
        website: 'dell.com/reconnect',
        devices: ['Any brand computers', 'monitors', 'printers'],
        process: 'Drop-off at Goodwill locations nationwide',
        payment: 'Free service, tax deduction available',
        dataDestruction: 'Hard drive wiping available',
        environmental: 'Partnership with Goodwill for reuse/recycling'
      },
      {
        name: 'HP Planet Partners',
        website: 'hp.com/recycle',
        devices: ['HP products', 'other brand computers'],
        process: 'Mail-in or drop-off programs',
        payment: 'Free for HP products, small fee for others',
        dataDestruction: 'Secure data destruction services',
        environmental: 'Closed-loop recycling program'
      }
    ],
    retailers: [
      {
        name: 'Best Buy Recycling',
        website: 'bestbuy.com/recycling',
        devices: ['Most electronics under 50 lbs'],
        locations: '1000+ stores nationwide',
        cost: 'Free for most items, $30 for TVs/monitors',
        limits: '3 items per day per household',
        dataDestruction: 'Hard drive destruction service available ($10)',
        specialServices: 'Haul-away service for large items'
      },
      {
        name: 'Staples Electronics Recycling',
        website: 'staples.com/recycling',
        devices: ['Computers', 'phones', 'tablets', 'printers'],
        locations: '1000+ stores',
        cost: 'Free for most items',
        limits: '7 items per day',
        dataDestruction: 'Free data destruction',
        specialServices: 'Business recycling programs'
      },
      {
        name: 'Office Depot WorryFree Recycling',
        website: 'officedepot.com/recycling',
        devices: ['Computers', 'phones', 'tablets', 'ink cartridges'],
        locations: '1300+ stores',
        cost: 'Free for most items',
        limits: 'Reasonable quantities accepted',
        dataDestruction: 'Data wiping services',
        specialServices: 'Ink cartridge rewards program'
      }
    ],
    carriers: [
      {
        name: 'Verizon Trade-In',
        website: 'verizon.com/trade-in',
        devices: ['Any brand phones', 'tablets', 'smartwatches'],
        process: 'Online quote, mail-in or store drop-off',
        payment: 'Verizon account credit or Verizon gift card',
        dataDestruction: 'Factory reset assistance',
        environmental: 'Certified recycling partners'
      },
      {
        name: 'AT&T Trade-In',
        website: 'att.com/trade-in',
        devices: ['Phones', 'tablets', 'other devices'],
        process: 'Online assessment, store trade-in',
        payment: 'AT&T account credit or promotion credit',
        dataDestruction: 'Data wiping guidance provided',
        environmental: 'Eco-friendly recycling program'
      },
      {
        name: 'T-Mobile Trade-In',
        website: 'tmobile.com/trade-in',
        devices: ['Any condition phones', 'tablets'],
        process: 'Online quote, mail-in or store',
        payment: 'Account credit or prepaid card',
        dataDestruction: 'Reset verification required',
        environmental: 'Partnership with certified recyclers'
      }
    ],
    online: [
      {
        name: 'Gazelle',
        website: 'gazelle.com',
        devices: ['iPhones', 'Samsung phones', 'iPads', 'MacBooks'],
        process: 'Online quote, free shipping kit',
        payment: 'Check, PayPal, or Amazon gift card',
        timeframe: '5-10 business days after receipt',
        dataDestruction: 'Certified data wiping included',
        guarantee: '30-day price lock, free returns if unsatisfied'
      },
      {
        name: 'Swappa',
        website: 'swappa.com',
        devices: ['Phones', 'tablets', 'smartwatches', 'laptops'],
        process: 'Peer-to-peer marketplace with verification',
        payment: 'PayPal (seller receives payment)',
        fees: '$10-25 depending on sale price',
        dataDestruction: 'Seller responsibility, guidance provided',
        guarantee: 'Device verification, buyer protection'
      },
      {
        name: 'Amazon Trade-In',
        website: 'amazon.com/tradein',
        devices: ['Electronics', 'books', 'video games'],
        process: 'Online assessment, free shipping',
        payment: 'Amazon gift card (often with bonus)',
        timeframe: '2-3 weeks processing',
        dataDestruction: 'Factory reset required',
        guarantee: 'Amazon A-to-Z guarantee'
      },
      {
        name: 'ecoATM',
        website: 'ecoatm.com',
        devices: ['Phones', 'tablets', 'MP3 players'],
        locations: '5000+ kiosks in retail locations',
        process: 'Instant evaluation and payment',
        payment: 'Cash on the spot',
        dataDestruction: 'Automated data wiping',
        convenience: '24/7 availability at many locations'
      }
    ],
    nonprofit: [
      {
        name: 'Cell Phones for Soldiers',
        website: 'cellphonesforsoldiers.com',
        devices: ['Any cell phone', 'smartphones', 'accessories'],
        mission: 'Provide calling cards and emergency funding to troops',
        process: 'Mail-in program with prepaid labels',
        impact: '$10+ million in support provided to military families',
        dataDestruction: 'Secure data wiping before processing'
      },
      {
        name: 'National Coalition Against Domestic Violence',
        website: 'ncadv.org/donate-a-phone',
        devices: ['Cell phones', 'smartphones'],
        mission: 'Provide emergency phones to domestic violence survivors',
        process: 'Mail-in donations',
        impact: 'Life-saving communication for survivors',
        dataDestruction: 'Complete data wiping for safety'
      },
      {
        name: 'World Computer Exchange',
        website: 'worldcomputerexchange.org',
        devices: ['Laptops', 'tablets', 'computers'],
        mission: 'Bridge digital divide in developing countries',
        process: 'Refurbishment and international shipping',
        impact: 'Education technology for underserved communities',
        requirements: 'Working devices preferred, data wiping required'
      }
    ]
  }
};

// Smart device detection based on visual characteristics
export const detectDevice = (imageAnalysis) => {
  const { aspectRatio, brightness, edgeDensity, colorVariance, width, height } = imageAnalysis;
  
  // Smartphone detection criteria
  if (aspectRatio >= 0.4 && aspectRatio <= 0.8) {
    // Modern smartphone aspect ratios
    if (aspectRatio >= 0.45 && aspectRatio <= 0.55) {
      return {
        type: 'smartphone',
        subtype: 'modern',
        confidence: 85,
        brand: 'Modern Smartphone',
        model: 'Recent model (2020+)',
        materials: 'premium'
      };
    } else if (aspectRatio >= 0.55 && aspectRatio <= 0.65) {
      return {
        type: 'smartphone',
        subtype: 'standard',
        confidence: 80,
        brand: 'Standard Smartphone',
        model: 'Mid-range model',
        materials: 'standard'
      };
    } else {
      return {
        type: 'smartphone',
        subtype: 'older',
        confidence: 75,
        brand: 'Older Smartphone',
        model: 'Older model (pre-2020)',
        materials: 'basic'
      };
    }
  }
  
  // Tablet detection
  if (aspectRatio >= 0.7 && aspectRatio <= 1.4 && (width * height) > 100000) {
    return {
      type: 'tablet',
      subtype: 'standard',
      confidence: 70,
      brand: 'Tablet Device',
      model: 'iPad or Android tablet',
      materials: 'standard'
    };
  }
  
  // Laptop detection
  if (aspectRatio >= 1.3 && aspectRatio <= 2.0) {
    return {
      type: 'laptop',
      subtype: 'standard',
      confidence: 65,
      brand: 'Laptop Computer',
      model: 'Notebook computer',
      materials: 'standard'
    };
  }
  
  // Default to generic electronic device
  return {
    type: 'electronic',
    subtype: 'generic',
    confidence: 40,
    brand: 'Electronic Device',
    model: 'Unidentified device',
    materials: 'basic'
  };
};

// Get device information from database
export const getDeviceInfo = (detection) => {
  const { type, subtype, materials } = detection;
  
  if (type === 'smartphone') {
    const materialData = deviceDatabase.materials.smartphone[materials] || deviceDatabase.materials.smartphone.standard;
    const impact = deviceDatabase.environmentalImpact.smartphone;
    const tips = deviceDatabase.recyclingTips.smartphone;
    
    let valueRange = '$20-60';
    let condition = 'Good';
    
    if (materials === 'premium') {
      valueRange = '$40-150';
      condition = 'Excellent - Premium device';
    } else if (materials === 'basic') {
      valueRange = '$10-30';
      condition = 'Fair - Older device';
    }
    
    return {
      materials: materialData,
      environmentalImpact: impact,
      recyclingTips: tips,
      estimatedValue: valueRange,
      condition: condition,
      totalMaterialValue: materialData.reduce((sum, material) => sum + parseFloat(material.value.replace('$', '')), 0).toFixed(2)
    };
  }
  
  // Default info for other device types
  return {
    materials: [
      { name: 'Mixed Materials', amount: 'Various', value: '$5-20', description: 'Professional assessment needed' }
    ],
    environmentalImpact: {
      manufacturing: { co2: 'Varies', water: 'Varies', energy: 'Varies' },
      recycling: { co2Saved: 'Varies', waterSaved: 'Varies', energySaved: 'Varies' }
    },
    recyclingTips: {
      dataWipe: ['Remove personal data', 'Consult device manual'],
      preparation: ['Clean device', 'Remove accessories'],
      recycling: ['Take to certified e-waste recycler']
    },
    estimatedValue: '$5-25',
    condition: 'Professional assessment needed',
    totalMaterialValue: '10.00'
  };
};

export default deviceDatabase;