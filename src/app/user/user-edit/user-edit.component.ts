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
    this.form = new FormGroup({
      /* Primer argumento: valor inicial*/
      firstname: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(80)],
      }),
      lastname: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(80)],
      }),
      email: new FormControl(null, {
        validators: [Validators.email, Validators.maxLength(120)],
      }),
      phone: new FormControl(null, {
        validators: Validators.maxLength(30),
      }),
      document: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      address: new FormControl(null, {
        validators: Validators.maxLength(200),
      }),
      date_of_birth: new FormControl(null, {validators: [Validators.nullValidator]}),
      is_active: new FormControl(null, {
        validators: Validators.required,
      }),
      job_title_id: new FormControl(null),
      type: new FormControl(null),
      photo: new FormControl(null, {
        validators: Validators.nullValidator,
        asyncValidators: [mimeType],
      }),
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.userid = paramMap.get('id')
        this.userService.getUser(this.userid).subscribe((user: IUser) => {
          this.user = user
          if (this.user) {
            if (this.user.date_of_birth && this.user.date_of_birth !=''){
              //this.date = new FormControl(moment(this.user.date_of_birth).format('MM DD YYYY'))
            }
            this.form.setValue({
              firstname: this.user.firstname,
              lastname: this.user.lastname,
              email: this.user.email,
              phone: this.user.phone,
              document: this.user.document,
              address: this.user.address,
              date_of_birth: moment(this.user.date_of_birth),
              is_active: this.user.is_active,
              job_title_id: this.user.job_title_id,
              type: this.user.type,
              photo: null,
            })

          }
        })
      }
    })
    this.jobTitleService.getJobTitles()
    this.subJobTitles = this.jobTitleService
      .getSubjectJobTitles()
      .subscribe((data) => {
        this.jobTitles = data
      })
  }

  saveChanges() {
    if (this.form.invalid ) {
      return
    }
    let id = this.userid
    let firstname = this.form.get('firstname').value
    let lastname = this.form.get('lastname').value
    let email = this.form.get('email').value
    let phone = this.form.get('phone').value
    let document = this.form.get('document').value
    let address = this.form.get('address').value
    let is_active = this.form.get('is_active').value
    let job_title_id = this.form.get('job_title_id').value
    let type = this.form.get('type').value
    let userBirth = this.form.get('date_of_birth').value
    //console.dir(userBirth._i)
    let date_of_birth = ''
    if (userBirth && userBirth != '') {
      if (userBirth._f) {
        if (userBirth._i != undefined) {
          date_of_birth = userBirth._i
        } else {
          date_of_birth = userBirth
        }
      } else {
        if (userBirth._i != undefined) {
          if(typeof(userBirth._i ) == 'object')
          {
            if (userBirth._i.month + 1 < 10) {
              date_of_birth = '0' + (userBirth._i.month + 1) + '/'
            } else {
              date_of_birth = userBirth._i.month + 1 + '/'
            }
            if (userBirth._i.date < 10) {
              date_of_birth =
                date_of_birth + '0' + userBirth._i.date + '/' + userBirth._i.year
            } else {
              date_of_birth =
                date_of_birth + userBirth._i.date + '/' + userBirth._i.year
            }
          }else{
            date_of_birth = userBirth._i
          }
        } else {
          date_of_birth = userBirth
        }
      }
    }
    this.userService.updateUser(
      id,
      firstname,
      lastname,
      email,
      phone,
      document,
      address,
      date_of_birth,
      is_active,
      job_title_id,
      type,
    )
    this._route.navigateByUrl('/user/list')
    this.form.reset()
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({ photo: file })
    this.form.get('photo').updateValueAndValidity()
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    if (typeof(file) == 'object'){
      reader.readAsDataURL(file)
    }
  }
}
