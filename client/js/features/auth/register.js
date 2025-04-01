import { registerUser } from './authService.js';

const formReg = document.querySelector('#reg-form');

formReg.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = formReg.username.value;
  const email = formReg.email.value;
  const password = formReg.password.value;

  try {
    const data = await registerUser(username, email, password);

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard.html';
    } else {
      console.log(data);
    }
  } catch (err) {
    console.error('Register error:', err);
  }
});
