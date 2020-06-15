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

  constructor(
    questionText: string,
    difficultyLevel: string,
    questionType: QuestionType,
    choices: Choice[],
    part: Part) {

    this.questionText = questionText;
    this.difficultyLevel = difficultyLevel;
    this.questionType = questionType;
    this.choices = choices;
    this.part = part;
  }
}
