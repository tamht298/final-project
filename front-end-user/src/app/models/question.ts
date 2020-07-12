import {UserAccount} from './user-account';
import {QuestionType} from './question-type';
import {Choice} from './choice';
import {Part} from './part';

export class Question {
  id: number;
  createdDate: string;
  lastModifiedDate: string;
  createdBy: UserAccount;
  lastModifiedBy: UserAccount;
  questionText: string;
  difficultyLevel: string;
  questionType: QuestionType;
  choices: Choice[];
  part: Part;
  point: number;
  isSelected: boolean;
  deleted: boolean;

  constructor(
    questionText: string,
    difficultyLevel: string,
    choices: Choice[]) {
    this.questionText = questionText;
    this.difficultyLevel = difficultyLevel;
    this.choices = choices;

  }
}
