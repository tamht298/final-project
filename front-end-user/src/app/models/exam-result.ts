import {Exam} from './exam';
import {ChoiceList} from './choice-list';

export class ExamResult {
  exam: Exam;
  choiceList: ChoiceList[];
  totalPoint: number;


  constructor(exam: Exam, choiceList: ChoiceList[], totalPoint: number) {
    this.exam = exam;
    this.choiceList = choiceList;
    this.totalPoint = totalPoint;
  }
}
