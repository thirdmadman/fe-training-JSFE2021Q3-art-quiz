import PathBus from './PathBus';

export default class Router {
  routes = [];

  constructor() {
    window.addEventListener(
      'hashchange',
      () => {
        if (window.location.hash.slice(1) !== PathBus.getCurrentPath()) {
          PathBus.setCurrentPath(window.location.hash.slice(1));
        }
      },
      false,
    );

    PathBus.addPathChangeListener((path, data) => {
      this.resolve(path, data);
    });
  }

  resolve(path, data) {
    this.routes.forEach((route) => {
      if (route.path === `/${path.split('/')[1]}`) {
        route.controller.resolve(path.replace(route.path, ''), data);
      }
    });
  }

  addRoute(route, controller) {
    this.routes.push({ path: route, controller });
  }
}
