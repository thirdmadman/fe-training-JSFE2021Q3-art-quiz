class QuestionPopup {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('overlay');
  }

  

  render() {
    return this.rootEl;
  }
}

module.exports = QuestionPopup;
