import './scss/style.scss';
//import "./js/srcremaker.js"

document.getElementsByClassName('burger-menu')[0].addEventListener('click', () => {
  document.getElementsByClassName('sidebar')[0].classList.remove('sidebar_hidden');
});

document.getElementsByClassName('button-close')[0].addEventListener('click', () => {
  document.getElementsByClassName('sidebar')[0].classList.add('sidebar_hidden');
});

// document.addEventListener('click', () => {
//   document.getElementsByClassName("game-qestion-page")[0].classList.toggle("game-qestion-page_hidden");
// }, true);

[...document.getElementsByClassName('qestion-whois')[0].getElementsByClassName('qestion-card_answers-grid')].forEach((element) => {
  element.addEventListener('click', () => {
    document.getElementsByClassName('overlay')[0].classList.toggle('overlay_hidden');
  });
});

document.getElementsByClassName('qestion-popup__button')[0].addEventListener('click', () => {
  document.getElementsByClassName('qestion-whois')[0].classList.toggle('qestion-card_active');
  document.getElementsByClassName('qestion-whois')[0].classList.toggle('qestion-card_hide');
  document.getElementsByClassName('qestion-whois')[0].ontransitionend = () => {
    document.getElementsByClassName('qestion-which')[0].classList.toggle('qestion-card_active');
    document.getElementsByClassName('qestion-whois')[0].classList.toggle('qestion-card_hidden');
  };
  //document.getElementsByClassName("qestion-card_which")[0].classList.toggle("qestion-card_hidden");
  document.getElementsByClassName('overlay')[0].classList.toggle('overlay_hidden');
});
