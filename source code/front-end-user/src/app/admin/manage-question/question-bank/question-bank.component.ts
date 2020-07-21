import {Component, OnInit} from '@angular/core';
import {Question} from '../../../models/question';
import {PaginationDetail} from '../../../models/pagination/pagination-detail';
import {QuestionService} from '../../../_services/question.service';
import {Course} from '../../../models/course';
import {CourseService} from '../../../_services/course.service';
import {PartService} from '../../../_services/part.service';
import {Part} from '../../../models/part';
import {Router} from '@angular/router';
import {delay, switchMap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent implements OnInit {
  pageOptions: any = [
    {display: 20, num: 20},
    {display: 50, num: 50},
    {display: 100, num: 100},
    {display: 'Tất cả', num: ''},
  ];
  skeleton = true;
  showAddModal = false;
  questionList: Question[] = [];
  paginationDetail: PaginationDetail;
  pageCountShowing = 20;
  courseList: Course[] = [];
  selectedCourseId = 0;
  selectedPartId = 0;
  partList: Part[] = [];

  constructor(private questionService: QuestionService,
              private courseService: CourseService,
              private partService: PartService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.fetchQuestionList();
    this.fetchCourse();
  }

  fetchCourse() {
    this.courseService.getCourseList().subscribe(res => {
      this.courseList = res;
    });
  }

  fetchQuestionList() {
    this.questionService.getQuestionListByPart(0, 20, 0).pipe(delay(500)).subscribe(res => {
      this.questionList = res.data;
      this.paginationDetail = res.paginationDetails;
      this.skeleton = false;
    });
  }

  fetchQuestionsAfterCRUD($event: any) {
    this.questionList = $event.data;
    this.paginationDetail = $event.paginationDetails;
  }

  toggleModalAdd() {
    this.showAddModal = !this.showAddModal;
    console.log(this.showAddModal);
  }

  trackById(index: number, item) {
    return item.id;
  }

  goPreviousPage() {
    const isFirstPage: boolean = this.paginationDetail.isFirstPage;
    if (!isFirstPage) {
      this.skeleton = true;
      this.questionService.getQuestionListByPart(this.paginationDetail.previousPage.pageNumber, this.pageCountShowing, 0)
        .pipe(delay(1000)).subscribe(res => {
        this.questionList = res.data;
        this.paginationDetail = res.paginationDetails;
        this.skeleton = false;
      });
      ;
    }

  }

  goNextPage() {
    console.log(this.pageCountShowing);
    const isLastPage = !this.paginationDetail.nextPage.available;
    if (!isLastPage) {
      this.skeleton = true;
      this.questionService.getQuestionListByPart(this.paginationDetail.nextPage.pageNumber, this.pageCountShowing, 0
      ).pipe(delay(1000)).subscribe(res => {
        this.questionList = res.data;
        this.paginationDetail = res.paginationDetails;
        this.skeleton = false;
      });
    }
  }

  changePageShow(value: any) {
    this.pageCountShowing = value;
    if (!value) {
      this.skeleton = true;
      this.questionService.getQuestionListByPart(0, this.paginationDetail.totalCount, 0).subscribe(res => {
        this.questionList = res.data;
        this.paginationDetail = res.paginationDetails;
        this.skeleton = false;
      });
    } else {
      this.skeleton = true;
      this.questionService.getQuestionListByPart(0, value, 0).subscribe(res => {
        this.questionList = res.data;
        this.paginationDetail = res.paginationDetails;
        this.skeleton = false;
      });
    }
  }

  changeCourse(event) {
    this.selectedCourseId = event.target.value;
    this.skeleton = true;
    this.partService.getPartsByCourse(this.selectedCourseId).subscribe(res => {
      this.partList = res;
    });
  }

  changePart(event) {
    const selectPartId = event.target.value;
    this.skeleton = true;
    if (this.selectedCourseId === 0) {
      this.fetchQuestionList();
      return;
    }
    this.questionService.getQuestionListByPart(0, this.pageCountShowing, selectPartId).subscribe(res => {
      this.questionList = res.data;
      this.paginationDetail = res.paginationDetails;
      this.skeleton = false;
    });
  }

  goDeTail(id: number) {
    this.router.navigate(['admin/question-bank/question', id]);
  }

  changeDeleted(ques: Question) {
    ques.deleted = !ques.deleted;

    this.questionService.deleteQuestion(ques.id, ques.deleted)
      .pipe(switchMap(res => this.questionService.getQuestionListByPart(0, 20, this.selectedPartId)))
      .subscribe(res => {
        this.toast.success('Đã thay đổi trạng thái câu hỏi', 'Thành công');
      }, error => {
        ques.deleted = !ques.deleted;
        this.toast.error('Không thể thay đổi trạng thái', 'Lỗi');
      });
  }
}
