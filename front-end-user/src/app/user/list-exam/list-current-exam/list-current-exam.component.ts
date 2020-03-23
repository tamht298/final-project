import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-current-exam',
  templateUrl: './list-current-exam.component.html',
  styleUrls: ['./list-current-exam.component.scss']
})
export class ListCurrentExamComponent implements OnInit {

  @Input() listTitle: string;
  @Input() listIcon: string;
  constructor() { }

  ngOnInit(): void {
  }

}
