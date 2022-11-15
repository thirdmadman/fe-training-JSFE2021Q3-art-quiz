import SideBar from '../views/components/SideBar';
import TopBar from '../views/components/TopBar';
import QuestionsNumbersList from '../views/components/QuestionsNumbersList';
import VariantPopup from '../views/components/game/VariantPopup';
import QuestionPopup from '../views/components/game/QuestionPopup';
import QuestionCardsContainer from '../views/QuestionCardsContainer';
import LocaleProvider from '../services/LocaleProvider';
import PathBus from '../services/PathBus';
import LevelRepository from '../repository/LevelRepository';
import QuestionRepository from '../repository/QuestionRepository';

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
      separatorText: LocaleProvider.getLocale('sidebarMotto'),
      currentPath: '!current',
      menu: [
        {
          text: `[${LocaleProvider.getLocale('gamePaused')}]`,
          path: '!current',
          action: null,
        },
        {
          text: LocaleProvider.getLocale('levelsTitle'),
          path: '/main/levels',
          action: PathBus.setCurrentPath,
        },
      ],
      fastLangSw: [
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

  showQuestion(questionNumber, levelModel) {
    if (!levelModel.getIsLocked()) {
      this.questionsNumbersList.setData({ levelModel, questionNumber });
      this.topBar.setData({ title: `${LocaleProvider.getLocale('levelTitle')} ${levelModel.getId()}`, isSmall: true });
      this.questionCardsContainer.setData({
        level: levelModel,
        variantPopup: this.variantPopup,
        questionPopup: this.questionPopup,
        questionNumber,
      });
    }
  }

  resolve(path) {
    const pathArray = path.slice(1).split('/');
    const leverNumber = Number.parseInt(pathArray[1], 10);
    const questionNumber = Number.parseInt(pathArray[3], 10);
    if (pathArray[0] === 'level') {
      if (pathArray.length === 4 && pathArray[2] === 'question') {
        LevelRepository.getById(leverNumber).then((levelModel) => {
          this.showQuestion(questionNumber, levelModel);
        });
      } else if (pathArray.length === 2) {
        QuestionRepository.getLastWithAnswerByLevelId(leverNumber).then((lastQuestionWithNumber) => {
          let lastQuestionNumber = lastQuestionWithNumber != null ? lastQuestionWithNumber.getNumber() : 0;
          if (lastQuestionNumber >= 10) {
            lastQuestionNumber = 1;
          } else {
            lastQuestionNumber += 1;
          }
          PathBus.setCurrentPath(`/game/level/${leverNumber}/question/${lastQuestionNumber}`);
        });
      }
    }
    this.generateSidebarData();
    this.parentElement.innerHTML = '';
    this.parentElement.append(this.rootEl);
    this.sidebar.hide();
  }
}
