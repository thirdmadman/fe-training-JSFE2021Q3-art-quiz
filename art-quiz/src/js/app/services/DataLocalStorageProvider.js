class DataLocalStorageProvider {
  static localStorageItemName = 'art-quiz-game-gata';
  static srcData = null;
  static getData() {
    //localStorage.removeItem(DataLocalStorageProvider.localStorageItemName);
    if (localStorage.getItem(DataLocalStorageProvider.localStorageItemName) && localStorage.getItem(DataLocalStorageProvider.localStorageItemName)[0] === '{') {
      //console.log(localStorage.getItem(DataLocalStorageProvider.localStorageItemName));
      return Object.keys(JSON.parse(localStorage.getItem(DataLocalStorageProvider.localStorageItemName))).length > 0
        ? JSON.parse(localStorage.getItem(DataLocalStorageProvider.localStorageItemName))
        : null;
    } else {
      localStorage.setItem(DataLocalStorageProvider.localStorageItemName, JSON.stringify(DataLocalStorageProvider.generateData()));
      //console.log(localStorage.getItem(DataLocalStorageProvider.localStorageItemName));
      return Object.keys(JSON.parse(localStorage.getItem(DataLocalStorageProvider.localStorageItemName))).length > 0
        ? JSON.parse(localStorage.getItem(DataLocalStorageProvider.localStorageItemName))
        : null;
    }
  }

  static destroy() {
    localStorage.removeItem(DataLocalStorageProvider.localStorageItemName);
  }

  static isEmpty() {
    return !(
      localStorage.getItem(DataLocalStorageProvider.localStorageItemName) && localStorage.getItem(DataLocalStorageProvider.localStorageItemName)[0] === '{'
    );
  }

  static setData(data) {
    localStorage.setItem(DataLocalStorageProvider.localStorageItemName, JSON.stringify(data));
    console.log(localStorage.getItem(DataLocalStorageProvider.localStorageItemName));
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
    let questionNumber = 0;

    let pathToImages = 'static/img/jpg/square/';

    let questionsPerLevel = 10;
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
        id: questionId++,
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

      for (let i = 0; i < 3; i++) {
        let random = getRandomInt(0, array.length - 1);
        tmp.gameDB.answer.push({
          id: answerId++,
          questionId: questionId,
          imageSrc: pathToImages + array[random].imageId + '.jpg',
          text: '',
          name: array[random].name,
          author: array[random].author,
          year: array[random].year,
        });
      }

      questionNumber < questionsPerLevel ? questionNumber++ : (questionNumber = 0);
    });

    console.log(tmp);

    // let someData = {
    //   settings: {},
    //   gameDB: {
    //     level: [
    //       {
    //         id: 0,
    //         imageSrc: '/static/img/jpg/square/0.jpg',
    //         isLocked: false,
    //         text: '',
    //       },
    //     ],
    //     question: [
    //       {
    //         id: 0,
    //         number: 0,
    //         levelId: 0,
    //         questionType: 1,
    //         correctAnswerId: 1,
    //         imageSrc: '',
    //         text: { eng: 'Alexey', ru: 'Флексей' },
    //       },
    //     ],
    //     answer: [
    //       {
    //         id: 0,
    //         questionId: 0,
    //         image: '',
    //         text: { eng: 'Lion', ru: 'Лев' },
    //       },
    //     ],
    //     userAnswer: [
    //       {
    //         id: 0,
    //         answerId: 0,
    //         questionId: 0,
    //         thinkingTime: 30,
    //         answerDate: '2021-11-21T13:05:51.001Z',
    //       },
    //     ],
    //   },
    // };

    // console.log(someData);
    // console.log('Here some data generator');
    return tmp;
  }
}

module.exports = DataLocalStorageProvider;
