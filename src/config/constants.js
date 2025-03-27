// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  ENDPOINTS: {
    SAVE_TEXT_CONFIGURATION: '/api/save-text-configuration',
    SAVE_DB_CONFIGURATION: '/api/save-db-configuration',
    SAVE_PROFILE_CONFIGURATION: '/api/save-profile-configuration'
  }
};