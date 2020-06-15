import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PageResult} from '../../../models/page-result';
import {Question} from '../../../models/question';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CourseService} from '../../../_services/course.service';
import {Course} from '../../../models/course';
import {Part} from '../../../models/part';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {PartService} from '../../../_services/part.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  @Output() questionsAddOutput = new EventEmitter<PageResult<Question>>();

  rfAdd: FormGroup;
  editorValue = '';
  showModal = false;
  courseList: Course[] = [];
  partList: Part[] = [];
  selectedCourseId = -1;
  selectedPartId = -1;

  constructor(private fb: FormBuilder, private courseService: CourseService, private partService: PartService) {
  }

  get questionType() {
    return this.rfAdd.get('questionType');
  }

  get difficultyLevel() {
    return this.rfAdd.get('difficultyLevel');
  }

  get parts() {
    return this.rfAdd.get('part');
  }

  get choices() {
    return this.rfAdd.get('choices');
  }

  ngOnInit(): void {
    this.rfAdd = this.fb.group({
      questionType: [''],
      difficultyLevel: [],
      parts: [''],
      choices: ['']
    });
    this.courseService.getCourseList().subscribe(res => {
      this.courseList = res;
    });
  }


  onSubmit() {

  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  closeModal() {
    this.showModal = false;
  }

  changeCourse(event) {
    this.selectedCourseId = event.target.value;
    this.partService.getPartByCourse(this.selectedCourseId).subscribe(res => {
      this.partList = res;
    });
  }

  changePart(event) {

  }
}
