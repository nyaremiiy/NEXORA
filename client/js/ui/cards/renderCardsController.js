import { CARDS_CONTAINER } from '../../constants/dom/dashboard/dashboardDomElements.js';
import { getCards } from '../../features/cards/cardsService.js';
import { initCardController } from './cardController.js';

export async function initRenderCards() {
  const cards = await getCards();

  if (cards.length !== 0) {
    CARDS_CONTAINER.innerHTML = '';
    let htmlCards = '';
    cards.forEach((card) => {
      htmlCards += `
      <li class="cards__item">
        <div class="card" data-id="${card._id}">
          <h3 class="card__title">${card.title}</h3>
          <p class="card__meta">${card.words.length} слів</p>
          <button class="card__btn">Перейти</button>
          <svg class="card__icon-settings" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17C13.1046 17 14 17.8954 14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19C10 17.8954 10.8954 17 12 17ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10ZM12 3C13.1046 3 14 3.89543 14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3Z" fill="white"/>
          </svg>

          <ul class="card__settings">
            <li class="card__edit">
              <span>Редагувати</span>
            </li>
            <li class="card__remove">
              <span>Видалити</span>
            </li>
          </ul>
        </div>
      </li>`;
    });
    CARDS_CONTAINER.innerHTML = htmlCards;
    CARDS_CONTAINER.classList.add('cards--net');
    initCardController();
  }
}
