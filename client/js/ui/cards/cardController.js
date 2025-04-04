import { CLASS_MODAL_FORM_VISIBLE } from '../../constants/classNames.js';
import {
  FORM_EDIT_CARD,
  MODAL_EDIT_CARD,
} from '../../constants/dom/dashboard/dashboardDomElements.js';
import { BTNS_MODAL_CLOSE } from '../../constants/dom/modal/modalDomElements.js';
import { deleteCard, editCard } from '../../features/cards/cardsService.js';
import { initRenderCards } from './renderCardsController.js';

export function initCardController() {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const iconSettings = card.querySelector('.card__icon-settings');
    const cardSettings = card.querySelector('.card__settings');

    iconSettings.addEventListener('click', () => {
      cardSettings.classList.toggle('card__settings--visible');
    });

    cardSettings.addEventListener('mouseleave', () => {
      cardSettings.classList.remove('card__settings--visible');
    });

    const btnRemove = card.querySelector('.card__remove');
    const btnEdit = card.querySelector('.card__edit');

    btnRemove.addEventListener('click', async () => {
      await deleteCard(card.getAttribute('data-id'));
      initRenderCards();
    });

    btnEdit.addEventListener('click', async () => {
      MODAL_EDIT_CARD.classList.add(CLASS_MODAL_FORM_VISIBLE);
      FORM_EDIT_CARD.title.value =
        card.querySelector('.card__title').textContent;
    });

    FORM_EDIT_CARD.addEventListener('submit', async (e) => {
      e.preventDefault();

      const newTitle = FORM_EDIT_CARD.title.value;

      if (newTitle === card.querySelector('.card__title').textContent) return;

      await editCard(card.getAttribute('data-id'), newTitle);

      initRenderCards();
      hideModal();
    });

    hideModal();
  });
}

function hideModal() {
  BTNS_MODAL_CLOSE.forEach((btn) => {
    btn.addEventListener('click', () => {
      MODAL_EDIT_CARD.classList.remove(CLASS_MODAL_FORM_VISIBLE);
    });
  });
}
