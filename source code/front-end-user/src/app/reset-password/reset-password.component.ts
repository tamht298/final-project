import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  f: FormGroup;
  preLoading = false;
  tokenString: string;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private toast: ToastrService) {
  }

  get password() {
    return this.f.get('password');
  }

  get confirmPassword() {
    return this.f.get('confirmPassword');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.tokenString = params.token;
    });

    this.f = this.fb.group({
      password: new FormControl(null, Validators.pattern('^(?=.*[\\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\\w!@#$%^&*]{8,}$')),
      confirmPassword: new FormControl(null)
    });
    this.f.setValidators([this.passwordConfirming]);

  }

  passwordConfirming(c: AbstractControl): { passwordConfirming: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {passwordConfirming: true};
    }
  }

  onSubmit() {
    this.preLoading = true;
    console.log(this.tokenString);
    const data = {
      token: this.tokenString,
      password: this.password.value,
    };
    this.authService.resetPassword(data).subscribe(res => {
      if (res.operationResult === 'SUCCESS') {
        this.toast.success('Mật khẩu đã cập nhật', 'Thành công');
        this.preLoading = false;
      } else if (res.operationResult === 'ERROR') {
        this.toast.error('Có lỗi xảy ra', 'Lỗi');
        this.preLoading = false;

      }
    }, error => {
      this.toast.error('Có lỗi xảy ra', 'Lỗi');
      this.preLoading = false;


    });

  }
}
