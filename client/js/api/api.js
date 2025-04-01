const base = window.location.hostname.includes('localhost')
  ? 'http://localhost:8888/api'
  : 'https://your-live-domain.com/api';

export const API = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
  },
});
