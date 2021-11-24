const LocaleProvider = require('../../../services/LocaleProvider');

class QuestionCard {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('qestion-card');
  }

  setData(data) {
    console.log(data);
    if (data.questionType === 1) {
      this.rootEl.classList.add('qestion-whois');
      

      let questionContainer = document.createElement('div');
      questionContainer.classList.add('qestion-card__question');
      let imageContainer = document.createElement('div');
      imageContainer.classList.add('qestion-card__image');

      let questionImage = document.createElement('img');
      questionImage.src = data.imageSrc;
      questionImage.alt = LocaleProvider.getLocale('gameQuestionType1');

      let questionTitle = document.createElement('div');
      questionTitle.classList.add('qestion-card__title');
      questionTitle.innerText = LocaleProvider.getLocale('gameQuestionType1');

      let answersGrid = document.createElement('div');
      answersGrid.classList.add('qestion-card_answers-grid');

      data.answers.forEach( answer => {
        let answerEl = document.createElement('div');
        answerEl.classList.add('qestion-card_answer');

        answerEl.innerText = answer.author[LocaleProvider.getLocale('localeName')];
        answersGrid.append(answerEl);
      })

      imageContainer.append(questionImage);


      questionContainer.append(imageContainer);
      questionContainer.append(questionTitle);

      this.rootEl.append(questionContainer);
      this.rootEl.append(answersGrid);

    } else if (data.questionType === 2) {
      this.rootEl.classList.add('qestion-which');
      this.rootEl.innerText = LocaleProvider.getLocale('gameQuestionType2');
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
