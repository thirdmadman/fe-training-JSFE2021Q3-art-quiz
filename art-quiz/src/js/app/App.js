const UserSettings = require('./Models/UserSettings');

const PathBus = require('./services/PathBus');
const Router = require('./services/Router');
const MainController = require('./controllers/MainController');
const GameController = require('./controllers/GameController');
const DataLocalStorageProvider = require('./services/DataLocalStorageProvider')

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
    DataLocalStorageProvider.destroy();
    PathBus.setCurrentPath('/main/loading');
    if (DataLocalStorageProvider.isEmpty()) {
      fetch('/static/json/imagesTranslated.json')
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        DataLocalStorageProvider.srcData = result;
        PathBus.setCurrentPath('/main/levels');
      });
    }

    // let response = await fetch('/static/json/imagesTranslated.json');
    // let result = await response.json();
    // console.log(result);

    
  }
}

module.exports = App;
