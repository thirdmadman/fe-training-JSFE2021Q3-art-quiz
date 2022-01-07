const AppGlobalConfigs = require('../AppGlobalConfigs');

class DataLocalStorageProvider {

  static localStorageItemName = 'art-quiz-game-gata';

  static srcData = null;

  static getData() {
    const data = localStorage.getItem(DataLocalStorageProvider.localStorageItemName);
    let localStorageKeysNumber = 0;
    let dataIConfigs = null;
    if (data) {
      dataIConfigs = JSON.parse(data);
      localStorageKeysNumber = Object.keys(dataIConfigs).length;
    }

    if (DataLocalStorageProvider.isNotEmpty()) {
      if (localStorageKeysNumber > 0) {
        return dataIConfigs;
      }
    } else {
      const genaratedData = DataLocalStorageProvider.generateData();
      DataLocalStorageProvider.setData(genaratedData);
      return genaratedData;
    }
    return null;
  }

  static destroy() {
    localStorage.removeItem(DataLocalStorageProvider.localStorageItemName);
  }

  static isNotEmpty() {
    const localStorageData = localStorage.getItem(DataLocalStorageProvider.localStorageItemName);
    return localStorageData && localStorageData[0] === '{';
  }

  static setData(data) {
    localStorage.setItem(DataLocalStorageProvider.localStorageItemName, JSON.stringify(data));
  }

  static generateData() {
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    localStorage.removeItem(DataLocalStorageProvider.localStorageItemName);
    let levelId = 0;
    let questionId = 0;
    let answerId = 0;
    let questionNumber = 1;

    let pathToImages = AppGlobalConfigs.defaultStaticSquareImagesPath;

    let questionsPerLevel = AppGlobalConfigs.questionsPerLevel;
    let tmp = {
      settings: {},
      gameDB: {
        level: [],
        question: [],
        answer: [],
        userAnswer: [],
      },
    };

    DataLocalStorageProvider.srcData.data.forEach((painting, i, array) => {
      if (i % questionsPerLevel === 0) {
        if (i >= questionsPerLevel) {
          levelId++;
        }
        tmp.gameDB.level.push({
          id: levelId,
          imageSrc: pathToImages + painting.imageId + '.jpg',
          isLocked: levelId < 2 ? false : true,
          text: '',
        });
      }

      tmp.gameDB.question.push({
        id: questionId,
        levelId: levelId,
        number: questionNumber,
        questionType: getRandomInt(1, 2),
        correctAnswerId: answerId,
        imageSrc: pathToImages + painting.imageId + '.jpg',
        text: '',
      });
      tmp.gameDB.answer.push({
        id: answerId++,
        questionId: questionId,
        imageSrc: pathToImages + painting.imageId + '.jpg',
        text: '',
        name: painting.name,
        author: painting.author,
        year: painting.year,
      });

      let answersRandom = [];
      let randomNumbers = [];

      for (let i = 0; i < 3; i++) {
        let random = getRandomInt(0, array.length - 1);
        while (randomNumbers.findIndex((el) => el === random) != -1) {
          random = getRandomInt(0, array.length - 1);
        }

        randomNumbers.push(random);
        answersRandom.push({
          id: answerId++,
          questionId: questionId,
          imageSrc: pathToImages + array[random].imageId + '.jpg',
          text: '',
          name: array[random].name,
          author: array[random].author,
          year: array[random].year,
        });
      }

      answersRandom.forEach((el) => tmp.gameDB.answer.push(el));

      questionId++;

      questionNumber < questionsPerLevel ? questionNumber++ : (questionNumber = 1);
    });
    return tmp;
  }
}

module.exports = DataLocalStorageProvider;
