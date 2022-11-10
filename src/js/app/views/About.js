export default class About {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('about');
    this.rootEl.innerText = 'About';
  }

  render() {
    return this.rootEl;
  }
}
