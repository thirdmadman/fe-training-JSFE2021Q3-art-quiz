const UserAnswer = require('./UserAnswer')

class Question {

  _question = null;
  _answers = null;
  _correctAnswer = null;
  _userAnswer = new UserAnswer();


  get question() {
    return this._question;
  }
  set question(value) {
    this._question = value;
  }

  
  get answers() {
    return this._answers;
  }
  set answers(value) {
    this._answers = value;
  }

  
  get correctAnswer() {
    return this._correctAnswer;
  }
  set correctAnswer(value) {
    this._correctAnswer = value;
  }

  
  get userAnswer() {
    return this._userAnswer;
  }
  set userAnswer(value) {
    this._userAnswer = value;
  }



  

  isUserAnswerCorrect() {
    if (this.userAnswer && this.userAnswer.answer === this.correctAnswer) {
      return true;
    }
    return false;
  }

}

module.exports = Question;