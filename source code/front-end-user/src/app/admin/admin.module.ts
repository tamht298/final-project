import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {RouterModule} from '@angular/router';
import {NavSidebarComponent} from './nav-sidebar/nav-sidebar.component';
import {AdminNavbarComponent} from './navbar/navbar.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {AdminDashboardComponent} from './dashboard/dashboard.component';
import {ManageUserComponent} from './manage-user/manage-user.component';
import {AdminFooterComponent} from './admin-footer/admin-footer.component';
import {CardStatsComponent} from './card-stats/card-stats.component';
import {SharedModule} from '../shared/shared.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {UserDropdownComponent} from './user-dropdown/user-dropdown.component';
import {AddUserComponent} from './manage-user/add-user/add-user.component';
import {DetailUserComponent} from './manage-user/detail-user/detail-user.component';
import {DeleteUserComponent} from './manage-user/delete-user/delete-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UpdateUserComponent} from './manage-user/update-user/update-user.component';
import {QuestionBankComponent} from './manage-question/question-bank/question-bank.component';
import {TabsComponent} from './tabs/tabs.component';
import {ManageCourseComponent} from './manage-course/manage-course.component';
import {CourseUpdateComponent} from './manage-course/course-update/course-update.component';
import {CourseCreateComponent} from './manage-course/course-create/course-create.component';
import {ListQuestionComponent} from './manage-part/list-question/list-question.component';
import {ManagePartComponent} from './manage-part/manage-part.component';
import {AddQuestionComponent} from './manage-question/add-question/add-question.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { ManageTestComponent } from './manage-test/manage-test.component';
import { AddTestComponent } from './manage-test/add-test/add-test.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { QuestionDetailComponent } from './manage-question/question-detail/question-detail.component';
import { UserTestComponent } from './manage-test/user-test/user-test.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { DetailTestComponent } from './manage-test/detail-test/detail-test.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import { UserTestResultComponent } from './manage-test/user-test-result/user-test-result.component';
import { PartCreateComponent } from './manage-part/part-create/part-create.component';

@NgModule({
  declarations: [AdminComponent, NavSidebarComponent, AdminNavbarComponent, UserDropdownComponent, LineChartComponent, BarChartComponent, AdminDashboardComponent, ManageUserComponent, AdminFooterComponent, CardStatsComponent, AddUserComponent, DetailUserComponent, DeleteUserComponent, UpdateUserComponent, QuestionBankComponent, TabsComponent, ManageCourseComponent, CourseUpdateComponent, CourseCreateComponent, ListQuestionComponent, ManagePartComponent, AddQuestionComponent, ManageTestComponent, AddTestComponent, QuestionDetailComponent, UserTestComponent, AdminProfileComponent, DetailTestComponent, UserTestResultComponent, PartCreateComponent],
    imports: [
        CommonModule,
        RouterModule,
        ScrollingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        NgxSkeletonLoaderModule,
        DragDropModule,
        NgApexchartsModule,

    ]
})
export class AdminModule {
}
