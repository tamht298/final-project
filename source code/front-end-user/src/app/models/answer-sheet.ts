import {Choice} from './choice';

export class AnswerSheet {
  questionId: number;
  choices: Choice[];
  point: number;

  constructor(id: number, choices: Choice[], point: number) {
    this.questionId = id;
    this.choices = choices;
    this.point = point;
  }
}
