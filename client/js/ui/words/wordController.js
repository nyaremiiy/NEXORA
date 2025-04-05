import { removeWordFromCard } from '../../features/cards/cardsService.js';
import { initCreateWordController } from './createWordController.js';
import { initRenderWords } from './renderWordsController.js';

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
      console.log('Редагувати');
      // MODAL_EDIT_CARD.classList.add(CLASS_MODAL_FORM_VISIBLE);
      // FORM_EDIT_CARD.title.value =
      //   card.querySelector('.card__title').textContent;
      // activeCard = card;
    });
  });
}
