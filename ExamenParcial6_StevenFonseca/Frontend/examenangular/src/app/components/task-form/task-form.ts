import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarea } from '../../models/taskmodal';
import { TareaService } from '../../services/tarea';
import { Input, Output, EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule,MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, 
  MatIconModule, MatDatepickerModule, MatNativeDateModule, MatCardModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm implements OnChanges {
nuevaTarea: Tarea = {
    id: 0,
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    completada: false,
    prioridad: 1
};
constructor(private tareaService: TareaService) {}
crearTarea(): void {
    if (this.nuevaTarea.id !== 0) {
      // Tarea existente → actualizar
      this.tareaService
        .actualizarTarea(this.nuevaTarea.id, this.nuevaTarea)
        .subscribe({
          next: () => {
            alert('Tarea actualizada');
            this.formularioEnviado.emit();
            this.reiniciarFormulario();
          },
          error: (err) => console.error('Error al actualizar', err),
        });
    } else {
      // Nueva tarea
      this.tareaService.crearTarea(this.nuevaTarea).subscribe({
        next: () => {
          alert('Tarea creada correctamente');
          window.location.reload();
        },
        error: (err) => console.error('Error al crear', err),
      });
    }
  }
 actualizarTarea(): void {
  this.tareaService.actualizarTarea(this.nuevaTarea.id, this.nuevaTarea).subscribe({
    next: () => {
      alert('Tarea actualizada correctamente');
      window.location.reload();
    },
    error: (err) => console.error('Error al actualizar', err)
  });
}
  reiniciarFormulario(): void {
    this.nuevaTarea = {
      id: 0,
      titulo: '',
      descripcion: '',
      fechaLimite: '',
      completada: false,
      prioridad: 1,
    };
  }
  @Input() tareaParaEditar: Tarea | null = null;
  @Output() formularioEnviado = new EventEmitter<void>();

  ngOnChanges(): void {
    if (this.tareaParaEditar) {
      this.nuevaTarea = { ...this.tareaParaEditar };
    }
  }
  
}
