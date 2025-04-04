const base = window.location.hostname.includes('localhost')
  ? 'http://localhost:8888/api'
  : 'https://your-live-domain.com/api';

export const API = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});