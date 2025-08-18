// Constants Export
export { default as theme } from './theme';

// Application Constants
export const APP_NAME = 'EcoSpire';
export const APP_VERSION = '2.0.0';
export const APP_DESCRIPTION = 'Environmental Intelligence Hub';

// API Endpoints (if needed)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'ecospire_user_preferences',
  THEME_PREFERENCE: 'ecospire_theme',
  SIDEBAR_STATE: 'ecospire_sidebar_state',
  ENVIRONMENTAL_DATA: 'ecospire_env_data'
};

// Environmental Tool Categories
export const TOOL_CATEGORIES = {
  CORE: 'Core',
  ANALYSIS_TOOLS: 'Analysis Tools',
  SMART_SOLUTIONS: 'Smart Solutions',
  MONITORING: 'Monitoring',
  COMMUNITY: 'Community',
  CREATIVE_TOOLS: 'Creative Tools'
};

// Default User Stats
export const DEFAULT_USER_STATS = {
  co2Saved: 0,
  waterTests: 0,
  bioScans: 0,
  toolsUsed: 0,
  impactScore: '0'
};