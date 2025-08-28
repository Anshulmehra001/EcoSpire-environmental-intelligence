// Enhanced Authentication System with Local Storage
class AuthManager {
  constructor() {
    this.baseStorageKeys = {
      user: 'ecospire_user',
      activities: 'ecospire_activities',
      stats: 'ecospire_stats',
      settings: 'ecospire_settings'
    };
    this.initializeStorage();
  }

  // Get user-specific storage keys
  getStorageKeys(userId = null) {
    const currentUser = userId || this.getCurrentUserId();
    if (!currentUser || currentUser === 'guest') {
      return this.baseStorageKeys;
    }
    
    return {
      user: this.baseStorageKeys.user,
      activities: `${this.baseStorageKeys.activities}_${currentUser}`,
      stats: `${this.baseStorageKeys.stats}_${currentUser}`,
      settings: `${this.baseStorageKeys.settings}_${currentUser}`
    };
  }

  getCurrentUserId() {
    const userData = localStorage.getItem(this.baseStorageKeys.user);
    if (userData) {
      const user = JSON.parse(userData);
      return user.id;
    }
    return null;
  }

  initializeStorage() {
    // Initialize default data if not exists
    if (!localStorage.getItem(this.baseStorageKeys.user)) {
      this.setGuestMode();
    }
    
    // Initialize user-specific data
    const keys = this.getStorageKeys();
    if (!localStorage.getItem(keys.activities)) {
      localStorage.setItem(keys.activities, JSON.stringify([]));
    }
    if (!localStorage.getItem(keys.stats)) {
      this.resetStats();
    }
  }

