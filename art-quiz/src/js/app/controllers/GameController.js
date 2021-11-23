const SideBar = require('../views/components/SideBar.js');
const TopBar = require('../views/components/TopBar.js');

const QestionCardsContainer = require('../views/QestionCardsContainer.js');

const LocaleProvider = require('../services/LocaleProvider');
const PathBus = require('../services/PathBus');

const LevelRepository = require('../repository/LevelRepository');

class GameController {
  constructor(parentElement) {
    this.parentElement = parentElement;

    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('container');

    this.qestionCardsContainer = new QestionCardsContainer();

    this.gameQuestionsPage = document.createElement('div');
    this.gameQuestionsPage.classList.add('game-qestion-page');

    this.headerContainer = document.createElement('div');
    this.headerContainer.classList.add('header-container');

    this.topBar = new TopBar();
    this.topBar.setData({ title: LocaleProvider.getLocale('levelTitle') + ' 0', isSmall: true });
    this.sidebar = new SideBar();
    this.sidebar.hide();

    this.headerContainer.append(this.topBar.render());

    this.gameQuestionsPage.append(this.headerContainer);
    this.gameQuestionsPage.append(this.qestionCardsContainer.render());

    this.rootEl.append(this.sidebar.render());
    this.rootEl.append(this.gameQuestionsPage);
  }

  showQuestion(questionId, level) {
    if (!level.isLocked) {
      this.topBar.setData({ title: LocaleProvider.getLocale('levelTitle') + ' ' + level.id, isSmall: true });
    }
  }

  resolve(path, data) {
    let pathArray = path.slice(1).split('/');

    // level/0/question/1
    console.log(data);

    if (pathArray[0] === 'level') {
      if (pathArray.length === 4 && pathArray[2] === 'question') {
        this.showQuestion(pathArray[3], LevelRepository.getById(pathArray[1]));
      } else if (pathArray.length === 2) {
        PathBus.setCurrentPath('/game/level/' + pathArray[1] + '/question/' + "0");
      }
    }

    this.parentElement.innerHTML = '';
    this.parentElement.append(this.rootEl);
    console.log(path);
  }
}

module.exports = GameController;
