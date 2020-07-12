import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../../models/course';
import {CourseService} from '../../../_services/course.service';
import {PartService} from '../../../_services/part.service';
import {Part} from '../../../models/part';
import {QuestionService} from '../../../_services/question.service';
import {Question} from '../../../models/question';
import {PaginationDetail} from '../../../models/pagination/pagination-detail';

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
  questionList: Question[] = [];
  paginationDetail: PaginationDetail;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private partService: PartService,
    private questionService: QuestionService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.fetchQuestionList();
    this.courseService.getCourseById(this.courseId).subscribe(data => {
      this.currentCourse = data;
    });
  }

  trackById(index: number, item: any) {
    return item.id === index;
  }

  fetchQuestionList() {
    this.partId = Number(this.route.snapshot.paramMap.get('partId'));
    this.partService.getPartById(this.partId).subscribe(data => {
      this.currentPart = data;
    });
    this.questionService.getQuestionListByPart(0, 20, this.partId).subscribe(res => {
      this.questionList = res.data;
      this.paginationDetail = res.paginationDetails;
    });
  }

  goDetail(id: any) {
    this.router.navigate(['./admin/question-bank/question', id]);
  }
}
