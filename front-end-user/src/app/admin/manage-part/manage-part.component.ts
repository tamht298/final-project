import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PartService} from '../../_services/part.service';
import {Part} from '../../models/part';
import {CourseService} from '../../_services/course.service';
import {Course} from '../../models/course';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-manage-part',
  templateUrl: './manage-part.component.html',
  styleUrls: ['./manage-part.component.scss']
})
export class ManagePartComponent implements OnInit {

  courseId: number;
  parts: Part[] = [];
  currentCourse: Course;
  selectedUpdateId = -1;
  partName = '';

  constructor(private route: ActivatedRoute, private partService: PartService, private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.courseService.getCourseById(this.courseId).subscribe(res => {
      this.currentCourse = res;
    });
    this.partService.getPartListByCourse(this.courseId).subscribe(res => {
      this.parts = res.data;
      console.log(this.parts);
    });
  }

  trackById(index: number, item: any) {
    return item.id === index;
  }

  toggleInput(part: Part) {
    this.selectedUpdateId = part.id;
    this.partName = part.name;
  }

  updatePart(id: number) {
    this.partService.updatePart(id, this.partName).pipe(switchMap(res => this.partService.getPartListByCourse(this.courseId)))
      .subscribe(res => {
        this.parts = res.data;
        this.selectedUpdateId = -1;
      });
  }

  fetchParts(parts: Part[]) {
    this.parts = parts;
  }
}
