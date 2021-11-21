class UserAnswer {

  _answerid = -1;
  _questionId = -1;

  _thinkingTime = null;
  _answerDate = null;
  _answer = null;
  
  constructor(questionId) {
    this._questionId = questionId;
  }


  get questionId() {
    return this._questionId;
  }
  // set questionId(value) {
  //   this._questionId = value;
  // }

  get answerid() {
    return this._answerid;
  }
  set answerid(value) {
    this._answerid = value;
  }

  get answerDate() {
    return this._answerDate;
  }
  set answerDate(value) {
    this._answerDate = value;
  }

  get answer() {
    return this._answer;
  }
  set answer(value) {
    this._answer = value;
  }

  get thinkingTime() {
    return this._thinkingTime;
  }
  set thinkingTime(value) {
    this._thinkingTime = value;
  }
}

module.exports = UserAnswer;
