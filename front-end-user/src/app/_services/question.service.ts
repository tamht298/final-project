import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageResult} from '../models/page-result';
import {Question} from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {
  }

  public getQuestionListByPart(page: number, size: number, partId: number): Observable<PageResult<Question>> {
    const pageParams = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageResult<Question>>(`${this.baseUrl}/parts/${partId}/questions`, {params: pageParams});
  }

  public createQuestion(question: Question, questionType: string, partId: number): Observable<Question> {
    const reqParams = new HttpParams().set('questionType', questionType.toString()).set('partId', String(partId));
    return this.http.post<Question>(`${this.baseUrl}/questions`, question, {params: reqParams});
  }
}
