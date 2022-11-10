export default class Answer {
  id = -1;

  questionId = -1;

  imageSrc = null;

  author = null;

  name = null;

  year = null;

  constructor(id) {
    this.id = id;
  }

  getQuestionId() {
    return this.questionId;
  }

  setQuestionId(questionId) {
    this.questionId = questionId;
  }

  getId() {
    return this.id;
  }

  getImageSrc() {
    return this.imageSrc;
  }

  setImageSrc(value) {
    this.imageSrc = value;
  }

  getAuthor() {
    return this.author;
  }

  setAuthor(value) {
    this.author = value;
  }

  getName() {
    return this.name;
  }

  setName(value) {
    this.name = value;
  }

  getYear() {
    return this.year;
  }

  setYear(value) {
    this.year = value;
  }
}
