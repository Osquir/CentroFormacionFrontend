import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlumnoCurso } from '../models/alumnoCurso';

@Injectable({
  providedIn: 'root'
})
export class AlumnoCursoService {

  private appURL: string;
  private apiURL: string;

  alumnosCursos: AlumnoCurso[];

  constructor(private http: HttpClient) {
    this.appURL = environment.endpoint;
    this.apiURL = 'api/AlumnoCurso/';
  }

  getAllAlumnosCursos(): Observable<any> {
    return this.http.get<AlumnoCurso[]>(`${this.appURL}${this.apiURL}Lista`);
  }

  getAlumnoCurso(id: number): Observable<any> {
    return this.http.get<any>(`${this.appURL}${this.apiURL}Buscar/${id}`);
  }

  deleteAlumnoCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.appURL}${this.apiURL}Eliminar/${id}`);
  }

  addAlumnoCurso(alumnoCurso: AlumnoCurso): Observable<void> {
    return this.http.post<void>(`${this.appURL}${this.apiURL}Guardar`, alumnoCurso);
  }

  editAlumnoCurso(id: number, alumnoCurso: AlumnoCurso): Observable<void> {
    return this.http.put<void>(
      `${this.appURL}${this.apiURL}Editar/${id}`,
      alumnoCurso
    );
  }
}
