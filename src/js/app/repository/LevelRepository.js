import DataLocalStorageProvider from '../services/DataLocalStorageProvider';

import Level from '../Models/Level';

import QuestionRepository from './QuestionRepository';

export default class LevelRepository {
  static dataToModel(data) {
    const levelModel = new Level(data.id);
    const questions = QuestionRepository.getAllByLevelId(data.id);
    levelModel.setImageSrc(data.imageSrc);
    levelModel.setText(data.text);
    levelModel.setIsLocked(data.isLocked);
    levelModel.setQuestions(questions);
    return levelModel;
  }

  static getAll() {
    let levels = null;
    levels = DataLocalStorageProvider.getData().gameDB.level;
    return levels.map((level) => LevelRepository.dataToModel(level));
  }

  static getById(id) {
    let levelData = null;
    levelData = DataLocalStorageProvider.getData().gameDB.level.filter((el) => el.id === parseInt(id, 10));
    let level = null;
    if (levelData && levelData.length > 0) {
      level = levelData.map((el) => LevelRepository.dataToModel(el))[0];
    }
    return level;
  }
}
