import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signUp(form: NgForm){
    if(form.invalid){
      return
    }
    //console.log(form.value)
    this.authService.createAdmin(form.value.firstname, form.value.lastname, form.value.document, form.value.type,form.value.email, form.value.password)

  }

}
