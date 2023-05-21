import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private appURL: string;
  private apiURL: string;

  curso: Curso[];

  constructor(private http: HttpClient) {
    this.appURL = environment.endpoint;
    this.apiURL = 'api/Curso/';
  }

  getAllCursos(): Observable<any> {
    return this.http.get<Curso[]>(`${this.appURL}${this.apiURL}Lista`);
  }

  getCurso(idCurso: number): Observable<any> {
    return this.http.get<any>(`${this.appURL}${this.apiURL}Buscar/${idCurso}`);
  }

  deleteCurso(idCurso: number): Observable<void> {
    return this.http.delete<void>(
      `${this.appURL}${this.apiURL}Eliminar/${idCurso}`
    );
  }

  addCurso(curso: Curso): Observable<void> {
    return this.http.post<void>(`${this.appURL}${this.apiURL}Guardar`, curso);
  }

  editCurso(idCurso: number, curso: Curso): Observable<void> {
    return this.http.put<void>(
      `${this.appURL}${this.apiURL}Editar/${idCurso}`,
      curso
    );
  }
}
