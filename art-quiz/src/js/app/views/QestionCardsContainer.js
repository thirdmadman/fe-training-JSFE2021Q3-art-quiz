

class QestionCardsContainer {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('qestion-cards-container');

    this.rootEl.innerText = "Questions here";

  }


  hide() {
    this.rootEl.classList.remove('game-qestion-page_hidden');
  }

  render() {
    return this.rootEl;
  }
}

module.exports = QestionCardsContainer;