import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {UserComponent} from './user/user.component';
import {DashboardComponent} from './user/dashboard/dashboard.component';
import {AuthGuard} from './_guards/auth-guard.guard';
import {ProfileComponent} from './user/profile/profile.component';
import {AdminComponent} from './admin/admin.component';
import {AdminDashboardComponent} from './admin/dashboard/dashboard.component';
import {ManageUserComponent} from './admin/manage-user/manage-user.component';
import {QuestionBankComponent} from './admin/manage-question/question-bank/question-bank.component';
import {ManageCourseComponent} from './admin/manage-course/manage-course.component';
import {ListQuestionComponent} from './admin/manage-part/list-question/list-question.component';
import {ManagePartComponent} from './admin/manage-part/manage-part.component';
import {AddQuestionComponent} from './admin/manage-question/add-question/add-question.component';
import {ManageTestComponent} from './admin/manage-test/manage-test.component';
import {AddTestComponent} from './admin/manage-test/add-test/add-test.component';
import {ExamDetailComponent} from './user/exam-detail/exam-detail.component';
import {ExamQuestionComponent} from './user/exam-question/exam-question.component';
import {ExamResultComponent} from './user/exam-result/exam-result.component';
import {ScheduleComponent} from './user/schedule/schedule.component';
import {StatisticsComponent} from './user/statistics/statistics.component';
import {QuestionDetailComponent} from './admin/manage-question/question-detail/question-detail.component';
import {UserTestComponent} from './admin/manage-test/user-test/user-test.component';
import {AdminProfileComponent} from './admin/admin-profile/admin-profile.component';
import {DetailTestComponent} from './admin/manage-test/detail-test/detail-test.component';
import {UserTestResultComponent} from './admin/manage-test/user-test-result/user-test-result.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'

  },
  {
    path: 'home',
    component: HomeComponent,
  }, {
    path: 'verification-service/password-reset',
    component: ResetPasswordComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          {path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' }},
          {path: 'profile', component: ProfileComponent, data: { breadcrumb: 'Profile' }},
          {path: 'schedule', component: ScheduleComponent, data: {breadcrumb: 'Schedule'}},
          {path: 'statistics', component: StatisticsComponent, data: {breadcrumb: 'Statistics'}},
          {path: 'exams/:examId', component: ExamDetailComponent, data: {breadcrumb: 'Exam Detail'}},
          {path: 'exams/:examId/start', component: ExamQuestionComponent},
          {path: 'exams/:examId/result', component: ExamResultComponent, data: {breadcrumb: 'Exam Result'}},
        ]
      }

    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          {path: 'dashboard', component: AdminDashboardComponent},
          {path: 'profile', component: AdminProfileComponent},
          {path: 'users', component: ManageUserComponent},
          {path: 'question-bank', component: QuestionBankComponent},
          {path: 'question-bank/question/:questionId', component: QuestionDetailComponent},
          {path: 'courses', component: ManageCourseComponent},
          {path: 'tests', component: ManageTestComponent},
          {path: 'tests/:id/preview', component: DetailTestComponent},
          {path: 'tests/:id/users', component: UserTestComponent},
          {path: 'tests/:id/users/:username', component: UserTestResultComponent},
          {path: 'tests/add-test', component: AddTestComponent},
          {path: 'courses/:courseId/parts/:partId/view-question', component: ListQuestionComponent},
          {path: 'courses/:courseId/parts', component: ManagePartComponent},
        ]
      }

    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
