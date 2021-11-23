const DataLocalStorageProvider = require('../services/DataLocalStorageProvider.js');

const Answer = require('../models/Answer');

class AnswerRepository {
  static dataToModel(data) {
    let answerModel = new Answer(data.id);
    answerModel.questionId = data.questionId;
    answerModel.imageSrc = data.imageSrc;
    answerModel.text = data.text;
    answerModel.name = data.name;
    answerModel.author = data.author;
    answerModel.year = data.year;
    return answerModel;
  }

  static getAllByQuestionId(questionId) {
    let answerData = DataLocalStorageProvider.getData().gameDB.answer.filter((answer) => answer.questionId === questionId);
    return answerData.map((answer) =>  AnswerRepository.dataToModel(answer));
  }
}

module.exports = AnswerRepository;
