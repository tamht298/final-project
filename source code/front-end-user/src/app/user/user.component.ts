import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {UserService} from '../_services/user.service';
import {UserProfile} from '../models/user-profile';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  currentUser;
  userProfile: UserProfile;
  toggledMenu = false;

  constructor(private tokenStorageService: TokenStorageService, private  userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.userService.getUserInfo(this.currentUser.username).subscribe((res) => {
      this.userProfile = res.data.profile;
    });
  }

  signOut() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  toggleMenu() {
    this.toggledMenu = !this.toggledMenu;
  }


}
