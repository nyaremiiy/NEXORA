import { HEADER, MOBILE_MENU } from '../constants/domElements.js';

export const setMobileMenuSettings = () => {
  const heightHeader = HEADER.offsetHeight;

  MOBILE_MENU.style = `top: ${heightHeader}px; height: ${
    window.innerHeight - heightHeader
  })px`;
};
