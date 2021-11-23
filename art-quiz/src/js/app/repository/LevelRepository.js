const DataLocalStorageProvider = require('../services/DataLocalStorageProvider.js')

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
    return levels.map( level => LevelRepository.dataToModel(level));
  }


  static getById(id) {
    let levelData = null;
    levelData = DataLocalStorageProvider.getData().gameDB.level.filter(level => level.id === id)[0];
    return LevelRepository.dataToModel(levelData);
  }
}

module.exports = LevelRepository