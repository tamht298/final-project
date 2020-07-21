import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnInit {

  toggleUserDropdown = false;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {

  }

  signOut() {
    console.log('hello');
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
