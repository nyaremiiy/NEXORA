import { API } from '../../api/api';

export async function getCards() {
  try {
    const res = await API.get('/cards');
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message || 'Помилка отримання карток.');
  }
}

export async function createCard(title) {
  try {
    const res = await API.post('/cards/create', { title });
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message || 'Помилка створення картки.');
  }
}
