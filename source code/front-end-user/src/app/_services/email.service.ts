import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Email} from '../models/email';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {
  }

  public sendEmail(message: Email): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/send-email`, message);
  }
}
