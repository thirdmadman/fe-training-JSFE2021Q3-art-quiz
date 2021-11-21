const DataLocalStorageProvider = require('../services/DataLocalStorageProvider.js');

const Answer = require('../models/Answer');

class AnswerRepository {
  static dataToModel(data) {
    let answerModel = new Answer(data.id);
    answerModel.questionId = data.questionId;
    answerModel.image = data.image;
    answerModel.text = data.text;
    return answerModel;
  }

  static getAllByQuestionId(questionId) {
    let answerData = DataLocalStorageProvider.getData().gameDB.answer.filter((answer) => answer.questionId === questionId);
    return answerData.map((answer) =>  AnswerRepository.dataToModel(answer));
  }
}

module.exports = AnswerRepository;
