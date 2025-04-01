const btnLogin = document.querySelectorAll('.js-btn-login');
const btnsReg = document.querySelectorAll('.js-btn-reg');

const modalLogin = document.querySelector('#modal-login');
const modalReg = document.querySelector('#modal-reg');

const btnClose = document.querySelectorAll('.modal-f__close');

btnClose.forEach((btn) => {
  btn.addEventListener('click', hideModal);
});

btnLogin.forEach((btn) => {
  btn.addEventListener('click', showModalLogin);
});

btnsReg.forEach((btn) => {
  btn.addEventListener('click', showModalReg);
});

function showModalLogin() {
  if (modalReg.classList.contains('modal-f--active')) {
    modalReg.classList.remove('modal-f--active');
  }

  modalLogin.classList.add('modal-f--active');
  document.body.classList.add('no-scroll');
}

function showModalReg() {
  if (modalLogin.classList.contains('modal-f--active')) {
    modalLogin.classList.remove('modal-f--active');
  }

  modalReg.classList.add('modal-f--active');
  document.body.classList.add('no-scroll');
}

function hideModal() {
  if (modalLogin.classList.contains('modal-f--active')) {
    modalLogin.classList.remove('modal-f--active');
  }

  if (modalReg.classList.contains('modal-f--active')) {
    modalReg.classList.remove('modal-f--active');
  }

  document.body.classList.remove('no-scroll');
}
