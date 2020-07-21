import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UploadFileService} from '../../../_services/upload-file.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.scss']
})
export class UpdateAvatarComponent implements OnInit {

  imgUploadUrl: string;
  fileUpload: any;
  @Output() avatarUploadUrl = new EventEmitter<any>();

  constructor(
    private uploadService: UploadFileService,
    private toast: ToastrService) {
  }

  ngOnInit(): void {
  }

  submitAvatar() {
    this.avatarUploadUrl.emit(this.fileUpload);
    console.log(this.fileUpload);
  }

  updateAvatar(file) {
    this.fileUpload = file;
  }
}
