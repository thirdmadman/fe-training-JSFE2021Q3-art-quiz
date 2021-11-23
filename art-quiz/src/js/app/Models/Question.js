class Question {
  _id = -1;
  _levelId = -1;

  _number;

  _questionType = null;
  _answers = null;
  _correctAnswerId = -1;
  _userAnswer = null;

  _imageSrc = null;
  _text = null;

  constructor(id, levelId) {
    this._id = id;
    this._levelId = levelId;
  }

  get levelId() {
    return this._levelId;
  }
  set levelId(value) {
    this._levelId = value;
  }

  get id() {
    return this._id;
  }
  // set id(value) {
  //   this._id = value;
  // }

  get number() {
    return this._number;
  }
  set number(value) {
    this._number = value;
  }

  get imageSrc() {
    return this._imageSrc;
  }
  set imageSrc(value) {
    this._imageSrc = value;
  }

  get text() {
    return this._text;
  }
  set text(value) {
    this._text = value;
  }

  get questionType() {
    return this._questionType;
  }
  set questionType(value) {
    this._questionType = value;
  }

  get answers() {
    return this._answers;
  }
  set answers(value) {
    this._answers = value;
  }

  get correctAnswerId() {
    return this._correctAnswerId;
  }
  set correctAnswerId(value) {
    this._correctAnswerId = value;
  }

  get userAnswer() {
    return this._userAnswer;
  }
  set userAnswer(value) {
    this._userAnswer = value;
  }

  isUserAnswerCorrect() {
    if (this.userAnswer.answerid && this.userAnswer.answerId === this.correctAnswerId) {
      return true;
    }
    return false;
  }
}

module.exports = Question;
