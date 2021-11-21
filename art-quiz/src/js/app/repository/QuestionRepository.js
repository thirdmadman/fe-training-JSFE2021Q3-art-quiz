const DataLocalStorageProvider = require('../services/DataLocalStorageProvider.js');

const Question = require('../models/Question');

const AnswerRepository = require('./AnswerRepository');
const UserAnswerRepository = require('./UserAnswerRepository');

class QuestionRepository {
  static dataToModel(data) {
    console.log(data);
    let questionModel = new Question(data.id);
    questionModel.number = data.number;
    questionModel.levelId = data.levelId;
    questionModel.questionType = data.questionType;
    questionModel.correctAnswerId = data.correctAnswerId;
    questionModel.imageSrc = data.imageSrc;
    questionModel.text = data.text;
    let answers = AnswerRepository.getAllByQuestionId(data.id);
    
    questionModel.answers = answers;

    questionModel.userAnswer = UserAnswerRepository.getByQuestionId(data.id);
    // console.log(UserAnswerRepository.getByQuestionId(data.id));
    return questionModel;
  }

  static getAllByLevelId(levelId) {
    let questionsData = null;
    
    questionsData = DataLocalStorageProvider.getData().gameDB.question.filter((question) => question.levelId === levelId);
    return questionsData.map((question) => QuestionRepository.dataToModel(question));
  }
}

module.exports = QuestionRepository;
