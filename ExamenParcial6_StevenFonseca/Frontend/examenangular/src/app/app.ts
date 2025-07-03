import { Component } from '@angular/core';
import { TaskList } from './components/task-list/task-list';
 import { TaskForm } from './components/task-form/task-form';
import { Tarea } from './models/taskmodal';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskList,TaskForm,FormsModule ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'todo-frontend';
  tareaSeleccionada: Tarea | null = null;
  refrescarLista(): void{
    this.tareaSeleccionada = null;
  }
}
 