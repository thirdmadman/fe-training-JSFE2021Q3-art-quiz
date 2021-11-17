class UserAnswer {
  _thinkingTime = null;
  _answerDate = null;
  _answer = null;

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
