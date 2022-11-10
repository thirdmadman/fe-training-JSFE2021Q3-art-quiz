import SideBar from '../views/components/SideBar';
import TopBar from '../views/components/TopBar';
import LevelsList from '../views/LevelsList';
import Score from '../views/Score';
import Settings from '../views/Settings';
import About from '../views/About';
import Loading from '../views/Loading';
import PathBus from '../services/PathBus';
import LevelRepository from '../repository/LevelRepository';
import LocaleProvider from '../services/LocaleProvider';

export default class MainController {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('container');

    this.sidebar = new SideBar();

    this.generateSidebarData();

    this.page = document.createElement('div');
    this.page.classList.add('main-page');

    this.topBar = new TopBar();
    this.topBar.setData({ title: `${LocaleProvider.getLocale('levelsTitle')}.` });
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
    const sidebarData = {
      separatorText: LocaleProvider.getLocale('sidebarMotto'),
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

    this.sidebar.setData(sidebarData);
  }

  viewLevels() {
    this.levelsListView.setData({ levelsList: LevelRepository.getAll() });
    this.currentView = this.levelsListView.render();
    this.topBar.setData({ title: `${LocaleProvider.getLocale('levelsTitle')}.` });
    this.generateSidebarData();
  }

  viewSettings() {
    this.currentView = this.settingsView.render();
    this.topBar.setData({ title: `${LocaleProvider.getLocale('settingsTitle')}.` });
    this.generateSidebarData();
  }

  viewScore() {
    this.levelsListView.setData({ levelsList: LevelRepository.getAll() });
    this.currentView = this.scoreView.render();
    this.topBar.setData({ title: `${LocaleProvider.getLocale('scoreTitle')}.` });
    this.generateSidebarData();
  }

  viewAbout() {
    this.currentView = this.aboutView.render();
    this.topBar.setData({ title: `${LocaleProvider.getLocale('aboutTitle')}.` });
    this.generateSidebarData();
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
      default: {
        break;
      }
    }
    if (!isPageLoading) {
      this.page.append(this.topBarEl);
      this.page.append(this.currentView);
      this.sidebar.hide();
    }
  }
}
