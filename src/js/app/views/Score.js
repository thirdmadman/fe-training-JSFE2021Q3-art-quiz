import LevelsScoreCardsContainer from './components/score/LevelScoreCardsContainer';

export default class Score {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('score-list');
  }

  setData(levelsList) {
    this.rootEl.innerHTML = '';
    const levelsScoreCardsContainer = new LevelsScoreCardsContainer();
    levelsScoreCardsContainer.setData(levelsList);
    this.rootEl.append(levelsScoreCardsContainer.render());
  }

  render() {
    return this.rootEl;
  }
}
