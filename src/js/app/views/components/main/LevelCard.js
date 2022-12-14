import LocaleProvider from '../../../services/LocaleProvider';

export default class LevelCard {
  constructor(data) {
    this.dataPlaceholder = {
      id: -1,
      imgSrc: 'static/img/jpg/square/0.jpg', // TODO: IMG placeholder here
      isLocked: false,
      text: '',
    };

    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('level-card');
    this.rootEl.classList.add('level-list__card');

    this.imageContainer = document.createElement('div');
    this.imageContainer.classList.add('level-card__image');

    this.imageEl = document.createElement('img');

    this.imageContainer.append(this.imageEl);

    this.levelText = document.createElement('div');
    this.levelText.classList.add('level-card__text');

    this.levelTitle = document.createElement('div');
    this.levelTitle.classList.add('level-card__level-name');

    this.levelStats = document.createElement('div');
    this.levelStats.classList.add('level-card__level-stats');

    this.levelText.append(this.levelTitle);
    this.levelText.append(this.levelStats);

    this.rootEl.append(this.imageContainer);
    this.rootEl.append(this.levelText);

    this.setData(data);
  }

  setData(data) {
    if (data && Object.keys(data).length >= 1) {
      this.data = data;
      this.imageEl.src = this.data.getImageSrc();
      this.imageEl.alt = `${LocaleProvider.getLocale('levelTitle')} ${this.data.getId()}`;
      this.levelTitle.textContent = `${LocaleProvider.getLocale('levelTitle')} ${this.data.getId()}`;
      this.levelStats.textContent = this.data.getIsLocked()
        ? LocaleProvider.getLocale('levelLockedTitle')
        : `${LocaleProvider.getLocale('levelStatsTitle')} ${this.data.getQuestionsAnsweredNumber()}/${this.data.getQuestionsNumber()}`;

      if (this.data.getIsLocked()) {
        this.rootEl.classList.add('level-card_locked');
      }
    }
  }

  render() {
    return this.rootEl;
  }
}
