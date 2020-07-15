import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PageResult} from '../models/page-result';
import {Course} from '../models/course';
import {Part} from '../models/part';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {
  }

  getPartListByCourse(courseId: number, page?: number, size?: number): Observable<PageResult<Part>> {
    page = page || environment.pageMeta.pageNumber;
    size = size || environment.pageMeta.pageSize;
    const pageParams = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageResult<Part>>(`${this.baseUrl}/courses/${courseId}/parts`);
  }

  updatePart(id: number, name: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/parts/${id}`, name);
  }

  getPartById(id: number): Observable<Part> {
    return this.http.get<Part>(`${this.baseUrl}/parts/${id}`);
  }

  getPartsByCourse(courseId: number): Observable<Part[]> {
    return this.http.get<Part[]>(`${this.baseUrl}/courses/${courseId}/part-list`);
  }

  createPartByCourse(courseId: number, part: Part): Observable<Part> {
    return this.http.post<Part>(`${this.baseUrl}/courses/${courseId}/parts`, part);
  }
}
