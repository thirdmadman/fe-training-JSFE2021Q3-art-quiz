export default class UserSettings {
  gameDifficulty = null;

  soundLevel = null;

  language = null;

  userName = null;

  auth = null;

  static GameDifficulty = {
    easy: 0,
    normal: 1,
    hard: 2,
    nightmare: 3,
  };

  getUserName() {
    return this.userName;
  }

  setUserName(value) {
    this.userName = value;
  }

  getAuth() {
    return this.auth;
  }

  setAuth(value) {
    this.auth = value;
  }

  getGameDifficulty() {
    return this.gameDifficulty;
  }

  setGameDifficulty(value) {
    let val = value;
    if (val < 0) val = UserSettings.GameDifficulty.easy;
    if (val > 3) val = UserSettings.GameDifficulty.nightmare;
    this.gameDifficulty = val;
  }

  getSoundLevel() {
    return this.soundLevel;
  }

  setSoundLevel(value) {
    let val = value;
    if (val < 0) val = 0;
    if (val > 100) val = 100;

    this.soundLevel = val;
  }

  getLanguage() {
    return this.language;
  }

  setLanguage(value) {
    this.language = value;
  }
}
