export default class UserAnswer {
  id = -1;

  answerId = -1;

  questionId = -1;

  thinkingTime = null;

  answerDate = null;

  constructor(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  getQuestionId() {
    return this.questionId;
  }

  setQuestionId(value) {
    this.questionId = value;
  }

  getAnswerId() {
    return this.answerId;
  }

  setAnswerId(value) {
    this.answerId = value;
  }

  getAnswerDate() {
    return this.answerDate;
  }

  setAnswerDate(value) {
    this.answerDate = value;
  }

  getThinkingTime() {
    return this.thinkingTime;
  }

  setThinkingTime(value) {
    this.thinkingTime = value;
  }
}
