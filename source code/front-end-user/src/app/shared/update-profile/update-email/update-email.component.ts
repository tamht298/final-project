import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserAccount} from '../../../models/user-account';
import {UserService} from '../../../_services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {
  rfEmail: FormGroup;
  @Input() userProfile: UserAccount;
  @Output() emailUpdate = new EventEmitter<any>();

  hiddenPwd = true;

  constructor(private userService: UserService, private toast: ToastrService, private fb: FormBuilder) {
  }

  get email() {
    return this.rfEmail.get('email');
  }

  get currentPassword() {
    return this.rfEmail.get('currentPassword');
  }

  ngOnInit(): void {
    this.initFormUpdateEmail();
  }

  togglePwd() {
    this.hiddenPwd = !this.hiddenPwd;
  }

  changeEmail() {
    const data = {email: this.email.value, password: this.currentPassword.value};
    this.emailUpdate.emit(data);
    this.rfEmail.reset();

  }

  initFormUpdateEmail() {
    this.rfEmail = this.fb.group({
      email: ['', {
        validators: [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        asyncValidators: [this.userService.validateEmail()],
        updateOn: 'blur'
      }],
      currentPassword: [null, Validators.required],

    });
  }
}
