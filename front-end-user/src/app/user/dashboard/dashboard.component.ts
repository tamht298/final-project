import {Component, OnInit} from '@angular/core';
import {ExamService} from '../../_services/exam.service';
import {ExamUser} from '../../models/exam-user';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listComing: ExamUser[] = [];
  listComplete: ExamUser[] = [];
  skeletonLoading = true;

  constructor(private examService: ExamService) {
  }

  ngOnInit(): void {
    this.getExam();

  }

  getExam() {
    this.examService.getAllExamByUser().pipe(delay(1000)).subscribe(res => {
      res.filter(item => {
        if (item.isStarted === false || (item.isFinished === false && item.isStarted === true)) {
          this.listComing.push(item);
        } else {
          this.listComplete.push(item);
        }
      });
      this.skeletonLoading = false;
      console.log('listComing: ', this.listComing);
    });
  }
}
