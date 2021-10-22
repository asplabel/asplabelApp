import { Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { IUser } from '../user.model'
import { UserService } from '../user.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: IUser[]
  dataSource: MatTableDataSource<IUser>
  subUsers: Subscription
  constructor(private userService: UserService) {
    this.userService.getUsers()
  }

  ngOnInit(): void {
    this.userService.getUsers()
  }

  list() {
    this.userService.getUsers()
    
  }
}
