export class Course {
  id: number;
  courseCode: string;
  name: string;
  imgUrl: string;

  constructor(courseCode: string, name: string, imgUrl: string) {
    this.courseCode = courseCode;
    this.name = name;
    this.imgUrl = imgUrl;
  }

}
