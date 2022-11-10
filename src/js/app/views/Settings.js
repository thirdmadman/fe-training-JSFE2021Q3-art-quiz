export default class Settings {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('settings');
    this.rootEl.innerText = 'Settings';
  }

  render() {
    return this.rootEl;
  }
}
