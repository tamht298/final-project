import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-result-circle',
  templateUrl: './result-circle.component.html',
  styleUrls: ['./result-circle.component.scss']

})
export class ResultCircleComponent implements OnInit, OnChanges {
  @Input() current: number;
  @Input() max: number;
  colors: any = {
    color: '',
    background: ''
  };

  constructor() {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes.current.currentValue < 50) {
      this.colors.color = '#ff4e42';
      this.colors.background = '#ffeeec';
    } else if (Number(changes.current) >= 50 && Number(changes.current) < 80) {
      this.colors.color = '#ffa400';
      this.colors.background = '#fff6e6';
    } else {
      this.colors.color = '#ffa400';
      this.colors.background = '#e7faf0';
    }
  }

  ngOnInit(): void {
  }

}
