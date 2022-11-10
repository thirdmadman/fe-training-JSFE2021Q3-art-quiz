export default class PathBus {
  static data = {};

  static path = null;

  static callbacksArray = [];

  static setCurrentPath(path, data = {}) {
    PathBus.path = path;
    window.location.hash = path;
    PathBus.callbacksArray.forEach((callback) => {
      callback(path, data);
    });
  }

  static getCurrentPath() {
    return PathBus.path;
  }

  static getRealCurrentPath() {
    return window.location.hash.slice(1);
  }

  static addPathChangeListener(callback) {
    PathBus.callbacksArray.push(callback);
  }
}
