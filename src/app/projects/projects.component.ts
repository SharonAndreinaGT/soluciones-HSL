import { Component, OnInit } from '@angular/core';
import { Projects } from '../models/projects';
import { HttpClient } from '@angular/common/http';
import { Tasks } from '../models/tasks';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

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

  selectedProject: Projects = new Projects();
  selectedTarea: Tasks = new Tasks();

  projects: Projects[];
  tasks: Tasks[];

  isAdminUser: boolean = false;
  roleText: string = '';

  ngOnInit() {
    this.isAdmin();
    this.http.get<any>('http://localhost:8000/proyectos').subscribe((data) => {
      this.projects = data.proyectos;
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

  openForEdit(project: Projects) {
    this.selectedProject = project;
  }

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
}
