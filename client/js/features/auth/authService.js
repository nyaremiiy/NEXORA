import { API } from '../../api/api.js';

export async function loginUser(email, password) {
  try {
    const res = await API.post('/users/login', { email, password });
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message || 'Помилка авторизації.');
  }
}

export async function registerUser(username, email, password) {
  try {
    const res = await API.post('/users/register', {
      username,
      email,
      password,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message || 'Помилка реєстрації.');
  }
}
