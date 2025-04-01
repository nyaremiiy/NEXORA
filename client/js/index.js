import './ui/modalController.js';
import './features/auth/login.js';
import './features/auth/register.js';

const header = document.querySelector('#header');
const hero = document.querySelector('#hero');

const heightHeader = header.offsetHeight;
if (window.innerWidth > 876) {
  hero.querySelector('.hero__left-col').style.paddingTop = `${heightHeader}px`;
  hero.querySelector('.hero__right-col').style.paddingTop = `${heightHeader}px`;
}
