const DataLocalStorageProvider = require('../services/DataLocalStorageProvider.js');

const UserAnswer = require('../models/UserAnswer');

class UserAnswerRepository {
  static dataToModel(data) {
    let userAnswerModel = new UserAnswer(data.id);
    userAnswerModel.answerId = data.answerId;
    userAnswerModel.questionId = data.questionId;
    userAnswerModel.thinkingTime = data.thinkingTime;
    userAnswerModel.answerDate = data.answerDate;
    return userAnswerModel;
  }
  static getByQuestionId(questionId) {
    let userAnswerData = DataLocalStorageProvider.getData().gameDB.userAnswer.filter((userAnswer) => userAnswer.questionId === questionId);
    let userAnswer = null;
    if (userAnswerData && userAnswerData.length > 0) {
      userAnswer = userAnswerData.map((userAnswer) => UserAnswerRepository.dataToModel(userAnswer));
    }
    return userAnswer;
  }
}

module.exports = UserAnswerRepository;
