import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subject } from 'rxjs'
import { IUser } from './user.model'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUser[] = []
  subjectUser = new Subject<IUser[]>()
  url: string = 'http://localhost:3000'

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

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

  addUser(newUser: IUser, photo: File) {
    const userData = new FormData()
    userData.append("firstname", newUser.firstname)
    userData.append("lastname", newUser.lastname)
    userData.append("email",newUser.email)
    userData.append("phone",newUser.phone)
    userData.append("document",newUser.document)
    userData.append("address",newUser.address)
    userData.append("date_of_birth", newUser.date_of_birth)
    userData.append("is_active", newUser.is_active ? 'true' : 'false' )
    userData.append("job_title_id", newUser.job_title_id)
    userData.append("card_id", newUser.card_id)
    userData.append("type", newUser.type)
    if (photo) {
      userData.append("photo", photo === null ? '': photo, newUser.firstname + ' '+ newUser.lastname)
    }
    this.http
      .post<{ message: string; user_id: string }>(
        this.url + '/addUser',
        userData,
      )
      .subscribe((responseData:{message: string}) => {
        this.getUsers()
        this._snackBar.open('' + responseData.message, '', {
          duration: 2000,
        })
      })
  }

  updateUser(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    document: string,
    address: string,
    date_of_birth: string,
    is_active: boolean,
    job_title_id: string,
    type: string,
    photo: File | string
  ) {
    let userData: IUser | FormData
    if (typeof(photo) === 'object'){
      userData = new FormData()
      userData.append("_id", id)
      userData.append("firstname", firstname)
      userData.append("lastname",lastname)
      userData.append("email",email)
      userData.append("phone",phone)
      userData.append("document",document)
      userData.append("address",address)
      userData.append("date_of_birth", date_of_birth)
      userData.append("is_active", is_active ? 'true' : 'false' )
      userData.append("job_title_id", job_title_id)
      userData.append("type", type)
      userData.append("photo", photo === null ? '': photo, firstname + ' '+ lastname)
    } else {
      userData = {
        _id: id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        document: document,
        address: address,
        date_of_birth: date_of_birth,
        is_active: is_active,
        job_title_id: job_title_id,
        type: type,
        photo: photo
      }
    }
    this.http
      .put(this.url + '/updateUser', userData)
      .subscribe((responseData: { message: string }) => {
        this.getUsers()
        this._snackBar.open('' + responseData.message, '', {
          duration: 2000,
        })
      })
  }

  deleteUser(id: string) {
    console.log(id)
    this.http
      .delete(this.url + '/deleteUser/' + id)
      .subscribe((responseData: { message: string }) => {
        this.getUsers()
        this._snackBar.open('' + responseData.message, '', {
          duration: 2000,
        })
      })
  }

  asignarTarjeta(user_id: string, card_id: string) {
    this.http
      .post(this.url + '/asignarTarjeta', {
        user_id: user_id,
        card_id: card_id,
      })
      .subscribe((responseData: { message: string }) => {
        this._snackBar.open('' + responseData.message, '', {
          duration: 2000,
        })
        this.getUsers()
      })
    //this.getUsers()
  }

  quitarTarjeta(user_id: string) {
    this.http
      .get(this.url + '/quitarTarjeta/' + user_id)
      .subscribe((responseData: { message: string }) => {
        this._snackBar.open('' + responseData.message, '', {
          duration: 2000,
        })
        this.getUsers()
      })
    //this.getUsers()
  }
}
