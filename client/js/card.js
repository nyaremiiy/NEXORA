import { initCreateWordController } from './ui/words/createWordController.js';
import { initRenderWords } from './ui/words/renderWordsController.js';
import { checkAuth } from './utils/checkAuth.js';

import './ui/logoutController.js';
import './ui/words/createWordController.js';
import './ui/words/wordController.js'
import './ui/avatarController.js';

import { initWordController } from './ui/words/wordController.js';
import { wordCountController } from './ui/wordsCountController.js';
import { setToTitleCardPage } from './utils/cardTitleName.js';

checkAuth('/card');
console.log(JSON.parse(localStorage.getItem('currentCard')));

document.title =
  JSON.parse(localStorage.getItem('currentCard')).title + ' | NEXORA';

await initRenderWords();

initCreateWordController();
initWordController();

setToTitleCardPage();
wordCountController();