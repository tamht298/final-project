import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamService} from '../../_services/exam.service';
import {ExamUser} from '../../models/exam-user';
import * as moment from 'moment';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {

  examId: number;
  examUser: ExamUser;
  canStart = false;
  isAvailable: boolean;

  constructor(private activatedRoute: ActivatedRoute, private examService: ExamService) {
  }

  ngOnInit(): void {
    this.examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
    this.getUserExam();
  }

  getUserExam() {
    this.examService.getExamUserById(Number(this.examId)).subscribe(res => {
      this.examUser = res;
      console.log(this.examUser);
      this.canStart = moment(this.examUser.exam.beginExam).isBefore(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
      this.isAvailable = this.examService.isAvailable(this.examUser.exam.finishExam);
    });
  }

}
