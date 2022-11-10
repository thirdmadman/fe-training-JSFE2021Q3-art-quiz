import LocaleProvider from '../../../services/LocaleProvider';
import PathBus from '../../../services/PathBus';
import AppGlobalConfigs from '../../../AppGlobalConfigs';
import Question from '../../../Models/Question';

export default class QuestionCard {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('question-card');
  }

  setData(data) {
    const { question } = data.question;

    const shuffleArray = (array) => {
      const tmpArray = [...array];
      for (let i = tmpArray.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = tmpArray[i];
        tmpArray[i] = tmpArray[j];
        tmpArray[j] = tmp;
      }
      return tmpArray;
    };

    const createAnswerWhoisCards = (answersArray, dataObj) => {
      return answersArray.map((answerModel) => {
        const { questionPopup } = dataObj;

        const answerEl = document.createElement('div');
        answerEl.classList.add('question-card_answer');
        answerEl.innerText = answerModel.getAuthor()[LocaleProvider.getLocale('localeName')];

        answerEl.onclick = () => {
          questionPopup.setData({ answer: answerModel, question: dataObj.question });
          questionPopup.show();
        };
        return answerEl;
      });
    };

    const createAnswerWhichCards = (answersArray, dataObj) => {
      return answersArray.map((answerModel) => {
        const { variantPopup } = dataObj;

        const answerEl = document.createElement('div');
        answerEl.classList.add('question-which_answer');

        const answersImage = document.createElement('img');
        answersImage.alt = LocaleProvider.getLocale('gameQuestionType2');
        answersImage.src = answerModel.getImageSrc();

        answerEl.onclick = () => {
          variantPopup.setData({ answer: answerModel, question: dataObj.question, questionPopup: dataObj.questionPopup });
          variantPopup.show();
        };

        answerEl.append(answersImage);

        return answerEl;
      });
    };

    if (question.getQuestionType() === Question.QuestionTypes.Whois) {
      this.rootEl.classList.add('question-whois');

      const questionContainer = document.createElement('div');
      questionContainer.classList.add('question-card__question');
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('question-card__image');

      const questionImage = document.createElement('img');
      questionImage.src = question.getImageSrc();
      questionImage.alt = LocaleProvider.getLocale('gameQuestionType1');

      const questionTitle = document.createElement('div');
      questionTitle.classList.add('question-card__title');
      questionTitle.innerText = LocaleProvider.getLocale('gameQuestionType1');

      const answersGrid = document.createElement('div');
      answersGrid.classList.add('question-card_answers-grid');

      const ansewersCards = createAnswerWhoisCards(question.getAnswers(), data);
      shuffleArray(ansewersCards).forEach((el) => answersGrid.append(el));

      imageContainer.append(questionImage);

      questionContainer.append(imageContainer);
      questionContainer.append(questionTitle);

      this.rootEl.append(questionContainer);
      this.rootEl.append(answersGrid);
    } else if (question.getQuestionType() === Question.QuestionTypes.WhichIs) {
      this.rootEl.classList.add('question-which');
      const answersGrid = document.createElement('div');
      answersGrid.classList.add('question-which_answers-grid');

      const ansewersCards = createAnswerWhichCards(question.getAnswers(), data);
      shuffleArray(ansewersCards).forEach((el) => answersGrid.append(el));

      const questionContainer = document.createElement('div');
      questionContainer.classList.add('question-which__question');

      const questiontitle = document.createElement('div');
      questiontitle.classList.add('question-which__title');

      const correctAnswer = question.getAnswers().filter((el) => el.getId() === question.getCorrectAnswerId())[0];

      questiontitle.innerHTML = `${LocaleProvider.getLocale('gameQuestionType2')}<b>${
        correctAnswer.getAuthor()[LocaleProvider.getLocale('localeName')]
      }?</b>`;

      questionContainer.append(questiontitle);

      this.rootEl.append(answersGrid);
      this.rootEl.append(questionContainer);
    }

    // eslint-disable-next-line no-param-reassign
    data.questionPopup.buttonNext.onclick = () => {
      data.questionPopup.hide();
      if (question.getNumber() < AppGlobalConfigs.getQuestionsPerLevel()) {
        const currentPath = `/game/level/${question.getLevelId()}/question/${parseInt(question.getNumber(), 10) + 1}`;
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
