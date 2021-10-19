import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { IjobTitle } from './job-title.model'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class JobTitleService {
  jobTitles: IjobTitle[] = []
  subjectJobTitle = new Subject<IjobTitle[]>()

  url: string = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  getJobTitles() {
    this.http
      .get<{ message: string; jobTitles: any }>(this.url + '/getJobTitles')
      .pipe(
        map((jobTitleData) => {
          return jobTitleData.jobTitles.map((jobTitle) => {
            return {
              id: jobTitle._id,
              name: jobTitle.name,
              department_id: jobTitle.department_id,
            }
          })
        }),
      )
      .subscribe((jobTitlesData) => {
        this.jobTitles = jobTitlesData
        //console.log(jobTitlesData.message)
        this.subjectJobTitle.next([...this.jobTitles])
      })
    //return [...this.jobTitles]
  }

  getSubjectJobTitles() {
    return this.subjectJobTitle.asObservable()
  }

  getOneJobTitle(id: String) {
    return { ...this.jobTitles.find((jobtitle) => jobtitle.id === id) }
  }

  addJobTitle(newJobTitle: IjobTitle) {
    this.http
      .post<{ message: string; jobTitle_id: string }>(
        this.url + '/addJobTitle',
        newJobTitle,
      )
      .subscribe((responseData) => {
        console.log(responseData.message)
        newJobTitle.id = responseData.jobTitle_id
        this.jobTitles.push(newJobTitle)
        this.subjectJobTitle.next([...this.jobTitles])
      })
  }

  deleteJobTitle(id: string) {
    this.http
      .delete(this.url + '/deleteJobTitle/' + id)
      .subscribe((result: { message: string }) => {
        const updatedJobTitles = this.jobTitles.filter(
          (jobtitle) => jobtitle.id != id,
        )
        this.jobTitles = updatedJobTitles
        this.subjectJobTitle.next([...this.jobTitles])
        console.log(result.message)
      })
  }

  editJobTitle(){
    
  }
}
