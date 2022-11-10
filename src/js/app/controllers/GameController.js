import SideBar from '../views/components/SideBar';
import TopBar from '../views/components/TopBar';
import QuestionsNumbersList from '../views/components/QuestionsNumbersList';
import VariantPopup from '../views/components/game/VariantPopup';
import QuestionPopup from '../views/components/game/QuestionPopup';
import QuestionCardsContainer from '../views/QuestionCardsContainer';
import LocaleProvider from '../services/LocaleProvider';
import PathBus from '../services/PathBus';
import LevelRepository from '../repository/LevelRepository';

export default class GameController {
  constructor(parentElement) {
    this.parentElement = parentElement;

    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('container');

    this.questionCardsContainer = new QuestionCardsContainer();

    this.gameQuestionsPage = document.createElement('div');
    this.gameQuestionsPage.classList.add('game-question-page');

    this.headerContainer = document.createElement('div');
    this.headerContainer.classList.add('header-container');

    this.topBar = new TopBar();
    this.topBar.setData({ title: `${LocaleProvider.getLocale('levelTitle')} 0`, isSmall: true });
    this.sidebar = new SideBar();
    this.generateSidebarData();
    this.sidebar.hide();

    this.variantPopup = new VariantPopup();
    this.variantPopup.hide();

    this.questionPopup = new QuestionPopup();
    this.questionPopup.hide();

    this.questionsNumbersList = new QuestionsNumbersList();

    this.headerContainer.append(this.topBar.render());
    this.headerContainer.append(this.questionsNumbersList.render());

    this.gameQuestionsPage.append(this.headerContainer);
    this.gameQuestionsPage.append(this.questionCardsContainer.render());
    this.gameQuestionsPage.append(this.variantPopup.render());
    this.gameQuestionsPage.append(this.questionPopup.render());

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
    const sidebarData = {
      separatortext: LocaleProvider.getLocale('sidebarMoto'),
      menu: [
        {
          text: `[${LocaleProvider.getLocale('gamePaused')}]`,
          action: '',
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

    this.sidebar.setData(sidebarData);
  }

  showQuestion(questionNumber, level) {
    if (!level.getIsLocked()) {
      this.questionsNumbersList.setData(level);
      this.topBar.setData({ title: `${LocaleProvider.getLocale('levelTitle')} ${level.getId()}`, isSmall: true });
      this.questionCardsContainer.setData({
        level,
        variantPopup: this.variantPopup,
        questionPopup: this.questionPopup,
        questionNumber,
      });
    }
  }

  resolve(path) {
    const pathArray = path.slice(1).split('/');
    if (pathArray[0] === 'level') {
      if (pathArray.length === 4 && pathArray[2] === 'question') {
        this.showQuestion(pathArray[3], LevelRepository.getById(pathArray[1]));
      } else if (pathArray.length === 2) {
        PathBus.setCurrentPath(`/game/level/${pathArray[1]}/question/1`);
      }
    }
    this.generateSidebarData();
    this.parentElement.innerHTML = '';
    this.parentElement.append(this.rootEl);
    this.sidebar.hide();
  }
}
