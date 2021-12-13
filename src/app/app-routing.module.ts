import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CardCreateComponent } from './card/card-create/card-create.component'
import { CardListComponent } from './card/card-list/card-list.component'

import { DepartmentCreateComponent } from './department/department-create/department-create.component'
import { DepartmentListComponent } from './department/department-list/department-list.component'

import { JobTitleCreateComponent } from './job-title/job-title-create/job-title-create.component'
import { JobTitleListComponent } from './job-title/job-title-list/job-title-list.component'

import { LogInComponent } from './auth/log-in/log-in.component'
import { SignupComponent } from './auth/signup/signup.component'

import { MonitorComponent } from './monitor/monitor.component'

import { UserCardComponent } from './user/user-card/user-card.component'
import { UserCreateComponent } from './user/user-create/user-create.component'
import { UserEditComponent } from './user/user-edit/user-edit.component'
import { UserListComponent } from './user/user-list/user-list.component'
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'monitor', component: MonitorComponent, canActivate: [AuthGuard] },

  { path: 'user/list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user/create', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'user/edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'user/card/:id', component: UserCardComponent, canActivate: [AuthGuard] },

  { path: 'card/list', component: CardListComponent, canActivate: [AuthGuard] },
  { path: 'card/create', component: CardCreateComponent, canActivate: [AuthGuard] },

  { path: 'jobTitle/list', component: JobTitleListComponent, canActivate: [AuthGuard] },
  { path: 'jobTitle/create', component: JobTitleCreateComponent, canActivate: [AuthGuard] },

  { path: 'department/list', component: DepartmentListComponent, canActivate: [AuthGuard] },
  { path: 'department/create', component: DepartmentCreateComponent, canActivate: [AuthGuard] },

  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
