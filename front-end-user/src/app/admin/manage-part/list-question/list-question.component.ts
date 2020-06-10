import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../../../models/course';
import {CourseService} from '../../../_services/course.service';
import {PartService} from '../../../_services/part.service';
import {Part} from '../../../models/part';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit {

  courseId: number;
  partId: number;
  currentCourse: Course;
  currentPart: Part;
  questionList: any[];

  constructor(private route: ActivatedRoute, private courseService: CourseService, private partService: PartService) {
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.partId = Number(this.route.snapshot.paramMap.get('partId'));
    this.partService.getPartById(this.partId).subscribe(data => {
      this.currentPart = data;
      console.log(data);
    });
    this.courseService.getCourseById(this.courseId).subscribe(data => {
      this.currentCourse = data;
      console.log(data);
    });
  }

  trackById(index: number, item: any) {
    return item.id === index;
  }

}
