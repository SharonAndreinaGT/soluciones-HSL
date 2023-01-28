import { Component,ViewChild, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Users } from '../models/users';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {Projects} from '../models/projects';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {


  constructor(private _router: Router,
    private http: HttpClient, private userService: UserService) { }

  selectedUsers: Users = new Users();
  users: Users[];
  projects: Projects[];
  isAdminUser: boolean = false;
  selectedProjectToAssign: string = '';

  ngOnInit() {
    this.isAdmin()
    this.http.get<any>('http://localhost:8000/empleados').subscribe(data => {
      this.users = data.empleados;
    })
  }

  isAdmin() {
    let userAdmin = this.userService.getValue('isAdmin');
    if (userAdmin == "si") {
      this.isAdminUser = true;
    } else if (userAdmin == "no") {
      this.isAdminUser = false;
    } else {
      this._router.navigate(['login']);
    }
  }

  addOrEdit() {

    if (this.selectedUsers.id === 0) {
      this.http.post('http://localhost:8000/nuevo/empleado', this.selectedUsers).subscribe((data) => {
        this.selectedUsers.id = this.users.length + 1;
        this.users.push(this.selectedUsers);
        this.selectedUsers = new Users();
      })

    } else {
      this.http.patch('http://localhost:8000/modificar/empleado/'+this.selectedUsers.cedula, this.selectedUsers).subscribe((data) => {

      })
    }
  }

  delete(users : Users){
    if(confirm('Seguro que deseas eliminar este empleado?')){
      this.users = this.users.filter( x => x.id !== this.selectedUsers.id);
      this.selectedUsers = new Users();
    }
  }

  openForEdit(user: Users) {
    this.selectedUsers = user;
  }

  traerProyectos (user: Users) {
    this.selectedUsers = user;
    this.http.get<any>('http://localhost:8000/proyectos').subscribe((data) => {
      this.projects = data.proyectos;
    });
  }

  onItemChange(e: any){
    this.selectedProjectToAssign = e.target.id;
  }

  asignarProyecto() {

    let obj = {
      "codigo": this.selectedUsers.cedula,
      "codigo_proyecto": this.selectedProjectToAssign,
      "cedula_empleado": this.selectedUsers.cedula
    }

    this.http.post<any>('http://localhost:8000/asignar/proyecto', obj).subscribe((data) => {
      console.log(data);
    })

  }
}
