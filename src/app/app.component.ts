import { Component } from '@angular/core'
import { IjobTitle } from './job-title/job-title.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'asplabelApp'
  storedJobTitles: IjobTitle[] = []

  onJobTitleAdded(jobTitle) {
    this.storedJobTitles.push(jobTitle)
  }
}
