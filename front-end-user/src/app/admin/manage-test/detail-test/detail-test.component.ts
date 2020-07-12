import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamService} from '../../../_services/exam.service';
import {Exam} from '../../../models/exam';
import {ExamDetail} from '../../../models/exam-detail';

@Component({
  selector: 'app-detail-test',
  templateUrl: './detail-test.component.html',
  styleUrls: ['./detail-test.component.scss']
})
export class DetailTestComponent implements OnInit {

  examId: number;
  exam: Exam;
  question: ExamDetail[] = [];

  constructor(private route: ActivatedRoute,
              private examService: ExamService) {
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

}
