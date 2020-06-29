import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Exam} from '../models/exam';
import {ExamUser} from '../models/exam-user';
import {timeout} from 'rxjs/operators';

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

  public getAllExamByUser(): Observable<ExamUser[]> {
    return this.http.get<ExamUser[]>(`${this.baseUrl}/exams/list-all-by-user`);
  }

  public getExamUserById(id: number): Observable<ExamUser> {
    return this.http.get<ExamUser>(`${this.baseUrl}/exams/exam-user/${id}`);
  }

  public getExamQuestion(examId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/exams/${examId}/questions`);
  }


}
