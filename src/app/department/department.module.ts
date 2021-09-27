import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { DepartmentDeleteComponent } from './department-delete/department-delete.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';



@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentCreateComponent,
    DepartmentDeleteComponent,
    DepartmentEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DepartmentModule { }
