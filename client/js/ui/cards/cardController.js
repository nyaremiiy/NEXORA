import { CLASS_MODAL_FORM_VISIBLE } from '../../constants/classNames.js';
import {
  FORM_EDIT_CARD,
  MODAL_EDIT_CARD,
} from '../../constants/dom/dashboard/dashboardDomElements.js';
import { BTNS_MODAL_CLOSE } from '../../constants/dom/modal/modalDomElements.js';
import { deleteCard, editCard } from '../../features/cards/cardsService.js';
import { initCreateCardController } from './createCardController.js';
import { initRenderCards } from './renderCardsController.js';

let activeCard = null;

export function initCardController() {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const iconSettings = card.querySelector('.card__icon-settings');
    const cardSettings = card.querySelector('.card__settings');
    const btnRemove = card.querySelector('.card__remove');
    const btnEdit = card.querySelector('.card__edit');

    iconSettings.addEventListener('click', () => {
      cardSettings.classList.toggle('card__settings--visible');
    });

    cardSettings.addEventListener('mouseleave', () => {
      cardSettings.classList.remove('card__settings--visible');
    });

    btnRemove.addEventListener('click', async () => {
      await deleteCard(card.getAttribute('data-id'));
      await initRenderCards();
      initCreateCardController();
      initCardController();
    });

    btnEdit.addEventListener('click', async () => {
      console.log('click');
      MODAL_EDIT_CARD.classList.add(CLASS_MODAL_FORM_VISIBLE);
      FORM_EDIT_CARD.title.value =
        card.querySelector('.card__title').textContent;
      activeCard = card;
    });
  });
}

BTNS_MODAL_CLOSE.forEach((btn) => {
  btn.addEventListener('click', () => {
    MODAL_EDIT_CARD.classList.remove(CLASS_MODAL_FORM_VISIBLE);
  });
});

FORM_EDIT_CARD.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!activeCard) return;

  const newTitle = FORM_EDIT_CARD.title.value;
  if (newTitle === activeCard.querySelector('.card__title').textContent) return;

  await editCard(activeCard.getAttribute('data-id'), newTitle);
  await initRenderCards();
  initCardController();
  MODAL_EDIT_CARD.classList.remove(CLASS_MODAL_FORM_VISIBLE);
});
