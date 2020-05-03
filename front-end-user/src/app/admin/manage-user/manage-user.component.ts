import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {UserAccount} from '../../models/user-account';
import {PaginationDetail} from '../../models/pagination/pagination-detail';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  userList: UserAccount[] = [];
  paginationDetail: PaginationDetail;
  checkedAll: boolean;

  constructor(private userService: UserService) {
  }


  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList() {
    this.userService.getUserDeletedList(false).subscribe(res => {
      console.table(res);
      this.userList = res.data;
      this.paginationDetail = res.paginationDetails;
    }, error => {
      console.error('Lỗi');
    });
  }

  trackById(index: number, item) {
    return item.id;
  }

  exportUserToExcel() {

  }

  goPreviousPage() {
    const isFirstPage: boolean = this.paginationDetail.isFirstPage;
    if (!isFirstPage) {
      this.userService.getUserListDeletedByPage(this.paginationDetail.previousPage.pageNumber, false).subscribe(res => {
        this.userList = res.data;
        this.paginationDetail = res.paginationDetails;
        console.table(this.userList);
      });
      this.checkedAll = false;
    }

  }

  goNextPage() {
    const isLastPage = !this.paginationDetail.nextPage.available;
    if (!isLastPage) {
      this.checkedAll = false;
      this.userService.getUserListDeletedByPage(this.paginationDetail.nextPage.pageNumber, false).subscribe(res => {
        this.userList = res.data;
        this.paginationDetail = res.paginationDetails;
        console.table(this.paginationDetail);
      });
    }
  }

  fetchUsersAfterDeleting($event: any) {
    this.userList = $event.data;
    this.paginationDetail = $event.paginationDetails;
  }

  checkIfAllSelected(event) {
    this.checkedAll = this.userList.every(item => item.deleted === true);
  }


  selectAll(event) {
    const checked = event.target.checked;
    this.userList.forEach(item => item.deleted = checked);
  }
}
