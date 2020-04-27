import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {UserRole} from '../models/user-role.enum';

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
  returnUrl: string;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService?.getToken();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(user);
      if (this.roles.includes(UserRole.ROLE_ADMIN)) {
        this.toLogin(UserRole.ROLE_ADMIN);
      } else if (this.roles.includes(UserRole.ROLE_STUDENT)) {
        this.toLogin(UserRole.ROLE_STUDENT);
      }

    }
  }

  toLogin(role: string) {
    switch (role) {
      case UserRole.ROLE_STUDENT: {
        this.router.navigateByUrl(this.returnUrl);
        break;
      }
      case UserRole.ROLE_ADMIN: {
        this.router.navigateByUrl(this.returnUrl);
      }
    }
    // this.router.navigate(['/user']).then((e) => {
    //   if (e) {
    //     console.log('login ok');
    //   } else {
    //     console.log('login fail');
    //   }
    // });
  }

  onSubmit() {
    this.preLoading = true;
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.roles = this.tokenStorageService.getUser().roles;
        if (this.roles.includes(UserRole.ROLE_ADMIN.toString())) {
          this.toLogin(UserRole.ROLE_ADMIN.toString());
        }
        if (this.roles.includes('ROLE_STUDENT')) {
          this.toLogin('ROLE_STUDENT');
        }
      },
      err => {
        console.error(err);
        this.errorMessage = err;
        console.log(this.errorMessage);
        this.isLoginFailed = true;
        this.preLoading = false;
      }
    );
  }


}
