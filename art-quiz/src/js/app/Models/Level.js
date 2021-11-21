class Level {
  _questions = null;

  _isLocked = true;

  _id = -1;
  _imgSrc = null;

  get imgSrc() {
    return this._imgSrc;
  }
  set imgSrc(value) {
    this._imgSrc = value;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get questions() {
    return this._questions;
  }
  set questions(value) {
    this._questions = value;
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
    return this._questions.filter(question => question.userAnswer !== null).length
  }
}

module.exports = Level;