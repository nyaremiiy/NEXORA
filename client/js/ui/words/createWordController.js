import { CLASS_MODAL_FORM_VISIBLE } from '../../constants/classNames.js';
import {
  FORM_CREATE_WORD,
  MODAL_CREATE_WORD,
} from '../../constants/dom/card/cardDomElements.js';
import { BTNS_MODAL_CLOSE } from '../../constants/dom/modal/modalDomElements.js';
import { addWord } from '../../features/words/wordsService.js';
import { initRenderWords } from './renderWordsController.js';
import { initWordController } from './wordController.js';

export function initCreateWordController() {
  document.querySelectorAll('.js-btn-create-word').forEach((item) => {
    item.addEventListener('click', () => {
      MODAL_CREATE_WORD.classList.add(CLASS_MODAL_FORM_VISIBLE);
    });
  });
}

BTNS_MODAL_CLOSE.forEach((btn) => {
  btn.addEventListener('click', () => {
    MODAL_CREATE_WORD.classList.remove(CLASS_MODAL_FORM_VISIBLE);
  });
});

FORM_CREATE_WORD.addEventListener('submit', async (e) => {
  e.preventDefault();

  const word = FORM_CREATE_WORD.word.value;
  if (!word.trim()) return;

  const translate = FORM_CREATE_WORD.translate.value;

  const cardId = JSON.parse(localStorage.getItem('currentCard')).id;

  MODAL_CREATE_WORD.classList.remove(CLASS_MODAL_FORM_VISIBLE);
  try {
    await addWord(cardId, word, translate.trim());
    await initRenderWords();
    initWordController();
  } catch (error) {
    console.log(error);
  }

  FORM_CREATE_WORD.reset();
});
// винести в константи

const hasTranslateCheckBox = document.querySelector('#hasTranslate');
const labelTranslate = document.querySelector('.label--translate');

hasTranslateCheckBox.addEventListener('change', () => {
  if (hasTranslateCheckBox.checked) {
    labelTranslate.classList.add('label--translate-visible');
  } else {
    labelTranslate.classList.remove('label--translate-visible');
  }
});
