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

  static getTestPromise(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.error('gg');
        resolve(`result after ${time}`);
      }, time);
    });
  }

  static getTestPromiseArray() {
    return new Promise((resolve) => {
      const promises = [LevelRepository.getTestPromise(2000), LevelRepository.getTestPromise(1000)];
      Promise.all(promises).then((res) => resolve(res));
    });
  }
}
