import { API_CONFIG } from '../config/constants';

const handleApiError = (error) => {
  if (error?.message) {
    console.error('API Error:', error.message);
  }
  
  if (!navigator.onLine) {
    return 'No internet connection. Please check your network.';
  }

  if (error?.response) {
    return error.response.data?.message || 'Server returned an error';
  }

  return error?.message || 'An unexpected error occurred. Please try again.';
};

async function makeRequest(endpoint, payload) {
  if (!API_CONFIG.BASE_URL) {
    throw new Error('API base URL is not configured');
  }

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errorMessage = `Server error: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // If parsing fails, use the default error message
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

export async function saveTextConfiguration(payload) {
  if (!payload) {
    throw new Error('No configuration data provided');
  }
  return makeRequest(API_CONFIG.ENDPOINTS.SAVE_TEXT_CONFIGURATION, payload);
}

export async function saveDbConfiguration(payload) {
  if (!payload) {
    throw new Error('No configuration data provided');
  }
  return makeRequest(API_CONFIG.ENDPOINTS.SAVE_DB_CONFIGURATION, payload);
}