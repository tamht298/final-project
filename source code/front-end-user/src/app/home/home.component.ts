import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {UserRole} from '../models/user-role.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailService} from '../_services/email.service';
import {Email} from '../models/email';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-welcome',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  defaultUrl = '../login';
  username = '';
  now = new Date().getFullYear();
  rfEmail: FormGroup;

  constructor(private tokenStorageService: TokenStorageService,
              private fb: FormBuilder,
              private emailService: EmailService,
              private toast: ToastrService) {
  }

  get email() {
    return this.rfEmail.get('email');
  }

  get subject() {
    return this.rfEmail.get('subject');
  }

  get contentBody() {
    return this.rfEmail.get('contentBody');
  }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.rfEmail = this.fb.group({
      email: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      subject: ['', Validators.required],
      contentBody: ['', Validators.required]
    });

    this.username = user?.username;
    if (this.username) {
      this.isLoggedIn = true;
      if (user?.roles.includes(UserRole.ROLE_ADMIN)) {
        this.defaultUrl = '../admin';
      }
      if (user?.roles.includes(UserRole.ROLE_LECTURE)) {
        this.defaultUrl = '../admin';
      }
      if (user?.roles.includes(UserRole.ROLE_STUDENT)) {
        this.defaultUrl = '../user/dashboard';
      }
    }

  }

  sendEmail() {
    const message = new Email(this.email.value, this.subject.value, this.contentBody.value);
    this.emailService.sendEmail(message).subscribe(res => {
      this.toast.success('Đã gửi mail!', 'Thành công');
      this.rfEmail.reset();
    }, error => {
      this.toast.error('Hệ thống gặp chút vấn đề!', 'Lỗi');
      this.rfEmail.reset();
    });
  }
}
