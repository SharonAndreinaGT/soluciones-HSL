import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {
  constructor(
    private _router: Router,
    private http: HttpClient,
    private userService: UserService
  ) { }

  cantidadProyectos: number = 0;
  cantidadTareas: number = 0;
  cantidadEmpleados: number = 0;
  cantidadTotal: number = 0

  isAdminUser: boolean = false;
  roleText: string = '';


  ngOnInit() {
    this.isAdmin();

    this.http.get<any>('http://localhost:8000/proyectos').subscribe((data) => {
      this.cantidadProyectos = data.cantidad;

      this.http.get<any>('http://localhost:8000/tareas').subscribe(data => {
        this.cantidadTareas = data.cantidad;

        this.http.get<any>('http://localhost:8000/empleados').subscribe((data) => {
          this.cantidadEmpleados = data.cantidad;

          this.cantidadTotal = this.cantidadEmpleados + this.cantidadProyectos + this.cantidadTareas;

          (document.querySelector('.pie-chart') as HTMLElement).style.background = 'radial-gradient(circle closest-side,transparent 66%,white 0),conic-gradient(#e15759 0,#e15759 '+(this.cantidadEmpleados / this.cantidadTotal) * 100+'%,#f28e2c 0,#f28e2c '+(this.cantidadTareas / this.cantidadTotal) * 100 +'%, #4e79a7 0,#4e79a7 ' + (this.cantidadProyectos / this.cantidadTotal) * 100 + '%)'
        
        });
      })
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


}
