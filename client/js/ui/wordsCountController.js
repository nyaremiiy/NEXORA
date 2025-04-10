import {
  WORD_COUNT_ALL,
  WORD_COUNT_LEARNED,
} from '../constants/dom/wordsCount/wordsCountDomElements.js';
import { getUserWords } from '../features/words/wordsService.js';

try {
  const words = (await getUserWords()) || [];
  const wordsLearned = words.filter((w) => w.wordId.progress === 100);

  WORD_COUNT_ALL.textContent = words.length.toString();
  WORD_COUNT_LEARNED.textContent = wordsLearned.length.toString();
} catch (error) {
  console.error('Помилка при завантаженні слів:', error);
  WORD_COUNT_ALL.textContent = '0';
  WORD_COUNT_LEARNED.textContent = '0';
}
