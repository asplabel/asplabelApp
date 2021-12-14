import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  url: string = '/monitor'
  subAuht: Subscription
  title = 'asplabelApp'
  isAuthenticated = false
  constructor(private authService: AuthService) {
  }

  ngOnInit(){
    this.isAuthenticated = this.authService.getIsAuthenticated()
    this.subAuht = this.authService.getAuthStatusListener().subscribe(isAuth =>{
      this.isAuthenticated = isAuth
    })
    this.authService.autoAuthUser()
    this.url = window.location.href
  }
}
