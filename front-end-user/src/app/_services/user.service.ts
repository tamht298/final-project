import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
  }

  getUserInfo(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/username/${username}`);
  }
}
