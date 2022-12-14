import SettingRepository from '../repository/SettingRepository';

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
      sidebarMotto: 'CREATE TEST DEPLOY BE SMART',
      levelLockedTitle: 'Locked',
      levelStatsTitle: 'Done',
      gamePaused: 'Paused',
      gameQuestionType1: 'Who wrote this picture?',
      gameQuestionType2: 'Which one is written by',
      gameSelectTitle: 'Select',
      gameCancelTitle: 'Cancel',
      gameAnswerCorrect: 'Correct',
      gameAnswerIncorrect: 'Incorrect',
      gameNextButtonTitle: 'Next',
      gamePictureNameTitle: 'This is:',
      gameMadeByTitle: 'Made by:',
      gameYearTitle: 'Year of creation:',
      levelResults: 'Results',
      gameResultNoAnswer: 'No answer',
      gameResultBackToLevels: 'Back to levels',
      gameResultLevelComplete: 'Level complete',
      gameResultTryAgain: 'Try again to unlock next level',
      gameResultGoodJob: 'Good job!',
    },
    {
      localeName: 'ru',
      title: 'ArtQuiz',
      levelTitle: 'Уровень',
      settingsTitle: 'Настройки',
      levelsTitle: 'Уровни',
      scoreTitle: 'Счёт',
      aboutTitle: 'О игре',
      sidebarMotto: 'СОЗДАВАЙ ТЕСТИРУЙ РАЗВОРАЧИВАЙ БУДЬ УМЁН',
      levelLockedTitle: 'Заблокировано',
      levelStatsTitle: 'Отвечено',
      gamePaused: 'Пауза',
      gameQuestionType1: 'Кто написал эту картину?',
      gameQuestionType2: 'Какую из картин написал автор',
      gameSelectTitle: 'Выбрать',
      gameCancelTitle: 'Отмена',
      gameAnswerCorrect: 'Правильно',
      gameAnswerIncorrect: 'Неправильно',
      gameNextButtonTitle: 'Далее',
      gamePictureNameTitle: 'Картина называется:',
      gameMadeByTitle: 'Написана автором:',
      gameYearTitle: 'Год создания:',
      levelResults: 'Результаты',
      gameResultNoAnswer: 'Неотвечено',
      gameResultBackToLevels: 'Назад к уровням',
      gameResultLevelComplete: 'Уровень завершён',
      gameResultTryAgain: 'Попробуйте ещё раз, чтобы открыть следующий уровень',
      gameResultGoodJob: 'Хорошая работа!',
    },
  ];

  static getLocale(key) {
    return LocaleProvider.locales[LocaleProvider.currentLocale][key];
  }

  static setCurrentLocale(index) {
    LocaleProvider.currentLocale = index;
    SettingRepository.getSettings().then((settings) => {
      console.error(index);
      const newSetting = settings;
      settings.setLanguage(index);
      SettingRepository.setSettings(newSetting);
    });
  }

  static getCurrentLocale() {
    return LocaleProvider.currentLocale;
  }
}
