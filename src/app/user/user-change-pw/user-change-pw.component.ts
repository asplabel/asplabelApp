import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-change-pw',
  templateUrl: './user-change-pw.component.html',
  styleUrls: ['./user-change-pw.component.css']
})
export class UserChangePWComponent implements OnInit {

  constructor(private userService: UserService, private _route: Router) { }

  ngOnInit(): void {
  }

  changePassword(form: NgForm) {
    if (form.invalid) {
      return
    }

    this.userService.changePassword(form.value.password)
    form.reset()
    this._route.navigateByUrl('/monitor')
  }
}
