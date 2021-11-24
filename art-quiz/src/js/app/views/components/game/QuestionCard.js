const LocaleProvider = require('../../../services/LocaleProvider');

class QuestionCard {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('qestion-card');
  }

  setData(data) {
    console.log(data);
    if (data.question.questionType === 1) {
      this.rootEl.classList.add('qestion-whois');

      let questionContainer = document.createElement('div');
      questionContainer.classList.add('qestion-card__question');
      let imageContainer = document.createElement('div');
      imageContainer.classList.add('qestion-card__image');

      let questionImage = document.createElement('img');
      questionImage.src = data.question.imageSrc;
      questionImage.alt = LocaleProvider.getLocale('gameQuestionType1');

      let questionTitle = document.createElement('div');
      questionTitle.classList.add('qestion-card__title');
      questionTitle.innerText = LocaleProvider.getLocale('gameQuestionType1');

      let answersGrid = document.createElement('div');
      answersGrid.classList.add('qestion-card_answers-grid');

      data.question.answers.forEach((answer) => {
        let answerEl = document.createElement('div');
        answerEl.classList.add('qestion-card_answer');

        answerEl.innerText = answer.author[LocaleProvider.getLocale('localeName')];
        answersGrid.append(answerEl);
      });

      imageContainer.append(questionImage);

      questionContainer.append(imageContainer);
      questionContainer.append(questionTitle);

      this.rootEl.append(questionContainer);
      this.rootEl.append(answersGrid);
    } else if (data.question.questionType === 2) {
      this.rootEl.classList.add('qestion-which');
      let answersGrid = document.createElement('div');
      answersGrid.classList.add('qestion-which_answers-grid');

      data.question.answers.forEach((answer) => {
        let answerEl = document.createElement('div');
        answerEl.classList.add('qestion-which_answer');

        let answersImage = document.createElement('img');
        answersImage.alt = LocaleProvider.getLocale('gameQuestionType2');
        answersImage.src = answer.imageSrc;

        answerEl.append(answersImage);
        answersGrid.append(answerEl);

        answerEl.onclick = () => {
          data.variantPopup.setData(answer);
          data.variantPopup.show();
        };
      });

      let qestionContainer = document.createElement('div');
      qestionContainer.classList.add('qestion-which__question');

      let qestiontitle = document.createElement('div');
      qestiontitle.classList.add('qestion-which__title');

      let correctAnswer = data.question.answers.filter((el) => el.id === data.question.correctAnswerId)[0];

      qestiontitle.innerHTML = LocaleProvider.getLocale('gameQuestionType2') + '<b>' + correctAnswer.author[LocaleProvider.getLocale('localeName')]  + '?</b>';

      qestionContainer.append(qestiontitle);

      this.rootEl.append(answersGrid);
      this.rootEl.append(qestionContainer);
    }
  }

  hide() {
    this.rootEl.classList.add('qestion-card_hidden');
  }

  setActive() {
    this.rootEl.classList.add('qestion-card_active');
  }

  render() {
    return this.rootEl;
  }
}

module.exports = QuestionCard;
