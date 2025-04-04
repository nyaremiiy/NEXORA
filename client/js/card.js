import { checkAuth } from './utils/checkAuth.js';

checkAuth('/card');
console.log(JSON.parse(localStorage.getItem('currentCard')));

document.title = JSON.parse(localStorage.getItem('currentCard')).title + ' | NEXORA';