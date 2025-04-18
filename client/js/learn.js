import { initRenderWordList } from './ui/learn/renderWordsListController.js';

import './ui/learn/tasksListController.js';
import './ui/avatarController.js';
import './ui/logoutController.js';

import { checkTask } from './ui/learn/tasksListController.js';

console.log(JSON.parse(localStorage.getItem('currentCard')));
console.log(JSON.parse(localStorage.getItem('words')));

document.title =
  JSON.parse(localStorage.getItem('currentCard')).title + ' | NEXORA';

await initRenderWordList();
checkTask();
