import { Component } from '@angular/core';
import { Users } from '../models/users';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: Users[] = [
    {
      id: 1,
      nombre:"Jose",
      apellido: "Perez",
      cedula: 29456987,
      direccion: "",
      correoElectronico:"",
      telefono: 412659832,
      fechaContratacion: 12-1-2023
    },
    {
      id: 2,
      nombre:"Maria",
      apellido: "Lopez",
      cedula: 29856971,
      direccion: "",
      correoElectronico:"",
      telefono: 412659832,
      fechaContratacion: 12-2-2022
    },
    {
    id: 3,
    nombre:"Carlos",
    apellido: "Mendez",
    cedula: 7589631,
    direccion: "",
    correoElectronico:"",
    telefono: 42666832,
    fechaContratacion: 1-2-2022
    }


  ];

  selectedUsers: Users = new Users();

  addOrEdit() {

    if (this.selectedUsers.id === 0) {
      this.selectedUsers.id = this.users.length + 1;
      this.users.push(this.selectedUsers);
    }
    this.selectedUsers = new Users();
    console.log(this.users);
  }

  openForEdit(users: Users) {
    this.selectedUsers = users;
  }

  delete(users : Users){
    if(confirm('Seguro que deseas eliminar este empleado?')){
      this.users = this.users.filter( x => x.id !== this.selectedUsers.id);
      this.selectedUsers = new Users();
    }
  }
}
