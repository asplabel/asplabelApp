import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { IUser } from './user.model'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUser[]
  subjectUser = new Subject<IUser>()
  url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get<{ users: any }>(this.url + 'getUsers')
  }
}
