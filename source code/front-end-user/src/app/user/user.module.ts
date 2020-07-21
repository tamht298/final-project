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
import {ExamDetailComponent} from './exam-detail/exam-detail.component';
import {ExamQuestionComponent} from './exam-question/exam-question.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExamResultComponent} from './exam-result/exam-result.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { StatisticsComponent } from './statistics/statistics.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {BreadcrumbModule} from 'xng-breadcrumb';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    UserComponent, DashboardComponent, ExamCardComponent, FooterComponent, LeftSideComponent, ProfileComponent, ExamDetailComponent, ExamQuestionComponent, ExamResultComponent, ScheduleComponent, StatisticsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgApexchartsModule,
    BreadcrumbModule
  ]
})
export class UserModule {
}
