import { TASK_CONTAINER } from '../../../constants/dom/learn/learn.js';
import { updateUserWords } from '../../../features/cards/cardsService.js';
import { initRenderWordList } from '../renderWordsListController.js';

export async function renderTask3() {
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
      .addEventListener('click', () => renderTask3());

    return;
  }

  const currentWord = words[currentIndex];
  const correctWord = currentWord.wordId.en.toLowerCase();
  const shuffledLetters = shuffleArray(correctWord.split(''));

  TASK_CONTAINER.innerHTML = `
    <div class="task">
      <h3 class="task__title">Складіть англійське слово з літер</h3>
      <div class="task__question" id="task-word">${currentWord.wordId.ua}</div>
      <div class="task__letters" id="task-letters">
        ${shuffledLetters
          .map(
            (letter, index) =>
              `<button class="task__letter" data-index="${index}">${letter}</button>`
          )
          .join('')}
      </div>
      <div class="task__answer" id="task-answer"></div>
      <button class="btn task__submit" id="task-submit">Перевірити</button>
      <div class="task__feedback" id="task-feedback"></div>
    </div>
  `;

  const answerBox = document.getElementById('task-answer');
  const feedback = document.getElementById('task-feedback');
  const submitBtn = document.getElementById('task-submit');
  const letterButtons = document.querySelectorAll('.task__letter');

  let userAnswer = '';

  letterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      userAnswer += btn.textContent;
      btn.disabled = true;
      answerBox.textContent = userAnswer;
    });
  });

  submitBtn.addEventListener('click', () => {
    const wordInGlobal = globalWords.find(
      (w) => w.wordId.en.toLowerCase() === correctWord
    );

    if (userAnswer === correctWord) {
      feedback.textContent = '✔ Правильно!';
      feedback.style.color = 'green';
      if (wordInGlobal) {
        wordInGlobal.wordId.progress = Math.min(
          wordInGlobal.wordId.progress + 10,
          100
        );
      }
    } else {
      feedback.textContent = `✖ Неправильно. Правильна відповідь: ${correctWord}`;
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

function shuffleArray(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
