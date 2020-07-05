import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {UploadFileService} from '../../_services/upload-file.service';
import {FileUploadComponent} from '../../shared/file-upload/file-upload.component';
import {UserService} from '../../_services/user.service';
import {UserAccount} from '../../models/user-account';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  togglePwd = false;
  toggleEmail = false;
  toggleAvatar = true;
  imgUpload = '';
  userProfile: UserAccount;
  @ViewChild(FileUploadComponent) fileUploadViewChild: FileUploadComponent;
  private imgFile: any;

  constructor(private uploadService: UploadFileService,
              private userService: UserService,
              private fb: FormBuilder,
              private toast: ToastrService,
              private tokenStorageService: TokenStorageService) {
  }


  ngOnInit(): void {
    this.getUserInfo();
  }


  getUserInfo() {
    this.userService.getUserInfo('').subscribe(res => {
      this.userProfile = res.data;
      this.imgUpload = this.userProfile.profile.image || 'https://isc-quiz.s3-ap-southeast-1.amazonaws.com/default.png';
    });
  }

  toggleChangePwd() {
    this.toggleEmail = false;
    this.toggleAvatar = false;
    this.togglePwd = true;
  }

  toggleUpdateEmail() {
    this.togglePwd = false;
    this.toggleAvatar = false;
    this.toggleEmail = true;

  }

  toggleChangeAvatar() {
    this.togglePwd = false;
    this.toggleEmail = false;
    this.toggleAvatar = true;

  }


  updatePassword(data) {
    this.userService.updatePassword(this.userProfile.id, data).subscribe(res => {
      if (res.statusCode === 200) {
        this.toast.success(res.message, 'Done');
        this.toast.warning(`You have to sign in again`, 'Warning');
        // @ts-ignore
        setTimeout(() => {
          this.tokenStorageService.signOut();
          window.location.replace('/login');

        }, 3000);
        // this.toast.warning(`You have to sign in again`, 'Warning');
      } else {
        this.toast.error(res.message, 'Error');
      }
    }, error => {
      this.toast.error(error.message, `Server error: ${error.statusCode}`);
    });
  }

  updateEmail(data) {
    this.userService.updateEmail(this.userProfile.id, data).subscribe(res => {
      switch (res.statusCode) {
        case 417: {
          this.toast.error('Error', res.message);
          break;
        }
        case 200: {
          this.toast.success('Done', res.message);
          this.userProfile.email = res.data;
          break;
        }
        default: {
          this.toast.error('Error', 'Server error');
        }
      }
    });
  }

  getAvatarUpload(urlUpload) {
    this.imgFile = urlUpload;
    this.uploadService.uploadAvatar(this.imgFile).subscribe(res => {
      this.imgUpload = res;
      this.toast.success('Updated new avatar', 'Done');
      return;
    }, error => {
      this.toast.error('Some problems. Report it to the administrator', 'Error');
    });


  }
}
