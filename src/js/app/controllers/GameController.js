import SideBar from '../views/components/SideBar';
import TopBar from '../views/components/TopBar';
import QuestionsNumbersList from '../views/components/QuestionsNumbersList';
import VariantPopup from '../views/components/game/VariantPopup';
import QuestionPopup from '../views/components/game/QuestionPopup';
import ResultList from '../views/components/game/ResultList';
import LevelResult from '../views/components/game/LevelResult';
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

    this.gameResultPage = document.createElement('div');
    this.gameResultPage.classList.add('game-result-page');

    this.resultList = new ResultList();
    this.levelResult = new LevelResult();

    this.gameHeaderContainer = document.createElement('div');
    this.gameHeaderContainer.classList.add('header-container');

    this.resultTopBar = new TopBar();
    this.resultTopBar.setData({ title: `${LocaleProvider.getLocale('levelResult')}`, isSmall: false });

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

    this.gameHeaderContainer.append(this.topBar.render());
    this.gameHeaderContainer.append(this.questionsNumbersList.render());

    this.gameQuestionsPage.append(this.gameHeaderContainer);
    this.gameQuestionsPage.append(this.questionCardsContainer.render());
    this.gameQuestionsPage.append(this.variantPopup.render());
    this.gameQuestionsPage.append(this.questionPopup.render());

    this.gameResultPage.append(this.resultTopBar.render());
    this.gameResultPage.append(this.levelResult.render(), this.resultList.render());

    this.rootEl.append(this.sidebar.render());
    this.rootEl.append(this.gameQuestionsPage);

    this.sidebar.buttonClose.onclick = () => {
      this.sidebar.hide();
    };
    this.topBar.menuButton.onclick = () => {
      this.sidebar.show();
    };

    this.resultTopBar.menuButton.onclick = () => {
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
            LocaleProvider.setCurrentLocale(0);
            PathBus.setCurrentPath(PathBus.getCurrentPath());
          },
        },
        {
          text: 'ru',
          action: () => {
            LocaleProvider.setCurrentLocale(1);
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

  showLevelResult(levelModel) {
    if (!levelModel.getIsLocked()) {
      this.questionsNumbersList.setData({ levelModel });
      this.resultTopBar.setData({ title: `${LocaleProvider.getLocale('levelResults')}`, isSmall: false });
      const numberOfAnsweredQuestions = levelModel.getNumberOfAnsweredQuestions();
      const numberOfCorrectAnsweredQuestions = levelModel.getNumberOfCorrectAnsweredQuestions();

      const correctPercentage = numberOfCorrectAnsweredQuestions / (numberOfAnsweredQuestions / 100);

      let isUnlocked = false;
      let isFreshUnlocked = false;

      if (correctPercentage >= 60) {
        isUnlocked = true;
        LevelRepository.getById(levelModel.id + 1).then((nextLevelModel) => {
          if (nextLevelModel && nextLevelModel.getIsLocked()) {
            LevelRepository.setLevelIsLockeById(levelModel.id + 1, false);
            isFreshUnlocked = true;
          }
          this.levelResult.setData({
            isUnlocked,
            isFreshUnlocked,
            levelModel,
            numberOfAnsweredQuestions,
            numberOfCorrectAnsweredQuestions,
          });
        });
      }
      this.levelResult.setData({
        isUnlocked,
        isFreshUnlocked,
        levelModel,
        numberOfAnsweredQuestions,
        numberOfCorrectAnsweredQuestions,
      });

      this.resultList.setData({ levelModel });
      this.renderPage(this.gameResultPage);
    }
  }

  renderPage(pageEl) {
    this.rootEl.innerHTML = '';
    this.rootEl.append(this.sidebar.render());
    this.rootEl.append(pageEl);
  }

  resolve(path) {
    this.generateSidebarData();
    this.parentElement.innerHTML = '';
    this.parentElement.append(this.rootEl);
    this.sidebar.hide();

    const pathArray = path.slice(1).split('/');
    const leverNumber = Number.parseInt(pathArray[1], 10);
    const questionNumber = Number.parseInt(pathArray[3], 10);
    if (pathArray[0] === 'level') {
      if (pathArray.length === 4 && pathArray[2] === 'question') {
        LevelRepository.getById(leverNumber).then((levelModel) => {
          this.showQuestion(questionNumber, levelModel);
        });
      } else if (pathArray.length === 3 && pathArray[2] === 'result') {
        LevelRepository.getById(leverNumber).then((levelModel) => {
          this.showLevelResult(levelModel);
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
    this.renderPage(this.gameQuestionsPage);
  }
}
