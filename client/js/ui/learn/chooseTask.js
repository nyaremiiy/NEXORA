import { TASK_CONTAINER } from '../../constants/dom/learn/learn.js';
import { renderTask1 } from './tasks/renderTask1.js';
import { renderTask4 } from './tasks/renderTask4.js';
import { renderTask5 } from './tasks/renderTask5.js';

export function chooseTask(title, desc, dataId) {
  TASK_CONTAINER.innerHTML = `
  <div class="task">
    <h2 class="task__title">${title}</h2>
    <p class="task__description">
      ${desc}
    </p>
    <div class="task__btn">
    <button class="btn btn--start js-start-task" data-id="${dataId}">Розпочати</button>
    </div>
  </div>
  `;

  const btnStart = document.querySelector('.js-start-task');

  btnStart.addEventListener('click', () => {
    switch (+btnStart.getAttribute('data-id')) {
      case 4:
        renderTask4();
        break;
      case 5:
        renderTask5();
        break;
      default:
        renderTask1();
    }
  });
}
