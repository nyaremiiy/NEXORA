import { CLASS_MODAL_FORM_VISIBLE } from '../../constants/classNames.js';
import {
  FORM_EDIT_WORD,
  MODAL_EDIT_WORD,
} from '../../constants/dom/card/cardDomElements.js';
import { BTNS_MODAL_CLOSE } from '../../constants/dom/modal/modalDomElements.js';
import {
  removeWordFromCard,
  updateUserWord,
} from '../../features/cards/cardsService.js';
import { initCreateWordController } from './createWordController.js';
import { initRenderWords } from './renderWordsController.js';

let activeWord = '';

export function initWordController() {
  const words = document.querySelectorAll('.word');

  words.forEach((word) => {
    const wordSettings = word.querySelector('.word__settings');
    const wordId = word.getAttribute('data-id');

    const iconSettings = word?.querySelector('.word__icon-settings');
    if (!iconSettings) return;

    const btnRemove = word.querySelector('.word__remove');
    const btnEdit = word.querySelector('.word__edit');

    iconSettings.addEventListener('click', () => {
      wordSettings.classList.toggle('word__settings--visible');
    });

    wordSettings.addEventListener('mouseleave', () => {
      wordSettings.classList.remove('word__settings--visible');
    });

    btnRemove.addEventListener('click', async () => {
      await removeWordFromCard(
        JSON.parse(localStorage.getItem('currentCard')).id,
        wordId
      );
      await initRenderWords();
      initCreateWordController();
      initWordController();
    });

    btnEdit.addEventListener('click', async () => {
      MODAL_EDIT_WORD.classList.add(CLASS_MODAL_FORM_VISIBLE);

      FORM_EDIT_WORD.en.value = word.querySelector('.word__en').textContent;
      FORM_EDIT_WORD.transcription.value = word.querySelector(
        '.word__transcription'
      ).textContent;
      FORM_EDIT_WORD.ua.value = word.querySelector('.word__ua').textContent;

      activeWord = word;
    });
  });
}

BTNS_MODAL_CLOSE.forEach((btn) => {
  btn.addEventListener('click', () => {
    MODAL_EDIT_WORD.classList.remove(CLASS_MODAL_FORM_VISIBLE);
  });
});

FORM_EDIT_WORD.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!activeWord) return;

  const en = FORM_EDIT_WORD.en.value;
  const transcription = FORM_EDIT_WORD.transcription.value;
  const ua = FORM_EDIT_WORD.ua.value;
  let progress = FORM_EDIT_WORD.progress.value;

  if(progress === 'on') {
    progress = 0;
  }

  MODAL_EDIT_WORD.classList.remove(CLASS_MODAL_FORM_VISIBLE);

  await updateUserWord(en, transcription, ua, progress);

    await initRenderWords();
    initWordController();

  FORM_EDIT_WORD.reset();
});
