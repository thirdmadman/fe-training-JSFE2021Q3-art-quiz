const SideBar = require('../views/components/SideBar.js');
const TopBar = require('../views/components/main/TopBar.js');
const LevelsList = require('../views/components/main/LevelsList.js');
const Score = require('../views/components/main/Score.js');
const Settings = require('../views/components/main/Settings.js');
const About = require('../views/components/main/About');

const PathBus = require('../services/PathBus');

class MainController {

  constructor(parentElement) {
    this.parentElement = parentElement;

    //this.data = data;

    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('container');

    this.sidebar = new SideBar();
    this.sidebar.setData({
      separatortext: 'CREATE TEST DEPLOY BE SMART',
      menu: [
        {
          text: 'Levels',
          action: () => {PathBus.setCurrentPath('/main/levels')},
        },
        {
          text: 'Score',
          action: () => {PathBus.setCurrentPath('/main/score')},
        },
        {
          text: 'Settings',
          action: () => PathBus.setCurrentPath('/main/settings'),
        },
        {
          text: 'About',
          action: () => PathBus.setCurrentPath('/main/about'),
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
    this.sidebar.hide();
    this.rootEl.append(this.page);

    this.sidebar.buttonClose.onclick = () => {
      this.sidebar.hide();
    };
    this.topBar.menuButton.onclick = () => {
      this.sidebar.show();
    };

    this.parentElement.innerHTML = '';
    this.parentElement.append(this.rootEl);

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


  resolve(path) {

    this.switchView(path.slice(1));

    console.log(path);
  }
}

module.exports = MainController;