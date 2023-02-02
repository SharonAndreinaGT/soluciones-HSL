import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Projects } from '../models/projects';
import { Router } from '@angular/router';
import { Tasks } from '../models/tasks';
import { Users } from '../models/users';
import { Documentos } from '../models/documentos';
import { Version } from '../models/version';

const jsPDF = require('jspdf');

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  constructor(
    private _router: Router,
    private http: HttpClient,
    private userService: UserService
  ){}

  projects: Projects[];
  tareas: Tasks[];
  users: Users[];
  documentos: Documentos[];
  versiones: Version[];

  isAdminUser: boolean = false;
  roleText: string = '';


  ngOnInit() {
    this.isAdmin();
    this.http.get<any>('http://localhost:8000/').subscribe((data) => {
      this.projects = data.proyectos;
      this.tareas = data.tareas;
      this.users = data.empleados;
      this.documentos = data.documentos;
      this.versiones = data.versiones;
    });
  }


  isAdmin() {
    let userAdmin = this.userService.getValue('isAdmin');

    if (userAdmin == 'si') {
      this.isAdminUser = true;
      this.roleText = 'Administrador';
    } else if (userAdmin == 'no') {
      this.isAdminUser = false;
      this.roleText = 'Usuario';
    } else {
      this.roleText = '';
      this._router.navigate(['login']);
    }
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Reporte-General.pdf');
    });
  }

}
