import {ChoiceCorrect} from './choice-correct';
import {Question} from './question';

export class ChoiceList {
   choices: ChoiceCorrect[];
   question: Question;
   point: number;

  constructor(choices: ChoiceCorrect[], question: Question, point: number) {
    this.choices = choices;
    this.question = question;
    this.point = point;
  }
}
