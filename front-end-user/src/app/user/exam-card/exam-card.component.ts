import {Component, Input, OnInit} from '@angular/core';
import {ExamUser} from '../../models/exam-user';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.scss']
})
export class ExamCardComponent implements OnInit {
  @Input() examUser: any;

  constructor() { }

  ngOnInit(): void {
  }

}
