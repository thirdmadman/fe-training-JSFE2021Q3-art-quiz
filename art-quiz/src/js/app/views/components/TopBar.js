class TopBar {
  constructor() {
    this.dataPalaceholder = {
      title: 'Art-Quiz.',
      isSmall: false,
    };
    
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('top-bar');

    this.menuButton = document.createElement('div');
    this.menuButton.classList.add('burger-menu');

    this.title = document.createElement('div');
    this.title.classList.add('top-bar__title');

    this.rootEl.appendChild(this.menuButton);
    this.rootEl.appendChild(this.title);
  }

  setData(data) {
    (data && Object.keys(data).length >= 1) ? this.data = data : this.data = this.dataPalaceholder;
    this.title.textContent = this.data.title;
    this.data.isSmall ? this.rootEl.classList.add('top-bar_s') : null;
  }


  render() {
    return this.rootEl;
  }
}

module.exports = TopBar;