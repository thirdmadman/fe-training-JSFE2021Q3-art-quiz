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
    const answerData = DataLocalStorageProvider.getData().gameDB.answer.filter((answer) => answer.questionId === questionId);
    return answerData.map((answer) => AnswerRepository.dataToModel(answer));
  }
}
