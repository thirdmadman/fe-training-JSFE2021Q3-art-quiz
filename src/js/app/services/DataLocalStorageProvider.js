import AppGlobalConfigs from '../AppGlobalConfigs';

export default class DataLocalStorageProvider {
  static localStorageItemName = 'art-quiz-game-data';

  static srcData = null;

  static cachedData = null;

  static isCacheActive = true;

  static getData() {
    return new Promise((resolve) => {
      if (DataLocalStorageProvider.cachedData !== null && DataLocalStorageProvider.isCacheActive) {
        resolve(DataLocalStorageProvider.cachedData);
        return;
      }

      DataLocalStorageProvider.isEmpty().then((isEmpty) => {
        if (!isEmpty) {
          const data = localStorage.getItem(DataLocalStorageProvider.localStorageItemName);
          const dataObj = JSON.parse(data);
          const localStorageKeysNumber = Object.keys(dataObj).length;
          const out = localStorageKeysNumber > 0 ? dataObj : null;
          if (out != null) {
            DataLocalStorageProvider.cachedData = out;
            resolve(out);
            return;
          }
        }
        const generatedData = DataLocalStorageProvider.generateData();
        DataLocalStorageProvider.setData(generatedData);
        resolve(generatedData);
      });
    });
  }

  static destroy() {
    localStorage.removeItem(DataLocalStorageProvider.localStorageItemName);
  }

  static isEmpty() {
    return new Promise((resolve) => {
      const localStorageData = localStorage.getItem(DataLocalStorageProvider.localStorageItemName);
      resolve(!(localStorageData && localStorageData[0] === '{'));
    });
  }

  static setData(data) {
    DataLocalStorageProvider.cachedData = data;
    localStorage.setItem(DataLocalStorageProvider.localStorageItemName, JSON.stringify(data));
  }

  static generateData() {
    const getRandomInt = (min, max) => {
      const newMin = Math.ceil(min);
      const newMax = Math.floor(max);
      return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
    };

    localStorage.removeItem(DataLocalStorageProvider.localStorageItemName);
    let levelId = 0;
    let questionId = 0;
    let answerId = 0;
    let questionNumber = 1;

    const pathToImages = AppGlobalConfigs.getDefaultStaticSquareImagesPath();

    const questionsPerLevel = AppGlobalConfigs.getQuestionsPerLevel();

    const tmp = {
      settings: {
        gameDifficulty: 0,
        soundLevel: 50,
        language: 0,
        userName: 'UserName',
        Auth: '',
      },
      gameDB: {
        level: [],
        question: [],
        answer: [],
        userAnswer: [],
      },
    };

    const processSourceData = (painting, i, array) => {
      if (i % questionsPerLevel === 0) {
        if (i >= questionsPerLevel) {
          levelId += 1;
        }

        tmp.gameDB.level.push({
          id: levelId,
          imageSrc: `${pathToImages}${painting.imageId}.jpg`,
          isLocked: levelId >= 2,
          text: '',
        });
      }

      tmp.gameDB.question.push({
        id: questionId,
        levelId,
        number: questionNumber,
        questionType: getRandomInt(1, 2),
        correctAnswerId: answerId,
        imageSrc: `${pathToImages}${painting.imageId}.jpg`,
        text: '',
      });

      tmp.gameDB.answer.push({
        id: answerId,
        questionId,
        imageSrc: `${pathToImages}${painting.imageId}.jpg`,
        text: '',
        name: painting.name,
        author: painting.author,
        year: painting.year,
      });

      answerId += 1;

      const answersRandom = [];
      const randomNumbers = [];

      for (let y = 0; y < 3; y += 1) {
        let random = getRandomInt(0, array.length - 1);

        // eslint-disable-next-line no-loop-func
        while (randomNumbers.findIndex((el) => el === random) !== -1) {
          random = getRandomInt(0, array.length - 1);
        }

        randomNumbers.push(random);
        answersRandom.push({
          id: answerId,
          questionId,
          imageSrc: `${pathToImages}${array[random].imageId}.jpg`,
          text: '',
          name: array[random].name,
          author: array[random].author,
          year: array[random].year,
        });

        answerId += 1;
      }

      answersRandom.forEach((el) => tmp.gameDB.answer.push(el));

      questionId += 1;

      questionNumber = questionNumber < questionsPerLevel ? (questionNumber += 1) : 1;
    };

    DataLocalStorageProvider.srcData.data.forEach(processSourceData);
    return tmp;
  }
}
