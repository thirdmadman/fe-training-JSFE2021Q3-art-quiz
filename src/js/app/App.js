import UserSettings from './Models/UserSettings';
import PathBus from './services/PathBus';
import Router from './services/Router';
import MainController from './controllers/MainController';
import GameController from './controllers/GameController';
import DataLocalStorageProvider from './services/DataLocalStorageProvider';
import AppGlobalConfigs from './AppGlobalConfigs';

export default class App {
  constructor(className) {
    this.className = className;
    this.rootEl = document.getElementsByClassName(className)[0];
    this.userSettings = new UserSettings();
    this.router = new Router();
    this.mainController = new MainController(this.rootEl);
    this.gameController = new GameController(this.rootEl);
  }

  run() {
    this.router.addRoute('/main', this.mainController);
    this.router.addRoute('/game', this.gameController);

    if (!DataLocalStorageProvider.isNotEmpty()) {
      fetch(AppGlobalConfigs.getDefaultStaticJsonSrcPath())
        .then((response) => response.json())
        .then((result) => {
          DataLocalStorageProvider.srcData = result;
          PathBus.setCurrentPath('/main/levels');
        });
      return;
    }

    if (!PathBus.getRealCurrentPath() || PathBus.getRealCurrentPath() === '') {
      PathBus.setCurrentPath('/main/levels');
    } else {
      PathBus.setCurrentPath(PathBus.getRealCurrentPath());
    }
  }
}
