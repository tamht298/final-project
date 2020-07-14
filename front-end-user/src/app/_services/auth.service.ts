import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {Router} from '@angular/router';

const AUTH_API = 'http://localhost:8080/api/auth';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private router: Router) {
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + '/signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  goLogin() {
    this.router.navigate(['/login']).then((e) => {
      if (e) {
        console.log('on login');
      } else {
        console.log('fail');
      }
    });
  }

  sendRequest(email: string): Observable<any> {
    return this.http.post(`${AUTH_API}/password-reset-request`, {email});
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${AUTH_API}/password-reset`, data);
  }
}
