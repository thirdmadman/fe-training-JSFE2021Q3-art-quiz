import DataLocalStorageProvider from '../services/DataLocalStorageProvider';

import Level from '../Models/Level';

import QuestionRepository from './QuestionRepository';

export default class LevelRepository {
  static dataToModel(data) {
    return new Promise((resolve) => {
      const levelModel = new Level(data.id);
      levelModel.setImageSrc(data.imageSrc);
      levelModel.setText(data.text);
      levelModel.setIsLocked(data.isLocked);
      QuestionRepository.getAllByLevelId(data.id).then((questions) => {
        levelModel.setQuestions(questions);
        resolve(levelModel);
      });
    });
  }

  static getAll() {
    return new Promise((resolve) => {
      DataLocalStorageProvider.getData().then((data) => {
        const levels = data.gameDB.level;
        const levelModelPromises = levels.map((level) => LevelRepository.dataToModel(level));
        Promise.all(levelModelPromises).then((levelModels) => resolve(levelModels));
      });
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      DataLocalStorageProvider.getData().then((data) => {
        let levelData = null;
        levelData = data.gameDB.level.filter((el) => el.id === parseInt(id, 10));
        if (levelData && levelData.length > 0) {
          levelData.map((el) => LevelRepository.dataToModel(el))[0].then((levelModel) => resolve(levelModel));
        }
      });
    });
  }

  static setLevelIsLockeById(levelId, state) {
    return new Promise((resolve) => {
      DataLocalStorageProvider.getData().then((data) => {
        const newData = { ...data };
        const levelData = newData.gameDB.level;
        if (levelData && levelData.length > 0) {
          const index = newData.gameDB.level.findIndex((el) => el.id === levelId);
          newData.gameDB.level[index].isLocked = state;
          resolve(DataLocalStorageProvider.setData(newData));
        }
      });
    });
  }
}
