import { TASKS } from '../../constants/dom/learn/learn.js';
import { chooseTask } from './chooseTask.js';
import { renderTask1 } from './tasks/renderTask1.js';

TASKS.forEach((item) => {
  item.addEventListener('click', () => {
    TASKS.forEach((item) => {
      item.classList.remove('is-active');
    });
    item.classList.add('is-active');
    checkTask(+item.getAttribute('data-type'));
  });
});

export function checkTask(data = 1) {
  switch (data) {
    case 1:
      renderTask1();
      break;
    case 2:
      chooseTask(
        'Вибір правильного перекладу',
        'Вам буде показано англійське слово та кілька варіантів перекладу. Оберіть правильний варіант перекладу. Відповідь перевіряється одразу, а прогрес слова оновлюється автоматично після завершення усіх завдань.',
        2
      );
      break;
    case 3:
      chooseTask(
        'Скласти слово з літер',
        'Вам буде показано набір літер. Ваше завдання — скласти з них англійське слово. Усі слова взяті з вашої картки. Після кожної відповіді прогрес автоматично оновлюється.',
        3
      );
      break;
    case 4:
      chooseTask(
        'Перекласти з англійської на українську',
        'Вам буде показано 10 англійських слів. Ваше завдання — вписати правильний переклад українською мовою. Ваша відповідь автоматично перевіряється, а прогрес слова оновлюється після кожного раунду.',
        4
      );
      break;
    case 5:
      chooseTask(
        'Переклад українського слова на англійську',
        ' Вам буде показано 10 українських слів. Ваше завдання — написати правильний переклад англійською.Прогрес оновиться автоматично після кожного раунду',
        5
      );
      break;
    default:
      renderTask1();
  }
}
