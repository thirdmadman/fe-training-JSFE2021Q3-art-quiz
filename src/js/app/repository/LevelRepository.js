const DataLocalStorageProvider = require('../services/DataLocalStorageProvider.js');

const Level = require('../models/Level');

const QuestionRepository = require('./QuestionRepository');

class LevelRepository {
  static dataToModel(data) {
    let levelModel = new Level(data.id);
    levelModel.imageSrc = data.imageSrc;
    levelModel.text = data.text;
    levelModel.isLocked = data.isLocked;
    let questions = QuestionRepository.getAllByLevelId(data.id);
    levelModel.questions = questions;
    return levelModel;
  }

  static getAll() {
    let levels = null;
    levels = DataLocalStorageProvider.getData().gameDB.level;
    return levels.map((level) => LevelRepository.dataToModel(level));
  }

  static getById(id) {
    let levelData = null;
    levelData = DataLocalStorageProvider.getData().gameDB.level.filter((el) => el.id === parseInt(id));
    let level = null;
    if (levelData && levelData.length > 0) {
      level = levelData.map((el) => LevelRepository.dataToModel(el))[0];
    }
    return level;
  }
}

module.exports = LevelRepository;
