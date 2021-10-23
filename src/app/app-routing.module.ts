import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CardCreateComponent } from './card/card-create/card-create.component'
import { CardDeleteComponent } from './card/card-delete/card-delete.component'
import { CardEditComponent } from './card/card-edit/card-edit.component'
import { CardListComponent } from './card/card-list/card-list.component'

import { DepartmentCreateComponent } from './department/department-create/department-create.component'
import { DepartmentDeleteComponent } from './department/department-delete/department-delete.component'
import { DepartmentEditComponent } from './department/department-edit/department-edit.component'
import { DepartmentListComponent } from './department/department-list/department-list.component'

import { JobTitleCreateComponent } from './job-title/job-title-create/job-title-create.component'
import { JobTitleDeleteComponent } from './job-title/job-title-delete/job-title-delete.component'
import { JobTitleEditComponent } from './job-title/job-title-edit/job-title-edit.component'
import { JobTitleListComponent } from './job-title/job-title-list/job-title-list.component'

import { LogInComponent } from './log-in/log-in.component'
import { LogOutComponent } from './log-out/log-out.component'
import { MonitorComponent } from './monitor/monitor.component'

import { UserCreateComponent } from './user/user-create/user-create.component'
import { UserDeleteComponent } from './user/user-delete/user-delete.component'
import { UserEditComponent } from './user/user-edit/user-edit.component'
import { UserListComponent } from './user/user-list/user-list.component'

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'monitor', component: MonitorComponent },

  { path: 'user/list', component: UserListComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/edit/:id', component: UserEditComponent },
  { path: 'user/delete', component: UserDeleteComponent },

  { path: 'card/list', component: CardListComponent },
  { path: 'card/create', component: CardCreateComponent },
  { path: 'card/edit/:id', component: CardEditComponent },
  { path: 'card/delete', component: CardDeleteComponent },

  { path: 'jobTitle/list', component: JobTitleListComponent },
  { path: 'jobTitle/create', component: JobTitleCreateComponent },
  { path: 'jobTitle/edit/:id', component: JobTitleEditComponent },
  { path: 'jobTitle/delete', component: JobTitleDeleteComponent },

  { path: 'department/list', component: DepartmentListComponent },
  { path: 'department/create', component: DepartmentCreateComponent },
  { path: 'department/edit/:id', component: DepartmentEditComponent },
  { path: 'department/delete', component: DepartmentDeleteComponent },

  { path: 'logout', component: LogOutComponent },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
