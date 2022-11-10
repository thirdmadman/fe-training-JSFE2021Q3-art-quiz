export default class QuestionsNumbersList {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('questions-numers-list');
  }

  setData(levelModel) {
    this.rootEl.innerHTML = '';
    levelModel.getQuestions().forEach((question, i, array) => {
      const questionIcon = document.createElement('div');
      questionIcon.classList.add('questions-numers-list__item');

      const questionNumber = document.createElement('p');
      questionNumber.innerText = question.getNumber();

      if (question.getUserAnswer()) {
        if (question.getIsUserAnswerCorrect()) {
          questionIcon.classList.add('questions-numers-list__item_correct');
        } else {
          questionIcon.classList.add('questions-numers-list__item_uncorrect');
        }
      } else if (((array[i - 1] && array[i - 1].userAnswer) || i === 0) && !(array[i + 1] && array[i + 1].userAnswer)) {
        questionIcon.classList.add('questions-numers-list__item_active');
      }

      questionIcon.append(questionNumber);
      this.rootEl.append(questionIcon);
    });
  }

  render() {
    return this.rootEl;
  }
}
