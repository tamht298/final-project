import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamService} from '../../_services/exam.service';
import {ExamUser} from '../../models/exam-user';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {

  examUserId: string;
  examUser: ExamUser;

  constructor(private activatedRoute: ActivatedRoute, private examService: ExamService) {
  }

  ngOnInit(): void {
    this.examUserId = this.activatedRoute.snapshot.paramMap.get('examUserId');
    this.getUserExam();
  }

  getUserExam() {
    this.examService.getExamUserById(Number(this.examUserId)).subscribe(res => {
      this.examUser = res;
    });
  }

}
