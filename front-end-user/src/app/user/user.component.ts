import {Component, OnInit} from '@angular/core';
import {ListExam} from '../models/list-exam';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  listCurrent: ListExam = {
    icon: '',

  }
  constructor() {
  }

  ngOnInit(): void {

  }

  initList(){

  }

}
