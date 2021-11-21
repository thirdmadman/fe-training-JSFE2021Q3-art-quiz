class Answer {
  
  _id = -1;
  _questionId = -1;

  _image = null;
  _text = null;


  constructor(questionId) {
    this._questionId = questionId;
  }

  get questionId() {
    return this._questionId;
  }

  get id() {
    return this._id;
  }
  // set id(value) {
  //   this._id = value;
  // }

  get image() {
    return this._image;
  }
  set image(value) {
    this._image = value;
  }

  get text() {
    return this._text;
  }
  set text(value) {
    this._text = value;
  }
}

module.exports = Answer;