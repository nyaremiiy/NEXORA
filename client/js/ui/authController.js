import {
  CLASS_MODAL_FORM_VISIBLE,
  CLASS_NO_SCROLL,
} from '../constants/classNames.js';

import { BTNS_MODAL_CLOSE } from '../constants/dom/modal/modalDomElements.js';
import {
  MODAL_FOR_LOGIN_FORM,
  MODAL_FOR_REGISTER_FORM,
} from '../constants/dom/modal/authModal/authModalDomElements.js';
import {
  INDEX_PAGE_BTNS_LOGIN,
  INDEX_PAGE_BTNS_REGISTER,
} from '../constants/dom/homePage/homePageDomElements.js';

BTNS_MODAL_CLOSE.forEach((btn) => {
  btn.addEventListener('click', hideModal);
});

INDEX_PAGE_BTNS_LOGIN.forEach((btn) => {
  btn.addEventListener('click', showModalLogin);
});

INDEX_PAGE_BTNS_REGISTER.forEach((btn) => {
  btn.addEventListener('click', showModalReg);
});

function showModalLogin() {
  switchModal(MODAL_FOR_LOGIN_FORM, MODAL_FOR_REGISTER_FORM);
}

function showModalReg() {
  switchModal(MODAL_FOR_REGISTER_FORM, MODAL_FOR_LOGIN_FORM);
}

function hideModal() {
  [MODAL_FOR_LOGIN_FORM, MODAL_FOR_REGISTER_FORM].forEach((modal) =>
    modal.classList.remove(CLASS_MODAL_FORM_VISIBLE)
  );

  document.body.classList.remove(CLASS_NO_SCROLL);
}

function switchModal(show, hide) {
  hide.classList.remove(CLASS_MODAL_FORM_VISIBLE);
  show.classList.add(CLASS_MODAL_FORM_VISIBLE);
  document.body.classList.add(CLASS_NO_SCROLL);
}
