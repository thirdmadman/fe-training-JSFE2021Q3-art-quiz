const Main = require('../views/Main')


class MainController {

  constructor(parentElement) {
    this.parentElement = parentElement;

    this.mainView = new Main();
  }

  resolve(path) {

    this.parentElement.innerHTML = '';
    this.parentElement.append(this.mainView.render());

    console.log(path);
  }
}

module.exports = MainController;