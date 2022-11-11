import LevelScoreCard from './LevelScoreCard';

export default class ScoreCardsContainer {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('score-cards-container');
  }

  setData(data) {
    const { levelsList } = data;

    const levelScoreCars = levelsList.map((levelModel) => {
      const levelCard = new LevelScoreCard();
      levelCard.setData(levelModel);
      return levelCard.render();
    });
    this.rootEl.append(...levelScoreCars);
  }

  render() {
    return this.rootEl;
  }
}
