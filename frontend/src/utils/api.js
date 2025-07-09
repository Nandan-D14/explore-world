import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', process.env.NODE_ENV);
console.log('All env vars:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')));

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
            refreshToken,
          });

          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  login: (credentials) => {
    console.log('Making login request to:', `${API_BASE_URL}/login`);
    return api.post('/login', credentials);
  },
  signup: (userData) => {
    console.log('Making signup request to:', `${API_BASE_URL}/signup`);
    console.log('Signup data:', { ...userData, password: '[REDACTED]' });
    return api.post('/signup', userData);
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  },
  getProfile: () => api.get('/profile'),
  updateProfile: (profileData) => api.put('/profile', profileData),
};

export const placesAPI = {
  getAllPlaces: () => api.get('/places'),
  getPlaceById: (id) => api.get(`/places/${id}`),
  searchPlaces: (query) => api.get(`/places/search?q=${query}`),
  addReview: (placeId, review) => api.post(`/places/${placeId}/reviews`, review),
};

export const favoritesAPI = {
  getFavorites: () => api.get('/favorites'),
  addFavorite: (placeData) => api.post('/favorites', placeData),
  removeFavorite: (favoriteId) => api.delete(`/favorites/${favoriteId}`),
};

export const countriesAPI = {
  getAllCountries: () => api.get('/countries'),
  addCountry: (countryData) => api.post('/create', countryData),
};

export default api;
