import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { IUserList } from './userList.model'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUserList[] = []
  subjectUser = new Subject<IUserList[]>()
  url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http
      .get(this.url + '/getUsers')
      .subscribe((usersData: IUserList[]) => {
        this.users = usersData
        this.subjectUser.next([...this.users])
      })
  }

  getSubjectUser() {
    return this.subjectUser.asObservable()
  }
}
