import "./scss/style.scss";
//import "./js/srcremaker.js"

document.body.addEventListener('click', () => {
  document.getElementsByClassName("sidebar")[0].classList.toggle("sidebar_hidden");
}, true); 