import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss']
})
export class NavSidebarComponent implements OnInit {

  collapseShow = 'hidden';
  userCollapseShow = false;
  questionBankCollapseShow = false;

  constructor() {
  }

  ngOnInit() {
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
