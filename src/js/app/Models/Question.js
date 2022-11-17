export default class Question {
  id = -1;

  levelId = -1;

  number;

  questionType = null;

  answers = null;

  correctAnswerId = -1;

  userAnswer = null;

  imageSrc = null;

  text = null;

  static QuestionTypes = {
    WhoIs: 1,
    WhichIs: 2,
  };

  constructor(id, levelId) {
    this.id = id;
    this.levelId = levelId;
  }

  getLevelId() {
    return this.levelId;
  }

  setLevelId(value) {
    this.levelId = value;
  }

  getId() {
    return this.id;
  }

  getNumber() {
    return this.number;
  }

  setNumber(value) {
    this.number = value;
  }

  getImageSrc() {
    return this.imageSrc;
  }

  setImageSrc(value) {
    this.imageSrc = value;
  }

  getText() {
    return this.text;
  }

  setText(value) {
    this.text = value;
  }

  getQuestionType() {
    return this.questionType;
  }

  setQuestionType(value) {
    this.questionType = value;
  }

  getAnswers() {
    return this.answers;
  }

  setAnswers(value) {
    this.answers = value;
  }

  getCorrectAnswerId() {
    return this.correctAnswerId;
  }

  setCorrectAnswerId(value) {
    this.correctAnswerId = value;
  }

  getUserAnswer() {
    return this.userAnswer;
  }

  setUserAnswer(value) {
    this.userAnswer = value;
  }

  getCorrectAnswer() {
    return this.answers.filter((answer) => answer.getId() === this.correctAnswerId)[0];
  }

  isUserAnswerCorrect() {
    if (!this.userAnswer) {
      return null;
    }
    return this.userAnswer.getAnswerId() != null && this.userAnswer.getAnswerId() === this.correctAnswerId;
  }
}
