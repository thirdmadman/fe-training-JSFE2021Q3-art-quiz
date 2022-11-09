class UserAnswer {
  _id = -1;

  _answerId = -1;
  _questionId = -1;

  _thinkingTime = null;
  _answerDate = null;

  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  get questionId() {
    return this._questionId;
  }
  set questionId(value) {
    this._questionId = value;
  }

  get answerId() {
    return this._answerId;
  }
  set answerId(value) {
    this._answerId = value;
  }

  get answerDate() {
    return this._answerDate;
  }
  set answerDate(value) {
    this._answerDate = value;
  }

  get thinkingTime() {
    return this._thinkingTime;
  }
  set thinkingTime(value) {
    this._thinkingTime = value;
  }
}

module.exports = UserAnswer;
