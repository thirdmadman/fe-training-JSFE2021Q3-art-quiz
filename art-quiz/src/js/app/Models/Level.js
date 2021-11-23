class Level {

  _id = -1;

  _imageSrc = null;
  _text = null;
  _isLocked = true;
  _questions = null;



  constructor(id) {
    this._id = id;
  }

  get imageSrc() {
    return this._imageSrc;
  }
  set imageSrc(value) {
    this._imageSrc = value;
  }

  get id() {
    return this._id;
  }
  // set id(value) {
  //   this._id = value;
  // }

  get questions() {
    return this._questions;
  }
  set questions(value) {
    this._questions = value;
  }

  get text() {
    return this._text;
  }
  set text(value) {
    this._text = value;
  }

  
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(value) {
    this._isLocked = value;
  }

  get questionsNumber() {
    return this._questions.length
  }

  get questionsAnsweredNumber() {
    return this._questions.filter(question => (question.userAnswer !== null )).length
  }
}

module.exports = Level;