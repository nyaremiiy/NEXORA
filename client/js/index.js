// import './authService.js';

import './controllers/modalController.js';

const header = document.querySelector('#header');
const hero = document.querySelector('#hero');

const heightHeader = header.offsetHeight;
if (window.innerWidth > 876) {
  hero.querySelector('.hero__left-col').style.paddingTop = `${heightHeader}px`;
  hero.querySelector('.hero__right-col').style.paddingTop = `${heightHeader}px`;
}

const base = window.location.hostname.includes('localhost')
  ? 'http://localhost:8888/api'
  : 'https://your-live-domain.com/api';

const API = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function login(email, password) {
  const response = await API.post('/users/login', { email, password });
  return response.data;
}

// import { login } from './authService.js';

const form = document.querySelector('#login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  try {
    const data = await login(email, password);

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.user);
      window.location.href = '../dashboard.html';
      console.log(data.message);
    } else {
      console.log(data);
    }
  } catch (err) {
    console.error('Login error:', err.response.data.message);
  }
});


