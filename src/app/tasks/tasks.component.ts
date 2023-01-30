import { Component } from '@angular/core';
import { Tasks } from '../models/tasks';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';  
import { Projects } from '../models/projects';
import { Documentos } from '../models/documentos';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  constructor(private _router: Router,
    private http: HttpClient, private userService: UserService) { }

    selectedTasks: Tasks = new Tasks();
    selectedDocumentos: Documentos = new Documentos();
    documentos: Documentos[];
    tasks: Tasks[];
    isAdminUser: boolean = false;

    ngOnInit() {
      this.isAdmin();
      this.http.get<any>('http://localhost:8000/tareas').subscribe(data => {
        this.tasks = data.tareas;
        console.log(data);
        
      })
    }

    isAdmin() {
      let userAdmin = this.userService.getValue('isAdmin');
      console.log(userAdmin);
      
      if (userAdmin == 'si') {
        this.isAdminUser = true;
      } else if (userAdmin == 'no') {
        this.isAdminUser = false;
      } else {
        this._router.navigate(['login']);
      }
    }

  addOrEdit() {
    if (this.selectedTasks.id === 0) {
      this.http.post<any>('http://localhost:8000/proyecto/' + this.selectedTasks.codigo_proyecto +'/crear/tarea', 
      this.selectedTasks).subscribe((data) => {})
      this.selectedTasks.id = this.tasks.length + 1;
      this.tasks.push(this.selectedTasks);
      this.selectedTasks = new Tasks();
     
    } else{
      this.http.patch<any>('http://localhost:8000/proyecto/'+ this.selectedTasks.codigo_proyecto + '/tarea/' + this.selectedTasks.codigo,
       this.selectedTasks).subscribe((data) => {})

    }
  }


  openForEdit(tasks: Tasks) {
    this.selectedTasks = tasks;
  }

  crearDocumento(){
    this.selectedDocumentos.codigo_tareas = this.selectedTasks.codigo
    this.http.post<any>('http://localhost:8000/tarea/'+ this.selectedTasks.codigo +'/docs', this.selectedDocumentos).subscribe((data) => {
      this.selectedDocumentos = new Documentos();
    });

  }

  verDocumentos(tasks: Tasks){
    this.http.get<any>('http://localhost:8000/tarea/'+ tasks.codigo +'/docs').subscribe((data) => {
      this.documentos = data.documentos;
    })
  };

  delete(tasks: Tasks) {
    if (confirm('Seguro que deseas eliminar esta tarea?')) {
      this.tasks = this.tasks.filter((x) => x.id !== this.selectedTasks.id);
      this.selectedTasks = new Tasks();
    }
  }
}
