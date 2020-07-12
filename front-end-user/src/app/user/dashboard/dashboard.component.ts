import {Component, OnInit} from '@angular/core';
import {ExamService} from '../../_services/exam.service';
import {ExamUser} from '../../models/exam-user';
import {delay} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listComing: ExamUser[] = [];
  listComplete: ExamUser[] = [];
  skeletonLoading = true;
  now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

  constructor(private examService: ExamService) {
  }

  ngOnInit(): void {
    this.getExam();

  }

  getExam() {
    this.examService.getAllExamByUser().subscribe(res => {
      res.filter(item => {

        item.isAvailable = this.examService.isAvailable(item.exam.finishExam);
        if (
          item.isAvailable
          && item.isStarted === false
          || (item.isFinished === false && item.isStarted === true)
        ) {
          this.listComing.push(item);
        } else {
          this.listComplete.push(item);
        }
      });
      this.skeletonLoading = false;
    });
  }
}
