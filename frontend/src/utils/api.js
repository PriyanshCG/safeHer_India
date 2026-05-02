// API configuration and utility functions
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://safeher-indiasafeher-india-backend.onrender.com/api').replace(/\/+$/, '');

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  // Ensure endpoint starts with a slash
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${formattedEndpoint}`;
  
  console.log(`[API Request] ${options.method || 'GET'} ${url}`);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      console.error(`[API Error Response]`, data);
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('[API Connection Error]:', error.message);
    if (error.message === 'Failed to fetch') {
      throw new Error('Could not connect to the server. Please check your internet connection or if the backend service is running.');
    }
    throw error;
  }
};

// Specific API functions
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getCurrentUser: () => apiRequest('/auth/me'),
  
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
};

export const guardianAPI = {
  getGuardians: () => apiRequest('/guardians'),
  
  addGuardian: (guardianData) => apiRequest('/guardians', {
    method: 'POST',
    body: JSON.stringify(guardianData),
  }),
  
  updateGuardian: (id, guardianData) => apiRequest(`/guardians/${id}`, {
    method: 'PUT',
    body: JSON.stringify(guardianData),
  }),
  
  removeGuardian: (id) => apiRequest(`/guardians/${id}`, { method: 'DELETE' }),
};

export const sosAPI = {
  triggerSOS: (locationData) => apiRequest('/sos/trigger', {
    method: 'POST',
    body: JSON.stringify(locationData),
  }),
  resolveSOS: (id) => apiRequest(`/sos/${id}/resolve`, { method: 'PUT' }),
  getHistory: () => apiRequest('/sos/history'),
};

export const activityAPI = {
  getActivities: () => apiRequest('/activities'),
};

export const userAPI = {
  updateProfile: (data) => apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  })
};

export default apiRequest;
