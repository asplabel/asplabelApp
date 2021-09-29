import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { IDepartment } from 'src/app/department/department.model'
import { IjobTitle } from '../job-title.model'

@Component({
  selector: 'app-job-title-create',
  templateUrl: './job-title-create.component.html',
  styleUrls: ['./job-title-create.component.css'],
})
export class JobTitleCreateComponent implements OnInit {
  name = ''
  selected = 'none'
  ELEMENT_DATA: IDepartment[] = [
    { id: 0, name: 'Prueba' },
    { id: 1, name: 'Pelado' },
    { id: 2, name: 'Mantenimiento' },
  ]

  @Output() jobTitleCreated = new EventEmitter<IjobTitle>()

  constructor() {}

  ngOnInit(): void {}

  addJobTitle() {
    let jobTitle: IjobTitle
    if (this.selected == 'none') {
      jobTitle = {
        id: -1,
        name: this.name,
        departmentName: null,
      }
    } else {
      jobTitle = {
        id: -1,
        name: this.name,
        departmentName: this.selected,
      }
    }
    this.jobTitleCreated.emit(jobTitle)
    console.dir(
      'cargo a emitir: ' + jobTitle.name + ' | ' + jobTitle.departmentName,
    )
  }
}
