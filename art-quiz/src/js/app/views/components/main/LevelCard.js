class LevelCard {
  constructor(data) {

    this.dataPalaceholder = {
      imgSrc: '/static/img/jpg/square/0.jpg', // TODO: IMG placeholder here
      levelTitle: 'Level ?',
      levelStats: 'Done ?/?',
      levelId: -1,
      isLocked: false,
    };

    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('level-card');
    this.rootEl.classList.add('level-list__card');

    this.imageContainer = document.createElement('div');
    this.imageContainer.classList.add('level-card__image')

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
    console.log(data);
    (data && Object.keys(data).length >= 1) ? this.data = data : this.data = this.dataPalaceholder;

    this.levelId = this.data.levelId;

    this.imageEl.src = this.data.imageSrc;
    this.imageEl.alt = "Level " + this.data.id;
    this.levelTitle.textContent = "Level " + this.data.id;
    this.levelStats.textContent = this.data.isLocked ? "Locked" : "Done " + this.data.questionsAnsweredNumber + "/" + this.data.questionsNumber;

    if (this.data.isLocked) {
      this.rootEl.classList.add('level-card_locked');
    } 
  }

  render() {
    return this.rootEl;
  }
}

module.exports = LevelCard