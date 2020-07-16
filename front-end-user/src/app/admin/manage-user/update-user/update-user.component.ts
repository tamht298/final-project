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
  user: UserAccount;

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
    this.user = Object.assign({}, this.userInfo);
    this.initForm();
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPass').value) {
      return {invalid: true};
    }
  }

  toggleModalUpdate() {
    this.user = Object.assign({}, this.userInfo);
    this.initForm();
    this.showModalUpdate = !this.showModalUpdate;
  }

  initForm() {
    this.rfUpdateUser = this.fb.group({
      username: [{value: this.user.username, disabled: true}],
      email: [this.userInfo.email, {
        validators: [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        asyncValidators: [this.userService.validateEmailUpdate(this.user.id)],
        updateOn: 'blur'
      }],
      firstName: [this.user.profile?.firstName, Validators.required],
      lastName: [this.user.profile?.lastName, Validators.required],
      password: [null, Validators.pattern('^(?=.*[\\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\\w!@#$%^&*]{8,}$')],
      confirmPass: [null]
    }, {validator: this.passwordConfirming});
  }


  onSubmit() {
    console.log('eew');
    const profile = new UserProfile(this.firstName.value, this.lastName.value);
    const userUpdate: UserUpdate = new UserUpdate(this.username.value, this.email.value, this.password.value, profile);
    this.showLoading = true;
    this.userService.updateUser(this.userInfo.id, userUpdate)
      .pipe(switchMap(res => this.userService.getUserList(0, 20)))
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


  private showSuccess() {
    this.toast.success('Người dùng đã được cập nhật!', 'Thành công');
  }
}
