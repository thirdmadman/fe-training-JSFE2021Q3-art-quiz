const SideBar = require('../views/components/SideBar.js');
const TopBar = require('../views/components/main/TopBar.js');
const LevelsList = require('../views/components/main/LevelsList.js');
const Score = require('../views/components/main/Score.js');
const Settings = require('../views/components/main/Settings.js');
const About = require('../views/components/main/About');
const Loading = require('../views/components/main/Loading');

const PathBus = require('../services/PathBus');

const LevelRepository = require('../repository/LevelRepository');

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
          action: () => {
            PathBus.setCurrentPath('/main/levels');
          },
        },
        {
          text: 'Score',
          action: () => {
            PathBus.setCurrentPath('/main/score');
          },
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
          action: () => {
            this.levelsListView.setData({
              levelsList: [
                {
                  imgSrc: '/static/img/jpg/square/0.jpg', // TODO: IMG placeholder here
                  levelTitle: 'Level 1',
                  levelStats: 'Done ?/?',
                  levelId: -1,
                  isLocked: false,
                },
                {
                  imgSrc: '/static/img/jpg/square/0.jpg', // TODO: IMG placeholder here
                  levelTitle: 'Level 2',
                  levelStats: 'Done ?/?',
                  levelId: -1,
                  isLocked: false,
                },
              ],
            });
          },
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
    this.loadingView = new Loading();

    this.currentView = this.loadingView.render();

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
  }

  viewLevels() {
    this.levelsListView.setData({ levelsList: LevelRepository.getAll() });
    this.currentView = this.levelsListView.render();
    this.topBar.setData({ title: 'Levels.' });
  }

  viewSettings() {
    //this.levelsListView.setData();
    this.currentView = this.settingsView.render();
    this.topBar.setData({ title: 'Settings.' });
  }

  viewScore() {
    this.levelsListView.setData({ levelsList: LevelRepository.getAll() });
    this.currentView = this.scoreView.render();
    this.topBar.setData({ title: 'Score.' });
  }

  viewAbout() {
    //this.levelsListView.setData();
    this.currentView = this.aboutView.render();
    this.topBar.setData({ title: 'About.' });
  }

  loading() {
    this.currentView = this.loadingView.render();
    this.page.append(this.currentView);
  }

  resolve(path) {
    this.page.innerHTML = '';
    let isPageLoading = false;

    switch (path.slice(1)) {
      case 'levels': {
        this.viewLevels();
        break;
      }
      case 'settings': {
        break;
      }
      case 'about': {
        break;
      }
      case 'score': {
        this.viewScore();
        break;
      }
      case 'loading': {
        this.loading();
        isPageLoading = true;
        break;
      }
    }
    if (!isPageLoading) {
      this.page.append(this.topBarEl);
      this.page.append(this.currentView);
      this.sidebar.hide();
    }

    console.log(path);
  }
}

module.exports = MainController;
