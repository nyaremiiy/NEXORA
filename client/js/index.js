const header = document.querySelector('#header');
const hero = document.querySelector('#hero');

const heightHeader = header.offsetHeight;
if (window.innerWidth > 876) {
  hero.querySelector('.hero__left-col').style.paddingTop = `${heightHeader}px`;
  hero.querySelector('.hero__right-col').style.paddingTop = `${heightHeader}px`;
}
