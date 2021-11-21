class Question {
  

  _id = -1;
  _levelId = -1;


  _questionType = null;
  _answers = null;
  _correctAnswerId = -1;
  _userAnswer = null;

  _image = null;


  constructor(id,levelId) {
    this._id = id;
    this._levelId = levelId;
  }

  get levelId() {
    return this._levelId;
  }
  // set levelId(value) {
  //   this._levelId = value;
  // }

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


  get questionType() {
    return this._questionType;
  }
  set questionType(value) {
    this._questionType = value;
  }

  
  get answers() {
    return this._answers;
  }
  set answers(value) {
    this._answers = value;
  }

  
  get correctAnswerId() {
    return this._correctAnswerId;
  }
  set correctAnswerId(value) {
    this._correctAnswerId = value;
  }

  
  get userAnswer() {
    return this._userAnswer;
  }
  set userAnswer(value) {
    this._userAnswer = value;
  }



  isUserAnswerCorrect() {
    if (this.userAnswer.answerid && this.userAnswer.answerid === this.correctAnswerId) {
      return true;
    }
    return false;
  }

}

module.exports = Question;