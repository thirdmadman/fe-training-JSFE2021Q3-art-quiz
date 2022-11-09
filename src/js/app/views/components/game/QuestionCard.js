const LocaleProvider = require('../../../services/LocaleProvider');

const PathBus = require('../../../services/PathBus');
const AppGlobalConfigs = require('../../../AppGlobalConfigs');

const Question = require('../../../Models/Question');

class QuestionCard {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('question-card');
  }

  shuffleArray(array) {
    const tmpArray = [...array];
    for (let i = tmpArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = tmpArray[i];
      tmpArray[i] = tmpArray[j];
      tmpArray[j] = tmp;
    }
    return tmpArray;
  }

  createAnswerWhoisCards(answersArray, data) {
    return answersArray.map((answer) => {
      let answerEl = document.createElement('div');
      answerEl.classList.add('question-card_answer');
      answerEl.innerText = answer.author[LocaleProvider.getLocale('localeName')];

      answerEl.onclick = () => {
        data.questionPopup.setData({answer: answer, question: data.question});
        data.questionPopup.show();
      };
      return answerEl;
    });
  }

  createAnswerWhichCards(answersArray, data) {
    return answersArray.map((answer) => {
      let answerEl = document.createElement('div');
      answerEl.classList.add('question-which_answer');

      let answersImage = document.createElement('img');
      answersImage.alt = LocaleProvider.getLocale('gameQuestionType2');
      answersImage.src = answer.imageSrc;

      answerEl.onclick = () => {
        data.variantPopup.setData({answer: answer, question: data.question, questionPopup: data.questionPopup});
        data.variantPopup.show();
      };

      answerEl.append(answersImage);

      return answerEl;
    });
  }

  setData(data) {
    if (data.question.questionType === Question.QuestionTypes.Whois) {
      this.rootEl.classList.add('question-whois');

      let questionContainer = document.createElement('div');
      questionContainer.classList.add('question-card__question');
      let imageContainer = document.createElement('div');
      imageContainer.classList.add('question-card__image');

      let questionImage = document.createElement('img');
      questionImage.src = data.question.imageSrc;
      questionImage.alt = LocaleProvider.getLocale('gameQuestionType1');

      let questionTitle = document.createElement('div');
      questionTitle.classList.add('question-card__title');
      questionTitle.innerText = LocaleProvider.getLocale('gameQuestionType1');

      let answersGrid = document.createElement('div');
      answersGrid.classList.add('question-card_answers-grid');

      const ansewersCards = this.createAnswerWhoisCards(data.question.answers, data);
      this.shuffleArray(ansewersCards).forEach((el) => answersGrid.append(el));

      imageContainer.append(questionImage);

      questionContainer.append(imageContainer);
      questionContainer.append(questionTitle);

      this.rootEl.append(questionContainer);
      this.rootEl.append(answersGrid);
    } else if (data.question.questionType === Question.QuestionTypes.WhichIs) {
      this.rootEl.classList.add('question-which');
      let answersGrid = document.createElement('div');
      answersGrid.classList.add('question-which_answers-grid');

      const ansewersCards = this.createAnswerWhichCards(data.question.answers, data);
      this.shuffleArray(ansewersCards).forEach((el) => answersGrid.append(el));

      let questionContainer = document.createElement('div');
      questionContainer.classList.add('question-which__question');

      let questiontitle = document.createElement('div');
      questiontitle.classList.add('question-which__title');

      let correctAnswer = data.question.answers.filter((el) => el.id === data.question.correctAnswerId)[0];

      questiontitle.innerHTML = LocaleProvider.getLocale('gameQuestionType2') + '<b>' + correctAnswer.author[LocaleProvider.getLocale('localeName')] + '?</b>';

      questionContainer.append(questiontitle);

      this.rootEl.append(answersGrid);
      this.rootEl.append(questionContainer);
    }

    data.questionPopup.buttonNext.onclick = () => {
      data.questionPopup.hide();
      if (data.question.number < AppGlobalConfigs.questionsPerLevel) {
        const currentPath = `/game/level/${data.question.levelId}/question/${parseInt(data.question.number) + 1}`;
        PathBus.setCurrentPath(currentPath);
      }
    };
  }

  hide() {
    this.rootEl.classList.add('question-card_hidden');
  }

  setActive() {
    this.rootEl.classList.add('question-card_active');
  }

  render() {
    return this.rootEl;
  }
}

module.exports = QuestionCard;
