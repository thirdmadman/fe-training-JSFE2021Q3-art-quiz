const SideBar = require('./components/SideBar.js');
const TopBar = require('./components/TopBar.js');
const LevelsList = require('./components/LevelsList.js');


class Main {

  constructor(data) {
    this.data = data;

    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('container');

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


    

    this.page = document.createElement('div');
    this.page.classList.add('main-page');

    this.topBar = new TopBar({title: 'levels.'});

    this.levelsList = new LevelsList();

    this.page.append(this.topBar.render());
    this.page.append(this.levelsList.render());

    this.rootEl.append(this.sidebar.render());
    this.sidebar.hide();
    this.rootEl.append(this.page);

    this.sidebar.buttonClose.onclick = () => {this.sidebar.hide();};
    this.topBar.menuButton.onclick = () => {this.sidebar.show();};
  }

  render() {
    return this.rootEl;
  }
}

module.exports = Main;