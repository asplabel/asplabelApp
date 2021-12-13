import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from './auth/auth.service'
//import { IjobTitle } from './job-title/job-title.model'

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
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(){
    this.isAuthenticated = this.authService.getIsAuthenticated()
    this.subAuht = this.authService.getAuthStatusListener().subscribe(isAuth =>{
      this.isAuthenticated = isAuth
    })
    this.authService.autoAuthUser()
    this.url = window.location.href
    //console.log(this.url)
  }
  /*storedJobTitles: IjobTitle[] = []

  onJobTitleAdded(jobTitle) {
    this.storedJobTitles.push(jobTitle)
  }*/
}
