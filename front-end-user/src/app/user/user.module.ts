import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {SharedModule} from '../shared/shared.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ExamCardComponent} from './exam-card/exam-card.component';

import {FooterComponent} from './footer/footer.component';
import {LeftSideComponent} from './left-side/left-side.component';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {ProfileCardComponent} from './profile-card/profile-card.component';
import { ExamDetailComponent } from './exam-detail/exam-detail.component';
import { ExamQuestionComponent } from './exam-question/exam-question.component';
import {FormsModule} from '@angular/forms';
import { ExamResultComponent } from './exam-result/exam-result.component';


@NgModule({
  declarations: [
    UserComponent, DashboardComponent, ExamCardComponent,FooterComponent, LeftSideComponent, ProfileComponent, ProfileCardComponent, ExamDetailComponent, ExamQuestionComponent, ExamResultComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        FormsModule
    ]
})
export class UserModule {
}
