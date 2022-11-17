export default class Level {
  id = -1;

  imageSrc = null;

  text = null;

  isLocked = true;

  questions = null;

  constructor(id) {
    this.id = id;
  }

  getImageSrc() {
    return this.imageSrc;
  }

  setImageSrc(value) {
    this.imageSrc = value;
  }

  getId() {
    return this.id;
  }

  getQuestions() {
    return this.questions;
  }

  setQuestions(value) {
    this.questions = value;
  }

  getText() {
    return this.text;
  }

  setText(value) {
    this.text = value;
  }

  getIsLocked() {
    return this.isLocked;
  }

  setIsLocked(value) {
    this.isLocked = value;
  }

  getQuestionsNumber() {
    return this.questions.length;
  }

  getQuestionsAnsweredNumber() {
    return this.questions.filter((question) => question.userAnswer !== null).length;
  }

  getNumberOfAnsweredQuestions() {
    const userAnswers = this.questions.map((question) => question.getUserAnswer());
    return userAnswers.reduce((acc, curr) => (curr !== null ? acc + 1 : acc), 0);
  }

  getNumberOfCorrectAnsweredQuestions() {
    const userAnswersIsCorrect = this.questions.map((question) => question.isUserAnswerCorrect());
    const userCorrectAnswersCount = userAnswersIsCorrect.filter((isCorrect) => isCorrect !== null && isCorrect).length;
    return userCorrectAnswersCount;
  }
}
