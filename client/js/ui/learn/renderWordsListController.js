import { WORD_LIST } from '../../constants/dom/learn/learn.js';

export async function initRenderWordList() {
  const words = JSON.parse(localStorage.getItem('words'));

  let htmlWords = words
    .slice()
    .sort((a, b) =>  a.wordId.progress - b.wordId.progress)
    .map(
      (word) => `
    <li class="words-list__item"> 
      <div class="words-list__progress">${word.wordId.progress}%</div>
      <div class="words-list__word">${word.wordId.en}</div>
    </li>
    `
    )
    .join('');

  WORD_LIST.innerHTML = htmlWords;
}
