import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { mimeType } from './mime-type.validator'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { IUser } from '../user.model'
import { UserService } from '../user.service'

import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter'
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core'
import * as _moment from 'moment'
import { default as _rollupMoment } from 'moment'
import { IjobTitle } from 'src/app/job-title/job-title.model'
import { Subscription } from 'rxjs'
import { JobTitleService } from 'src/app/job-title/job-title.service'

const moment = _rollupMoment || _moment

export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MM YYYY',
  },
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class UserEditComponent implements OnInit {
  form: FormGroup
  imagePreview: string
  userid: string
  user: IUser

  cargo = ''
  jobTitles: IjobTitle[]
  subJobTitles: Subscription

  date = new FormControl(moment())

  constructor(
    public userService: UserService,
    private jobTitleService: JobTitleService,
    public route: ActivatedRoute,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this.jobTitleService.getJobTitles()
    this.subJobTitles = this.jobTitleService
      .getSubjectJobTitles()
      .subscribe((data) => {
        this.jobTitles = data
      })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.userid = paramMap.get('id')
        this.userService.getUser(this.userid).subscribe((user: IUser) => {
          this.user = user
          if (this.user) {
            console.dir(this.user)
            this.form = new FormGroup({
              /* Primer argumento: valor inicial*/
              firstname: new FormControl(user.firstname, {
                validators: [Validators.required, Validators.maxLength(80)],
              }),
              lastname: new FormControl(user.lastname, {
                validators: [Validators.required, Validators.maxLength(80)],
              }),
              email: new FormControl(user.email, {
                validators: [Validators.email, Validators.maxLength(120)],
              }),
              phone: new FormControl(user.phone, {
                validators: Validators.maxLength(30),
              }),
              document: new FormControl(user.document, {
                validators: [Validators.required, Validators.maxLength(20)],
              }),
              address: new FormControl(user.address, {
                validators: Validators.maxLength(200),
              }),
              date_of_birth: new FormControl(user.date_of_birth),
              is_active: new FormControl(user.is_active, {
                validators: Validators.required,
              }),
              job_title_id: new FormControl(user.job_title_id),
              job_title_name: new FormControl(user.job_title_name),
              type: new FormControl(user.type),
              photo: new FormControl(null, {
                validators: [Validators.required],
                asyncValidators: [mimeType],
              }),
            })
          }
        })
      }
    })
  }

  saveChanges() {
    if (this.form.invalid) {
      return
    }
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({ photo: file })
    // console.log(file)
    this.form.get('photo').updateValueAndValidity()
    ///console.log(this.form)
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}
