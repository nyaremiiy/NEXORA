import './ui/burgerController.js';
import './ui/cards/createCardController.js';
import './ui/logoutController.js';

import { checkAuth } from './utils/checkAuth.js';
import { setMobileMenuSettings } from './utils/setMobileMenuTop.js';
import { initRenderCards } from './ui/cards/renderCardsController.js';

checkAuth('/dashboard');
setMobileMenuSettings();
initRenderCards();
