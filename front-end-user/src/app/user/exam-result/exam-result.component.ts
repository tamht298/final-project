import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamService} from '../../_services/exam.service';
import {ExamResult} from '../../models/exam-result';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent implements OnInit {

  examId: number;
  result: ExamResult;

  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService) {
  }

  ngOnInit(): void {
    this.examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
    this.getResult(this.examId);

  }

  getResult(examId: number) {
    this.examService.getExamUserResult(examId).subscribe(value => {
      this.result = value;
    });
  }

}
