export class QuestionType {
  id: number;
  typeCode: string;
  description: string;
  constructor(id: number, typeCode: string, description: string) {
    this.id = id;
    this.typeCode = typeCode;
    this.description = description;
  }
}
