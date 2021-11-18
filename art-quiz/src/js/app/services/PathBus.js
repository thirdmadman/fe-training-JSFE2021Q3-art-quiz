class PathBus {

  static data = {};
  static path = null;
  static callbacksArray = [];

  static setCurrentPath(path) {
    PathBus.path = path;
    location.hash = path;
    // console.log('PathBus.path = ' + PathBus.path);
    // console.log('location.hash = ' + location.hash);
    PathBus.callbacksArray.forEach(callback => {
      callback();
    });
  }

  static getCurrentPath() {
    return PathBus.path;
  }

  static addPathChangeListener(callback) {
    PathBus.callbacksArray.push(callback);
  }
}

module.exports = PathBus