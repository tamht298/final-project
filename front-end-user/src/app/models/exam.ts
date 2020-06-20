import {UserUpdate} from './user-update';
import {UserAccount} from './user-account';

export class Exam {
  private id: number;
  private title: string;
  private isShuffle: boolean;
  private durationExam: number;
  private beginExam: string;
  private finishExam: string;
  private locked: boolean;
  private users: UserAccount[];

}
