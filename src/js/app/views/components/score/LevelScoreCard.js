import QuestionsNumbersList from '../QuestionsNumbersList';
import LocaleProvider from '../../../services/LocaleProvider';

export default class LevelScoreCard {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('score-card');
  }

  setData(data) {
    const scoreWrapper = document.createElement('div');
    scoreWrapper.classList.add('score-card__wrapper');

    const scoreText = document.createElement('div');
    scoreText.classList.add('score-card__text');
    scoreText.innerText = `${data.getQuestionsAnsweredNumber()}/${data.getQuestionsNumber()}`;

    const scoreTitle = document.createElement('div');
    scoreTitle.classList.add('score-card__title');
    scoreTitle.innerText = `${LocaleProvider.getLocale('levelTitle')} ${data.getId()}`;

    const scoreQuestionsNumbersList = new QuestionsNumbersList();
    scoreQuestionsNumbersList.setData({ levelModel: data });

    if (data.getIsLocked()) {
      this.rootEl.classList.add('score-card_locked');
    }

    scoreWrapper.append(scoreText, scoreTitle, scoreQuestionsNumbersList.render());
    this.rootEl.style.backgroundImage = `url('${data.getImageSrc()}')`;
    this.rootEl.append(scoreWrapper);
  }

  render() {
    return this.rootEl;
  }
}
