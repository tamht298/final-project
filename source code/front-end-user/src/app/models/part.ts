import {Course} from './course';

export class Part {
  id: number;
  name: string;
  course: Course;

  constructor(name: string, course: Course) {
    this.name = name;
    this.course = course;
  }
}
