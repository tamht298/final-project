import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CoursePoint} from '../../../models/course-point';
import {ColorsService} from '../../../_services/colors.service';

@Component({
  selector: 'app-stat-card-exam',
  templateUrl: './stat-card-exam.component.html',
  styleUrls: ['./stat-card-exam.component.scss']
})
export class StatCardExamComponent implements OnInit, OnChanges {

  @Input() courseCard: CoursePoint;
  randColor: string;

  constructor(private colorsService: ColorsService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.randColor = this.colorsService.getRandomColor();
  }

}
