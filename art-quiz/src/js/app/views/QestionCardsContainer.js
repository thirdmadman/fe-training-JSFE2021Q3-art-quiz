const QestionCard = require('./components/game/QuestionCard');
class QestionCardsContainer {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('qestion-cards-container');

    this.rootEl.innerText = 'Questions here';
  }

  setData(data) {
    console.log(data);
    this.rootEl.innerHTML = '';
    let qestionCard = new QestionCard();
    qestionCard.setData(data.questions[0]);
    this.rootEl.appendChild(qestionCard.render())
  }

  hide() {
    this.rootEl.classList.remove('game-qestion-page_hidden');
  }

  render() {
    return this.rootEl;
  }
}

module.exports = QestionCardsContainer;
