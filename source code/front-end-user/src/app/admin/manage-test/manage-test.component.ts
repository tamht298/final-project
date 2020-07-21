import {Component, OnInit} from '@angular/core';
import {ExamService} from '../../_services/exam.service';
import {Exam} from '../../models/exam';
import {PaginationDetail} from '../../models/pagination/pagination-detail';
import {delay} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-test',
  templateUrl: './manage-test.component.html',
  styleUrls: ['./manage-test.component.scss']
})
export class ManageTestComponent implements OnInit {
  examList: Exam[] = [];
  paginationDetail: PaginationDetail;
  skeleton = true;
  now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

  pageOptions: any = [
    {display: 20, num: 20},
    {display: 50, num: 50},
    {display: 100, num: 100},
    {display: 'Tất cả', num: ''},
  ];
  pageCountShowing = 20;

  constructor(private examService: ExamService) {
  }

  ngOnInit(): void {
    this.fetchExamList();
  }

  fetchExamList() {
    this.examService.getAllExams(0, 20).subscribe(res => {
      this.examList = res.data;
      this.paginationDetail = res.paginationDetails;
      this.skeleton = false;
      console.log(this.examList);
    });
  }

  trackById(item, index) {
    return item.id === index;
  }

  changePageShow(value: any) {
    this.pageCountShowing = value;
    if (!value) {
      this.skeleton = true;
      this.examService.getAllExams(0, this.paginationDetail.totalCount).subscribe(res => {
        this.examList = res.data;
        this.paginationDetail = res.paginationDetails;
        this.skeleton = false;
      });
    } else {
      this.skeleton = true;
      this.examService.getAllExams(0, value).subscribe(res => {
        this.examList = res.data;
        this.paginationDetail = res.paginationDetails;
        this.skeleton = false;
      });
    }
  }

  getStatusExam(exam: Exam) {
    const beginDate = moment(exam.beginExam).format('YYYY-MM-DD HH:mm:ss');
    const finishDate = moment(exam.finishExam).format('YYYY-MM-DD HH:mm:ss');

    if (moment(beginDate).isAfter(this.now)) {
      return 0;
    } else if (moment(finishDate).isBefore(this.now)) {
      return -1;
    }
    return 1;
  }

  goPreviousPage() {
    const isFirstPage: boolean = this.paginationDetail.isFirstPage;
    if (!isFirstPage) {
      this.examService.getAllExams(this.paginationDetail.previousPage.pageNumber, this.pageCountShowing)
        .subscribe(res => {
          this.examList = res.data;
          this.paginationDetail = res.paginationDetails;
        });
    }

  }

  goNextPage() {
    const isLastPage = !this.paginationDetail.nextPage.available;
    if (!isLastPage) {
      this.examService.getAllExams(this.paginationDetail.nextPage.pageNumber, this.pageCountShowing
      ).subscribe(res => {
        this.examList = res.data;
        this.paginationDetail = res.paginationDetails;
      });
    }
  }
}
