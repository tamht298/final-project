import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuestionType} from '../models/question-type';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {
  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {
  }

  getQuestionTypeList(): Observable<QuestionType[]> {
    return this.http.get<QuestionType[]>(`${this.baseUrl}/question-types`);
  }

  getQuestionTypeByCode(typeCode: string): Observable<QuestionType> {
    return this.http.get<QuestionType>(`${this.baseUrl}/question-types/${typeCode}`);
  }
}
