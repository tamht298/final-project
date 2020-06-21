import {UserUpdate} from './user-update';
import {UserAccount} from './user-account';
import {Part} from './part';

export class Exam {
  private id: number;
  private title: string;
  private isShuffle: boolean;
  private durationExam: number;
  private beginExam: string;
  private finishExam: string;
  private locked: boolean;
  private questionData: any;
  private part: Part;

  constructor(title: string, isShuffle: boolean, durationExam: number, beginExam: string, finishExam: string, locked: boolean, questionData: any) {
    this.title = title;
    this.isShuffle = isShuffle;
    this.durationExam = durationExam;
    this.beginExam = beginExam;
    this.finishExam = finishExam;
    this.locked = locked;
    this.questionData = questionData;

  }
}
