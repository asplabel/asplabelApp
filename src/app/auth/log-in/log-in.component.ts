import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  OnLogIn(form: NgForm){
    if(form.invalid){
      return
    }
    //console.log(form.value)
    this.authService.logIn(form.value.email, form.value.password)
  }
}
