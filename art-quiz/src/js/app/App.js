const UserSettings = require('./Models/UserSettings');

const PathBus = require('./services/PathBus');
const Router = require('./services/Router');
const MainController = require('./controllers/MainController');
const GameController = require('./controllers/GameController');
const DataLocalStorageProvider = require('./services/DataLocalStorageProvider');

const AppGlobalConfigs = require('./AppGlobalConfigs');

class App {
  constructor(className) {
    this.className = className;
    this.rootEl = document.getElementsByClassName(className)[0];
    this.userSettings = new UserSettings();
    this.router = new Router();
    this.mainController = new MainController(this.rootEl);
    this.gameController = new GameController(this.rootEl);

    this.router.addRoute('/main', this.mainController);
    this.router.addRoute('/game', this.gameController);
  }

  run() {
    if (DataLocalStorageProvider.isEmpty()) {
      fetch(AppGlobalConfigs.defaultStaticJsonSrcPath)
        .then((response) => response.json())
        .then((result) => {
          DataLocalStorageProvider.srcData = result;
          PathBus.setCurrentPath('/main/levels');
        });
    } else {
      if (!PathBus.getRealCurrentPath() || PathBus.getRealCurrentPath() === '') {
        PathBus.setCurrentPath('/main/levels');
      } else {
        PathBus.setCurrentPath(PathBus.getRealCurrentPath());
      }
    }
  }
}

module.exports = App;
