import { CARDS_CONTAINER } from '../../constants/dom/dashboard/dashboardDomElements.js';
import { getCards } from '../../features/cards/cardsService.js';

export async function initRenderCards() {
  const cards = await getCards();

  if (cards.length !== 0) {
    CARDS_CONTAINER.innerHTML = ``;

    const htmlCards = cards
      .slice()
      .reverse()
      .map(
        (card) => `
    <li class="cards__item">
        <div class="card" data-id="${card._id}">
          <h3 class="card__title">${card.title}</h3>
          <p class="card__meta">${card.words.length} ${getWordForm(card.words.length)}</p>
          <div class="card__btn">Перейти</div>
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
      </li>
    `
      )
      .join('');

    CARDS_CONTAINER.innerHTML = htmlCards;
    CARDS_CONTAINER.classList.add('cards--net');
  } else {
    CARDS_CONTAINER.innerHTML = `
      <li class="cards__item cards__item--message js-btn-create-card">
        У вас ще немає карток. Створіть першу, щоб почати навчання!
      </li>`;
    CARDS_CONTAINER.classList.remove('cards--net');
  }
}


export function getWordForm(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return 'слово';
  } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return 'слова';
  } else {
    return 'слів';
  }
}