import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  pushFileToStorage(file: File, fileAs: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const httpParams = new HttpParams().set('fileAs', fileAs);
    const req = new HttpRequest('POST', `${this.baseUrl}/aws/file/upload`, formData, {
      reportProgress: true,
      responseType: 'text',
      params: httpParams
    });
    return this.http.request(req);
  }

  uploadAvatar(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/aws/file/upload/avatar`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
  }

  uploadCourseImg(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/aws/file/upload/course`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
  }

  uploadUsersByExcel(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/file/import/users`, formData, {
      responseType: 'json',
      reportProgress: true
    });
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/aws/file/all`);
  }
}
