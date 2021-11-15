const SideBar = require('./views/components/SideBar.js');

class App {
  constructor(className) {
    this.className = className;
    this.rootEl = document.getElementsByClassName('app')[0];

    this.sidebar = new SideBar();
    this.sidebar.setData({
      separatortext: 'CREATE TEST DEPLOY BE SMART',
      menu: [
        {
          text: 'Levels',
          action: null,
        },
        {
          text: 'Score',
          action: '',
        },
        {
          text: 'Settings',
          action: '',
        },
        {
          text: 'About',
          action: '',
        },
      ],
      fastlangsw: [
        {
          text: 'eng',
          action: '',
        },
        {
          text: 'ru',
          action: '',
        },
      ],
    });
  }

  renderPage(page) {
    this.rootEl.innerHTML = '';
    console.log(this.rootEl.innerHTML, this.rootEl);
    this.rootEl.append(page.render());
  }

  run() {
    this.renderPage(this.sidebar);
  }
}


module.exports = App;