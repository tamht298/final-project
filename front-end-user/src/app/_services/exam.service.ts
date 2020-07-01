import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Exam} from '../models/exam';
import {ExamUser} from '../models/exam-user';
import {timeout} from 'rxjs/operators';
import {AnswerSheet} from '../models/answer-sheet';

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

  public getExamUserById(examId: number): Observable<ExamUser> {
    return this.http.get<ExamUser>(`${this.baseUrl}/exams/exam-user/${examId}`);
  }

  public getExamQuestion(examId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/exams/${examId}/questions`);
  }

  public submitExamUser(examId: number, isFinish: boolean, answers: AnswerSheet[]): Observable<any> {
    const statusExamParam = new HttpParams().set('isFinish', isFinish.toString());
    return this.http.put(`${this.baseUrl}/exams/${examId}/questions-by-user`, answers, {params: statusExamParam});
  }

  public getExamUserResult(examId: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/exams/${examId}/result`);
  }


}
