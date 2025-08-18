// Mock auth utility for demo purposes
export const authManager = {
  getCurrentUser: () => ({
    name: 'Environmental Champion',
    email: 'demo@ecospire.com',
    id: 'demo-user'
  }),
  
  isGuestMode: () => false,
  
  getUserStats: () => ({
    co2Saved: 45,
    waterTests: 12,
    bioScans: 8,
    totalActivities: 65
  }),
  
  getUserData: async (type, limit = 10) => {
    // Return mock data based on type
    const mockData = {
      water_test: [
        { timestamp: Date.now() - 86400000, location: 'Local River', ph: 7.2, quality: 'Good' },
        { timestamp: Date.now() - 172800000, location: 'City Park Pond', ph: 6.8, quality: 'Fair' }
      ],
      biodiversity_scan: [
        { timestamp: Date.now() - 43200000, detectedSpecies: ['Robin', 'Sparrow', 'Blue Jay'], location: 'Backyard' },
        { timestamp: Date.now() - 129600000, detectedSpecies: ['Cardinal', 'Crow'], location: 'Park' }
      ],
      carbon_reduction: [
        { timestamp: Date.now() - 21600000, amount: 2.5, activity: 'Bike to work' },
        { timestamp: Date.now() - 108000000, amount: 1.8, activity: 'Recycling' }
      ]
    };
    
    return mockData[type] || [];
  },
  
  logActivity: async (description, data = {}) => {
    console.log('📊 Activity logged (demo):', description, data);
    return Promise.resolve({ success: true, id: Date.now() });
  },
  
  isAuthenticated: () => true,
  
  login: async (credentials) => {
    console.log('🔐 Login (demo):', credentials.email);
    return Promise.resolve({ success: true, user: authManager.getCurrentUser() });
  },
  
  logout: async () => {
    console.log('👋 Logout (demo)');
    return Promise.resolve({ success: true });
  },
  
  register: async (userData) => {
    console.log('📝 Register (demo):', userData.email);
    return Promise.resolve({ success: true, user: authManager.getCurrentUser() });
  }
};

export default authManager;