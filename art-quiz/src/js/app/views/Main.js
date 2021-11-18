const SideBar = require('./components/SideBar.js');
const TopBar = require('./components/main/TopBar.js');
const LevelsList = require('./components/main/LevelsList.js');
const Score = require('./components/main/Score.js');
const Settings = require('./components/main/Settings.js');
const About = require('./components/main/About.js');

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
          action: () => this.switchView('levels'),
        },
        {
          text: 'Score',
          action: () => this.switchView('score'),
        },
        {
          text: 'Settings',
          action: () => this.switchView('settings'),
        },
        {
          text: 'About',
          action: () => this.switchView('about'),
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

    this.topBar = new TopBar({ title: 'levels.' });
    this.topBarEl = this.topBar.render();

    this.levelsListView = new LevelsList();
    this.scoreView = new Score();
    this.settingsView = new Settings();
    this.aboutView = new About();

    this.currentView = this.levelsListView.render();

    this.page.append(this.topBarEl);
    this.page.append(this.currentView);

    this.rootEl.append(this.sidebar.render());
    //this.sidebar.hide();
    this.rootEl.append(this.page);

    this.sidebar.buttonClose.onclick = () => {
      this.sidebar.hide();
    };
    this.topBar.menuButton.onclick = () => {
      this.sidebar.show();
    };

    this.views = {
      levels: this.levelsListView,
      score: this.scoreView,
      settings: this.settingsView,
      about: this.aboutView,
    };

    this.viewsName = {
      levels: 'Levels.',
      score: 'Score.',
      settings: 'Settings.',
      about: 'About.',
    };
  }

  switchView(viewName) {
    this.page.innerHTML = '';
    this.currentView = this.views[viewName].render();
    this.topBar.setData({title: this.viewsName[viewName]})
    this.page.append(this.topBarEl);
    this.page.append(this.currentView);
    this.sidebar.hide();


  }

  render() {
    return this.rootEl;
  }
}

module.exports = Main;
