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

export async function getCard(id) {
  try {
    const res = await API.get(`/cards/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || 'Помилка отримання картки.'
    );
  }
}

export async function removeWordFromCard(cardId, wordId) {
  try {
    const res = await API.delete(`/cards/${cardId}/words/${wordId}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || 'Помилка отримання картки.'
    );
  }
}

export async function updateUserWord(en, transcription, ua, progress) {
  try {
    const res = await API.patch(`/cards/edit-word`, {
      en,
      transcription,
      ua,
      progress,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || 'Помилка оновлення слова.'
    );
  }
}

export async function updateUserWords(words) {
  try {
    const res = await API.patch(`/cards/update-progress`, { words });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'Помилка оновлення слів.');
  }
}
