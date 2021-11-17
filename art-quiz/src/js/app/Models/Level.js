//const Question = require('./Question')

class Level {
  _questions = null;

  _isLocked = true;

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
    return this._questions.filter(question => question.userAnswer.answer).length
  }
}

module.exports = Level;