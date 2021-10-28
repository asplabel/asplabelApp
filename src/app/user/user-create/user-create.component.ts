import { Component, OnInit } from '@angular/core'
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms'
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
import { ErrorStateMatcher } from '@angular/material/core'
import { Subscription } from 'rxjs'
import { IjobTitle } from 'src/app/job-title/job-title.model'
import { JobTitleService } from 'src/app/job-title/job-title.service'
import { UserService } from '../user.service'
import { IUser } from '../user.model'
import { Location } from '@angular/common'

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

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    )
  }
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
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
export class UserCreateComponent implements OnInit {
  cargo = ''
  jobTitles: IjobTitle[]
  subJobTitles: Subscription
  userBirth: any
  userEmail: any

  date = new FormControl(moment())

  emailFormControl = new FormControl('', [Validators.email])

  matcher = new MyErrorStateMatcher()

  constructor(
    private jobTitleService: JobTitleService,
    private userService: UserService,
    private _location: Location,
  ) {}

  ngOnInit(): void {
    this.jobTitleService.getJobTitles()
    this.subJobTitles = this.jobTitleService
      .getSubjectJobTitles()
      .subscribe((data) => {
        this.jobTitles = data
      })
  }
  addUser(form: NgForm) {
    if (form.invalid) {
      return
    }
    console.dir(this.userBirth)
    let date
    if (this.userBirth._f) {
      date = this.userBirth._i
    } else {
      if (this.userBirth._i.date < 10) {
        date = '0' + this.userBirth._i.date + '/'
      }
      if (this.userBirth._i.month + 1 < 10) {
        date =
          date +
          '0' +
          (this.userBirth._i.month + 1) +
          '/' +
          this.userBirth._i.year
      } else {
        date =
          date + (this.userBirth._i.month + 1) + '/' + this.userBirth._i.year
      }
    }
    let user: IUser = {
      id: null,
      firstname: form.value.userFirstname,
      lastname: form.value.userLastname,
      email: this.userEmail,
      phone: form.value.userPhone,
      document: form.value.userDocument,
      address: form.value.userAddress,
      date_of_birth: date,
      is_active: form.value.userIsactive,
      job_title_id: form.value.jobtitle_id,
      type: form.value.userType,
      job_title_name: null,
      department_name: null,
      card_UID: null,
    }
    //console.dir(user)
    this.userService.addUser(user)

    form.reset()
    this.userEmail = ''
    this.userBirth = ''
    this._location.back()
  }
}
