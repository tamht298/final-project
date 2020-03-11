import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit(): void {
    console.log('welcome: ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('welcome: ngOnDestroy');
  }

}
