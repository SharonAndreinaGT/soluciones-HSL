import { Component } from '@angular/core';
import { Projects } from '../models/projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent {
   /*
    Conectarse al backend.
    Consultar los proyectos en Base de Datos
    El array de Proyectos almacenarlos en la variable projects
  */
  projects: Projects[] = [
    {
      id: 1,
      codigo: 1,
      codigo_vers: 1238966,
      nombre_clave: "Proyecto 1",
      denominacion_comercial:"",
      estado_actual: "",
      fecha: 12/5/2023,
    },
    {
      id: 2,
      codigo:2,
      codigo_vers: 238965,
      nombre_clave: "Proyecto 2",
      denominacion_comercial:"",
      estado_actual: "",
      fecha: 12/5/2023,
    },
    {
      id: 3,
      codigo:3,
      codigo_vers: 338975,
      nombre_clave: "Proyecto 3",
      denominacion_comercial:"",
      estado_actual: "",
      fecha: 12/5/2023,
    }
  ]

  selectedProject: Projects = new Projects();

  addOrEdit() {

    if (this.selectedProject.id === 0) {
      this.selectedProject.id = this.projects.length + 1;
      this.projects.push(this.selectedProject);
    }
    this.selectedProject = new Projects();
    console.log(this.projects);
  }

  openForEdit(project: Projects) {
    this.selectedProject = project;
  }

  delete(){
    if(confirm('Seguro que deseas eliminar este proyecto?')){
      this.projects = this.projects.filter( x => x.id !== this.selectedProject.id);
      this.selectedProject = new Projects();
    }
  }
}


