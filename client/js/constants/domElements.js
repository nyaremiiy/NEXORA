export const BODY = document.body;

export const LOGIN_FORM = document.querySelector('#login-form');
export const REGISTER_FORM = document.querySelector('#reg-form');

export const MODAL_FOR_LOGIN_FORM = document.querySelector('#modal-login');
export const MODAL_FOR_REGISTER_FORM = document.querySelector('#modal-reg');

export const MESSAGE_ERROR_FOR_LOGIN_FORM = MODAL_FOR_LOGIN_FORM.querySelector(
  '.form-message-error'
);
export const MESSAGE_ERROR_FOR_REGISTER_FORM =
  MODAL_FOR_REGISTER_FORM.querySelector('.form-message-error');

export const INPUTS_LOGIN_FORM = MODAL_FOR_LOGIN_FORM.querySelectorAll('input');

export const INDEX_PAGE_BTNS_LOGIN = document.querySelectorAll('.js-btn-login');
export const INDEX_PAGE_BTNS_REGISTER =
  document.querySelectorAll('.js-btn-reg');

export const BTNS_MODAL_CLOSE = document.querySelectorAll('.modal-f__close');

export const HEADER = document.querySelector('#header');
export const HERO_SECTION = document.querySelector('#hero');
export const HERO_SECTION_COL = HERO_SECTION.querySelectorAll(
  '.hero__left-col, .hero__right-col'
);

export const BURGER = document.querySelector('#burger');
export const MOBILE_MENU = document.querySelector('#mobile-menu');
