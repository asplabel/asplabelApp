import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { IUserList } from '../userList.model'
import { UserService } from '../user.service'
import { MatSort } from '@angular/material/sort'
const userData: IUserList[] = [
  {
    id: '6167065ccb06eba131faee6d',
    firstname: 'Karol Liseth',
    lastname: 'Rojas Bermudez',
    jobTitle: 'Desarrollador Software',
    department: 'Administración',
    type: 'Permanente',
    is_active: true,
    card_UID: '937e4d03',
  },
]

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'lastname',
    'jobTilte',
    'department',
    'UID',
    'type',
    'active',
  ]
  users: IUserList[]
  dataSource: MatTableDataSource<IUserList>
  subUsers: Subscription
  constructor(private userService: UserService) {
    this.userService.getUsers()
  }
  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {}

  ngAfterViewInit() {
    //this.users = userData
    this.userService.getUsers()
    this.userService.getSubjectUser().subscribe((data: IUserList[]) => {
      this.users = data
      this.dataSource = new MatTableDataSource<IUserList>(this.users)
      this.dataSource.sort = this.sort
    })
  }

  ngOnDestroy() {
    this.subUsers.unsubscribe()
  }

  deleteUser(id: string) {
    console.log(id)
  }
  editUser(id: string) {
    console.log(id)
  }
}
