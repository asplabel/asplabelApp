import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobTitleCreateComponent } from './job-title-create/job-title-create.component';
import { JobTitleEditComponent } from './job-title-edit/job-title-edit.component';
import { JobTitleDeleteComponent } from './job-title-delete/job-title-delete.component';
import { JobTitleListComponent } from './job-title-list/job-title-list.component';



@NgModule({
  declarations: [
    JobTitleCreateComponent,
    JobTitleEditComponent,
    JobTitleDeleteComponent,
    JobTitleListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JobTitleModule { }
