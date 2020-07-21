import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserAccount} from '../../../models/user-account';
import {UserService} from '../../../_services/user.service';
import {PageResult} from '../../../models/page-result';
import {switchMap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private userService: UserService, private toastr: ToastrService) {
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
    this.userInfo.deleted = !this.userInfo.deleted;
    this.userService.deleteUser(id, !this.userInfo.deleted)
      .pipe(switchMap(res => this.userService.getUserList(0, 20)))
      .subscribe(res => {
        this.closeModal();
        this.showSuccess();
        this.pageResult = res;
        this.usersOutput.emit(this.pageResult);

      });
  }

  showSuccess() {
    this.toastr.success('Người dùng đã được xoá!', 'Thành công', );
  }
}
