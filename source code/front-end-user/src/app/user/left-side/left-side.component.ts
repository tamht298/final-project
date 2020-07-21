import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {UserService} from '../../_services/user.service';
import {UserProfile} from '../../models/user-profile';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})
export class LeftSideComponent implements OnInit, OnChanges {
  @Input() userProfile: UserProfile;

  currentProfile: UserProfile;

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    const profile = changes.userProfile.currentValue;

    this.currentProfile = profile;


    console.log(profile);
  }

}
