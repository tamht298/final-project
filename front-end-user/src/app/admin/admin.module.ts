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
import { ScrollingModule } from '@angular/cdk/scrolling';
import {UserDropdownComponent} from './user-dropdown/user-dropdown.component';
import { AddUserComponent } from './manage-user/add-user/add-user.component';
import { DetailUserComponent } from './manage-user/detail-user/detail-user.component';
import { DeleteUserComponent } from './manage-user/delete-user/delete-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateUserComponent } from './manage-user/update-user/update-user.component';

@NgModule({
  declarations: [AdminComponent, NavSidebarComponent, AdminNavbarComponent, UserDropdownComponent, LineChartComponent, BarChartComponent, AdminDashboardComponent, ManageUserComponent, AdminFooterComponent, CardStatsComponent, AddUserComponent, DetailUserComponent, DeleteUserComponent, UpdateUserComponent],
    imports: [
        CommonModule,
        RouterModule,
        ScrollingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AdminModule {
}
