import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UploadFileService} from '../../_services/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Course} from '../../models/course';
import {switchMap} from 'rxjs/operators';
import {CourseService} from '../../_services/course.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;
  @Input() fileUrl: any;

  @Output() fileUrlOutput = new EventEmitter<any>();

  constructor(private uploadService: UploadFileService, private toast: ToastrService, private courseService: CourseService) {
  }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.fileUrlOutput.emit(this.currentFileUpload);

  }

  // upload() {
  //   this.currentFileUpload = this.selectedFiles.item(0);
  //   this.uploadService.pushFileToStorage(this.currentFileUpload, 'avatar').subscribe(event => {
  //     this.fileUrl = event.body;
  //     this.updateAvatarUrl();
  //     this.selectedFiles = undefined;
  //   });
  //
  // }

  uploadUser(currentFileUpload) {
    console.log('this.currentFileUpload', this.currentFileUpload);

    this.uploadService.uploadUsersByExcel(currentFileUpload).subscribe(event => {
      console.log(event);
      this.toast.success('Upload user thành công', 'Hoàn thành');
    });
  }


  pushAvatarToServer() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.fileUrlOutput.emit(this.currentFileUpload);
    this.selectedFiles = undefined;
    // this.uploadService.uploadAvatar(this.currentFileUpload).subscribe(event => {
    //   this.fileUrl = event.body;
    //   console.log(event.body);
    //   this.updateAvatarUrl();
    //   this.selectedFiles = undefined;
    // });
  }

  updateAvatarUrl() {
    this.fileUrlOutput.emit(this.fileUrl);
  }

}
