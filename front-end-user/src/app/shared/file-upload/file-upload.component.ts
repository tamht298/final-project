import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UploadFileService} from '../../_services/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;
  @Input() fileUrl: any;

  @Output() fileUrlOutput = new EventEmitter<string>();

  constructor(private uploadService: UploadFileService) {
  }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload, 'avatar').subscribe(event => {
      this.fileUrl = event.body;
      this.updateAvatarUrl();
      this.selectedFiles = undefined;
    });

  }

  pushAvatarToServer() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.uploadAvatar(this.currentFileUpload).subscribe(event => {
      this.fileUrl = event.body;
      console.log(event.body);
      this.updateAvatarUrl();
      this.selectedFiles = undefined;
    });
  }

  updateAvatarUrl() {
    this.fileUrlOutput.emit(this.fileUrl);
  }

}
