import {Exam} from './exam';
import {ChoiceList} from './choice-list';
import {UserAccount} from './user-account';

export class ExamResult {
  exam: Exam;
  choiceList: ChoiceList[];
  totalPoint: number;
  user: UserAccount;
  userTimeBegin: string;
  userTimeFinish: string;
  examStatus: number;
  remainingTime: number;

  constructor(exam: Exam, choiceList: ChoiceList[], totalPoint: number) {
    this.exam = exam;
    this.choiceList = choiceList;
    this.totalPoint = totalPoint;
  }
}
