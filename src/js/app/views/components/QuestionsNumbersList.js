export default class QuestionsNumbersList {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('questions-numbers-list');
  }

  setData(questionsNumbersListProps) {
    const { levelModel, questionNumber } = questionsNumbersListProps;
    this.rootEl.innerHTML = '';
    levelModel.getQuestions().forEach((question, i, array) => {
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
      } else if (((array[i - 1] && array[i - 1].userAnswer) || i === questionNumber - 1) && !(array[i + 1] && array[i + 1].userAnswer)) {
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
