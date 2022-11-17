import SideBar from '../views/components/SideBar';
import TopBar from '../views/components/TopBar';
import LevelsList from '../views/LevelsList';
import Score from '../views/Score';
import Settings from '../views/Settings';
import About from '../views/About';
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

    this.currentView = document.createElement('div');

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

  generateSidebarData(currentPath) {
    const sidebarData = {
      separatorText: LocaleProvider.getLocale('sidebarMotto'),
      currentPath: `/main${currentPath}`,
      menu: [
        {
          text: LocaleProvider.getLocale('levelsTitle'),
          path: '/main/levels',
          action: PathBus.setCurrentPath,
        },
        {
          text: LocaleProvider.getLocale('scoreTitle'),
          path: '/main/score',
          action: PathBus.setCurrentPath,
        },
        {
          text: LocaleProvider.getLocale('settingsTitle'),
          path: '/main/settings',
          action: PathBus.setCurrentPath,
        },
        {
          text: LocaleProvider.getLocale('aboutTitle'),
          path: '/main/about',
          action: PathBus.setCurrentPath,
        },
      ],
      fastLangSw: [
        {
          text: 'eng',
          action: () => {
            LocaleProvider.setCurrentLocale(0);
            PathBus.setCurrentPath(PathBus.getCurrentPath());
          },
        },
        {
          text: 'ru',
          action: () => {
            LocaleProvider.setCurrentLocale(1);
            PathBus.setCurrentPath(PathBus.getCurrentPath());
          },
        },
      ],
    };

    this.sidebar.setData(sidebarData);
  }

  rewriteView(el) {
    this.currentView.innerHTML = '';
    this.currentView.append(el);
  }

  viewLevels() {
    LevelRepository.getAll().then((result) => {
      this.levelsListView.setData({ levelsList: result });
    });
    this.rewriteView(this.levelsListView.render());
    this.topBar.setData({ title: `${LocaleProvider.getLocale('levelsTitle')}.` });
  }

  viewSettings() {
    this.rewriteView(this.settingsView.render());
    this.topBar.setData({ title: `${LocaleProvider.getLocale('settingsTitle')}.` });
  }

  viewScore() {
    LevelRepository.getAll().then((result) => this.scoreView.setData({ levelsList: result }));
    this.rewriteView(this.scoreView.render());
    this.topBar.setData({ title: `${LocaleProvider.getLocale('scoreTitle')}.` });
  }

  viewAbout() {
    this.rewriteView(this.aboutView.render());
    this.topBar.setData({ title: `${LocaleProvider.getLocale('aboutTitle')}.` });
  }

  resolve(path) {
    this.parentElement.innerHTML = '';
    this.parentElement.append(this.rootEl);
    this.generateSidebarData(path);
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
      default: {
        break;
      }
    }
  }
}
