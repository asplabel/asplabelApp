import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  options = ['Monitor', 'Colaboradores', 'tarjetas', 'ajustes']
  activeOption = this.options[0]
  constructor() {}

  ngOnInit(): void {}
}
