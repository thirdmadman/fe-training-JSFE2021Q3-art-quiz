class Score {

  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('score-list');
    this.rootEl.innerText = 'Score';
  }
  render() {
    return this.rootEl;
  }
}

module.exports = Score