import { Component } from '@angular/core';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent {

  version = [
    {
      fecha:"",
      codigo:"",
      descripcion:"",
    },
    {
      fecha:"",
      codigo:"",
      descripcion:"",
    },
    {
      fecha:"",
      codigo:"",
      descripcion:"",
    },
    {
      fecha:"",
      codigo:"",
      descripcion:"",
    }

  ];

  displayedColumns: string[] = ['fecha', 'codigo', 'descripcion'];

}
