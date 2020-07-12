import {Exam} from './exam';
import {UserAccount} from './user-account';

export class ExamUser {
  id: number;
  exam: Exam;
  isStarted: boolean;
  timeStart: string;
  timeFinish: string;
  isFinished: boolean;
  isAvailable: boolean;

}
