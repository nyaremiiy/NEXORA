import {
  CLASS_BURGER_ACTIVE,
  CLASS_BURGER_CLOSING,
  CLASS_IS_DISABLED,
  CLASS_MOBILE_MENU_ACTIVE,
  CLASS_NO_SCROLL,
} from '../constants/classNames.js';
import { BODY, BURGER, MOBILE_MENU } from '../constants/domElements.js';

const BURGER_ANIMATION_DURATION = 1000;

BURGER.addEventListener('click', () => {
  if (BURGER.classList.contains(CLASS_IS_DISABLED)) return;
  BURGER.classList.add(CLASS_IS_DISABLED);

  MOBILE_MENU.classList.toggle(CLASS_MOBILE_MENU_ACTIVE);
  BODY.classList.toggle(CLASS_NO_SCROLL);

  if (BURGER.classList.contains(CLASS_BURGER_ACTIVE)) {
    closeBurger();
  } else {
    BURGER.classList.toggle(CLASS_BURGER_ACTIVE);
  }

  setTimeout(() => {
    BURGER.classList.remove(CLASS_IS_DISABLED);
  }, BURGER_ANIMATION_DURATION);
});

function closeBurger() {
  BURGER.classList.add(CLASS_BURGER_CLOSING);

  setTimeout(() => {
    BURGER.classList.remove(CLASS_BURGER_ACTIVE);
    BURGER.classList.remove(CLASS_BURGER_CLOSING);
  }, BURGER_ANIMATION_DURATION);
}

function closeMenu() {
  MOBILE_MENU.classList.remove(CLASS_MOBILE_MENU_ACTIVE);
  BODY.classList.remove(CLASS_NO_SCROLL);
}

[
  ...MOBILE_MENU.querySelectorAll('a'),
  ...MOBILE_MENU.querySelectorAll('button'),
].forEach((item) => {
  item.addEventListener('click', () => {
    if (item.tagName == 'BUTTON') {
      MOBILE_MENU.classList.remove(CLASS_MOBILE_MENU_ACTIVE);
      closeBurger();
    } else {
      closeMenu();
      closeBurger();
    }
  });
});
