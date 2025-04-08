import { TASK_CONTAINER } from '../../../constants/dom/learn/learn.js';
import { updateUserWords } from '../../../features/cards/cardsService.js';
import { initRenderWordList } from '../renderWordsListController.js';

export async function renderTask4() {
  const globalWords = JSON.parse(localStorage.getItem('words')) || [];

  const allWordsForLearn = globalWords.filter((w) => w.wordId.progress < 100);
  const countWords = Math.min(allWordsForLearn.length, 10);
  const randomWords = getRandomUniqueItems(allWordsForLearn, countWords);

  sessionStorage.setItem('sessionWords', JSON.stringify(randomWords));
  sessionStorage.setItem('currentIndex', '0');

  renderCurrentWord(globalWords);
}

async function renderCurrentWord(globalWords) {
  const words = JSON.parse(sessionStorage.getItem('sessionWords'));
  const currentIndex = +sessionStorage.getItem('currentIndex');

  if (currentIndex >= words.length) {
    TASK_CONTAINER.innerHTML = `
      <div class="task__finished">✅ Ви завершили вправу!</div>
      <div class="task__btn">
        <button class="btn btn--start js-start-task-again">Розпочати ще раз</button>
      </div>
    `;

    const wordsToUpdate = globalWords.map((w) => ({
      wordId: w.wordId._id,
      progress: w.wordId.progress,
    }));

    await updateUserWords(wordsToUpdate);

    initRenderWordList();

    document
      .querySelector('.js-start-task-again')
      .addEventListener('click', () => renderTask5());

    return;
  }

  const currentWord = words[currentIndex];

  TASK_CONTAINER.innerHTML = `
    <div class="task">
      <h3 class="task__title">Перекладіть українське слово на англійську</h3>
      <div class="task__question" id="task-word">${currentWord.wordId.en}</div>
      <input type="text" class="task__input" id="task-input" placeholder="Ваша відповідь" autocomplete="off" />
      <button class="btn task__submit" id="task-submit">Перевірити</button>
      <div class="task__feedback" id="task-feedback"></div>
    </div>
  `;

  const input = document.getElementById('task-input');
  const feedback = document.getElementById('task-feedback');
  const submitBtn = document.getElementById('task-submit');

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitBtn.click();
  });

  submitBtn.addEventListener('click', () => {
    const userAnswer = input.value.trim().toLowerCase();
    const correct = currentWord.wordId.ua.toLowerCase();

    if (!userAnswer) return;

    const wordInGlobal = globalWords.find((w) => w.wordId.ua === correct);

    if (userAnswer === correct) {
      feedback.textContent = '✔ Правильно!';
      feedback.style.color = 'green';
      if (wordInGlobal) {
        wordInGlobal.wordId.progress = Math.min(
          wordInGlobal.wordId.progress + 10,
          100
        );
      }
    } else {
      feedback.textContent = `✖ Неправильно. Правильна відповідь: ${correct}`;
      feedback.style.color = 'crimson';
      if (wordInGlobal) {
        wordInGlobal.wordId.progress = Math.max(
          wordInGlobal.wordId.progress - 10,
          0
        );
      }
    }

    localStorage.setItem('words', JSON.stringify(globalWords));

    setTimeout(() => {
      sessionStorage.setItem('currentIndex', currentIndex + 1);
      renderCurrentWord(globalWords);
    }, 1500);
  });
}

function getRandomUniqueItems(array, count) {
  const copy = array.slice();
  const result = [];

  while (result.length < count && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy[index]);
    copy.splice(index, 1);
  }

  return result;
}
