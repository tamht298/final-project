import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.scss']
})
export class AdminFooterComponent implements OnInit {
  date = new Date().getFullYear();

  constructor() {
  }

  ngOnInit(): void {
  }

}
