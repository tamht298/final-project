import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  preLoading = false;


  constructor(private router: Router, private authService: AuthService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService?.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if (this.roles.includes('ROLE_STUDENT')) {
        this.toLogin();
      }
    }
  }

  toLogin() {
    this.router.navigate(['/user']).then((e) => {
      if (e) {
        console.log('login ok');
      } else {
        console.log('login fail');
      }
    });
  }

  onSubmit() {
    this.preLoading = true;
    this.authService.login(this.form).subscribe(
      data => {
        this.preLoading = false;
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);
        console.log('Login ok');
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        if (this.roles.includes('ROLE_STUDENT')) {
          this.toLogin();
        }
      },
      err => {
        console.error('Login failed');
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.preLoading = false;
      }
    );
  }


}
