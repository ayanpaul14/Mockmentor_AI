import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mockmentor-ai-backend.onrender.com/api',
});

// ✅ AUTOMATIC TOKEN ATTACHMENT: This ensures EVERY SINGLE fetch request 
// (Dashboard, Profile, Home) automatically carries your login credentials.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🛡️ SAFE RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect if the user is genuinely trying to access a locked route without a token
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      console.warn('Unauthorized request intercepted. Re-authenticating credentials.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;