import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TokenStorageService} from '../_services/token-storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {


      if ([401, 403].indexOf(err.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        this.tokenStorageService.signOut();
        setTimeout(() => {location.reload(true); }, 1000);
        // location.reload(true);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}

