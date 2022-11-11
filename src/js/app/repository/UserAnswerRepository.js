import DataLocalStorageProvider from '../services/DataLocalStorageProvider';

import UserAnswer from '../Models/UserAnswer';

export default class UserAnswerRepository {
  static dataToModel(data) {
    const userAnswerModel = new UserAnswer(data.id);
    userAnswerModel.setAnswerId(data.answerId);
    userAnswerModel.setQuestionId(data.questionId);
    userAnswerModel.setThinkingTime(data.thinkingTime);
    userAnswerModel.setAnswerDate(data.answerDate);
    return userAnswerModel;
  }

  static getByQuestionId(questionId) {
    const userAnswerData = DataLocalStorageProvider.getData().gameDB.userAnswer.filter(
      (userAnswer) => userAnswer.questionId === questionId,
    );
    let userAnswer = null;
    if (userAnswerData && userAnswerData.length > 0) {
      userAnswer = userAnswerData.map((userAnswerEl) => UserAnswerRepository.dataToModel(userAnswerEl))[0];
    }
    return userAnswer;
  }

  static setUserAnswer(userAnswerModel) {
    const getLastUserAnswerId = (userAnswerData) => {
      if (!userAnswerData || userAnswerData.length === 0) {
        return -1;
      }
      const idArray = userAnswerData.map((el) => el.id);
      return Math.max(...idArray);
    };

    const newData = DataLocalStorageProvider.getData();
    const newUserAnswerData = UserAnswerRepository.modelToData(userAnswerModel);

    const existingUserAnswer = UserAnswerRepository.getByQuestionId(userAnswerModel.getQuestionId());
    if (existingUserAnswer) {
      newUserAnswerData.id = existingUserAnswer.getId();
      const index = newData.gameDB.userAnswer.findIndex((el) => el.id === existingUserAnswer.getId());
      newData.gameDB.userAnswer[index] = newUserAnswerData;
    } else {
      newUserAnswerData.id = getLastUserAnswerId(newData.gameDB.userAnswer) + 1;
      newData.gameDB.userAnswer.push(newUserAnswerData);
    }

    DataLocalStorageProvider.setData(newData);
  }

  static modelToData(userAnswerModel) {
    return {
      id: userAnswerModel.getId(),
      questionId: userAnswerModel.getQuestionId(),
      answerId: userAnswerModel.getAnswerId(),
      thinkingTime: userAnswerModel.getThinkingTime(),
      answerDate: userAnswerModel.getAnswerDate(),
    };
  }
}
