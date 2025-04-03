import { HEADER } from '../constants/dom/headerDomElements.js';
import { MOBILE_MENU } from '../constants/dom/burgerDomElements.js';

export const setMobileMenuSettings = () => {
  const heightHeader = HEADER.offsetHeight;

  MOBILE_MENU.style = `top: ${heightHeader}px; height: ${
    window.innerHeight - heightHeader
  })px`;
};
