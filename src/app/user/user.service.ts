import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { IUserCreate } from './UserCreate.model'
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

  addUser(newUser: IUserCreate) {
    console.log('add User')
    this.http
      .post<{ message: string; user_id: string }>(
        this.url + '/addUser',
        newUser,
      )
      .subscribe((responseData) => {
        console.log(responseData.message)
        newUser.id = responseData.user_id
        this.getUsers()
      })
  }

  deleteUser(id: string) {
    this.http
      .delete(this.url + '/deleteUser/' + id)
      .subscribe((result: { message: string }) => {
        const updatedUsers = this.users.filter((user) => user.id != id)
        this.users = updatedUsers
        this.subjectUser.next([...this.users])
      })
  }
}
