import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit(): void {
    console.log('login: ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('login: ngOnDestroy');
  }

}
