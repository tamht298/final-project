import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-complete-exam',
  templateUrl: './list-complete-exam.component.html',
  styleUrls: ['./list-complete-exam.component.scss']
})
export class ListCompleteExamComponent implements OnInit {

  @Input() listTitle: string;
  @Input() listIcon: string;
  constructor() { }

  ngOnInit(): void {
  }

}
