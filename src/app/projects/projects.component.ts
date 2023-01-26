import { Component, ViewChild, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Projects } from '../models/projects';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {
   /*
    Conectarse al backend.
    Consultar los proyectos en Base de Datos
    El array de Proyectos almacenarlos en la variable projects
  */

    constructor(private http: HttpClient) { }

    ngOnInit() {
      const headers = {'Access-Control-Allow-Origin': 'http://localhost:4200/', 
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type':  'application/json',
      // 'Access-Control-Allow-Origin': '*', 
      // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      // 'Access-Control-Allow-Headers': 'Authorization,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range',
      // 'Access-Control-Allow-Credentials' :'true',
      // 'Access-Control-Max-Age' :'1728000' ,
      // 'Content-Type': 'text/plain; charset=utf-8'
    }
      this.http.get<any>('http://localhost:8000/proyectos', { headers }).subscribe(data => {
        console.log(data);        
      }) 
    }
    

    getConfigResponse() {
      
    }
    
  projects: Projects[] = [
    {
      id: 1,
      codigo: 1,
      codigo_vers: 1238966,
      nombre_clave: "Proyecto 1",
      denominacion_comercial:"Lorem Ipsum 11",
      estado_actual: "Activo",
      fecha: 12/5/2023,
    },
    {
      id: 2,
      codigo:2,
      codigo_vers: 238965,
      nombre_clave: "Proyecto 2",
      denominacion_comercial:"Lorem Ipsum 22",
      estado_actual: "Suspendido",
      fecha: 12/5/2023,
    },
    {
      id: 3,
      codigo:3,
      codigo_vers: 338975,
      nombre_clave: "Proyecto 3",
      denominacion_comercial:"Lorem Ipsum 33",
      estado_actual: "En progreso",
      fecha: 12/5/2023,
    }
  ]

  selectedProject: Projects = new Projects();

  /* GET heroes whose name contains search term */



  addOrEdit() {

    if (this.selectedProject.id === 0) {
      this.selectedProject.id = this.projects.length + 1;
      this.projects.push(this.selectedProject);
    } else {

    }
    this.selectedProject = new Projects();
    console.log(this.projects);
  }

  openForEdit(project: Projects) {
    
    this.selectedProject = project;
  }

  delete(project: Projects){
    if(confirm('Seguro que deseas eliminar este proyecto?')){
      this.projects = this.projects.filter( x => x.id !== project.id);
      this.selectedProject = new Projects();
    }
  }
}


