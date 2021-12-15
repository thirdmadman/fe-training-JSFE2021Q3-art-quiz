class Loading {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('loading');
    this.rootEl.innerText = 'Loading...';
  }
  render() {
    return this.rootEl;
  }
}

module.exports = Loading;
