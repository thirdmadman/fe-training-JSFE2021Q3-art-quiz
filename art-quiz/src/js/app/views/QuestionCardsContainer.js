const QuestionCard = require('./components/game/QuestionCard');
class QuestionCardsContainer {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('question-cards-container');

    this.rootEl.innerText = 'Questions here';
  }

  setData(data) {
    this.rootEl.innerHTML = '';
    let questionCard = new QuestionCard();
    let question = data.level.questions.filter((el) => el.number === parseInt(data.questionNumber))[0];
    questionCard.setData({question: question, variantPopup: data.variantPopup, questionPopup: data.questionPopup});
    this.rootEl.appendChild(questionCard.render());
  }

  hide() {
    this.rootEl.classList.remove('game-question-page_hidden');
  }

  render() {
    return this.rootEl;
  }
}

module.exports = QuestionCardsContainer;
