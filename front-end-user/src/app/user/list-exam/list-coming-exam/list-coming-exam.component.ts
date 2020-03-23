import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-coming-exam',
  templateUrl: './list-coming-exam.component.html',
  styleUrls: ['./list-coming-exam.component.scss']
})
export class ListComingExamComponent implements OnInit {

  @Input() listTitle: string;
  @Input() listIcon: string;
  constructor() { }

  ngOnInit(): void {

  }

}
