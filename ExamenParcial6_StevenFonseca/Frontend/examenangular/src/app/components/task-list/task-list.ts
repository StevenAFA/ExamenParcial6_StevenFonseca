import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { TareaService } from '../../services/tarea';
import { Tarea } from '../../models/taskmodal';
import { Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,FormsModule,MatButtonModule, MatDividerModule, MatIconModule, MatButtonModule,
  MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule ],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskList {
  tareas: Tarea[] = [];

  constructor(private tareaService: TareaService) { }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas(): void {
    this.tareaService.getTareas().subscribe({
      next: (data) => {
        this.tareas = data;
      },
      error: (err) => {
        console.error('Error al obtener tareas', err);
      }
    });
  }
  @Output() editar = new EventEmitter<Tarea>();
  seleccionarParaEditar(tarea: Tarea): void {
    this.editar.emit(tarea);
  }

  marcarComoCompletada(tarea: Tarea): void {
    const tareaActualizada = { ...tarea, completada: true };

    this.tareaService.actualizarTarea(tarea.id, tareaActualizada).subscribe({
      next: () => {
        this.obtenerTareas();
      },
      error: (err) => {
        console.error('Error al marcar como completada', err);
      },
    });
  }
  marcarComoNoCompletada(tarea: Tarea): void {
    const tareaActualizada = { ...tarea, completada: false };

    this.tareaService.actualizarTarea(tarea.id, tareaActualizada).subscribe({
      next: () => {
        this.obtenerTareas();
      },
      error: (err) => {
        console.error('Error al marcar como no completada', err);
      },
    });
  }
  eliminarTarea(tarea: Tarea): void {
    const confirmar = confirm(
      `¿Estás seguro de eliminar la tarea "${tarea.titulo}"?`
    );

    if (confirmar) {
      this.tareaService.eliminarTarea(tarea.id).subscribe({
        next: () => {
          console.log('Tarea eliminada');
          this.obtenerTareas(); // recarga la lista
        },
        error: (err) => {
          console.error('Error al eliminar tarea', err);
        },
      });
    }
  }

  textoBusqueda: string = '';
  filtroEstado: 'todas' | 'completadas' | 'pendientes' = 'todas';
  ordenTipo: '' | 'fecha' | 'prioridad' = '';

   buscarTareas(): void {
    if (this.textoBusqueda.trim()) {
      this.tareaService.buscarTareas(this.textoBusqueda).subscribe({
        next: (data) => this.tareas = data,
        error: (err) => console.error('Error al buscar tareas', err)
      });
    } else {
      this.obtenerTareas();
    }
  }

  filtrarPorEstado(): void {
    if (this.filtroEstado === 'completadas') {
      this.tareaService.getPorEstado(true).subscribe({
        next: (data) => this.tareas = data,
        error: (err) => console.error('Error al filtrar completadas', err)
      });
    } else if (this.filtroEstado === 'pendientes') {
      this.tareaService.getPorEstado(false).subscribe({
        next: (data) => this.tareas = data,
        error: (err) => console.error('Error al filtrar pendientes', err)
      });
    } else {
      this.obtenerTareas();
    }
  }

  ordenarTareas(): void {
    if (this.ordenTipo === 'fecha' || this.ordenTipo === 'prioridad') {
      this.tareaService.ordenarPor(this.ordenTipo).subscribe({
        next: (data) => this.tareas = data,
        error: (err) => console.error('Error al ordenar tareas', err)
      });
    } else {
      this.obtenerTareas();
    }
  }
}
