import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreLoadingComponent} from './pre-loading/pre-loading.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {TabComponent} from './tab/tab.component';
import {TooltipModule} from 'ng2-tooltip-directive';
import {RichEditorComponent} from './rich-editor/rich-editor.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SkeletonComponent} from './skeleton/skeleton.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {ResultCircleComponent} from './result-circle/result-circle.component';
import {FormatTimePipe} from '../pipes/format-time.pipe';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {UpdateEmailComponent} from './update-profile/update-email/update-email.component';
import {UpdatePasswordComponent} from './update-profile/update-password/update-password.component';
import {UpdateAvatarComponent} from './update-profile/update-avatar/update-avatar.component';


@NgModule({
  declarations: [
    PreLoadingComponent,
    PageNotFoundComponent,
    BreadcrumbsComponent,
    SpinnerComponent,
    TabComponent,
    RichEditorComponent,
    SkeletonComponent,
    ResultCircleComponent,
    FormatTimePipe,
    FileUploadComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent,
    UpdateAvatarComponent,

  ],
  exports: [
    PreLoadingComponent,
    BreadcrumbsComponent,
    SpinnerComponent,
    TabComponent,
    TooltipModule,
    RichEditorComponent,
    SkeletonComponent,
    RoundProgressModule,
    ResultCircleComponent,
    FormatTimePipe,
    FileUploadComponent,
    UpdatePasswordComponent,
    UpdateEmailComponent,
    UpdateAvatarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    RoundProgressModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
