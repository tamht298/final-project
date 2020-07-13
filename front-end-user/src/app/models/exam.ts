import {UserUpdate} from './user-update';
import {UserAccount} from './user-account';
import {Part} from './part';
import {Intake} from './intake';

export class Exam {
  title: string;
  shuffle: boolean;
  durationExam: number;
  beginExam: string;
  finishExam: string;
  locked: boolean;
  questionData: any;
  part: Part;
  id: number;
  canceled: boolean;
  intake: Intake;


  constructor(title: string, durationExam: number, beginExam: string, finishExam: string, questionData: any) {
    this.title = title;
    this.durationExam = durationExam;
    this.beginExam = beginExam;
    this.finishExam = finishExam;
    this.questionData = questionData;

  }
}
