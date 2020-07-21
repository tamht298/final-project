import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router, private tokenStorageService: TokenStorageService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.tokenStorageService.getUser();
    if (currentUser) {
      console.log('user: ' + currentUser.role);
      if (next.data.roles && next.data.roles.indexOf(currentUser.role) === -1) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    // this.authService.goLogin();
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  // tslint:disable-next-line:max-line-length
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
