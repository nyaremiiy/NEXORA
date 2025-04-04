import { API } from '../../api/api.js';

export async function getCards() {
  try {
    const res = await API.get('/cards/');
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

export async function deleteCard(id) {
  try {
    const res = await API.delete(`/cards/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || 'Помилка оновлення картки.'
    );
  }
}

export async function editCard(id, title) {
  try {
    const res = await API.patch(`/cards/${id}`, { title });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || 'Помилка оновлення картки.'
    );
  }
}
