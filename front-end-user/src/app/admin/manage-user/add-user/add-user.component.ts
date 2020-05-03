import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../_services/user.service';
import {UserAccount} from '../../../models/user-account';
import {UserProfile} from '../../../models/user-profile';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  showModalAdd = false;
  rfAddUser: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
  }

  get username() {
    return this.rfAddUser.get('username');
  }

  get firstName() {
    return this.rfAddUser.get('firstName');
  }

  get lastName() {
    return this.rfAddUser.get('lastName');
  }

  get email() {
    return this.rfAddUser.get('email');
  }

  ngOnInit(): void {
    this.rfAddUser = this.fb.group({
      username: ['', {
        validators: [Validators.required, Validators.minLength(6)],
        asyncValidators: [this.userService.validateUsername()],
        updateOn: 'blur'
      }],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  toggleModalAdd() {
    this.showModalAdd = !this.showModalAdd;
  }

  closeModal() {
    this.showModalAdd = false;
  }

  onSubmit() {
    const profile = new UserProfile(this.firstName.value, this.lastName.value);
    const user: UserAccount = new UserAccount(this.username.value, this.email.value, profile);
    this.userService.addUser(user).subscribe(res => {
      this.closeModal();
    });
  }
}
