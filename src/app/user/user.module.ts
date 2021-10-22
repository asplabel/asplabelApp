import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserListComponent } from './user-list/user-list.component'
import { UserEditComponent } from './user-edit/user-edit.component'
import { UserCreateComponent } from './user-create/user-create.component'
import { UserDeleteComponent } from './user-delete/user-delete.component'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'

@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserCreateComponent,
    UserDeleteComponent,
  ],
  exports: [
    UserListComponent,
    UserEditComponent,
    UserCreateComponent,
    UserDeleteComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
  ],
})
export class UserModule {}
