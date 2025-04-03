import { CLASS_MODAL_FORM_VISIBLE } from '../../constants/classNames.js';
import { MODAL_CREATE_CARD } from '../../constants/dom/dashboard/dashboardDomElements.js';
import { BTNS_MODAL_CLOSE } from '../../constants/dom/modal/modalDomElements.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-btn-create-card').forEach((item) => {
    item.addEventListener('click', () => {
      MODAL_CREATE_CARD.classList.add(CLASS_MODAL_FORM_VISIBLE);
    });
  });
});

BTNS_MODAL_CLOSE.forEach((btn) => {
  btn.addEventListener('click', () => {
    hideModal();
  });
});

function hideModal() {
  MODAL_CREATE_CARD.classList.remove(CLASS_MODAL_FORM_VISIBLE);
}
