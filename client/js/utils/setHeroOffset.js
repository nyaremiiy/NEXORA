import {
  HEADER,
  HERO_SECTION,
  HERO_SECTION_COL,
} from '../constants/domElements.js';

export const setHeroOffset = () => {
  if (!HEADER || !HERO_SECTION) return;

  const heightHeader = HEADER.offsetHeight;

  if (window.innerWidth > 876) {
    HERO_SECTION_COL.forEach((col) => {
      col.style.paddingTop = `${heightHeader}px`;
    });
  }
};
