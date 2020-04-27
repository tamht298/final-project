import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {RouterModule} from '@angular/router';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [AdminComponent, NavSidebarComponent, NavbarComponent, UserDropdownComponent, LineChartComponent, BarChartComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class AdminModule { }
