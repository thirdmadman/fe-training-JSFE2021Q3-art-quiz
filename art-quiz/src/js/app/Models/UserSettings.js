class UserSettings {
  _gameDifficulty = null;

  _soundLevel = null;
  _language = null;

  _userName = null;
  _auth = null;
  get userName() {
    return this._userName;
  }
  set userName(value) {
    this._userName = value;
  }

  get auth() {
    return this._auth;
  }
  set auth(value) {
    this._auth = value;
  }

  get gameDifficulty() {
    return this._gameDifficulty;
  }
  set gameDifficulty(value) {
    let val = value;
    if (val < 0) val = 0;
    if (val > 3) val = 3;
    this._gameDifficulty = val;
  }

  get soundLevel() {
    return this._soundLevel;
  }
  set soundLevel(value) {
    let val = value;
    if (val < 0) val = 0;
    if (val > 100) val = 100;

    this._soundLevel = val;
  }

  get language() {
    return this._language;
  }
  set language(value) {
    let lang = value;
    if (value != 'eng' || value != 'ru') lang = 'eng';
    this._language = lang;
  }

  toJSON() {
    return JSON.stringify({
      gameDifficulty: this._gameDifficulty,
      soundLevel: this._soundLevel,
      language: this._language,
    });
  }

  fromJsonObj(jsonObj) {
    this.gameDifficulty = jsonObj.gameDifficulty;

    this.soundLevel = jsonObj.soundLevel;
    this.language = jsonObj.language;
  }
}

module.exports = UserSettings;
