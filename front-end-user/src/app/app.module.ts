import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {UserModule} from './user/user.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './_services/auth.service';
import {TokenStorageService} from './_services/token-storage.service';
import {AuthGuard} from './_guards/auth-guard.guard';
import {AuthInterceptor} from './_helpers/auth.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {AdminModule} from './admin/admin.module';
import {ToastrModule} from 'ngx-toastr';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      tapToDismiss: true,
      closeButton: true
    }),
    FormsModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule,
    SharedModule,
    UserModule,
    AdminModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    TokenStorageService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
    exports: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
