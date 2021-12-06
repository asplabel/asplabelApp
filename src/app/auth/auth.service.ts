import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = 'http://localhost:3000'
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  createAdmin(firstname: string, lastname: string, document: string, type: string, email:string, password: string ){
    this.http.post(this.url+'/signup',{
      firstname: firstname,
      lastname: lastname,
      document: document,
      type: type,
      email: email,
      password: password
    }).subscribe((responseData:{message: string}) => {
      this._snackBar.open('' + responseData.message, '', {
        duration: 3000,
      })
    })
  }
}
