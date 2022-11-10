import QuestionCard from './components/game/QuestionCard';

export default class QuestionCardsContainer {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('question-cards-container');

    this.rootEl.innerText = 'Questions here';
  }

  setData(data) {
    this.rootEl.innerHTML = '';
    const questionCard = new QuestionCard();
    const question = data.level.getQuestions().filter((el) => el.getNumber() === parseInt(data.questionNumber, 10))[0];
    questionCard.setData({ question, variantPopup: data.variantPopup, questionPopup: data.questionPopup });
    this.rootEl.appendChild(questionCard.render());
  }

  hide() {
    this.rootEl.classList.remove('game-question-page_hidden');
  }

  render() {
    return this.rootEl;
  }
}
