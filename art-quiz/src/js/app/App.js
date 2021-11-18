const Main = require('./views/Main.js');

const UserSettings = require('./Models/UserSettings');

class App {
  constructor(className) {
    this.className = className;
    this.rootEl = document.getElementsByClassName(className)[0];
    this.main = new Main();
    this.userSettings = new UserSettings();
  }

  setCurrentViev(view) {
    this.rootEl.innerHTML = '';
    //console.log(this.rootEl.innerHTML, this.rootEl);
    this.rootEl.append(view.render());
  }

  run() {
    //console.log(this.userSettings.toJSON())
    this.setCurrentViev(this.main);
  }
}


module.exports = App;