import { Component, OnInit } from '@angular/core';
import { Projects } from '../models/projects';
import { HttpClient } from '@angular/common/http';
import { Tasks } from '../models/tasks';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Users } from '../models/users';

// PARA PDF
const jsPDF = require('jspdf'); 

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  
  constructor(
    private _router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}

  public downloadPDF(): void {
    const doc = new jsPDF();

    doc.text('Hello world!', 10, 10);
    doc.save('hello-world.pdf');
    doc.save(this.http.get<any>('http://localhost:8000/').subscribe((data) => {
      console.log(data);
    }));
     
  }

  // ARRAYS GENERALES

  selectedProject: Projects = new Projects();
  selectedTarea: Tasks = new Tasks();
  projects: Projects[];
  tasks: Tasks[];
  users: Users[];
  isAdminUser: boolean = false;
  roleText: string = '';

  // FUNCION PARA TRAER LOS PROYECTOS DEL BACKEND A TRAVÉS DEL METODO GET
  ngOnInit() {
    this.isAdmin();
    this.http.get<any>('http://localhost:8000/proyectos').subscribe((data) => {
      this.projects = data.proyectos.activos;
    });
  }

  // FUNCION PARA INICIAR COMO ADMIN O USUARIO

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

  // FUNCION PARA ABRIR Y EDITAR UN PROYECTO QUE INICIA A TRAVÉS DE LA RUTA 
  // QUE TRAE COMO REPUESTA DEL BACKEND  

  addOrEdit() {
    if (this.selectedProject.id === 0) {
      this.http
        .post<any>('http://localhost:8000/crear/proyecto', this.selectedProject)
        .subscribe((data) => {
          this.selectedProject.id = this.projects.length + 1;
          this.projects.push(this.selectedProject);
          this.selectedProject = new Projects();
        });
    } else {
      this.http
        .patch<any>(
          'http://localhost:8000/modificar/proyecto/' +
            this.selectedProject.codigo,
          this.selectedProject
        )
        .subscribe((data) => {});
    }
  }

  // ESTA FUNCION INICIA EL NUEVO PROJECTO SOBRE EL CUAL SE VA A TRABAJAR

  openForEdit(project: Projects) {
    this.selectedProject = project;
  }

  // FUNCION PARA CREAR UNA NUEVA TAREA SOBRE UN PROYECTO

  crearTarea() {
    this.http
      .post<any>(
        'http://localhost:8000/proyecto/' +
          this.selectedProject.codigo +
          '/crear/tarea',
        this.selectedTarea
      )
      .subscribe((data) => {
        this.selectedTarea = new Tasks();
      });
  }

  verTareas(project: Projects) {
    this.http
      .get<any>('http://localhost:8000/proyecto/' + project.codigo + '/tareas')
      .subscribe((data) => {
        this.tasks = data.tareas;
      });
  }
//  CONEXION PARA MOSTRAR EL EMPLEADO QUE PERTENECE AL PROYECTO,
//   A TRAVES DEL METODO GET RETORNA EL VALOR DEL BACKEND

  empleadoProyecto(project: Projects){
    this.http.get<any>('http://localhost:8000/proyecto/'+ project.codigo +'/empleados')
    .subscribe((data) => {
      this.users = data.empleados;
      console.log(data);
      
    });
  }
}
