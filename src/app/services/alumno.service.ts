import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private appURL: string;
  private apiURL: string;

  alumnos: Alumno[];

  constructor(private http: HttpClient) {
    this.appURL = environment.endpoint;
    this.apiURL = 'api/Alumno/';
  }

  getAllAlumnos(): Observable<any> {
    return this.http.get<Alumno[]>(`${this.appURL}${this.apiURL}Lista`);
  }

  getAlumno(id: number): Observable<any> {
    return this.http.get<any>(`${this.appURL}${this.apiURL}Buscar/${id}`);
  }

  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.appURL}${this.apiURL}Eliminar/${id}`);
  }

  addAlumno(alumno: Alumno): Observable<void> {
    return this.http.post<void>(`${this.appURL}${this.apiURL}Guardar`, alumno);
  }

  editAlumno(id: number, alumno: Alumno): Observable<void> {
    return this.http.put<void>(
      `${this.appURL}${this.apiURL}Editar/${id}`,
      alumno
    );
  }
}
