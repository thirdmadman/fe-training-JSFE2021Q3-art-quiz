class AppGlobalConfigs {

  static _questionsPerLevel = 10;
  static _defaultStaticSquareImagesPath = 'static/img/jpg/square/';
  static _defaultStaticFullImagesPath = 'static/img/jpg/full/';
  static _defaultStaticJsonSrcPath = 'static/json/imagesTranslated.json';

  static get defaultStaticSquareImagesPath() {
    return AppGlobalConfigs._defaultStaticSquareImagesPath;
  }

  static get defaultStaticFullImagesPath() {
    return AppGlobalConfigs._defaultStaticFullImagesPath;
  }
  
  static get defaultStaticJsonSrcPath() {
    return AppGlobalConfigs._defaultStaticJsonSrcPath;
  }

  static get questionsPerLevel() {
    return AppGlobalConfigs._questionsPerLevel;
  }

}

module.exports = AppGlobalConfigs