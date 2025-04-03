import { CARDS_CONTAINER } from '../../constants/dom/dashboard/dashboardDomElements.js';

const cards = [];

export function initRenderCards() {
  if (cards.length === 0) {
    CARDS_CONTAINER.innerHTML = `<li class="cards__item cards__item--message js-btn-create-card">У вас ще немає карток. Створіть першу, щоб почати навчання!<li>`;
  }
}
