import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Exam} from '../models/exam';
import {ExamUser} from '../models/exam-user';
import {timeout} from 'rxjs/operators';
import {AnswerSheet} from '../models/answer-sheet';
import {ExamCalendar} from '../models/exam-calendar';
import * as moment from 'moment';
import {PageResult} from '../models/page-result';
import {ExamResult} from '../models/exam-result';
import {ExamDetail} from '../models/exam-detail';
import {ExamQuestionReport} from '../models/exam-question-report';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {
  }

  public getAllExams(page: number, size: number): Observable<PageResult<Exam>> {
    const paramsHttp = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageResult<Exam>>(`${this.baseUrl}/exams`, {params: paramsHttp});
  }

  public createExam(intakeId: number, partId: number, isShuffle: boolean, locked: boolean, exam: Exam): Observable<Exam> {
    const intakeParam = new HttpParams()
      .set('intakeId', intakeId.toString())
      .set('partId', partId.toString())
      .set('isShuffle', String(isShuffle))
      .set('locked', String(locked));
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

  public submitExamUser(examId: number, isFinish: boolean, remainingTime: number, answers: AnswerSheet[]): Observable<any> {
    const statusExamParam = new HttpParams().set('isFinish', isFinish.toString()).set('remainingTime', remainingTime.toString());
    return this.http.put(`${this.baseUrl}/exams/${examId}/questions-by-user`, answers, {params: statusExamParam});
  }

  public getExamUserResult(examId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/exams/${examId}/result`);
  }

  public getExamCalendar(): Observable<ExamCalendar[]> {
    return this.http.get<ExamCalendar[]>(`${this.baseUrl}/exams/schedule`);
  }

  public isAvailable(finishDate: string): boolean {
    const now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    return moment(finishDate).isAfter(now);
  }

  public getExamResultListByExamId(examId: number): Observable<ExamResult[]> {
    return this.http.get<ExamResult[]>(`${this.baseUrl}/exams/${examId}/result/all`);
  }

  public getExamQuestionReport(examId: number): Observable<ExamQuestionReport[]> {
    return this.http.get<ExamQuestionReport[]>(`${this.baseUrl}/exams/${examId}/result/all/question-report`);
  }

  public getResultExamByUser(examId: number, username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/exams/${examId}/users/${username}/result`);
  }

  public getExamById(id: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.baseUrl}/exams/${id}`);
  }

  public getExamQuestionDetail(id: number): Observable<ExamDetail[]> {
    return this.http.get<ExamDetail[]>(`${this.baseUrl}/exam/${id}/question-text`);
  }

  public cancelExam(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/exams/${id}/cancel`);
  }

}
