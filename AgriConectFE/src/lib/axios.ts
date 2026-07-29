import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Backend base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for attaching auth tokens, etc.
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('agriconnect-auth');
        if (stored) {
          const parsed = JSON.parse(stored);
          const token = parsed?.state?.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (e) {
        // ignore JSON parse error
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
