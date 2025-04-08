import './ui/burgerController.js';
import './ui/logoutController.js';
import './ui/cards/createCardController.js';
import './ui/cards/cardController.js';

import { checkAuth } from './utils/checkAuth.js';
import { setMobileMenuSettings } from './utils/setMobileMenuTop.js';
import { initRenderCards } from './ui/cards/renderCardsController.js';
import { initCreateCardController } from './ui/cards/createCardController.js';
import { initCardController } from './ui/cards/cardController.js';

checkAuth('/dashboard');
setMobileMenuSettings();

document.addEventListener('DOMContentLoaded', async () => {
  await initRenderCards();
  initCreateCardController();
  initCardController();
});

localStorage.removeItem('currentCard');
localStorage.removeItem('words');