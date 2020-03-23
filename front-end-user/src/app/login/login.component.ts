import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private preLoading: boolean;
  alertTile: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log('login: ngOnInit');
    this.alertTile = 'Thành công';
  }

  onLogin() {
    this.router.navigate(['/user']).then((e) => {
      if (e) {
        console.log('login ok');
      } else {
        console.log('login fail');
      }
    });
  }
}
