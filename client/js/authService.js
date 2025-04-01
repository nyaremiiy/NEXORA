const base = window.location.hostname.includes('localhost')
  ? 'http://localhost:3000/api'
  : 'https://your-live-domain.com/api';

const API = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
  },
});


export async function login(email, password) {
  const response = await API.post("/users/login", { email, password });
  return response.data;
}

