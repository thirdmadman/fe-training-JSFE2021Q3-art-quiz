const Main = require('./views/Main.js');

class App {
  constructor(className) {
    this.className = className;
    this.rootEl = document.getElementsByClassName(className)[0];
    this.main = new Main();
  }

  setCurrentViev(view) {
    this.rootEl.innerHTML = '';
    console.log(this.rootEl.innerHTML, this.rootEl);
    this.rootEl.append(view.render());
  }

  run() {
    this.setCurrentViev(this.main);
  }
}


module.exports = App;