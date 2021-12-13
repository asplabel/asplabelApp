import { AfterViewInit, Component, Input, OnInit } from '@angular/core'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  options = ['Monitor', 'Departamentos', 'Cargos', 'Tarjetas', 'Colaboradores']
  links = [
    '/monitor',
    '/department/list',
    'jobTitle/list',
    '/card/list',
    '/user/list',
  ]
  activeOption = this.options[0]
  @Input() option: string

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
     //console.log(this.option)
     if( this.option.includes('monitor')){
      this.activeOption = this.options[0]
    }
    if( this.option.includes('department')){
      this.activeOption = this.options[1]
    }
    if( this.option.includes('jobTitle')){
      this.activeOption =  this.options[2]
    }
    if( this.option.includes('card')){
      this.activeOption =  this.options[3]
    }
    if( this.option.includes('user')){
      this.activeOption =  this.options[4]
    }
  }


  onlogout(){
    this.authService.logOut()
  }
}
