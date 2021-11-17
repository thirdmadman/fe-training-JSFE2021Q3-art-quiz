class TopBar {
  constructor(data) {

    this.dataPalaceholder = {
      title: 'Art-Quiz.',
    };
    

    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('top-bar');

    this.menuButton = document.createElement('div');
    this.menuButton.classList.add('burger-menu');

    this.title = document.createElement('div');
    this.title.classList.add('top-bar__title');

    this.rootEl.appendChild(this.menuButton);
    this.rootEl.appendChild(this.title);

    this.setData(data);
  }

  setData(data) {
    (data && Object.keys(data).length >= 1) ? this.data = data : this.data = this.dataPalaceholder;
    this.title.textContent = this.data.title;
  }


  render() {
    return this.rootEl;
  }
}

module.exports = TopBar;