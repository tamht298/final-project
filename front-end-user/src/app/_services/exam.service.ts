import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Exam} from '../models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {
  }

  public createExam(intakeId: number, partId: number, exam: Exam): Observable<Exam> {
    const intakeParam = new HttpParams().set('intakeId', intakeId.toString()).set('partId', partId.toString());

    return this.http.post<Exam>(`${this.baseUrl}/exams`, exam, {params: intakeParam});
  }


}
