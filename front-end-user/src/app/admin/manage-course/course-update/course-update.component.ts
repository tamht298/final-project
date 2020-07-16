import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../../../models/course';
import {PageResult} from '../../../models/page-result';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../../../_services/course.service';
import {ToastrService} from 'ngx-toastr';
import {UploadFileService} from '../../../_services/upload-file.service';


@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.scss']
})
export class CourseUpdateComponent implements OnInit {

  @Input() courseInfo: Course;
  @Output() courseOutput = new EventEmitter<PageResult<Course>>();
  showModalUpdate = false;
  rfUpdateCourse: FormGroup;
  showLoading = false;
  pageResult: PageResult<Course>;
  course: Course;
  selectedFiles: FileList;
  currentFileUpload: File;
  toggle = false;

  constructor(private fb: FormBuilder,
              private courseService: CourseService,
              private toast: ToastrService,
              private uploadFileService: UploadFileService) {
  }

  get courseCode() {
    return this.rfUpdateCourse.get('courseCode');
  }

  get courseName() {
    return this.rfUpdateCourse.get('courseName');
  }

  ngOnInit(): void {
    this.course = Object.assign({}, this.courseInfo);
    this.initForm();
  }

  initForm() {
    this.rfUpdateCourse = this.fb.group({
      courseCode: [this.course.courseCode, {
        validators: [Validators.required],
        asyncValidators: [this.courseService.validateCourseCode(this.course.id)],
        updateOn: 'blur'
      }],
      courseName: [this.course.name, Validators.required]
    });
  }

  toggleModalUpdate() {
    this.course = Object.assign({}, this.courseInfo);
    this.initForm();
    this.showModalUpdate = !this.showModalUpdate;
  }

  onSubmit() {
    this.showLoading = true;
    if (this.currentFileUpload) {
      this.uploadFileService.uploadCourseImg(this.currentFileUpload).subscribe(url => {
        const course: Course = new Course(this.courseCode.value, this.courseName.value, url);
        this.courseService.updateCourse(this.course.id, course).subscribe(res => {
          this.courseService.getCourseListByPage().subscribe(pageResult => {
            this.showLoading = false;
            this.closeModal();
            this.courseOutput.emit(pageResult);
            this.currentFileUpload = undefined;
            this.toggle = false;
            this.toast.success('Môn học đã được cập nhật', 'Thành công');
          });
        });
      });
    } else {
      const course: Course = new Course(this.courseCode.value, this.courseName.value, this.course.imgUrl);
      this.courseService.updateCourse(this.course.id, course).subscribe(res => {
        this.courseService.getCourseListByPage().subscribe(pageResult => {
          this.showLoading = false;
          this.closeModal();
          this.courseOutput.emit(pageResult);
          this.currentFileUpload = undefined;
          this.toggle = false;
          this.toast.success('Môn học đã được cập nhật', 'Thành công');
        });
      });
    }
  }

  closeModal() {
    this.showModalUpdate = false;
    this.toggle = false;
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
  }
}
