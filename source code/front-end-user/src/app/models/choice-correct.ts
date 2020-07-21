import {Choice} from './choice';

export class ChoiceCorrect {
   choice: Choice;
   isRealCorrect: number;

  constructor(choice: Choice, isRealCorrect: number) {
    this.choice = choice;
    this.isRealCorrect = isRealCorrect;
  }
}
