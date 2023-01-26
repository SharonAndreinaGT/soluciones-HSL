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
  
  @ViewChild('content') content: any;

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
    }  else {
      this.http.patch<any>('http://localhost:8000/modificar/proyecto/'+this.selectedProject.codigo, this.selectedProject).subscribe(data => {
        
      })
    } 

  }

  public open() {
    if(!true){
      // Dont open the modal
    } else {
       // Open the modal
       this.content.open();
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


