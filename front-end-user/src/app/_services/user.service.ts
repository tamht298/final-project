import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAccount} from '../models/user-account';
import {PageResult} from '../models/page-result';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {UserUpdate} from '../models/user-update';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
  }

  getUserDeletedList(status: boolean): Observable<PageResult<UserAccount>> {
    return this.http.get<PageResult<UserAccount>>(`${this.baseUrl}/deleted/${status}`);
  }

  // @ts-ignore
  getUserListDeletedByPage(page: number, size: number, status: boolean): Observable<PageResult<UserAccount>> {
    const pageParams = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageResult<UserAccount>>(`${this.baseUrl}/deleted/${status}`, {params: pageParams});
  }

  searchUserListDeletedByPage(page: number, size: number, searchKey: string, status: boolean): Observable<PageResult<UserAccount>> {
    const pageParams = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('search-keyword', searchKey.toString());
    return this.http.get<PageResult<UserAccount>>(`${this.baseUrl}/deleted/${status}/search`, {params: pageParams});
  }

  exportExcel(status: boolean): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/csv');
    return this.http.get(`${this.baseUrl}/deleted/${status}/export/users.csv`, {
      headers,
      responseType: 'text'
    });
  }

  addUser(user: UserAccount): Observable<UserAccount> {
    return this.http.post<UserAccount>(this.baseUrl, user);
  }

  deleteTempUser(id: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${id}`, {deleted: true});
  }

  updateUser(id: number, user: UserUpdate): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user);
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

  validateEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http.get<boolean>(`${environment.apiEndPoint}/users/check-email?value=${control.value}`).pipe(
        map(res => {
          // if res is true, username exists, return true
          return res ? {emailExists: true} : null;
          // NB: Return null if there is no error
        })
      );
    };
  }

  validateEmailUpdate(id: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http.get<boolean>(`${environment.apiEndPoint}/users/${id}/check-email?value=${control.value}`).pipe(
        map(res => {
          // if res is true, username exists, return true
          return res ? {emailExists: true} : null;
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