  setGuestMode() {
    const guestUser = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@ecospire.com',
      isGuest: true,
      joinDate: new Date().toISOString(),
      avatar: '🌱',
      location: null,
      preferences: {
        notifications: true,
        publicProfile: false,
        dataSharing: false
      }
    };
    localStorage.setItem(this.baseStorageKeys.user, JSON.stringify(guestUser));
  }

  resetStats() {
    const defaultStats = {
      carbonSaved: 0,
      waterTests: 0,
      biodiversityScans: 0,
      wasteReduced: 0,
      energySaved: 0,
      treesPlanted: 0,
      totalActivities: 0,
      streakDays: 0,
      lastActivity: null,
      achievements: [],
      level: 1,
      points: 0
    };
    const keys = this.getStorageKeys();
    localStorage.setItem(keys.stats, JSON.stringify(defaultStats));
  }

  getCurrentUser() {
    const userData = localStorage.getItem(this.baseStorageKeys.user);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated() {
    const user = this.getCurrentUser();
    return user && !user.isGuest;
  }

  isGuestMode() {
    const user = this.getCurrentUser();
    return user && user.isGuest;
  }

  getUserStats() {
    const keys = this.getStorageKeys();
    const statsData = localStorage.getItem(keys.stats);
    if (statsData) {
      return JSON.parse(statsData);
    } else {
      this.resetStats();
      return JSON.parse(localStorage.getItem(keys.stats));
    }
  }

  updateUserStats(updates) {
    const currentStats = this.getUserStats();
    const newStats = { ...currentStats, ...updates };
    
    // Update level based on points
    newStats.level = Math.floor(newStats.points / 1000) + 1;
    
    // Update streak
    const today = new Date().toDateString();
    const lastActivity = newStats.lastActivity ? new Date(newStats.lastActivity).toDateString() : null;
    
    if (lastActivity !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActivity === yesterday.toDateString()) {
        newStats.streakDays += 1;
      } else if (lastActivity !== today) {
        newStats.streakDays = 1;
      }
      
      newStats.lastActivity = new Date().toISOString();
    }

    const keys = this.getStorageKeys();
    localStorage.setItem(keys.stats, JSON.stringify(newStats));
    return newStats;
  }

  async logActivity(description, data = {}) {
    const activities = this.getActivities();
    const activity = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      description,
      data,
      type: data.type || 'general',
      points: data.points || 10
    };

    activities.unshift(activity);
    
    // Keep only last 100 activities
    if (activities.length > 100) {
      activities.splice(100);
    }

    const keys = this.getStorageKeys();
    localStorage.setItem(keys.activities, JSON.stringify(activities));

    // Update stats
    const currentStats = this.getUserStats();
    const updates = {
      totalActivities: currentStats.totalActivities + 1,
      points: currentStats.points + activity.points
    };

    // Update specific stats based on activity type
    switch (data.type) {
      case 'water_test':
        updates.waterTests = (currentStats.waterTests || 0) + (data.amount || 1);
        break;
      case 'biodiversity_scan':
        updates.biodiversityScans = (currentStats.biodiversityScans || 0) + (data.amount || 1);
        break;
      case 'carbon_reduction':
        updates.carbonSaved = (currentStats.carbonSaved || 0) + (data.amount || 1);
        break;
      case 'waste_reduction':
        updates.wasteReduced = (currentStats.wasteReduced || 0) + (data.amount || 1);
        break;
      case 'energy_saved':
        updates.energySaved = (currentStats.energySaved || 0) + (data.amount || 1);
        break;
      case 'tree_planted':
        updates.treesPlanted = (currentStats.treesPlanted || 0) + (data.amount || 1);
        break;
      case 'general':
        // General activities don't update specific counters but still give points
        break;
    }

    this.updateUserStats(updates);
    this.checkAchievements();

    return { success: true, id: activity.id, activity };
  }

  getActivities(limit = 50) {
    const keys = this.getStorageKeys();
    const activities = localStorage.getItem(keys.activities);
    const allActivities = activities ? JSON.parse(activities) : [];
    return allActivities.slice(0, limit);
  }

  async getUserData(type, limit = 10) {
    const activities = this.getActivities();
    return activities
      .filter(activity => activity.type === type)
      .slice(0, limit)
      .map(activity => ({
        ...activity.data,
        timestamp: activity.timestamp
      }));
  }

  checkAchievements() {
    try {
      const stats = this.getUserStats();
      
      // Ensure stats is valid and has required properties
      if (!stats || typeof stats !== 'object') {
        console.warn('Invalid stats object in checkAchievements');
        return [];
      }

      // Ensure achievements array exists
      if (!Array.isArray(stats.achievements)) {
        stats.achievements = [];
      }

      const newAchievements = [];

      // Define achievements
      const achievements = [
        { id: 'first_test', name: 'First Test', description: 'Complete your first water test', condition: () => (stats.waterTests || 0) >= 1, icon: '💧' },
        { id: 'bio_explorer', name: 'Bio Explorer', description: 'Complete 5 biodiversity scans', condition: () => (stats.biodiversityScans || 0) >= 5, icon: '🦜' },
        { id: 'carbon_saver', name: 'Carbon Saver', description: 'Save 10kg of CO₂', condition: () => (stats.carbonSaved || 0) >= 10, icon: '🌱' },
        { id: 'streak_week', name: 'Weekly Streak', description: 'Maintain a 7-day activity streak', condition: () => (stats.streakDays || 0) >= 7, icon: '🔥' },
        { id: 'level_up', name: 'Level Up', description: 'Reach level 5', condition: () => (stats.level || 1) >= 5, icon: '⭐' },
        { id: 'eco_champion', name: 'Eco Champion', description: 'Complete 50 activities', condition: () => (stats.totalActivities || 0) >= 50, icon: '🏆' }
      ];

      achievements.forEach(achievement => {
        try {
          if (achievement.condition() && !stats.achievements.includes(achievement.id)) {
            newAchievements.push(achievement);
            stats.achievements.push(achievement.id);
          }
        } catch (error) {
          console.warn(`Error checking achievement ${achievement.id}:`, error);
        }
      });

      if (newAchievements.length > 0) {
        const keys = this.getStorageKeys();
        localStorage.setItem(keys.stats, JSON.stringify(stats));
        return newAchievements;
      }

      return [];
    } catch (error) {
      console.error('Error in checkAchievements:', error);
      return [];
    }
  }

  async login(credentials) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo, create a user based on email
    const user = {
      id: credentials.email.replace('@', '_').replace(/\./g, '_'),
      name: credentials.name || credentials.email.split('@')[0],
      email: credentials.email,
      isGuest: false,
      joinDate: new Date().toISOString(),
      avatar: this.generateAvatar(credentials.email),
      location: null,
      preferences: {
        notifications: true,
        publicProfile: true,
        dataSharing: true
      }
    };

    // Store the new user
    localStorage.setItem(this.baseStorageKeys.user, JSON.stringify(user));
    
    // Initialize user-specific data storage
    this.initializeUserData(user.id);

    return { success: true, user };
  }

  initializeUserData(userId) {
    const keys = this.getStorageKeys(userId);
    
    // Initialize activities if they don't exist
    if (!localStorage.getItem(keys.activities)) {
      localStorage.setItem(keys.activities, JSON.stringify([]));
    }
    
    // Initialize stats if they don't exist
    if (!localStorage.getItem(keys.stats)) {
      const defaultStats = {
        carbonSaved: 0,
        waterTests: 0,
        biodiversityScans: 0,
        wasteReduced: 0,
        energySaved: 0,
        treesPlanted: 0,
        totalActivities: 0,
        streakDays: 0,
        lastActivity: null,
        achievements: [],
        level: 1,
        points: 0
      };
      localStorage.setItem(keys.stats, JSON.stringify(defaultStats));
    }
  }

  async register(userData) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const user = {
      id: userData.email.replace('@', '_').replace(/\./g, '_'),
      name: userData.name,
      email: userData.email,
      isGuest: false,
      joinDate: new Date().toISOString(),
      avatar: this.generateAvatar(userData.email),
      location: null,
      preferences: {
        notifications: true,
        publicProfile: true,
        dataSharing: true
      }
    };

    localStorage.setItem(this.baseStorageKeys.user, JSON.stringify(user));
    
    // Initialize fresh user data
    this.initializeUserData(user.id);

    return { success: true, user };
  }

  async logout() {
    // Log the logout activity before clearing
    await this.logActivity('User logged out', {
      type: 'auth',
      action: 'logout',
      points: 0
    });
    
    // Clear current user and reset to guest mode
    this.setGuestMode();
    
    return { success: true };
  }

  generateAvatar(email) {
    const avatars = ['🌱', '🌿', '🌳', '🦜', '🐝', '🌸', '🌺', '🍃', '🌾', '🌻'];
    const index = email.charCodeAt(0) % avatars.length;
    return avatars[index];
  }

  updateUserProfile(updates) {
    const user = this.getCurrentUser();
    if (user) {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem(this.baseStorageKeys.user, JSON.stringify(updatedUser));
      return updatedUser;
    }
    return null;
  }

  getLeaderboard() {
    // Simulate leaderboard data
    const currentUser = this.getCurrentUser();
    const currentStats = this.getUserStats();
    
    return [
      { name: 'EcoChampion2024', points: 15420, level: 16, avatar: '🏆' },
      { name: 'GreenWarrior', points: 12890, level: 13, avatar: '🌱' },
      { name: 'BioDiversityExpert', points: 11250, level: 12, avatar: '🦜' },
      { name: currentUser?.name || 'You', points: currentStats.points, level: currentStats.level, avatar: currentUser?.avatar || '🌿', isCurrentUser: true },
      { name: 'WaterTester', points: 8940, level: 9, avatar: '💧' },
      { name: 'CarbonSaver', points: 7650, level: 8, avatar: '🌳' },
      { name: 'EcoNewbie', points: 3420, level: 4, avatar: '🌸' }
    ].sort((a, b) => b.points - a.points);
  }
}

export const authManager = new AuthManager();

export default authManager;