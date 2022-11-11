import LocaleProvider from '../../../services/LocaleProvider';
import UserAnswerRepository from '../../../repository/UserAnswerRepository';
import UserAnswer from '../../../Models/UserAnswer';

export default class QuestionPopup {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('overlay');
    this.rootEl.classList.add('overlay_blur');

    this.popupContainer = document.createElement('div');
    this.popupContainer.classList.add('question-popup');

    this.buttonNext = document.createElement('button');
    this.buttonNext.classList.add('question-popup__button');

    this.rootEl.append(this.popupContainer);
  }

  setData(data) {
    const { answer, question, startTime } = data;

    const saveAnswer = (answerModel, questionModel) => {
      const userAnswer = new UserAnswer(-1);
      userAnswer.setAnswerDate(new Date().toISOString());
      userAnswer.setAnswerId(answerModel.getId());
      userAnswer.setQuestionId(questionModel.getId());
      userAnswer.setThinkingTime(new Date().getTime() - startTime);
      UserAnswerRepository.setUserAnswer(userAnswer);
    };

    saveAnswer(answer, question);

    const popupResult = document.createElement('div');
    popupResult.classList.add('question-popup__result');

    this.buttonNext.textContent = LocaleProvider.getLocale('gameNextButtonTitle');

    const popupResultDescription = document.createElement('div');
    popupResultDescription.classList.add('question-popup__result-description');

    if (question.getCorrectAnswerId() === answer.getId()) {
      popupResult.innerText = LocaleProvider.getLocale('gameAnswerCorrect');

      const pictureName = document.createElement('div');
      pictureName.classList.add('question-popup__desc-pair');
      pictureName.innerText = LocaleProvider.getLocale('gamePictureNameTitle');
      const pictureNameText = document.createElement('p');
      pictureNameText.innerText = `"${answer.getName()[LocaleProvider.getLocale('localeName')]}"`;
      pictureName.append(pictureNameText);

      const madeBy = document.createElement('div');
      madeBy.classList.add('question-popup__desc-pair');
      madeBy.innerText = LocaleProvider.getLocale('gameMadeByTitle');
      const madeByText = document.createElement('p');
      madeByText.innerText = answer.getAuthor()[LocaleProvider.getLocale('localeName')];
      madeBy.append(madeByText);

      const year = document.createElement('div');
      year.classList.add('question-popup__desc-pair');
      year.innerText = LocaleProvider.getLocale('gameYearTitle');
      const yearText = document.createElement('p');
      yearText.innerText = answer.getYear();
      year.append(yearText);

      popupResultDescription.append(pictureName);
      popupResultDescription.append(madeBy);
      popupResultDescription.append(year);

      popupResult.classList.add('question-popup__result_correct');
    } else {
      popupResult.innerText = LocaleProvider.getLocale('gameAnswerIncorrect');
      popupResult.classList.add('question-popup__result_incorrect');
    }

    this.popupContainer.innerHTML = '';

    this.popupContainer.append(popupResult);
    this.popupContainer.append(popupResultDescription);
    this.popupContainer.append(this.buttonNext);
  }

  hide() {
    this.rootEl.classList.add('overlay_hidden');
  }

  show() {
    this.rootEl.classList.remove('overlay_hidden');
  }

  render() {
    return this.rootEl;
  }
}
