import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {UserRole} from '../../models/user-role.enum';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss']
})
export class NavSidebarComponent implements OnInit {

  collapseShow = 'hidden';
  userCollapseShow = false;
  questionBankCollapseShow = false;
  userRoles: string[] = [];
  roleAdmin: boolean;
  roleLecturer: boolean;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.userRoles = this.tokenStorageService.getUser().roles;
    if (this.userRoles.includes(UserRole.ROLE_ADMIN.toString())) {
      this.roleAdmin = true;
    } else if (this.userRoles.includes(UserRole.ROLE_LECTURE.toString())) {
      this.roleLecturer = false;
    } else if (this.userRoles.includes(UserRole.ROLE_STUDENT.toString())) {
      this.tokenStorageService.signOut();
      window.location.reload();
    }
  }

  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }

  userCollapse() {
    this.userCollapseShow = !this.userCollapseShow;
  }

  questionBankCollapse() {
    this.questionBankCollapseShow = !this.questionBankCollapseShow;
  }
}
