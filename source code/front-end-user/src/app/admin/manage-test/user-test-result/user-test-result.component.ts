import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamService} from '../../../_services/exam.service';
import {ExamResult} from '../../../models/exam-result';
import {map} from 'rxjs/operators';
import {Location} from '@angular/common';
import {UserService} from '../../../_services/user.service';
import {UserAccount} from '../../../models/user-account';

@Component({
  selector: 'app-user-test-result',
  templateUrl: './user-test-result.component.html',
  styleUrls: ['./user-test-result.component.scss']
})
export class UserTestResultComponent implements OnInit {

  username: string;
  examId: number;
  result: ExamResult;
  user: UserAccount;
  constructor(private route: ActivatedRoute,
              private examService: ExamService,
              private userService: UserService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getResult();
  }

  getResult() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.examId = Number(this.route.snapshot.paramMap.get('id'));
    this.examService.getResultExamByUser(this.examId, this.username).subscribe(res => {
      this.result = res;
      console.log(res);
    });
    this.userService.getUserInfo(this.username).subscribe(res => {
      this.user = res.data;
    });
  }

  goBack() {
    this.location.back();
  }
}
