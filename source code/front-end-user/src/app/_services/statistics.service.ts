import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Statistics} from '../models/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {
  }

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(`${this.baseUrl}/statistics`);
  }
}
