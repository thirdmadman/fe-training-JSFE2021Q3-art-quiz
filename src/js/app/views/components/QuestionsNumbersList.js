export default class QuestionsNumbersList {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('questions-numbers-list');
  }

  setData(questionsNumbersListProps) {
    const { levelModel, questionNumber } = questionsNumbersListProps;
    this.rootEl.innerHTML = '';
    levelModel.getQuestions().forEach((question, i) => {
      const questionIcon = document.createElement('div');
      questionIcon.classList.add('questions-numbers-list__item');

      const questionNumberEl = document.createElement('p');
      questionNumberEl.innerText = question.getNumber();

      if (question.getUserAnswer()) {
        if (question.isUserAnswerCorrect()) {
          questionIcon.classList.add('questions-numbers-list__item_correct');
        } else {
          questionIcon.classList.add('questions-numbers-list__item_incorrect');
        }
      }
      if (questionNumber >= 0 && i === questionNumber - 1) {
        questionIcon.classList.add('questions-numbers-list__item_active');
      }

      questionIcon.append(questionNumberEl);
      this.rootEl.append(questionIcon);
    });
  }

  render() {
    return this.rootEl;
  }
}
