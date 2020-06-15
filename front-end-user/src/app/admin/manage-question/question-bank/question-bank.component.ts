import {Component, OnInit} from '@angular/core';
import {Question} from '../../../models/question';
import {PaginationDetail} from '../../../models/pagination/pagination-detail';

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
  showAddModal = false;
  private questionList: Question[];
  private paginationDetail: PaginationDetail;

  constructor() {
  }

  ngOnInit(): void {
  }

  changePageShow(value: any) {

  }

  searchUser(searchKeyWord: any) {

  }

  fetchQuestionsAfterCRUD($event: any) {
    this.questionList = $event.data;
    this.paginationDetail = $event.paginationDetails;
  }

  toggleModalAdd() {
    this.showAddModal = !this.showAddModal;
    console.log(this.showAddModal);
  }
}
