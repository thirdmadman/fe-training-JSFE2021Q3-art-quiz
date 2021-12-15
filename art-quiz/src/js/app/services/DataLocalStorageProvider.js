const AppGlobalConfigs = require('../AppGlobalConfigs');

class DataLocalStorageProvider {
  static localStorageItemName = 'art-quiz-game-gata';
  static srcData = null;
  static getData() {
    if (localStorage.getItem(DataLocalStorageProvider.localStorageItemName) && localStorage.getItem(DataLocalStorageProvider.localStorageItemName)[0] === '{') {
      return Object.keys(JSON.parse(localStorage.getItem(DataLocalStorageProvider.localStorageItemName))).length > 0
        ? JSON.parse(localStorage.getItem(DataLocalStorageProvider.localStorageItemName))
        : null;
    } else {
      localStorage.setItem(DataLocalStorageProvider.localStorageItemName, JSON.stringify(DataLocalStorageProvider.generateData()));
      return Object.keys(JSON.parse(localStorage.getItem(DataLocalStorageProvider.localStorageItemName))).length > 0
        ? JSON.parse(localStorage.getItem(DataLocalStorageProvider.localStorageItemName))
        : null;
    }
  }

  static destroy() {
    localStorage.removeItem(DataLocalStorageProvider.localStorageItemName);
  }

  static isEmpty() {
    return !(localStorage.getItem(DataLocalStorageProvider.localStorageItemName) && localStorage.getItem(DataLocalStorageProvider.localStorageItemName)[0] === '{');
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
