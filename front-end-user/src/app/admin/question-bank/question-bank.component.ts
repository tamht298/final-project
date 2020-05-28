import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent implements OnInit {
  pageOptions: any = [
    {display: 20, num: 20},
    {display: 50, num: 50},
    {display: 100, num: 100},
    {display: 'Tất cả', num: ''},
  ];
  searchKeyWord: any;
  constructor() { }

  ngOnInit(): void {
  }

  changePageShow(value: any) {

  }

  searchUser(searchKeyWord: any) {
    
  }
}
