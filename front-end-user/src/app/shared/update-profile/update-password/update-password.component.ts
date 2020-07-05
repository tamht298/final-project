import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  rfPassword: FormGroup;
  @Output() passwordUpdate = new EventEmitter<any>();
  hiddenOldPwd = true;
  hiddenNewPwd = true;
  hiddenConfirmPwd = true;

  constructor(private fb: FormBuilder) {
  }

  get oldPassword() {
    return this.rfPassword.get('oldPassword');
  }

  get newPassword() {
    return this.rfPassword.get('newPassword');
  }

  get confirmPassword() {
    return this.rfPassword.get('confirmPassword');
  }

  ngOnInit(): void {
    this.initFormChangePwd();
  }


  updatePassword() {
    const data = {currentPassword: this.oldPassword.value, newPassword: this.newPassword.value};
    this.passwordUpdate.emit(data);

  }

  initFormChangePwd() {
    this.rfPassword = new FormGroup({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.pattern('^(?=.*[\\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\\w!@#$%^&*]{8,}$')),
      confirmPassword: new FormControl(null)
    });
    this.rfPassword.setValidators([this.passwordConfirming, this.passwordDuplicating]);

  }

  passwordConfirming(c: AbstractControl): { passwordConfirming: boolean } {
    if (c.get('newPassword').value !== c.get('confirmPassword').value) {
      return {passwordConfirming: true};
    }
  }

  passwordDuplicating(c: AbstractControl): { passwordDuplicating: boolean } {
    if (c.get('newPassword').value === c.get('oldPassword').value) {
      return {passwordDuplicating: true};
    }
  }

  togglePwd(type) {
    switch (type) {
      case 'hiddenOldPwd': {
        this.hiddenOldPwd = !this.hiddenOldPwd;
        break;
      }
      case 'hiddenNewPwd': {
        this.hiddenNewPwd = !this.hiddenNewPwd;
        break;
      }
      case 'hiddenConfirmPwd': {
        this.hiddenConfirmPwd = !this.hiddenConfirmPwd;
        break;
      }
    }

  }

}
