import { Component } from '@angular/core';
import { Tasks } from '../models/tasks';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks = [
    {
      id: 1,
      codigo: 12345,
      descripcion: 'Problema con el panel de control',
      tipo: 'De informatica',
      fecha_estimada: new Date('2023-02-02'),
      fecha_real: new Date('2023-02-02'),
      duracion_estimada: 'Un mes',
      duracion_real: 'Tres meses',
      codigo_proyecto: 12366,
    },
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

  delete(tasks: Tasks) {
    if (confirm('Seguro que deseas eliminar esta tarea?')) {
      this.tasks = this.tasks.filter((x) => x.id !== this.selectedTasks.id);
      this.selectedTasks = new Tasks();
    }
  }
}
