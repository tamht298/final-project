import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {SharedModule} from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [UserComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
