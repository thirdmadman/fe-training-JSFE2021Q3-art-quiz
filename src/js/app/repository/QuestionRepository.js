import DataLocalStorageProvider from '../services/DataLocalStorageProvider';
import Question from '../Models/Question';
import AnswerRepository from './AnswerRepository';
import UserAnswerRepository from './UserAnswerRepository';

export default class QuestionRepository {
  static dataToModel(data) {
    const questionModel = new Question(data.id);
    const answers = AnswerRepository.getAllByQuestionId(data.id);
    questionModel.setNumber(data.number);
    questionModel.setLevelId(data.levelId);
    questionModel.setQuestionType(data.questionType);
    questionModel.setCorrectAnswerId(data.correctAnswerId);
    questionModel.setImageSrc(data.imageSrc);
    questionModel.setText(data.text);
    questionModel.setAnswers(answers);
    questionModel.setUserAnswer(UserAnswerRepository.getByQuestionId(data.id));
    return questionModel;
  }

  static getAllByLevelId(levelId) {
    let questionsData = null;

    questionsData = DataLocalStorageProvider.getData().gameDB.question.filter((question) => question.levelId === levelId);
    return questionsData.map((question) => QuestionRepository.dataToModel(question));
  }

  static getLastWithAnswerByLevelId(levelId) {
    let allQuestionsData = null;
    allQuestionsData = QuestionRepository.getAllByLevelId(levelId);

    allQuestionsData = allQuestionsData.filter((question) => question.getUserAnswer());
    const questionsNumbers = allQuestionsData.map((el) => el.getNumber());
    const maxNumber = Math.max(...questionsNumbers);
    const lastQuestion = allQuestionsData.filter((question) => question.getNumber() === maxNumber)[0];

    return lastQuestion;
  }
}
