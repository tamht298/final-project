import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {UserRole} from '../models/user-role.enum';

@Component({
  selector: 'app-welcome',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  defaultUrl = '../login';
  username = '';

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();

    this.username = user?.username;
    if (this.username) {
      this.isLoggedIn = true;
      if (user?.roles.includes(UserRole.ROLE_ADMIN)) {
        this.defaultUrl = '../admin';
      }
      if (user?.roles.includes(UserRole.ROLE_LECTURE)) {
        this.defaultUrl = '../admin';
      }
      if (user?.roles.includes(UserRole.ROLE_STUDENT)) {
        this.defaultUrl = '../user/dashboard';
      }
    }

  }


}
