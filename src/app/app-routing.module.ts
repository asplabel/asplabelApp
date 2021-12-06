import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CardCreateComponent } from './card/card-create/card-create.component'
import { CardListComponent } from './card/card-list/card-list.component'

import { DepartmentCreateComponent } from './department/department-create/department-create.component'
import { DepartmentListComponent } from './department/department-list/department-list.component'

import { JobTitleCreateComponent } from './job-title/job-title-create/job-title-create.component'
import { JobTitleListComponent } from './job-title/job-title-list/job-title-list.component'

import { LogInComponent } from './auth/log-in/log-in.component'
import { LogOutComponent } from './log-out/log-out.component'
import { SignupComponent } from './auth/signup/signup.component'

import { MonitorComponent } from './monitor/monitor.component'

import { UserCardComponent } from './user/user-card/user-card.component'
import { UserCreateComponent } from './user/user-create/user-create.component'
import { UserDeleteComponent } from './user/user-delete/user-delete.component'
import { UserEditComponent } from './user/user-edit/user-edit.component'
import { UserListComponent } from './user/user-list/user-list.component'

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'monitor', component: MonitorComponent },

  { path: 'user/list', component: UserListComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/delete', component: UserDeleteComponent },
  { path: 'user/edit/:id', component: UserEditComponent },
  { path: 'user/card/:id', component: UserCardComponent },

  { path: 'card/list', component: CardListComponent },
  { path: 'card/create', component: CardCreateComponent },

  { path: 'jobTitle/list', component: JobTitleListComponent },
  { path: 'jobTitle/create', component: JobTitleCreateComponent },

  { path: 'department/list', component: DepartmentListComponent },
  { path: 'department/create', component: DepartmentCreateComponent },

  { path: 'logout', component: LogOutComponent },
  { path: 'signup', component: SignupComponent},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
