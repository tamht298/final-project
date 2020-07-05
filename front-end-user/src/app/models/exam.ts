import {UserUpdate} from './user-update';
import {UserAccount} from './user-account';
import {Part} from './part';

export class Exam {
  title: string;
  isShuffle: boolean;
  durationExam: number;
  beginExam: string;
  finishExam: string;
  locked: boolean;
  questionData: any;
  part: Part;
  id: number;

  constructor(title: string, durationExam: number, beginExam: string, finishExam: string, questionData: any) {
    this.title = title;
    this.durationExam = durationExam;
    this.beginExam = beginExam;
    this.finishExam = finishExam;
    this.questionData = questionData;

  }
}
