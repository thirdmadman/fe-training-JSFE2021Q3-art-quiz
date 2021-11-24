class QuestionCard {


  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('qestion-card');
  }

  setData(data) {
    console.log(data);
    if (data.questionType === 0) {
      console.log('questionType === 0');
    }
  }

  
  hide() {
    this.rootEl.classList.add('qestion-card_hidden');
  }

  render() {
    return this.rootEl;
  }

}

module.exports = QuestionCard;