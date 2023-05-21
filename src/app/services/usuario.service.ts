import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private appURL: string;
  private apiURL: string;

  usuario: Usuario[];

  constructor(private http: HttpClient) {
    this.appURL = environment.endpoint;
    this.apiURL = 'api/Usuario/';
  }

  getAllUsuarios(): Observable<any> {
    return this.http.get<Usuario[]>(`${this.appURL}${this.apiURL}Lista`);
  }

  getUsuario(idUsuario: number): Observable<any> {
    return this.http.get<any>(
      `${this.appURL}${this.apiURL}Buscar/${idUsuario}`
    );
  }

  deleteUsuario(idUsuario: number): Observable<void> {
    return this.http.delete<void>(
      `${this.appURL}${this.apiURL}Eliminar/${idUsuario}`
    );
  }

  addUsuario(usuario: Usuario): Observable<void> {
    return this.http.post<void>(`${this.appURL}${this.apiURL}Guardar`, usuario);
  }

  editUsuario(idUsuario: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(
      `${this.appURL}${this.apiURL}Editar/${idUsuario}`,
      usuario
    );
  }
}
