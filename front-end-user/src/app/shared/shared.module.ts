import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreLoadingComponent} from './pre-loading/pre-loading.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {SpinnerComponent} from './spinner/spinner.component';
import { TabComponent } from './tab/tab.component';
import {TooltipModule} from 'ng2-tooltip-directive';
import { RichEditorComponent } from './rich-editor/rich-editor.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FormsModule} from '@angular/forms';
import { SkeletonComponent } from './skeleton/skeleton.component';


@NgModule({
  declarations: [
    PreLoadingComponent,
    PageNotFoundComponent,
    BreadcrumbsComponent,
    SpinnerComponent,
    TabComponent,
    RichEditorComponent,
    SkeletonComponent,
  ],
    exports: [
        PreLoadingComponent,
        BreadcrumbsComponent,
        SpinnerComponent,
        TabComponent,
        TooltipModule,
        RichEditorComponent,
        SkeletonComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule
  ]
})
export class SharedModule {
}
