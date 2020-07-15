import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../_services/course.service';
import {environment} from '../../../environments/environment';
import {Course} from '../../models/course';
import {PaginationDetail} from '../../models/pagination/pagination-detail';
import {PageResult} from '../../models/page-result';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {

  courseList: Course[] = [];
  paginationDetail: PaginationDetail;
  skeleton = true;

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.fetchCourseListByPage();

  }

  fetchCourseListByPage() {
    this.courseService.getCourseListByPage(environment.pageMeta.pageNumber, environment.pageMeta.pageSize).subscribe(res => {
      this.courseList = res.data;
      this.paginationDetail = res.paginationDetails;
      this.skeleton = false;
    });
  }

  trackById(index: number, item: any) {
    return item.id === index;
  }

  fetchCourseAfterCRUD(page: PageResult<Course>) {
    this.courseList = page.data;
    this.paginationDetail = page.paginationDetails;
  }

}
