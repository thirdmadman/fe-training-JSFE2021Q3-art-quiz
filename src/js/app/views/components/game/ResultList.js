import ResultCard from './ResultCard';

export default class ResultList {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('result-list');
  }

  setData(data) {
    this.rootEl.innerHTML = '';
    const { levelModel } = data;
    const questions = levelModel.getQuestions();
    questions.forEach((question) => {
      const resultCard = new ResultCard();
      resultCard.setData(question);
      this.rootEl.append(resultCard.render());
    });
  }

  render() {
    return this.rootEl;
  }
}
