import LocaleProvider from '../../../services/LocaleProvider';
import PathBus from '../../../services/PathBus';

export default class LevelResult {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('level-result');

    this.title = document.createElement('div');
    this.title.classList.add('level-result__title');

    this.resultStatsContainer = document.createElement('div');
    this.resultStatsContainer.classList.add('level-result__stats-container');

    this.nextButton = document.createElement('div');
    this.nextButton.classList.add('level-result__button-next');

    this.rootEl.append(this.title, this.resultStatsContainer, this.nextButton);
  }

  setData(data) {
    const { isUnlocked, isFreshUnlocked, levelModel, numberOfAnsweredQuestions, numberOfCorrectAnsweredQuestions } = data;

    const generateStatsCard = (title, numberAll, numberStat, isCorrect) => {
      const element = document.createElement('div');
      element.classList.add('level-result__stats-card');
      element.classList.add('stats-card');

      const measurement = document.createElement('div');
      measurement.classList.add('stats-card__measurement');

      const measurementLine = document.createElement('div');
      measurementLine.classList.add('stats-card__measurement-line');

      const measurementIndicator = document.createElement('div');
      measurementIndicator.classList.add('stats-card__measurement-indicator');

      if (isCorrect) {
        measurementIndicator.classList.add('stats-card__measurement-indicator_correct');
      } else {
        measurementIndicator.classList.add('stats-card__measurement-indicator_incorrect');
      }

      const measurementText = document.createElement('div');
      measurementText.classList.add('stats-card__measurement-text');
      measurementText.innerText = numberStat;

      const elementTitle = document.createElement('div');
      elementTitle.classList.add('stats-card__title');
      elementTitle.innerText = title;

      const proc = numberStat / (numberAll / 100);

      measurementIndicator.style.width = `${proc}%`;

      measurementLine.append(measurementIndicator);
      measurement.append(measurementLine, measurementText);
      element.append(elementTitle, measurement);

      return element;
    };

    let titleText = '';

    this.nextButton.innerText = LocaleProvider.getLocale('gameResultBackToLevels');
    this.nextButton.onclick = () => PathBus.setCurrentPath('/main/levels/');

    if (isUnlocked) {
      titleText = LocaleProvider.getLocale('gameResultLevelComplete');
      this.nextButton.innerText = LocaleProvider.getLocale('gameNextButtonTitle');
      this.nextButton.onclick = () => PathBus.setCurrentPath(`/game/level/${levelModel.getId() + 1}`);
    } else {
      titleText = LocaleProvider.getLocale('gameResultTryAgain');
    }

    if (isFreshUnlocked) {
      titleText += ` ${LocaleProvider.getLocale('gameResultGoodJob')}`;
    }

    this.title.innerText = titleText;

    this.resultStatsContainer.innerHTML = '';

    if (numberOfAnsweredQuestions != null && numberOfAnsweredQuestions > 0) {
      const statsCardCorrect = generateStatsCard(
        LocaleProvider.getLocale('gameAnswerCorrect'),
        numberOfAnsweredQuestions,
        numberOfCorrectAnsweredQuestions,
        true,
      );
      const statsCardIncorrect = generateStatsCard(
        LocaleProvider.getLocale('gameAnswerIncorrect'),
        numberOfAnsweredQuestions,
        numberOfAnsweredQuestions - numberOfCorrectAnsweredQuestions,
        false,
      );

      this.resultStatsContainer.append(statsCardCorrect, statsCardIncorrect);
    }
  }

  render() {
    return this.rootEl;
  }
}
