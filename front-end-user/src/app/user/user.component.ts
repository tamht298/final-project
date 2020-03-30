import {Component, OnInit} from '@angular/core';
import {ListExam} from '../models/list-exam';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  listCurrent: ListExam = {
    listIcon: 'fa fa-bookmark text-green-600',
    listTitle: 'Bài thi đang diễn ra',

  };
  listComing: ListExam = {
    listIcon: 'fa fa-bookmark text-yellow-600',
    listTitle: 'Bài thi sắp tới'
  };
  listComplete: ListExam = {
    listIcon: 'fa fa-bookmark text-gray-600',
    listTitle: 'Bài thi hoàn thành'
  };

  currentUser;
  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    console.log(this.currentUser);
  }

  signOut() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
