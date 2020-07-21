import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CoursePoint} from '../models/course-point';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {
  }

  public getCoursePoint(): Observable<CoursePoint[]> {
    return this.http.get<CoursePoint[]>(`${this.baseUrl}/charts/courses`);
  }
}
