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
    // let disclaimer = document.createElement('div');
    // disclaimer.classList.add('disclaimer');
    // disclaimer.innerHTML = 'Here my design idea https://www.figma.com/file/5iJ4kCjiuJEOJhNNwHNG4K<br><br>';

    // disclaimer.innerHTML += "Please, take note, that in sidebar there are lang switch buttons. Language switch feature works.<br><br>"
    // disclaimer.innerHTML +=
    //   '2021-11-24T12:54:45.907Z Still in progress. Implementing "game" routes and qustion cards, switching languages. Recomend to press "Clear game data" due src JSON format updates<br>';
    // disclaimer.innerHTML += '2021-11-24T15:43:39.878Z Added Question varion popup on qustion type "which is"<br>';
    // disclaimer.innerHTML += '2021-11-24T18:41:58.518Z Added basic answers check, need impl next level switch and data saving to virtual DB';

    // let closeButton = document.createElement('button');
    // closeButton.classList.add('disclaimer__button-close');
    // closeButton.innerText = 'Close';
    // closeButton.onclick = () => {
    //   disclaimer.classList.add('disclaimer_hidden');
    // };

    // let clearButton = document.createElement('button');
    // clearButton.classList.add('disclaimer__button-clear');
    // clearButton.innerText = 'Clear game data';
    // clearButton.onclick = () => {
    //   DataLocalStorageProvider.destroy();
    //   location.reload(true);
    // };
    // disclaimer.append(clearButton);
    // disclaimer.append(closeButton);

    // document.body.append(disclaimer);

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
