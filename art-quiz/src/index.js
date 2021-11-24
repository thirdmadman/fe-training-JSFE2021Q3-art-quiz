import './scss/style.scss';
//import "./js/srcremaker.js"
const App = require('./js/app/App.js');



// document.getElementsByClassName('burger-menu')[0].addEventListener('click', () => {
//   document.getElementsByClassName('sidebar')[0].classList.remove('sidebar_hidden');
// });

// document.getElementsByClassName('button-close')[0].addEventListener('click', () => {
//   document.getElementsByClassName('sidebar')[0].classList.add('sidebar_hidden');
// });

// // document.addEventListener('click', () => {
// //   document.getElementsByClassName("game-question-page")[0].classList.toggle("game-question-page_hidden");
// // }, true);

// [...document.getElementsByClassName('question-whois')[0].getElementsByClassName('question-card_answers-grid')].forEach((element) => {
//   element.addEventListener('click', () => {
//     document.getElementsByClassName('overlay')[0].classList.toggle('overlay_hidden');
//   });
// });

// document.getElementsByClassName('question-popup__button')[0].addEventListener('click', () => {
//   document.getElementsByClassName('question-whois')[0].classList.toggle('question-card_active');
//   document.getElementsByClassName('question-whois')[0].classList.toggle('question-card_hide');
//   document.getElementsByClassName('question-whois')[0].ontransitionend = () => {
//     document.getElementsByClassName('question-which')[0].classList.toggle('question-card_active');
//     document.getElementsByClassName('question-whois')[0].classList.toggle('question-card_hidden');
//   };
//   //document.getElementsByClassName("question-card_which")[0].classList.toggle("question-card_hidden");
//   document.getElementsByClassName('overlay')[0].classList.toggle('overlay_hidden');
// });


new App("app").run();