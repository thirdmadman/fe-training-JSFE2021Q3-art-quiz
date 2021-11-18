const UserSettings = require('./Models/UserSettings');

const PathBus = require('./services/PathBus');
const Router = require('./services/Router');
const MainController = require('./controllers/MainController');
const GameController = require('./controllers/GameController');

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
    PathBus.setCurrentPath('/main/levels');
    // this.setCurrentViev(this.main);
  }
}

module.exports = App;
