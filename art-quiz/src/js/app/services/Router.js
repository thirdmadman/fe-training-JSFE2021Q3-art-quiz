const PathBus = require('../services/PathBus');

class Router {
  routes = [];

  constructor() {
    window.addEventListener(
      'hashchange',
      () => {
        // console.log(location.hash);
        if (location.hash.slice(1) != PathBus.getCurrentPath()) {
          PathBus.setCurrentPath(location.hash.slice(1));
        }
      },
      false
    );

    PathBus.addPathChangeListener((path, data) => {
      this.resolve(path, data);
    });
  }

  resolve(path, data) {
    // console.log(data);
    // console.log(path);
    this.routes.forEach((route) => {
      if (route.path === '/' + path.split('/')[1]) {
        route.controller.resolve(path.replace(route.path, ''), data);
      }
    });
  }

  addRoute(route, controller) {
    this.routes.push({ path: route, controller: controller });
  }
}

module.exports = Router;
