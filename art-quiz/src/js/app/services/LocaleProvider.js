class LocaleProvider {
  static currentLocale = 0;
  static locales = [
    {
      localeName: "eng",
      title: "ArtQuiz",
      levelTitle: "Level",
      settingsTitle: "Settings",
      levelsTitle: "Levels",
      scoreTitle: "Score",
      aboutTitle: "About",
      sidebarMoto: "CREATE TEST DEPLOY BE SMART",
      levelLockedTitle: "Locked",
      levelStatsTitle: "Done",
      gamePaused: "Paused",
      gameQuestionType1: "Who wrote this picture?",
      gameQuestionType2: "Which one is written by",
      gameSelectTitle: "Select",
      gameCancelTitle: "Cancel",
    },
    {
      localeName: "ru",
      title: "ArtQuiz",
      levelTitle: "Уровень",
      settingsTitle: "Настройки",
      levelsTitle: "Уровни",
      scoreTitle: "Счёт",
      aboutTitle: "О игре",
      sidebarMoto: "СОЗДАВАЙ ТЕСТИРУЙ РАЗВОРАЧИВАЙ БУДЬ УМЁН",
      levelLockedTitle: "Заблокировано",
      levelStatsTitle: "Отвечено",
      gamePaused: "Пауза",
      gameQuestionType1: "Кто написал эту кртину?",
      gameQuestionType2: "Какую из картин написал автор",
      gameSelectTitle: "Выбрать",
      gameCancelTitle: "Отмена",
    }
  ];

  static getLocale(key) {
    return LocaleProvider.locales[LocaleProvider.currentLocale][key];
  }
}

module.exports = LocaleProvider;