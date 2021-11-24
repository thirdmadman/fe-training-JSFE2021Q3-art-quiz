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
    let disclaimer = document.createElement('div');
    disclaimer.classList.add('disclaimer');
    disclaimer.innerHTML =
      'Hello! I have done big part of job (generation of virtual DB, Models, Controllers, Repositories, Services, some Views and only one query selector - "app" div) but most ahead. Could you pleas wait, [crosscheck deadline] - 6 hours. I will try again my best, and log changes maybe in console or right here!<br>Here my design idea https://www.figma.com/file/5iJ4kCjiuJEOJhNNwHNG4K<br><br>2021-11-24T12:54:45.907Z Still in progress. Implementing "game" routes and qustion cards, switching languages. Recomend to press "Clear game data" due src JSON format updates';
    let closeButton = document.createElement('button');
    closeButton.classList.add('disclaimer__button-close');
    closeButton.innerText = 'Close';
    closeButton.onclick = () => {
      disclaimer.classList.add('disclaimer_hidden');
    };

    let clearButton = document.createElement('button');
    clearButton.classList.add('disclaimer__button-clear');
    clearButton.innerText = 'Clear game data';
    clearButton.onclick = () => {
      DataLocalStorageProvider.destroy();
      location.reload(true);
    };
    disclaimer.append(clearButton);
    disclaimer.append(closeButton);
    
    document.body.append(disclaimer);

    //DataLocalStorageProvider.destroy();
    //PathBus.setCurrentPath('/main/loading', {title: 'hello!'});
    if (DataLocalStorageProvider.isEmpty()) {
      fetch(AppGlobalConfigs.defaultStaticJsonSrcPath)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
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
