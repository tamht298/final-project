import {ChoiceCorrect} from './choice-correct';
import {Question} from './question';

export class ChoiceList {
  choices: ChoiceCorrect[];
  question: Question;
  point: number;
  isSelectedCorrected: boolean;


  constructor(choices: ChoiceCorrect[], question: Question, point: number, isSelectedCorrected: boolean) {
    this.choices = choices;
    this.question = question;
    this.point = point;
    this.isSelectedCorrected = isSelectedCorrected;
  }
}
