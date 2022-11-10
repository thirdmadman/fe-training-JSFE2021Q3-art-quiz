export default class Score {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('score-list');
    this.rootEl.innerText = 'Score';
  }

  render() {
    return this.rootEl;
  }
}
