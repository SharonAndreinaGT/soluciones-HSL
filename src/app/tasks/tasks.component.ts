import { Component } from '@angular/core';
import { Tasks } from '../models/tasks';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';  
import { Projects } from '../models/projects';
import { Documentos } from '../models/documentos';
import { Version } from '../models/version';
import { ThisReceiver } from '@angular/compiler';
import { Users } from '../models/users';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  constructor(private _router: Router,
    private http: HttpClient, private userService: UserService) { }

  // ARRAYS GENERALES DE LOS COMPONENTES

    selectedTasks: Tasks = new Tasks();
    selectedDocumentos: Documentos = new Documentos();
    selectedVersion: Version = new Version();
    documentos: Documentos[];
    versiones: Version[];
    users: Users[];
    tasks: Tasks[];
    isAdminUser: boolean = false;
    roleText: string = '';

  // FUNCION PARA TRAER LAS TAREAS DEL BACKEND A TRAVÉS DEL METODO GET

    ngOnInit() {
      this.isAdmin();
      this.http.get<any>('http://localhost:8000/tareas').subscribe(data => {
        this.tasks = data.tareas;       
      })
    }

  // FUNCION PARA INICIAR COMO ADMIN O USUARIO
  // DONDE CUANDO RETORNE isAdmin DEL BACKEND INICIARÁ Y MOSTRARÁ QUE INGRESÓ COMO ADMINISTRADOR

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


    // FUNCION PARA ABRIR Y EDITAR UNA TAREA QUE INICIA A TRAVÉS DE LA RUTA 
  // QUE TRAE COMO REPUESTA DEL BACKEND  
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

//A ESTAS FUNCIONES SE LES LLAMA EN LA PARTE DEL COMPONENT.HTML PARA DARLES USO, COMO RESPUESTA QUE,
//  CUANDO DEN CLICK EN ALGUNO DE LOS BOTONES DONDE SE LLAME ESA FUNCION SE EJECUTE LO QUE ESTÉ DENTRO
// YA SEA EN UN MODAL PARA LLENAR LOS CAMPOS O SOLO PARA VISUALIZAR

  crearVersion(){
    this.selectedVersion.codigo_documentos = this.selectedVersion.codigo
    this.http.post<any>('http://localhost:8000/docs/'+this.selectedTasks.codigo +'/crear/version', this.selectedVersion).subscribe((data) => {
    this.selectedVersion = new Version();
    console.log(data);
    
    });
  }
  
  versionDocumentos(tasks: Tasks){
    this.http.get<any>('http://localhost:8000/docs/'+ tasks.codigo+'/versiones').subscribe((data) => {
    this.versiones = data.versiones;
    console.log(data);
    
    })

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

  empleadoTareas(tasks: Tasks){
    this.http.get<any>('http://localhost:8000/tarea/'+ tasks.codigo +'/empleados').subscribe((data) => {
      this.users = data.empleados;
      console.log(data);
      
    })

  }

}
