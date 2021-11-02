import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { IUser } from './user.model'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUser[] = []
  subjectUser = new Subject<IUser[]>()
  url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getUser(id: string) {
    return this.http.get(this.url + '/getUser/' + id)
  }
  getUsers() {
    this.http.get(this.url + '/getUsers').subscribe((usersData: IUser[]) => {
      this.users = usersData
      this.subjectUser.next([...this.users])
    })
  }

  getSubjectUser() {
    return this.subjectUser.asObservable()
  }

  addUser(newUser: IUser) {
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
  asignarTarjeta(user_id: string, card_id: string) {
    this.http
      .post(this.url + '/asignarTarjeta', {
        user_id: user_id,
        card_id: card_id,
      })
      .subscribe((response) => {
        console.log(response)
      })
  }
  quitarTarjeta(user_id: string) {
    this.http
      .get(this.url + '/quitarTarjeta/' + user_id)
      .subscribe((response) => {
        console.log(response)
      })
  }
}
