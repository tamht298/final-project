import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService) {
  }

  isLoggedIn = false;
  defaultUrl = '../login';
  username = '';

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    if (user?.roles.includes('ROLE_STUDENT')) {
      this.isLoggedIn = true;
      this.defaultUrl = '../user/dashboard';
      this.username = user.username;
    }

    console.log('isLoggedIn:' + this.isLoggedIn);
    console.log('username:' + this.username);
  }


}
