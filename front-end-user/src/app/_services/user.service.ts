import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAccount} from '../models/user-account';
import {PageResult} from '../models/page-result';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
  }

  // getUserList(): Observable<PageResult<UserAccount>> {
  //   return this.http.get<PageResult<UserAccount>>(this.baseUrl);
  // }
  //
  // getUserListByPage(page: number): Observable<PageResult<UserAccount>> {
  //   const pageParams = new HttpParams().set('page', page.toString());
  //   return this.http.get<PageResult<UserAccount>>(this.baseUrl, {params: pageParams});
  // }

  getUserDeletedList(status: boolean): Observable<PageResult<UserAccount>> {
    return this.http.get<PageResult<UserAccount>>(`${this.baseUrl}/deleted/${status}`);
  }

  getUserListDeletedByPage(page: number, status: boolean): Observable<PageResult<UserAccount>> {
    const pageParams = new HttpParams().set('page', page.toString());
    return this.http.get<PageResult<UserAccount>>(`${this.baseUrl}/deleted/${status}`, {params: pageParams});
  }

  addUser(user: UserAccount): Observable<UserAccount> {
    return this.http.post<UserAccount>(this.baseUrl, user);
  }

  deleteTempUser(id: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${id}`, {deleted: true});
  }

  validateUsername(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http.get<boolean>(`${environment.apiEndPoint}/users/check-username?value=${control.value}`).pipe(
        map(res => {
          // if res is true, username exists, return true
          return res ? {usernameExists: true} : null;
          // NB: Return null if there is no error
        })
      );
    };
  }


  /**
   *not yet delete
   * @param username
   */
  getUserInfo(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/username/${username}`);
  }
}
