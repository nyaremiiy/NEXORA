export async function addWord(cardId, word, wordTranslate) {
  try {
    const res = await API.get(`/words/add`, { cardId, word, wordTranslate });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || 'Помилка додавання нового слова.'
    );
  }
}
