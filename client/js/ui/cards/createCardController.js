import { CLASS_MODAL_FORM_VISIBLE } from '../../constants/classNames.js';
import {
  FORM_CREATE_CARD,
  MODAL_CREATE_CARD,
} from '../../constants/dom/dashboard/dashboardDomElements.js';
import { BTNS_MODAL_CLOSE } from '../../constants/dom/modal/modalDomElements.js';
import { createCard } from '../../features/cards/cardsService.js';
import { initCardController } from './cardController.js';
import { initRenderCards } from './renderCardsController.js';

export function initCreateCardController() {
  document.querySelectorAll('.js-btn-create-card').forEach((item) => {
    item.addEventListener('click', () => {
      MODAL_CREATE_CARD.classList.add(CLASS_MODAL_FORM_VISIBLE);
    });
  });

  BTNS_MODAL_CLOSE.forEach((btn) => {
    btn.addEventListener('click', () => {
      MODAL_CREATE_CARD.classList.remove(CLASS_MODAL_FORM_VISIBLE);
    });
  });
}

FORM_CREATE_CARD.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = FORM_CREATE_CARD.title.value;
  if (!title.trim()) return;

  try {
    await createCard(title);
    await initRenderCards();
    initCardController();
  } catch (error) {
    console.log(error);
  }

  FORM_CREATE_CARD.reset();
  MODAL_CREATE_CARD.classList.remove(CLASS_MODAL_FORM_VISIBLE);
});
