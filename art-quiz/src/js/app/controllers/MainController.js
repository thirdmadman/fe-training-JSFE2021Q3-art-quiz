const SideBar = require('../views/components/SideBar.js');
const TopBar = require('../views/components/TopBar.js');
const LevelsList = require('../views/LevelsList.js');
const Score = require('../views/Score.js');
const Settings = require('../views/Settings.js');
const About = require('../views/About');
const Loading = require('../views/Loading');

const PathBus = require('../services/PathBus');

const LevelRepository = require('../repository/LevelRepository');

const LocaleProvider = require('../services/LocaleProvider');

class MainController {
  constructor(parentElement) {
    this.parentElement = parentElement;

    //this.data = data;

    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('container');

    this.sidebar = new SideBar();

    this.sidebar.setData(this.generateSidebarData());

    this.page = document.createElement('div');
    this.page.classList.add('main-page');

    this.topBar = new TopBar();
    this.topBar.setData({ title: LocaleProvider.getLocale('levelsTitle') + '.' });
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


  }

  generateSidebarData() {
    return {
      separatortext: LocaleProvider.getLocale('sidebarMoto'),
      menu: [
        {
          text: LocaleProvider.getLocale('levelsTitle'),
          action: () => {
            PathBus.setCurrentPath('/main/levels');
          },
        },
        {
          text: LocaleProvider.getLocale('scoreTitle'),
          action: () => {
            PathBus.setCurrentPath('/main/score');
          },
        },
        {
          text: LocaleProvider.getLocale('settingsTitle'),
          action: () => PathBus.setCurrentPath('/main/settings'),
        },
        {
          text: LocaleProvider.getLocale('aboutTitle'),
          action: () => PathBus.setCurrentPath('/main/about'),
        },
      ],
      fastlangsw: [
        {
          text: 'eng',
          action: () => {
            LocaleProvider.currentLocale = 0;
            PathBus.setCurrentPath(PathBus.getCurrentPath());
          },
        },
        {
          text: 'ru',
          action: () => {
            LocaleProvider.currentLocale = 1;
            PathBus.setCurrentPath(PathBus.getCurrentPath());
          },
        },
      ],
    };
  }

  viewLevels() {
    this.levelsListView.setData({ levelsList: LevelRepository.getAll() });
    this.currentView = this.levelsListView.render();
    this.topBar.setData({ title: LocaleProvider.getLocale('levelsTitle') + '.' });
    this.sidebar.setData(this.generateSidebarData());
  }

  viewSettings() {
    //this.levelsListView.setData();
    this.currentView = this.settingsView.render();
    this.topBar.setData({ title: LocaleProvider.getLocale('settingsTitle') + '.' });
    this.sidebar.setData(this.generateSidebarData());
  }

  viewScore() {
    this.levelsListView.setData({ levelsList: LevelRepository.getAll() });
    this.currentView = this.scoreView.render();
    this.topBar.setData({ title: LocaleProvider.getLocale('scoreTitle') + '.' });
    this.sidebar.setData(this.generateSidebarData());
  }

  viewAbout() {
    //this.levelsListView.setData();
    this.currentView = this.aboutView.render();
    this.topBar.setData({ title: LocaleProvider.getLocale('aboutTitle') + '.' });
    this.sidebar.setData(this.generateSidebarData());
  }

  loading() {
    this.currentView = this.loadingView.render();
    this.page.append(this.currentView);
  }

  resolve(path) {
    this.parentElement.innerHTML = '';
    this.parentElement.append(this.rootEl);

    this.page.innerHTML = '';
    let isPageLoading = false;

    switch (path.slice(1)) {
      case 'levels': {
        this.viewLevels();
        break;
      }
      case 'settings': {
        this.viewSettings();
        break;
      }
      case 'about': {
        this.viewAbout();
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
