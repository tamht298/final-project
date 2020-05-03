import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
  toggleUserDropdown = false;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
  }

  signOut() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
