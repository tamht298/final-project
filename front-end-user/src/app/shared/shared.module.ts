import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreLoadingComponent } from './pre-loading/pre-loading.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';


@NgModule({
  declarations: [
    PreLoadingComponent,
    PageNotFoundComponent,
    BreadcrumbsComponent
  ],
  exports: [
    PreLoadingComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
