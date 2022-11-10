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
      userAnswer = userAnswerData.map((userAnswerEl) => UserAnswerRepository.dataToModel(userAnswerEl));
    }
    return userAnswer;
  }
}
