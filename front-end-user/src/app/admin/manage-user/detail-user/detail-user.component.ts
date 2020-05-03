import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserAccount} from '../../../models/user-account';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  showModalDetail = false;
  @Input() userInfo: UserAccount;

  constructor() {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.showModalDetail = false;
  }

  toggleModalDetail() {
    this.showModalDetail = !this.showModalDetail;
  }
}
