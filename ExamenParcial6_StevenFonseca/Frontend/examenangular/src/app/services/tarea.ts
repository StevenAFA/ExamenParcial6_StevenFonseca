import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/taskmodal';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'https://localhost:7082/api/tarea';

  constructor(private http: HttpClient) { }

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  getTarea(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
  }

  crearTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  actualizarTarea(id: number, tarea: Tarea): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, tarea);
  }

  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  marcarComoCompletada(id: number, tarea: Tarea): Observable<void> {
    tarea.completada = true;
    return this.actualizarTarea(id, tarea);
  }

  marcarComoNoCompletada(id: number, tarea: Tarea): Observable<void> {
    tarea.completada = false;
    return this.actualizarTarea(id, tarea);
  }


  getPorEstado(completadas: boolean): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/estado/${completadas}`);
  }


  ordenarPor(tipo: 'fecha' | 'prioridad'): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/ordenar/${tipo}`);
  }


  buscarTareas(texto: string): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/buscar/${texto}`);
  }
}