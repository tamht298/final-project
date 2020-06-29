import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Exam} from '../../models/exam';
import {Question} from '../../models/question';
import {ExamService} from '../../_services/exam.service';

@Component({
  selector: 'app-exam-question',
  templateUrl: './exam-question.component.html',
  styleUrls: ['./exam-question.component.scss']
})
export class ExamQuestionComponent implements OnInit {

  examId: number;
  questions: Question[] = [];

  constructor(private activatedRoute: ActivatedRoute, private examService: ExamService) {
  }

  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion() {
    this.examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
    this.examService.getExamQuestion(this.examId).subscribe(res => {
      this.questions = res.questions;
      console.log(this.questions);
    });
  }

}
