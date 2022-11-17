import UserSettings from '../Models/UserSettings';
import DataLocalStorageProvider from '../services/DataLocalStorageProvider';

export default class SettingRepository {
  static dataToModel(data) {
    const settings = new UserSettings();
    settings.setGameDifficulty(data.gameDifficulty);
    settings.setSoundLevel(data.soundLevel);
    settings.setLanguage(data.language);
    settings.setUserName(data.userName);
    settings.setAuth(data.Auth);
    return settings;
  }

  static getSettings() {
    return new Promise((resolve) => {
      DataLocalStorageProvider.getData().then((data) => {
        const { settings } = data;
        resolve(SettingRepository.dataToModel(settings));
      });
    });
  }

  static setSettings(settingModel) {
    return new Promise((resolve) => {
      DataLocalStorageProvider.getData().then((data) => {
        const newData = { ...data };
        const newSettingData = SettingRepository.modelToData(settingModel);
        newData.settings = newSettingData;
        resolve(DataLocalStorageProvider.setData(newData));
      });
    });
  }

  static modelToData(settingModel) {
    return {
      gameDifficulty: settingModel.getGameDifficulty(),
      soundLevel: settingModel.getSoundLevel(),
      language: settingModel.getLanguage(),
      userName: settingModel.getUserName(),
      auth: settingModel.getAuth(),
    };
  }
}
