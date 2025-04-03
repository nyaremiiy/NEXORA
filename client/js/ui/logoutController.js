import { logout } from '../features/auth/authService.js';
import { BTNS_LOGOUT } from '../constants/dom/btnLogoutDomElements.js';

BTNS_LOGOUT.forEach((btn) => {
  btn.addEventListener('click', logout);
});
