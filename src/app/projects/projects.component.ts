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
    projects: Projects[];
    constructor(private http: HttpClient) { }

    ngOnInit() {
      this.http.get<any>('http://localhost:8000/proyectos').subscribe(data => {
        this.projects = data.proyectos;
      }) 
    }

  selectedProject: Projects = new Projects();

  addOrEdit() {

    if (this.selectedProject.codigo === 0) {
      this.http.post<any>('http://localhost:8000/crear/proyecto', this.selectedProject).subscribe(data => {
        this.projects.push(this.selectedProject);
        this.selectedProject = new Projects();
      });             
    }  

  }

  openForEdit(project: Projects) {
    
    this.selectedProject = project;
  }

  delete(project: Projects){
    if(confirm('Seguro que deseas eliminar este proyecto?')){
      this.http.delete<any>('http://localhost:8000/borrar/proyecto/'+project.codigo).subscribe(data => {
        this.projects = this.projects.filter( x => x.codigo !== project.codigo);
        this.selectedProject = new Projects();
      });      
    }
  }
}


