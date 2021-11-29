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
import { animate, state, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
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
  expandedElement: IUser | null

  constructor(private userService: UserService) {}

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    console.log('ngOnInit() \n')
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
    console.log('ngAfterViewInit() \n')
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
