import DataLocalStorageProvider from '../services/DataLocalStorageProvider';

import Answer from '../Models/Answer';

export default class AnswerRepository {
  static dataToModel(data) {
    const answerModel = new Answer(data.id);
    answerModel.setQuestionId(data.questionId);
    answerModel.setImageSrc(data.imageSrc);
    answerModel.setName(data.name);
    answerModel.setAuthor(data.author);
    answerModel.setYear(data.year);
    return answerModel;
  }

  static getAllByQuestionId(questionId) {
    return new Promise((resolve) => {
      DataLocalStorageProvider.getData().then((data) => {
        const answerData = data.gameDB.answer.filter((answer) => answer.questionId === questionId);
        resolve(answerData.map((answer) => AnswerRepository.dataToModel(answer)));
      });
    });
  }
}
