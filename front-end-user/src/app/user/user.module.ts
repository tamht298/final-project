import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {SharedModule} from '../shared/shared.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ExamCardComponent} from './exam-card/exam-card.component';
import {ListCurrentExamComponent} from './list-exam/list-current-exam/list-current-exam.component';
import {ListComingExamComponent} from './list-exam/list-coming-exam/list-coming-exam.component';
import {ListCompleteExamComponent} from './list-exam/list-complete-exam/list-complete-exam.component';
import {FooterComponent} from './footer/footer.component';
import {LeftSideComponent} from './left-side/left-side.component';
import {RouterModule} from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';


@NgModule({
  declarations: [UserComponent, DashboardComponent, ExamCardComponent, ListCurrentExamComponent, ListComingExamComponent, ListCompleteExamComponent, FooterComponent, LeftSideComponent, ProfileComponent, ProfileCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class UserModule {
}
