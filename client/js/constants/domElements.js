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
