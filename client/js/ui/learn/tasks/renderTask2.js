import { TASK_CONTAINER } from '../../../constants/dom/learn/learn.js';
import { updateUserWords } from '../../../features/cards/cardsService.js';
import { initRenderWordList } from '../renderWordsListController.js';

export async function renderTask2() {
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
      .addEventListener('click', () => renderTask2());

    return;
  }

  const currentWord = words[currentIndex];
  const correctUa = currentWord.wordId.ua;
  const en = currentWord.wordId.en;

  const allTranslations = globalWords
    .filter((w) => w.wordId.ua !== correctUa)
    .map((w) => w.wordId.ua);

  const shuffledAnswers = shuffleArray([
    correctUa,
    ...getRandomUniqueItems(allTranslations, 3),
  ]);

  TASK_CONTAINER.innerHTML = `
    <div class="task">
      <h3 class="task__title">Оберіть правильний переклад</h3>
      <div class="task__question" id="task-word">${en}</div>
      <div class="task__choices" id="choices">
        ${shuffledAnswers
          .map(
            (option) =>
              `<button class="task__choice" data-value="${option}">${option}</button>`
          )
          .join('')}
      </div>
      <div class="task__feedback" id="task-feedback"></div>
    </div>
  `;

  const feedback = document.getElementById('task-feedback');
  const wordInGlobal = globalWords.find((w) => w.wordId.en === en);

  document.querySelectorAll('.task__choice').forEach((btn) => {
    btn.addEventListener('click', () => {
      const userAnswer = btn.dataset.value;

      if (userAnswer === correctUa) {
        feedback.textContent = '✔ Правильно!';
        feedback.style.color = 'green';
        if (wordInGlobal) {
          wordInGlobal.wordId.progress = Math.min(
            wordInGlobal.wordId.progress + 10,
            100
          );
        }
      } else {
        feedback.textContent = `✖ Неправильно. Правильна відповідь: ${correctUa}`;
        feedback.style.color = 'crimson';
        if (wordInGlobal) {
          wordInGlobal.wordId.progress = Math.max(
            wordInGlobal.wordId.progress - 10,
            0
          );
        }
      }

      localStorage.setItem('words', JSON.stringify(globalWords));

      document.querySelectorAll('.task__choice').forEach((btn) => {
        btn.disabled = true;
      });

      setTimeout(() => {
        sessionStorage.setItem('currentIndex', currentIndex + 1);
        renderCurrentWord(globalWords);
      }, 1500);
    });
  });
}

function getRandomUniqueItems(array, count) {
  const copy = [...array];
  const result = [];

  while (result.length < count && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy[index]);
    copy.splice(index, 1);
  }

  return result;
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
