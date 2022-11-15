import DataLocalStorageProvider from '../services/DataLocalStorageProvider';
import Question from '../Models/Question';
import AnswerRepository from './AnswerRepository';
import UserAnswerRepository from './UserAnswerRepository';

export default class QuestionRepository {
  static dataToModel(data) {
    const questionModel = new Question(data.id);
    questionModel.setNumber(data.number);
    questionModel.setLevelId(data.levelId);
    questionModel.setQuestionType(data.questionType);
    questionModel.setCorrectAnswerId(data.correctAnswerId);
    questionModel.setImageSrc(data.imageSrc);
    questionModel.setText(data.text);

    const answerPromise = new Promise((resolve) => {
      AnswerRepository.getAllByQuestionId(data.id).then((result) => {
        resolve(questionModel.setAnswers(result));
      });
    });

    const userAnswerPromise = new Promise((resolve) => {
      UserAnswerRepository.getByQuestionId(data.id).then((result) => {
        resolve(questionModel.setUserAnswer(result));
      });
    });

    return new Promise((resolve) => {
      Promise.all([answerPromise, userAnswerPromise]).then(resolve(questionModel));
    });
  }

  static getAllByLevelId(levelId) {
    return new Promise((resolve) => {
      DataLocalStorageProvider.getData().then((data) => {
        const questionsData = data.gameDB.question.filter((question) => question.levelId === levelId);
        Promise.all(questionsData.map((question) => QuestionRepository.dataToModel(question))).then((questionModels) =>
          resolve(questionModels),
        );
      });
    });
  }

  static getLastWithAnswerByLevelId(levelId) {
    return new Promise((resolve) => {
      QuestionRepository.getAllByLevelId(levelId).then((allQuestionsData) => {
        const filteredQuestionsData = allQuestionsData.filter((question) => question.getUserAnswer());
        const questionsNumbers = filteredQuestionsData.map((el) => el.getNumber());
        const maxNumber = Math.max(...questionsNumbers);
        const lastQuestion = filteredQuestionsData.filter((question) => question.getNumber() === maxNumber)[0];
        resolve(lastQuestion);
      });
    });
  }
}
