import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamService} from '../../../_services/exam.service';
import {Exam} from '../../../models/exam';
import {ExamDetail} from '../../../models/exam-detail';
import {ToastrService} from 'ngx-toastr';
import {subscribeOn} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-test',
  templateUrl: './detail-test.component.html',
  styleUrls: ['./detail-test.component.scss']
})
export class DetailTestComponent implements OnInit {

  examId: number;
  exam: Exam;
  question: ExamDetail[] = [];
  showModalDelete = false;

  now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

  constructor(private route: ActivatedRoute,
              private examService: ExamService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getExamDetail();
  }

  getExamDetail() {
    this.examId = Number(this.route.snapshot.paramMap.get('id'));
    this.examService.getExamById(this.examId).subscribe(res => {
      this.exam = res;
    });
    this.examService.getExamQuestionDetail(this.examId).subscribe(data => {
      this.question = data;
    });
  }

  isAvailable() {
    const beginDate = moment(this.exam.beginExam).format('YYYY-MM-DD HH:mm:ss');
    if (moment(beginDate).isAfter(this.now)) {
      return true;
    }
    return false;
  }

  closeModal() {
    this.showModalDelete = false;
  }


  toggleModal() {
    this.showModalDelete = !this.showModalDelete;
  }

  confirmDelete() {
    this.examService.cancelExam(this.examId).subscribe(res => {
      this.toast.success('Đã huỷ bài test', 'Thành công');
      console.log('ok', res);
      setTimeout(() => {
        this.router.navigate(['/admin/tests']);
      }, 1000);
    }, error => {
      this.toast.error('Không thể huỷ bài test', 'Lỗi');
      console.log('loi: ', error);
    });
  }
}
