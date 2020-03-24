import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {SharedModule} from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExamCardComponent } from './exam-card/exam-card.component';
import { ListCurrentExamComponent } from './list-exam/list-current-exam/list-current-exam.component';
import { ListComingExamComponent } from './list-exam/list-coming-exam/list-coming-exam.component';
import { ListCompleteExamComponent } from './list-exam/list-complete-exam/list-complete-exam.component';
import { FooterComponent } from './footer/footer.component';
import { LeftSideComponent } from './left-side/left-side.component';



@NgModule({
  declarations: [UserComponent, DashboardComponent, ExamCardComponent, ListCurrentExamComponent, ListComingExamComponent, ListCompleteExamComponent, FooterComponent, LeftSideComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
