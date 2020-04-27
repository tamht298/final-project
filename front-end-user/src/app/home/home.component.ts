import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {UserRole} from '../models/user-role.enum';

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

    this.username = user?.username;
    if (user?.roles.includes(UserRole.ROLE_ADMIN)) {

      this.isLoggedIn = true;
      this.defaultUrl = '../admin';
    }
    if (user?.roles.includes('ROLE_STUDENT')) {
      this.isLoggedIn = true;
      this.defaultUrl = '../user/dashboard';
    }

  }


}
