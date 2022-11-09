class QuestionsNumbersList {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('questions-numers-list');
  }

  setData(data) {
    this.rootEl.innerHTML = '';
    data.questions.forEach((question, i, array) => {
      let questionIcon = document.createElement('div');
      questionIcon.classList.add('questions-numers-list__item');

      let questionNumber = document.createElement('p');
      questionNumber.innerText = question.number;

      if (question.userAnswer) {
        if (question.isUserAnswerCorrect) {
          questionIcon.classList.add('questions-numers-list__item_correct');
        } else {
          questionIcon.classList.add('questions-numers-list__item_uncorrect');
        }
      } else {
        if (((array[i - 1] && array[i - 1].userAnswer) || i === 0) && !(array[i + 1] && array[i + 1].userAnswer)) {
          questionIcon.classList.add('questions-numers-list__item_active');
        }
      }

      questionIcon.append(questionNumber);
      this.rootEl.append(questionIcon);
    });
  }
  render() {
    return this.rootEl;
  }
}

module.exports = QuestionsNumbersList;
