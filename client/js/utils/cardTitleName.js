export function setToTitleCardPage() {
  document.querySelector('.js-card-title-name ').textContent = `${
    JSON.parse(localStorage.getItem('currentCard')).title
  }`;
}
