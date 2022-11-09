const LocaleProvider = require('../../../services/LocaleProvider');
class QuestionPopup {
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
    let popupResult = document.createElement('div');
    popupResult.classList.add('question-popup__result');

    this.buttonNext.textContent = LocaleProvider.getLocale('gameNextButtonTitle');

    let popupResultDescription = document.createElement('div');
    popupResultDescription.classList.add('question-popup__result-description');

    if (data.question.correctAnswerId === data.answer.id) {
      popupResult.innerText = LocaleProvider.getLocale('gameAnswerCorrect');

      let pictureName = document.createElement('div');
      pictureName.classList.add('question-popup__desc-pair');
      pictureName.innerText = LocaleProvider.getLocale('gamePictureNameTitle');
      let pictureNameText = document.createElement('p');
      pictureNameText.innerText = '"' + data.answer.name[LocaleProvider.getLocale('localeName')] + '"';
      pictureName.append(pictureNameText);

      let madeBy = document.createElement('div');
      madeBy.classList.add('question-popup__desc-pair');
      madeBy.innerText = LocaleProvider.getLocale('gameMadeByTitle');
      let madeByText = document.createElement('p');
      madeByText.innerText = data.answer.author[LocaleProvider.getLocale('localeName')];
      madeBy.append(madeByText);

      let year = document.createElement('div');
      year.classList.add('question-popup__desc-pair');
      year.innerText = LocaleProvider.getLocale('gameYearTitle');
      let yearText = document.createElement('p');
      yearText.innerText = data.answer.year;
      year.append(yearText);

      popupResultDescription.append(pictureName);
      popupResultDescription.append(madeBy);
      popupResultDescription.append(year);

      popupResult.classList.add('question-popup__result_correct');
    } else {
      popupResult.innerText = LocaleProvider.getLocale('gameAnswerUncorrect');
      popupResult.classList.add('question-popup__result_uncorrect');
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

module.exports = QuestionPopup;
