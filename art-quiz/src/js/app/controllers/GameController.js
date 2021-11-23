const SideBar = require('../views/components/SideBar.js');
const TopBar = require('../views/components/TopBar.js');

const QestionCardsContainer = require('../views/QestionCardsContainer.js');

class GameController {
  constructor(parentElement) {
    this.parentElement = parentElement;

    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('container');

    this.qestionCardsContainer = new QestionCardsContainer();

    this.gameQuestionsPage = document.createElement('div');
    this.gameQuestionsPage.classList.add('game-qestion-page');

    this.topBar = new TopBar();
    this.sidebar = new SideBar();

    this.gameQuestionsPage.append(this.topBar.render());
    this.gameQuestionsPage.append(this.qestionCardsContainer.render());

    this.rootEl.append(this.sidebar.render());
    this.rootEl.append(this.gameQuestionsPage);
  }

  resolve(path) {
    this.parentElement.innerHTML = '';
    this.parentElement.append(this.rootEl);
    console.log(path);
  }
}

module.exports = GameController;
