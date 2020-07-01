import {Exam} from './exam';
import {ChoiceList} from './choice-list';

export class ExamResult {
  exam: Exam;
  choiceList: ChoiceList[];

  constructor(exam: Exam, choiceList: ChoiceList[]) {
    this.exam = exam;
    this.choiceList = choiceList;
  }
}
