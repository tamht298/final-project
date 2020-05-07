import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserAccount} from '../../../models/user-account';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../_services/user.service';
import {ToastrService} from 'ngx-toastr';
import {UserProfile} from '../../../models/user-profile';
import {switchMap} from 'rxjs/operators';
import {PageResult} from '../../../models/page-result';
import {UserUpdate} from '../../../models/user-update';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  @Input() userInfo: UserAccount;
  showModalUpdate = false;
  rfUpdateUser: FormGroup;
  @Output() usersOutput = new EventEmitter<PageResult<UserAccount>>();
  pageResult: PageResult<UserAccount>;
  showLoading = false;

  constructor(private fb: FormBuilder, private userService: UserService, private toast: ToastrService) {
  }

  get f() {
    return this.rfUpdateUser.controls;
  }

  get username() {
    return this.rfUpdateUser.get('username');
  }

  get password() {
    return this.rfUpdateUser.get('password');
  }

  get confirmPass() {
    return this.rfUpdateUser.get('confirmPass');
  }

  get firstName() {
    return this.rfUpdateUser.get('firstName');
  }

  get lastName() {
    return this.rfUpdateUser.get('lastName');
  }

  get email() {
    return this.rfUpdateUser.get('email');
  }

  ngOnInit(): void {
    this.rfUpdateUser = this.fb.group({
      username: [{value: this.userInfo.username, disabled: true}],
      email: [this.userInfo.email, {
        validators: [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        asyncValidators: [this.userService.validateEmailUpdate(this.userInfo.id)],
        updateOn: 'blur'
      }],
      firstName: [this.userInfo.profile?.firstName, Validators.required],
      lastName: [this.userInfo.profile?.lastName, Validators.required],
      password: [null, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')],
      confirmPass: [null]
    }, {validator: this.passwordConfirming});
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPass').value) {
      return {invalid: true};
    }
  }

  toggleModalUpdate() {
    this.showModalUpdate = !this.showModalUpdate;
  }

  onSubmit() {
    console.log(this.password.value);
    const profile = new UserProfile(this.firstName.value, this.lastName.value);
    const userUpdate: UserUpdate = new UserUpdate(this.username.value, this.email.value, this.password.value, profile);
    this.showLoading = true;
    this.userService.updateUser(this.userInfo.id, userUpdate)
      .pipe(switchMap(res => this.userService.getUserDeletedList(false)))
      .subscribe(res => {
        this.showLoading = false;
        this.closeModal();
        this.showSuccess();
        this.pageResult = res;
        this.usersOutput.emit(this.pageResult);
      });
  }

  closeModal() {
    this.showModalUpdate = false;
  }

  checkPasswords() {
    const pass = this.rfUpdateUser.get('pass');
    const confirmPass = this.rfUpdateUser.get('confirmPass');
    return pass === confirmPass ? null : {passwordNotSame: true};
  }

  private showSuccess() {
    this.toast.success('Người dùng đã được cập nhật!', 'Thành công');
  }
}