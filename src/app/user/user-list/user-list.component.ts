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
import { IjobTitle } from 'src/app/job-title/job-title.model'
import { MatSort } from '@angular/material/sort'

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
