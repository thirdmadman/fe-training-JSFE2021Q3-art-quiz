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
      levelLocked: "Locked",
      levelStatsTitle: "Done",

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
      levelLocked: "Заблокировано",
      levelStatsTitle: "Отвечено",
    }
  ];

  static getLocale(key) {
    return LocaleProvider.locales[LocaleProvider.currentLocale][key];
  }
}

module.exports = LocaleProvider;