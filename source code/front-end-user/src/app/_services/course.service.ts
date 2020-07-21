import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PageResult} from '../models/page-result';
import {Course} from '../models/course';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {
  }

  public getCourseList(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/course-list`);
  }

  public getCourseListByPage(page?: number, size?: number): Observable<PageResult<Course>> {
    page = page || environment.pageMeta.pageNumber;
    size = size || environment.pageMeta.pageSize;
    const pageParams = new HttpParams().set('page', page.toString()).set('size', size.toString());

    return this.http.get<PageResult<Course>>(`${this.baseUrl}/courses`, {params: pageParams});
  }

  updateCourse(id: number, course: Course): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/courses/${id}`, course);
  }

  createCourse(course: Course): Observable<any> {

    return this.http.post<any>(`${this.baseUrl}/courses`, course);
  }


  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/courses/${id}`);
  }

  getCourseByPartId(partId: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/courses/part/${partId}`);
  }

  getCourseListByIntakeId(intakeId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/intakes/${intakeId}/courses`);
  }

  validateCourseCode(id?: number): AsyncValidatorFn {
    // tslint:disable-next-line:max-line-length
    const checkUrl = id == null ? `${environment.apiEndPoint}/courses/check-course-code` : `${environment.apiEndPoint}/courses/${id}/check-course-code`;
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http.get<boolean>(`${checkUrl}?value=${control.value}`).pipe(
        map(res => {
          // if res is true, code exists, return true
          return res ? {codeExists: true} : null;
          // NB: Return null if there is no error
        })
      );
    };
  }

  validateCode(id: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http.get<boolean>(`${environment.apiEndPoint}/courses/check-course-code?value=${control.value}`).pipe(
        map(res => {
          // if res is true, code exists, return true
          return res ? {codeExists: true} : null;
          // NB: Return null if there is no error
        })
      );
    }
      ;
  }

}
