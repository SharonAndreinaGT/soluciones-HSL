import { Component } from '@angular/core';
import { Tasks } from '../models/tasks';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  tasks = [
    {
      id: 1,
      descripcion: "Problema con el panel de control",
      tipo: "De informatica",
      fechaInicioEstimada:2-5-2022,
      fechaInicioReal:2-8-2022,
      duracionEstimada:"Un mes",
      duracionReal:"Tres meses",
      nombreClave:"JJ8",
      descripcion_doc: "",
      requisitos: "",
      cod_fuente: 53698
    },
    {
      id: 2,
      descripcion: "Problema con el inicio de sesion",
      tipo: "De logistica",
      fechaInicioEstimada:10-7-2022,
      fechaInicioReal:13-10-2022,
      duracionEstimada:"Un mes",
      duracionReal:"Tres meses",
      nombreClave:"JJ8",  
      descripcion_doc: "", 
      requisitos: "",
      cod_fuente: 69865,
    },
    {
      id: 3,
      descripcion: "Problema con el menu",
      tipo: "De informatica",
      fechaInicioEstimada: 10-5-2022,
      fechaInicioReal: 2-8-2022,
      duracionEstimada:"Un mes",
      duracionReal:"Tres meses",
      nombreClave:"JJ8",
      descripcion_doc: "",
      requisitos: "",
      cod_fuente: 39876,
    }

  ];

  selectedTasks: Tasks = new Tasks();

  addOrEdit() {

    if (this.selectedTasks.id === 0) {
      this.selectedTasks.id = this.tasks.length + 1;
      this.tasks.push(this.selectedTasks);
    }
    this.selectedTasks = new Tasks();
    console.log(this.tasks);
  }

  openForEdit(tasks: Tasks) {
    this.selectedTasks = tasks;
  }

  delete(){
    if(confirm('Seguro que deseas eliminar esta tarea?')){
      this.tasks = this.tasks.filter( x => x.id !== this.selectedTasks.id);
      this.selectedTasks = new Tasks();
    }
  }

}
