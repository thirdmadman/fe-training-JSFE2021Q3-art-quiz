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

    PathBus.addPathChangeListener(() => {
      this.resolve(PathBus.getCurrentPath());
    });
  }

  resolve(path) {
    this.routes.forEach((route) => {
      if (route.path === '/' + path.split('/')[1]) {
        route.controller.resolve(path.replace(route.path, ''));
      }
    });
  }

  addRoute(route, controller) {
    this.routes.push({ path: route, controller: controller });
  }
}

module.exports = Router;
