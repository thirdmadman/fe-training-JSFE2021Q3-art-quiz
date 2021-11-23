class PathBus {

  static data = {};
  static path = null;
  static callbacksArray = [];

  static setCurrentPath(path, data = {}) {
    PathBus.path = path;
    location.hash = path;
    // console.log('PathBus.path = ' + PathBus.path);
    // console.log('location.hash = ' + location.hash);
    // console.log(PathBus.callbacksArray);
    PathBus.callbacksArray.forEach(callback => {
      callback(path,data);
    });
  }

  static getCurrentPath() {
    return PathBus.path;
  }

  static getRealCurrentPath() {
    return location.hash.slice(1);
  }

  static addPathChangeListener(callback) {
    PathBus.callbacksArray.push(callback);
  }
}

module.exports = PathBus