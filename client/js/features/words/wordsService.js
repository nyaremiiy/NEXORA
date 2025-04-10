import { API } from '../../api/api.js';

export async function addWord(cardId, word, wordTranslate = '') {
  try {
    const res = await API.post(`/words/add`, { cardId, word, wordTranslate });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || 'Помилка додавання нового слова.'
    );
  }
}

export async function getUserWords() {
  try {
    const res = await API.get(`/words/`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || 'Не вдалося отримати слова.'
    );
  }
}
