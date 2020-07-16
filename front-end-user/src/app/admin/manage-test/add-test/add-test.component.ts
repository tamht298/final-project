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
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Exam} from '../../../models/exam';
import {Intake} from '../../../models/intake';
import {IntakeService} from '../../../_services/intake.service';
import {ExamService} from '../../../_services/exam.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

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
  questionDataJson: any[] = [];
  intakeList: Intake[] = [];
  selectedIntake = -1;

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private partService: PartService,
    private questionService: QuestionService,
    private intakeService: IntakeService,
    private examService: ExamService,
    private toast: ToastrService,
    private router: Router) {
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

  get locked() {
    return this.rfAdd.get('locked');
  }

  get isShuffle() {
    return this.rfAdd.get('isShuffle');
  }

  get intake() {
    return this.rfAdd.get('intake');
  }

  ngOnInit(): void {
    this.rfAdd = this.fb.group({
        testTitle: [''],
        timeBegin: [''],
        timeEnd: [''],
        timeDuration: [0],
        locked: [false],
        isShuffle: [false],
        intake: [-1]
      }
    );


    this.intakeService.getIntakeList().subscribe(res => {
      this.intakeList = res;
    });
  }

  onSubmit() {
    if (this.getTotalPoint() !== 100) {
      this.toast.error('Điểm số không phù hợp', 'Lỗi');
      return;
    }
    this.questionDataJson.length = 0;
    this.questionListSelected.forEach(item => {
      this.questionDataJson.push({questionId: item.id, point: item.point});
    });

    const newExam = new Exam(
      this.testTitle.value,
      this.timeDuration.value,
      moment(this.timeBegin.value).format('YYYY-MM-DD HH:mm:ss'),
      moment(this.timeEnd.value).format('YYYY-MM-DD HH:mm:ss'),
      JSON.stringify(this.questionDataJson));

    this.examService.createExam(this.intake.value, this.selectedPartId, this.isShuffle.value, this.locked.value, newExam).subscribe(res => {
      this.toast.success('Đã tạo bài kiểm tra', 'Thành công');
      setTimeout(() => this.goToExamManagePage(), 1000);
    });
  }

  changeCourse(event) {
    this.selectedCourseId = event.target.value;
    this.selectedPartId = -1;
    if (this.selectedCourseId > 0) {
      this.partService.getPartsByCourse(this.selectedCourseId).subscribe(res => {
        this.partList = res;

      });
    }
    console.log(this.selectedPartId);
  }

  getBeginTime(event) {

    const date = moment(event.target.value).format('YYYY-MM-DD HH:mm:ss A');
    console.log(date);
  }

  trackById(item, index) {
    return item.id === index;
  }

  goToExamManagePage() {
    this.router.navigate(['/admin/tests']);
  }

  changePart(event) {
    this.selectedPartId = event.target.value;
    if (this.selectedPartId > 0) {
      this.questionService.getQuestionListByPartNotDeleted(0, 20, this.selectedPartId).subscribe(res => {
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
      if (this.questionListSelected.length === this.questionList.length) {
        this.checkedAll = true;
      }
    } else {
      const index = this.questionListSelected.findIndex(item => item.id === ques.id);
      this.questionListSelected.splice(index, 1);
      this.checkedAll = false;
    }

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questionListSelected, event.previousIndex, event.currentIndex);
  }

  changeIntake(event) {
    if (event.target.value !== -1) {
      this.courseService.getCourseListByIntakeId(event.target.value).subscribe(res => {
        this.courseList = res;
        this.selectedPartId = -1;
      });
    }
  }

  removeSelectedQuestion(ques: Question) {
    const index = this.questionListSelected.findIndex(item => item.id === ques.id);
    this.questionListSelected.splice(index, 1);
    ques.isSelected = !ques.isSelected;
    this.checkedAll = false;

  }
}
