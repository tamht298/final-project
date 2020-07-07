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


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'

  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          {path: 'dashboard', component: DashboardComponent},
          {path: 'profile', component: ProfileComponent},
          {path: 'schedule', component: ScheduleComponent},
          {path: 'statistics', component: StatisticsComponent},
          {path: 'exams/:examId', component: ExamDetailComponent},
          {path: 'exams/:examId/start', component: ExamQuestionComponent},
          {path: 'exams/:examId/result', component: ExamResultComponent},
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
          {path: 'profile', component: ProfileComponent},
          {path: 'users/active', component: ManageUserComponent},
          {path: 'question-bank', component: QuestionBankComponent},
          {path: 'courses', component: ManageCourseComponent},
          {path: 'tests', component: ManageTestComponent},
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
