class Answer {
  _id = -1;
  _questionId = -1;

  _imageSrc = null;
  _author = null;
  _name = null;
  _year = null;

  constructor(id) {
    this._id = id;
  }

  get questionId() {
    return this._questionId;
  }

  set questionId(questionId) {
    this._questionId = questionId;
  }

  get id() {
    return this._id;
  }

  get imageSrc() {
    return this._imageSrc;
  }
  set imageSrc(value) {
    this._imageSrc = value;
  }

  get author() {
    return this._author;
  }
  set author(value) {
    this._author = value;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  get year() {
    return this._year;
  }
  set year(value) {
    this._year = value;
  }
}

module.exports = Answer;
