export class Choice {
  id: number;
  choiceText: string;
  isCorrected: number;

  constructor(choiceText: string, isCorrected: number) {
    this.choiceText = choiceText;
    this.isCorrected = isCorrected;
  }
}
