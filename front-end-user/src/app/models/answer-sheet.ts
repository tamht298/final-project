import {Choice} from './choice';

export class AnswerSheet {
  questionId: number;
  choices: Choice[];

  constructor(id: number, choices: Choice[]) {
    this.questionId = id;
    this.choices = choices;
  }
}
