import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string
  private isAuthenticated = false
  private authStatusListener = new Subject<boolean>();

  url: string = 'http://localhost:3000'
  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) { }

  getToken(){
    return this.token
  }

  getIsAuthenticated(){
    return this.isAuthenticated
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable()
  }

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

  logIn(email: string, password: string){
    const auth ={
      email: email,
      password: password
    }
    this.http.post(this.url+'/login',auth).subscribe((result: {token: string})=>{
      //console.log(result)
      this.token = result.token
      if (this.token){
        this.authStatusListener.next(true)
        this.isAuthenticated = true
        const now = new Date()
        // 86400 = 24 horas => 86400 segundos
        const expirationDate = new Date(now.getTime() + (86400 * 1000))
        this.saveAuthData(this.token, expirationDate)
        this.router.navigate(['/monitor'])
      }
    })
  }

  logOut(){
    this.token = null
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    this.clearAuthData()
    this.router.navigate(['/'])
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem('token',token)
    localStorage.setItem('expiration',expirationDate.toUTCString())
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration')
  }

  autoAuthUser(){
    const localeStorage = this.getAutoData()
    if(!localStorage){
      return
    }
    const now = new Date()
    const isInFuture = localeStorage.expirationDate > now
    if (isInFuture){
      this.token = localeStorage.token
      this.isAuthenticated = true
      this.authStatusListener.next(true)
    }
  }
  private getAutoData(){
    const token = localStorage.getItem('token')
    const expireDate = localStorage.getItem('expiration')
    if (!token || !expireDate) {
      return;
    }
    return {token: token, expirationDate: new Date(expireDate)}
  }
}
