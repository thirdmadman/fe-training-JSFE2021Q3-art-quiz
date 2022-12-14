import UserSettings from './Models/UserSettings';
import PathBus from './services/PathBus';
import Router from './services/Router';
import MainController from './controllers/MainController';
import GameController from './controllers/GameController';
import DataLocalStorageProvider from './services/DataLocalStorageProvider';
import AppGlobalConfigs from './AppGlobalConfigs';
import SettingRepository from './repository/SettingRepository';
import LocaleProvider from './services/LocaleProvider';

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

    DataLocalStorageProvider.isEmpty().then((isEmpty) => {
      if (isEmpty) {
        fetch(AppGlobalConfigs.getDefaultStaticJsonSrcPath())
          .then((response) => response.json())
          .then((result) => {
            DataLocalStorageProvider.srcData = result;
            PathBus.setCurrentPath('/main/levels');
          });
        return;
      }

      SettingRepository.getSettings().then((setting) => {
        LocaleProvider.setCurrentLocale(setting.getLanguage());

        if (!PathBus.getRealCurrentPath() || PathBus.getRealCurrentPath() === '') {
          PathBus.setCurrentPath('/main/levels');
        } else {
          PathBus.setCurrentPath(PathBus.getRealCurrentPath());
        }
      });
    });
  }
}
