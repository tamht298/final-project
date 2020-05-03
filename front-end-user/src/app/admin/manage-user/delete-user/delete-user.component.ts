import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserAccount} from '../../../models/user-account';
import {UserService} from '../../../_services/user.service';
import {PageResult} from '../../../models/page-result';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  @Input() userInfo: UserAccount;
  @Output() usersOutput = new EventEmitter<PageResult<UserAccount>>();

  pageResult: PageResult<UserAccount>;
  showModalDelete = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.showModalDelete = false;
  }

  toggleModalDelete() {
    this.showModalDelete = !this.showModalDelete;
  }

  confirmDelete(id: number) {
    this.userService.deleteTempUser(id).subscribe(data => {
      this.closeModal();
      this.userService.getUserDeletedList(false).subscribe(res => {
          this.pageResult = res;
          this.usersOutput.emit(this.pageResult);
        }
      );
    }, error => {
      console.error('Lỗi trong quá trình xoá người dùng');
    });
  }
}
