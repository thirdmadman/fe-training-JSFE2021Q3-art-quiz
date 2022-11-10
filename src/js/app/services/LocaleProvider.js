export default class LocaleProvider {
  static currentLocale = 0;

  static locales = [
    {
      localeName: 'eng',
      title: 'ArtQuiz',
      levelTitle: 'Level',
      settingsTitle: 'Settings',
      levelsTitle: 'Levels',
      scoreTitle: 'Score',
      aboutTitle: 'About',
      sidebarMoto: 'CREATE TEST DEPLOY BE SMART',
      levelLockedTitle: 'Locked',
      levelStatsTitle: 'Done',
      gamePaused: 'Paused',
      gameQuestionType1: 'Who wrote this picture?',
      gameQuestionType2: 'Which one is written by',
      gameSelectTitle: 'Select',
      gameCancelTitle: 'Cancel',
      gameAnswerCorrect: 'Correct',
      gameAnswerUncorrect: 'Uncorrect',
      gameNextButtonTitle: 'Next',
      gamePictureNameTitle: 'This is:',
      gameMadeByTitle: 'Made by:',
      gameYearTitle: 'Year of creation:',
    },
    {
      localeName: 'ru',
      title: 'ArtQuiz',
      levelTitle: 'Уровень',
      settingsTitle: 'Настройки',
      levelsTitle: 'Уровни',
      scoreTitle: 'Счёт',
      aboutTitle: 'О игре',
      sidebarMoto: 'СОЗДАВАЙ ТЕСТИРУЙ РАЗВОРАЧИВАЙ БУДЬ УМЁН',
      levelLockedTitle: 'Заблокировано',
      levelStatsTitle: 'Отвечено',
      gamePaused: 'Пауза',
      gameQuestionType1: 'Кто написал эту кртину?',
      gameQuestionType2: 'Какую из картин написал автор',
      gameSelectTitle: 'Выбрать',
      gameCancelTitle: 'Отмена',
      gameAnswerCorrect: 'Правильно',
      gameAnswerUncorrect: 'Неправильно',
      gameNextButtonTitle: 'Далее',
      gamePictureNameTitle: 'Картина называется:',
      gameMadeByTitle: 'Написана автором:',
      gameYearTitle: 'Год создания:',
    },
  ];

  static getLocale(key) {
    return LocaleProvider.locales[LocaleProvider.currentLocale][key];
  }
}