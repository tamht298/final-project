import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ExamUser} from '../../models/exam-user';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.scss']
})
export class ExamCardComponent implements OnInit, OnChanges {
  @Input() examUser: any;
  @Input() type: string;

  icon: string;

  constructor() {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {

    switch (changes.type.currentValue) {
      case 'coming': {
        this.icon = 'text-green-500';
        break;
      }
      case 'complete': {
        this.icon = 'text-gray-500';
        break;
      }
    }
  }

  ngOnInit(): void {
  }

}
