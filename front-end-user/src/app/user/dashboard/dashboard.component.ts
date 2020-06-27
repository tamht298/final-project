import { Component, OnInit } from '@angular/core';
import {ListExam} from '../../models/list-exam';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listComing: ListExam = {
    listIcon: 'fa fa-bookmark text-green-600',
    listTitle: 'Bài thi mới'
  };
  listComplete: ListExam = {
    listIcon: 'fa fa-bookmark text-gray-600',
    listTitle: 'Bài thi đã kết thúc'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
