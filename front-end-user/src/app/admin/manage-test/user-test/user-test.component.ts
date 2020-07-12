import {Component, OnInit} from '@angular/core';
import {Exam} from '../../../models/exam';
import {ExamService} from '../../../_services/exam.service';
import {ExamResult} from '../../../models/exam-result';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.scss']
})
export class UserTestComponent implements OnInit {

  examResults: ExamResult[] = [];
  examId: number;

  constructor(private examService: ExamService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getExamList();
  }

  getExamList() {
    this.examId = Number(this.route.snapshot.paramMap.get('id'));
    this.examService.getExamResultListByExamId(this.examId).subscribe(data => {
      this.examResults = data;
    });
  }

  trackById(item, index) {
    return item.id === index;
  }

}
