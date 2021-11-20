import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { IUser } from '../user.model'
import { UserService } from '../user.service'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { delay } from 'rxjs/operators'
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'job_title_name',
    'department_name',
    'card_UID',
    'type',
    'is_active',
    'actions',
  ]
  users: IUser[]
  dataSource: MatTableDataSource<IUser>
  subUsers: Subscription
  isLoading: boolean
  isData: boolean

  constructor(private userService: UserService) {}

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.isLoading = true
    this.isData = true
    this.userService.getUsers()
    this.subUsers = this.userService.getSubjectUser().subscribe((data) => {
      this.users = data
      this.dataSource = new MatTableDataSource<IUser>(this.users)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      if (this.users.length > 0) {
        this.isData = true
      } else {
        this.isData = false
      }
      this.isLoading = false
    })
  }

  ngAfterViewInit() {
    this.userService.getUsers()
    this.subUsers = this.userService.getSubjectUser().subscribe((data) => {
      this.users = data
      this.dataSource = new MatTableDataSource<IUser>(this.users)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      if (this.users.length > 0) {
        this.isData = true
      } else {
        this.isData = false
      }
    })
  }

  ngOnDestroy() {
    this.subUsers.unsubscribe()
  }
  deleteUser(id: string) {
    this.userService.deleteUser(id)
  }

}
