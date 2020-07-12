import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../../../_services/question.service';
import {Question} from '../../../models/question';
import {CourseService} from '../../../_services/course.service';
import {PartService} from '../../../_services/part.service';
import {Part} from '../../../models/part';
import {Course} from '../../../models/course';
import {QuestionType} from '../../../models/question-type';
import {QuestionTypeService} from '../../../_services/question-type.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

  questionId: number;
  questionInfo: Question;
  course: Course;
  difficultyLevel: number;
  imgDefaultUrl = '../../assets/images/avatar-default.png';
  questionTypeList: QuestionType[] = [];

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private courseService: CourseService,
              private questionTypeService: QuestionTypeService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion() {
    this.questionId = Number(this.route.snapshot.paramMap.get('questionId'));

    this.questionService.getQuestionById(this.questionId).subscribe(res => {
      this.questionInfo = res;
      switch (this.questionInfo.difficultyLevel) {
        case 'EASY': {
          this.difficultyLevel = 0;
          break;
        }
        case 'MEDIUM': {
          this.difficultyLevel = 1;
          break;
        }
        case 'HARD': {
          this.difficultyLevel = 2;
          break;
        }
      }
      this.courseService.getCourseByPartId(this.questionInfo.part.id).subscribe(data => {
        this.course = data;
      });
    });
  }

  goBack() {
    this.location.back();
  }
}
