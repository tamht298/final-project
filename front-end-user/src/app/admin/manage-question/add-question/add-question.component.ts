import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PageResult} from '../../../models/page-result';
import {Question} from '../../../models/question';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CourseService} from '../../../_services/course.service';
import {Course} from '../../../models/course';
import {Part} from '../../../models/part';
import {PartService} from '../../../_services/part.service';
import {QuestionTypeService} from '../../../_services/question-type.service';
import {QuestionType} from '../../../models/question-type';
import {QTYPE} from '../../../models/question-type.enum';
import {Choice} from '../../../models/choice';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {QuestionService} from '../../../_services/question.service';
import {ToastrService} from 'ngx-toastr';

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
  questionTypeList: QuestionType[] = [];
  selectedCourseId = -1;
  selectedPartId = -1;
  selectedMC = 1;
  answerChoicesTF: Choice[] = [];
  currentQuestionType = QTYPE.TF;
  multipleChoice: Choice[] = [];
  questionText = '';
  Editor = BalloonEditor;
  editorConfig = {
    placeholder: 'Nhập nội dung!',
  };
  multipleSelect: Choice[] = [];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private partService: PartService,
    private questionTypeService: QuestionTypeService,
    private questionService: QuestionService,
    private toast: ToastrService) {
  }

  get course() {
    return this.rfAdd.get('course');
  }

  get questionType() {
    return this.rfAdd.get('questionType');
  }

  get difficultyLevel() {
    return this.rfAdd.get('difficultyLevel');
  }

  get part() {
    return this.rfAdd.get('part');
  }

  get choices() {
    return this.rfAdd.get('choices');
  }


  ngOnInit(): void {
    this.rfAdd = this.fb.group({
      course: ['-1'],
      questionType: [this.currentQuestionType],
      difficultyLevel: ['-1'],
      part: [''],
      choices: ['True'],

    });
  }


  onSubmit() {
    switch (this.questionType.value) {
      case QTYPE.TF: {
        const choices: Choice[] = [];
        choices.push(new Choice(this.choices.value, 1));
        const newQuestion = new Question(this.questionText, this.difficultyLevel.value, choices);
        this.questionService.createQuestion(newQuestion, this.questionType.value, this.part.value).subscribe(res1 => {
          this.toast.success('1 câu hỏi true/false đã được tạo', 'Thành công');
          this.resetFormAfterSubmit();
        }, error => {
          this.toast.error('Kiểm tra lại thông tin cần tạo', 'Lỗi');

        });
        return;
      }
      case QTYPE.MC: {
        const newQuestion = new Question(this.questionText, this.difficultyLevel.value, this.multipleChoice);
        this.questionService.createQuestion(newQuestion, this.questionType.value, this.part.value).subscribe(res2 => {
          this.toast.success('1 câu hỏi multiple choice đã được tạo', 'Thành công');
          this.resetFormAfterSubmit();
        }, error => {
          this.toast.error('Kiểm tra lại thông tin cần tạo', 'Lỗi');

        });
        return;
      }
      case QTYPE.MS: {
        const newQuestion = new Question(this.questionText, this.difficultyLevel.value, this.multipleSelect);
        this.questionService.createQuestion(newQuestion, this.questionType.value, this.part.value).subscribe(res2 => {
          this.toast.success('1 câu hỏi multiple select đã được tạo', 'Thành công');
          this.resetFormAfterSubmit();
        }, error => {
          this.toast.error('Kiểm tra lại thông tin cần tạo', 'Lỗi');
        });
        return;
      }
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
    this.refreshModal();
    this.courseService.getCourseList().subscribe(res => {
      this.courseList = res;
    });
    this.questionTypeService.getQuestionTypeList().subscribe(res => {
      this.questionTypeList = res;
    });

    this.initChoice();
  }

  initChoice() {
    this.multipleChoice.push(
      new Choice('<p>Choice_1</p>', 1),
      new Choice('<p>Choice_2</p>', 0),
    );
    this.multipleSelect.push(
      new Choice('<p>Choice_1</p>', 1),
      new Choice('<p>Choice_2</p>', 1),
    );
  }

  refreshModal() {
    this.course.setValue(-1);
    this.questionType.setValue(QTYPE.TF);
    this.difficultyLevel.setValue(-1);
    this.part.setValue(-1);
    this.multipleChoice.length = 0;
    this.multipleSelect.length = 0;
    this.currentQuestionType = QTYPE.TF;
    this.questionText = '';

  }

  closeModal() {
    this.showModal = false;
  }

  changeCourse(event) {
    this.selectedCourseId = event.target.value;
    this.partService.getPartsByCourse(this.selectedCourseId).subscribe(res => {
      this.partList = res;
    });
  }


  changeQuestionType(typeCode: string) {
    this.currentQuestionType = QTYPE[typeCode];
  }

  changeChoiceTF(value: string) {
    if (this.answerChoicesTF.length > 0) {
      this.answerChoicesTF.length = 0;
    }
    const answer = new Choice(value, 1);
    return this.answerChoicesTF.push(answer);

  }

  addMCAnswer() {
    const newAnswer = new Choice(``, 0);
    this.multipleChoice.push(newAnswer);
  }

  changeChoiceMC(i: number) {
    this.multipleChoice.map(item => item.isCorrected = 0);
    this.multipleChoice[i].isCorrected = 1;
  }

  removeMCChoice(i: number) {
    if (this.multipleChoice.length === 3) {
      // this.selectedMCAnswer = this.multipleChoice[0].choiceText;
      this.multipleChoice[0].isCorrected = 1;
    }
    this.multipleChoice.splice(i, 1);
  }

  changeChoiceMS(ms: Choice) {
    this.multipleSelect.map(item => {
      if (!!item.isCorrected) {
        item.isCorrected = 1;
      } else {
        item.isCorrected = 0;
      }
    });
  }

  removeMSChoice(index: number) {
    if (this.multipleSelect.length === 3) {
      this.multipleSelect[0].isCorrected = 1;
    }
    this.multipleSelect.splice(index, 1);
  }

  addMSAnswer() {
    const newAnswer = new Choice(``, 0);
    this.multipleSelect.push(newAnswer);
  }

  resetFormAfterSubmit() {
    this.questionText = '';
    this.multipleSelect.length = 0;
    this.multipleChoice.length = 0;
    this.selectedPartId = -1;
    this.initChoice();

  }
}
