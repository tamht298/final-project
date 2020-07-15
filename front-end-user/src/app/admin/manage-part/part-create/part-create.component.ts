import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PartService} from '../../../_services/part.service';
import {ActivatedRoute} from '@angular/router';
import {Part} from '../../../models/part';
import {ToastrService} from 'ngx-toastr';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-part-create',
  templateUrl: './part-create.component.html',
  styleUrls: ['./part-create.component.scss']
})
export class PartCreateComponent implements OnInit {
  rfCreatePart: FormGroup;
  showModal = false;
  courseId: number;
  @Output() outputParts = new EventEmitter<Part[]>();

  constructor(private fb: FormBuilder,
              private partService: PartService,
              private route: ActivatedRoute,
              private toast: ToastrService) {
  }

  get name() {
    return this.rfCreatePart.get('name');
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.rfCreatePart = this.fb.group({
      name: ['', Validators.required]
    });
  }

  toggleModalAdd() {
    this.showModal = !this.showModal;
    this.rfCreatePart.reset();
  }

  onSubmit() {
    const part = new Part(this.name.value, null);
    this.partService.createPartByCourse(this.courseId, part).pipe(switchMap(() => this.partService.getPartsByCourse(this.courseId)))
      .subscribe(res => {
        this.closeModal();
        this.toast.success('Part mới đã được tạo', 'Thành công');
        this.outputParts.emit(res);
      });

  }

  closeModal() {
    this.showModal = false;
  }
}
