import LocaleProvider from '../../../services/LocaleProvider';
import imgPlaceholder from '../../../../../assets/img/png/placeholder.png';

export default class QuestionResultCard {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('result-card');

    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('result-list__card');
    this.rootEl.classList.add('result-card');

    this.imageContainer = document.createElement('div');
    this.imageContainer.classList.add('result-card__image');

    this.imageEl = document.createElement('img');

    this.imageContainer.append(this.imageEl);

    this.resultText = document.createElement('div');
    this.resultText.classList.add('result-card__text');

    this.resultTitle = document.createElement('div');
    this.resultTitle.classList.add('result-card__question-name');

    this.resultStats = document.createElement('div');
    this.resultStats.classList.add('result-card__question-stats');

    this.resultText.append(this.resultTitle);
    this.resultText.append(this.resultStats);

    this.rootEl.append(this.imageContainer);
    this.rootEl.append(this.resultText);
  }

  setData(questionModel) {
    const isCorrect = questionModel.isUserAnswerCorrect();
    const userAnswer = questionModel.getUserAnswer();
    console.error(userAnswer);
    this.imageEl.alt = `question img`;

    this.imageEl.src = imgPlaceholder;

    if (userAnswer != null && isCorrect) {
      this.imageEl.src = questionModel.getImageSrc();
      this.resultTitle.textContent = LocaleProvider.getLocale('gameAnswerCorrect');
      const answer = questionModel.getCorrectAnswer();
      let resultStatsText = `${answer.getAuthor()[LocaleProvider.getLocale('localeName')]} - ${
        answer.getName()[LocaleProvider.getLocale('localeName')]
      }`;

      if (resultStatsText.length > 34) {
        resultStatsText = resultStatsText.slice(0, 34).concat('...');
      }
      this.resultStats.textContent = resultStatsText;
    }

    if (userAnswer === null || !isCorrect) {
      this.rootEl.classList.add('result-card_locked');

      this.resultTitle.textContent = LocaleProvider.getLocale('gameAnswerIncorrect');

      if (userAnswer === null) {
        this.resultTitle.textContent = LocaleProvider.getLocale('gameResultNoAnswer');
      }
    }
  }

  render() {
    return this.rootEl;
  }
}
