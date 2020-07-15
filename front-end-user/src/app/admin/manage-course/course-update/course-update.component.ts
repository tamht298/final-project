import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../../../models/course';
import {PageResult} from '../../../models/page-result';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../../../_services/course.service';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash'
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

  constructor(private fb: FormBuilder, private courseService: CourseService, private toast: ToastrService) {
  }

  get courseCode() {
    return this.rfUpdateCourse.get('courseCode');
  }

  get courseName() {
    return this.rfUpdateCourse.get('courseName');
  }

  ngOnInit(): void {
    this.course = _.cloneDeep(this.courseInfo);
    console.log(this.courseInfo);
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
    this.showModalUpdate = !this.showModalUpdate;
  }

  onSubmit() {
    this.showLoading = true;
    const course: Course = new Course(this.courseCode.value, this.courseName.value);
    this.courseService.updateCourse(this.course.id, course).subscribe(res => {
      this.courseService.getCourseListByPage().subscribe(pageResult => {
        this.showLoading = false;
        this.closeModal();
        this.courseOutput.emit(pageResult);
        this.toast.success('Môn học đã được cập nhật', 'Thành công');
      });
    });

  }

  closeModal() {
    this.showModalUpdate = false;
  }
}
