import { Component,ViewChild, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Users } from '../models/users';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: Users[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:8000/empleados').subscribe(data => {
      this.users = data.empleados;
    }) 
  }
 
  selectedUsers: Users = new Users();

  addOrEdit() {

    if (this.selectedUsers.id === 0) {
      this.selectedUsers.id = this.users.length + 1;
      this.users.push(this.selectedUsers);
    }
    this.selectedUsers = new Users();
    console.log(this.users);
  }

  delete(users : Users){
    if(confirm('Seguro que deseas eliminar este empleado?')){
      this.users = this.users.filter( x => x.id !== this.selectedUsers.id);
      this.selectedUsers = new Users();
    }
  }
}
