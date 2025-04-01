import { loginUser } from './authService.js';

const formLogin = document.querySelector('#login-form');

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = formLogin.email.value;
  const password = formLogin.password.value;

  try {
    const data = await loginUser(email, password);

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard.html';
    } else {
      console.log(data);
    }
  } catch (err) {
    console.error('Login error:', err);
  }
});
