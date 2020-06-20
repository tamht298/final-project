import {Component, OnInit} from '@angular/core';
import {Course} from '../../../models/course';
import {CourseService} from '../../../_services/course.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Part} from '../../../models/part';
import {PartService} from '../../../_services/part.service';
import * as moment from 'moment';
import {Question} from '../../../models/question';
import {QuestionService} from '../../../_services/question.service';
import {PaginationDetail} from '../../../models/pagination/pagination-detail';
import {identifierModuleUrl} from '@angular/compiler';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {

  courseList: Course[] = [];
  selectedCourseId = -1;
  partList: Part[] = [];
  selectedPart = -1;
  beginTime;
  paginationDetail: PaginationDetail;
  rfAdd: FormGroup;
  questionList: Question[] = [];
  selectedPartId = -1;
  countQuestionSelected = 0;
  totalPointQuestionSelected = 0;
  checkedAll = false;
  questionListSelected: Question[] = [];

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private partService: PartService,
    private questionService: QuestionService) {
  }

  get testTitle() {
    return this.rfAdd.get('testTitle');
  }

  get timeBegin() {
    return this.rfAdd.get('timeBegin');
  }

  get timeEnd() {
    return this.rfAdd.get('timeEnd');
  }

  get timeDuration() {
    return this.rfAdd.get('timeDuration');
  }

  ngOnInit(): void {
    this.rfAdd = this.fb.group({
        testTitle: [''],
        timeBegin: [''],
        timeEnd: [''],
        timeDuration: [0]
      }
    );
    this.courseService.getCourseList().subscribe(res => {
      this.courseList = res;
      this.selectedPartId = -1;
    });
  }

  onSubmit() {
    console.log('title: ', this.testTitle.value);
    console.log('course: ', this.selectedCourseId);
    console.log('part: ', this.selectedPartId);
    console.log('timeDuration: ', this.timeDuration.value);
    console.log('timeBegin: ', moment(this.timeBegin.value).format('YYYY-MM-DD hh:mm:ss'));
    console.log('timeEnd: ', moment(this.timeEnd.value).format('YYYY-MM-DD hh:mm:ss'));
    console.log('questionListSelected', this.questionListSelected);
  }

  changeCourse(event) {
    this.selectedCourseId = event.target.value;
    this.selectedPartId = -1;
    if (this.selectedCourseId > 0) {
      this.partService.getPartByCourse(this.selectedCourseId).subscribe(res => {
        this.partList = res;

      });
    }
    console.log(this.selectedPartId);
  }

  getBeginTime(event) {

    const date = moment(event.target.value).format('YYYY-MM-DD HH:mm:ss');
    console.log(date);
  }

  trackById(item, index) {
    return item.id === index;
  }

  changePart(event) {
    this.selectedPartId = event.target.value;
    if (this.selectedPartId > 0) {
      this.questionService.getQuestionListByPart(0, 20, this.selectedPartId).subscribe(res => {
        this.questionList = res.data;
        this.paginationDetail = res.paginationDetails;
        this.questionList.forEach(object => object.isSelected = false);
        console.log(this.questionList);
      });
    } else {
      this.selectedPartId = 0;
    }

  }

  checkBoxAll(event) {
    if (this.checkedAll === true) {
      if (this.questionListSelected.length === 0) {
        this.questionListSelected.push(...this.questionList);
      } else if (this.questionListSelected.length === this.questionList.length) {
        return;
      } else {
        this.questionList.forEach(item => {
          const index = this.questionListSelected.findIndex(i => i.id === item.id);
          if (index === -1) {
            this.questionListSelected.push(item);
          }
        });
      }
    } else {
      this.questionListSelected.length = 0;
    }
    this.questionList.forEach(obj => obj.isSelected = this.checkedAll);

  }

  getTotalPoint() {
    return this.questionListSelected.reduce((total: number, currentQ: Question) => {
      return total += currentQ.point;
    }, 0);
  }

  changeChecked(ques: Question) {
    if (ques.isSelected === true) {
      this.questionListSelected.push(ques);
    } else {
      const index = this.questionListSelected.findIndex(item => item.id === ques.id);
      this.questionListSelected.splice(index, 1);
    }

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questionListSelected, event.previousIndex, event.currentIndex);
  }
}
