const SideBar = require('../views/components/SideBar.js');
const TopBar = require('../views/components/TopBar.js');
const QuestionsNumbersList = require('../views/components/QuestionsNumbersList.js');
const VariantPopup = require('../views/components/game/VariantPopup');

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
    this.sidebar.setData(this.generateSidebarData());
    this.sidebar.hide();

    this.variantPopup = new VariantPopup();
    this.variantPopup.hide();

    this.questionsNumbersList = new QuestionsNumbersList();

    this.headerContainer.append(this.topBar.render());
    this.headerContainer.append(this.questionsNumbersList.render());

    this.gameQuestionsPage.append(this.headerContainer);
    this.gameQuestionsPage.append(this.qestionCardsContainer.render());
    this.gameQuestionsPage.append(this.variantPopup.render());

    this.rootEl.append(this.sidebar.render());
    this.rootEl.append(this.gameQuestionsPage);

    this.sidebar.buttonClose.onclick = () => {
      this.sidebar.hide();
    };
    this.topBar.menuButton.onclick = () => {
      this.sidebar.show();
    };
  }

  generateSidebarData() {
    return {
      separatortext: LocaleProvider.getLocale('sidebarMoto'),
      menu: [
        {
          text: '[' + LocaleProvider.getLocale('gamePaused') + ']',
          action: "",
        },
        {
          text: LocaleProvider.getLocale('levelsTitle'),
          action: () => {
            PathBus.setCurrentPath('/main/levels');
          },
        },
      ],
      fastlangsw: [
        {
          text: 'eng',
          action: () => {
            LocaleProvider.currentLocale = 0;
            PathBus.setCurrentPath(PathBus.getCurrentPath());
          },
        },
        {
          text: 'ru',
          action: () => {
            LocaleProvider.currentLocale = 1;
            PathBus.setCurrentPath(PathBus.getCurrentPath());
          },
        },
      ],
    };
  }

  showQuestion(questionId, level) {
    if (!level.isLocked) {
      this.questionsNumbersList.setData(level);
      this.topBar.setData({ title: LocaleProvider.getLocale('levelTitle') + ' ' + level.id, isSmall: true });
      this.qestionCardsContainer.setData({
        'level': level,
        variantPopup: this.variantPopup
      });

    }
  }

  resolve(path, data) {
    let pathArray = path.slice(1).split('/');

    
    console.log(data);

    if (pathArray[0] === 'level') {
      if (pathArray.length === 4 && pathArray[2] === 'question') {
        this.showQuestion(pathArray[3], LevelRepository.getById(pathArray[1]));
      } else if (pathArray.length === 2) {
        PathBus.setCurrentPath('/game/level/' + pathArray[1] + '/question/' + "1");
      }
    }
    this.sidebar.setData(this.generateSidebarData());
    this.parentElement.innerHTML = '';
    this.parentElement.append(this.rootEl);
    this.sidebar.hide()
    console.log(path);
  }
}

module.exports = GameController;
