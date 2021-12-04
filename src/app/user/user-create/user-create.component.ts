import { Component, OnInit } from '@angular/core'
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { mimeType } from './mime-type.validator'
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
  form: FormGroup
  jobTitles: IjobTitle[]
  subJobTitles: Subscription
  imagePreview: string
  date = new FormControl(moment())


  constructor(
    private jobTitleService: JobTitleService,
    private userService: UserService,
    private _location: Location,
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
        asyncValidators: [mimeType],
      }),
    })
    this.jobTitleService.getJobTitles()
    this.subJobTitles = this.jobTitleService
      .getSubjectJobTitles()
      .subscribe((data) => {
        this.jobTitles = data
      })
  }

  addUser() {
    if (this.form.invalid) {
      return
    }
    let firstname = this.form.get('firstname').value
    let lastname = this.form.get('lastname').value
    let email = this.form.get('email').value
    let phone = this.form.get('phone').value
    let document = this.form.get('document').value
    let address = this.form.get('address').value
    let is_active = this.form.get('is_active').value
    let job_title_id = this.form.get('job_title_id').value
    let type = this.form.get('type').value
    let photo = this.form.value.photo
    let userBirth = this.form.get('date_of_birth').value
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
    let user: IUser = {
      _id: null,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      document: document,
      address: address,
      date_of_birth: date_of_birth,
      is_active: is_active,
      job_title_id: job_title_id,
      type: type,
      job_title_name: null,
      department_name: null,
      card_id: null,
      card_UID: null,
      photo: photo
    }
    if (user.date_of_birth == undefined) {
      user.date_of_birth = ''
    }
    if (user.email == undefined) {
      user.email = ''
    }
    //console.dir(user)
    this.userService.addUser(user,photo)

    this._location.back()
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
