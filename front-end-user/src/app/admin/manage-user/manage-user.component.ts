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

  pageOptions: any = [
    {display: 20, num: 20},
    {display: 50, num: 50},
    {display: 100, num: 100},
    {display: 'Tất cả', num: ''},
  ];
  searchKeyWord = '';

  constructor(private userService: UserService) {
  }


  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList() {
    this.userService.searchUserListDeletedByPage(0, 20, this.searchKeyWord, false).subscribe(res => {
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
    this.userService.exportExcel(false).subscribe( response => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([response], {type: 'text/csv'}));
      link.download = 'users.csv';
      link.click();
    });
  }

  goPreviousPage() {
    const isFirstPage: boolean = this.paginationDetail.isFirstPage;
    if (!isFirstPage) {
      this.userService.searchUserListDeletedByPage(this.paginationDetail.previousPage.pageNumber, this.paginationDetail.pageCount, this.searchKeyWord, false)
        .subscribe(res => {
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
      this.userService.searchUserListDeletedByPage(this.paginationDetail.nextPage.pageNumber, this.paginationDetail.pageCount, this.searchKeyWord, false
      ).subscribe(res => {
        this.userList = res.data;
        this.paginationDetail = res.paginationDetails;
        console.table(this.paginationDetail);
      });
    }
  }

  fetchUsersAfterCRUD($event: any) {
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

  changePageShow(value: any) {
    console.log(value);
    if (!value) {
      this.userService.getUserListDeletedByPage(0, this.paginationDetail.totalCount, false).subscribe(res => {
        this.userList = res.data;
        this.paginationDetail = res.paginationDetails;
      });
    } else {
      this.userService.getUserListDeletedByPage(0, value, false).subscribe(res => {
        this.userList = res.data;
        this.paginationDetail = res.paginationDetails;
      });
    }
  }

  searchUser(searchKeyWord: string) {
    console.log(searchKeyWord);
    this.userService.searchUserListDeletedByPage(0, 20, searchKeyWord, false).subscribe(res => {
      this.userList = res.data;
      this.paginationDetail = res.paginationDetails;
    });
  }
}
