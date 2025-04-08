import { WORDS_CONTAINER } from '../../constants/dom/card/cardDomElements.js';
import { getCard } from '../../features/cards/cardsService.js';

export async function initRenderWords() {
  const card = await getCard(
    JSON.parse(localStorage.getItem('currentCard')).id
  );
  const words = card.words;

  localStorage.setItem('words', JSON.stringify(words));

  if (words.length !== 0) {
    WORDS_CONTAINER.innerHTML = '';
    WORDS_CONTAINER.innerHTML = `
    <li class="words__item">
      <div class="word word--header">
        <div>EN</div>
        <div>Транскрипція</div>
        <div>UA</div>
        <div>Прогрес</div>
      </div>
      </li>
    `;

    const htmlWords = words
      .slice()
      .reverse()
      .map(
        (word) => `
      <li class="words__item">
      <div class="word" data-id="${word.wordId._id}">
        <div class="word__en">${word.wordId.en}</div>
        <div class="word__transcription">${word.wordId.transcription}</div>
        <div class="word__ua">${word.wordId.ua}</div>
        <div class="word__info">
          <div>${word.wordId.progress}%</div>
          <div class="word__icon-settings">
            <svg class="card__icon-settings" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17C13.1046 17 14 17.8954 14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19C10 17.8954 10.8954 17 12 17ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10ZM12 3C13.1046 3 14 3.89543 14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3Z" fill="white"/>
            </svg>
          </div>
        </div>

        <ul class="word__settings">
            <li class="word__edit">
              <span>Редагувати</span>
            </li>
            <li class="word__remove">
              <span>Видалити</span>
            </li>
        </ul>
      </div>
      </li>
      `
      )
      .join('');

    WORDS_CONTAINER.innerHTML += htmlWords;
    WORDS_CONTAINER.classList.add('words--list');
  } else {
    WORDS_CONTAINER.innerHTML = `
    <li class="words__item words__item--message js-btn-create-word">
      У вас ще немає слів. Створіть перше, щоб почати навчання!
    </li>`;
    WORDS_CONTAINER.classList.remove('words--list');
  }
}
