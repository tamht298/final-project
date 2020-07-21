import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() active = false;
  @Input() tabTitle: string;
  openTab = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

}
