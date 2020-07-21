import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Exam} from '../../models/exam';
import {Question} from '../../models/question';
import {ExamService} from '../../_services/exam.service';
import {AnswerSheet} from '../../models/answer-sheet';
import {interval, Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-exam-question',
  templateUrl: './exam-question.component.html',
  styleUrls: ['./exam-question.component.scss']
})
export class ExamQuestionComponent implements OnInit, OnDestroy {
  examId: number;
  questions: Question[] = [];
  toggleModal = false;
  answerSheets: AnswerSheet[] = [];
  choicesSelected: any[] = [];
  countDown: Subscription;
  counter: number;
  tick = 1000;
  private subscription: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private router: Router) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.countDown.unsubscribe();
  }

  ngOnInit(): void {
    this.getQuestion();
  }

  startTimer() {
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter > 0) {
        --this.counter;
      } else {
        this.counter = 0;
        this.submit();
      }
    });
  }

  getQuestion() {
    this.examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
    this.examService.getExamQuestion(this.examId).subscribe(res => {
      this.questions = res.questions;
      this.counter = res.remainingTime;
      this.startTimer();
      this.subscription = interval(10000).subscribe(x => {
        this.saveToServer(false);
      });
    });
  }

  selectAnswerTF(value: any, id: number) {

    this.questions.map(item => {
      if (item.id === id) {
        item.choices[0].choiceText = value.target.value;
        item.choices[0].isCorrected = 1;
      }
    });
  }

  selectedAnswerMC(value: any, questionId: number, choiceId: number) {
    const question = this.questions.find(x => x.id === questionId);
    question.choices.map(x => x.id === choiceId ? (x.isCorrected = 1) : (x.isCorrected = 0));
  }

  selectedAnswerMS($event: Event, questionId: number, choiceId: number) {
    const question = this.questions.find(x => x.id === questionId);
    const choice = question.choices.find(y => y.id === choiceId);
    choice.isCorrected = choice.isCorrected ? 0 : 1;

  }

  showModal() {
    this.choicesSelected.length = 0;
    this.toggleModal = true;
    this.questions.forEach(value => {
      let selectedCount = 0;
      value.choices.filter(x => {
        if (x.isCorrected === 1) {
          selectedCount++;
        }
      });
      if (selectedCount > 0) {
        this.choicesSelected.push({selected: true});
      } else {
        this.choicesSelected.push({selected: false});
      }
    });
  }

  closeModal() {
    this.toggleModal = false;
  }

  submit() {
    const answerSheets: AnswerSheet[] = [];
    this.questions.forEach(value => {
      answerSheets.push(new AnswerSheet(value.id, value.choices, value.point));
    });
    this.examService.submitExamUser(this.examId, true, this.counter, answerSheets).subscribe(res => {
      console.log('ok');
      this.router.navigate(['../result'], {relativeTo: this.activatedRoute});
    }, error => {
      console.log('error');
    });
  }


  saveToServer(isFinished: boolean) {
    const answerSheets: AnswerSheet[] = [];
    this.questions.forEach(value => {
      answerSheets.push(new AnswerSheet(value.id, value.choices, value.point));
    });
    this.examService.submitExamUser(this.examId, isFinished, this.counter, answerSheets).subscribe(res => {
      console.log('ok');
    }, error => {
      console.log('error');
    });

    console.log(this.questions);

  }
}
