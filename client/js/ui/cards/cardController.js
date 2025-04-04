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
    const cardTitle = card.querySelector('.card__title').textContent;
    const iconSettings = card.querySelector('.card__icon-settings');
    const cardSettings = card.querySelector('.card__settings');
    const btnRemove = card.querySelector('.card__remove');
    const btnEdit = card.querySelector('.card__edit');
    const cardId = card.getAttribute('data-id');

    card.addEventListener('click', (e) => {
      if (
        e.target.closest('.card__edit') ||
        e.target.closest('.card__remove') ||
        e.target.closest('.card__icon-settings') ||
        e.target.closest('.card__settings')
      ) {
        return;
      }
      localStorage.setItem('currentCard', JSON.stringify({id: cardId, title: cardTitle}));
      window.location.href = `/card.html`;
    });

    iconSettings.addEventListener('click', () => {
      cardSettings.classList.toggle('card__settings--visible');
    });

    cardSettings.addEventListener('mouseleave', () => {
      cardSettings.classList.remove('card__settings--visible');
    });

    btnRemove.addEventListener('click', async () => {
      await deleteCard(cardId);
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
