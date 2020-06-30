import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Exam} from '../../models/exam';
import {Question} from '../../models/question';
import {ExamService} from '../../_services/exam.service';
import {AnswerSheet} from '../../models/answer-sheet';

@Component({
  selector: 'app-exam-question',
  templateUrl: './exam-question.component.html',
  styleUrls: ['./exam-question.component.scss']
})
export class ExamQuestionComponent implements OnInit {

  examId: number;
  questions: Question[] = [];
  toggleModal = false;
  answerSheets: AnswerSheet[] = [];

  constructor(private activatedRoute: ActivatedRoute, private examService: ExamService) {
  }

  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion() {
    this.examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
    this.examService.getExamQuestion(this.examId).subscribe(res => {
      this.questions = res.questions;
      console.log('answerSheets:', this.questions);
    });
  }

  selectAnswerTF(value: any, id: number) {

    this.questions.map(item => {
      if (item.id === id) {
        item.choices[0].choiceText = value.target.value;
        item.choices[0].isCorrected = 1;
      }
    });
    console.log('question: ', this.questions);
  }

  selectedAnswerMC(value: any, questionId: number, choiceId: number) {
    const question = this.questions.find(x => x.id === questionId);
    question.choices.map(x => x.id === choiceId ? (x.isCorrected = 1) : (x.isCorrected = 0));
    console.log('questions: ', this.questions);
  }

  selectedAnswerMS($event: Event, questionId: number, choiceId: number) {
    const question = this.questions.find(x => x.id === questionId);
    const choice = question.choices.find(y => y.id === choiceId);
    choice.isCorrected = choice.isCorrected ? 0 : 1;
    console.log('questions: ', this.questions);
  }

  showModal() {
    this.toggleModal = !this.toggleModal;
  }

  closeModal() {
    this.toggleModal = false;
  }
}
