import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {UserRole} from '../models/user-role.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  fEmail: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  preLoading = false;
  returnUrl: string;
  // tslint:disable-next-line:max-line-length
  openTab = 1;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private fb: FormBuilder,
              private toast: ToastrService) {
  }

  get email() {
    return this.fEmail.get('email');
  }

  ngOnInit(): void {
    this.fEmail = this.fb.group({
      email: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
    });

    this.isLoggedIn = !!this.tokenStorageService?.getToken();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(user);
      if (this.roles.includes(UserRole.ROLE_ADMIN)) {
        this.toLogin(UserRole.ROLE_ADMIN);
      } else if (this.roles.includes(UserRole.ROLE_LECTURE)) {
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
        break;
      }
      case UserRole.ROLE_LECTURE: {
        this.router.navigateByUrl(this.returnUrl);
        break;
      }
    }
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
        if (this.roles.includes(UserRole.ROLE_ADMIN)) {
          this.toLogin(UserRole.ROLE_ADMIN);
        } else if (this.roles.includes(UserRole.ROLE_STUDENT)) {
          this.toLogin(UserRole.ROLE_STUDENT);
        } else if (this.roles.includes(UserRole.ROLE_LECTURE)) {
          this.toLogin(UserRole.ROLE_LECTURE);
        }
      },
      err => {
        if (err.Status === 400) {
          this.errorMessage = '400';
          return;
        }
        this.errorMessage = err;
        this.isLoginFailed = true;
        this.preLoading = false;
      }
    );
  }

  onSubmitEmail() {
    this.authService.sendRequest(this.email.value).subscribe(res => {
      console.log(res);
      if (res.operationResult === 'SUCCESS') {
        this.toast.success('Kiểm tra email của bạn', 'Thành công');
      } else if (res.operationResult === 'ERROR') {
        this.toast.error('Email không tồn tại trong hệ thống', 'Lỗi');
      }
    });
  }

}
