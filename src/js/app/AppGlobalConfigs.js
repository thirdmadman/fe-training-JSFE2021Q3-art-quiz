export default class AppGlobalConfigs {
  static questionsPerLevel = 10;

  static defaultStaticSquareImagesPath = 'static/img/jpg/square/';

  static defaultStaticFullImagesPath = 'static/img/jpg/full/';

  static defaultStaticJsonSrcPath = 'static/json/imagesTranslated.json';

  static getDefaultStaticSquareImagesPath() {
    return AppGlobalConfigs.defaultStaticSquareImagesPath;
  }

  static getDefaultStaticFullImagesPath() {
    return AppGlobalConfigs.defaultStaticFullImagesPath;
  }

  static getDefaultStaticJsonSrcPath() {
    return AppGlobalConfigs.defaultStaticJsonSrcPath;
  }

  static getQuestionsPerLevel() {
    return AppGlobalConfigs.questionsPerLevel;
  }
}
