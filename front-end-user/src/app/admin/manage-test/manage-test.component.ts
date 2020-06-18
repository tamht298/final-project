import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-manage-test',
  templateUrl: './manage-test.component.html',
  styleUrls: ['./manage-test.component.scss']
})
export class ManageTestComponent implements OnInit {
  testList: any;


  constructor() {
  }

  ngOnInit(): void {
  }

  trackById(item, index) {
    return item.id === index;
  }

}
